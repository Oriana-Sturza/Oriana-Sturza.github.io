class AudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this._bgNodes = [];
    this._bgInterval = null;
    this._bgStep = 0;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  // ── LOW-LEVEL HELPERS ──

  _osc(type, freq, vol, startOffset, dur, freqEnd) {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    const t = ctx.currentTime + startOffset;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, t + dur * 0.7);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.start(t); o.stop(t + dur + 0.05);
  }

  _noise(vol, startOffset, dur, hpFreq) {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    const t = ctx.currentTime + startOffset;
    const bufSize = Math.ceil(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = hpFreq || 1000;
    const g = ctx.createGain();
    src.connect(hp); hp.connect(g); g.connect(ctx.destination);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.start(t); src.stop(t + dur + 0.05);
  }

  _kick(startOffset) {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    const t = ctx.currentTime + startOffset;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.setValueAtTime(160, t);
    o.frequency.exponentialRampToValueAtTime(0.001, t + 0.35);
    g.gain.setValueAtTime(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    o.start(t); o.stop(t + 0.4);
  }

  // ── GAME SHOW SOUNDS ──

  // Countdown tick — normal or urgent (last 5s)
  tick(urgent) {
    this._osc('sine', urgent ? 1320 : 880, urgent ? 0.22 : 0.12, 0, 0.07);
    if (urgent) this._osc('sine', 1760, 0.08, 0.01, 0.05);
  }

  // Correct answer — ascending triumphant chime (like the show)
  correct() {
    const melody = [523, 659, 784, 1047, 1319];
    melody.forEach((f, i) => {
      this._osc('triangle', f, 0.16, i * 0.07, 0.5);
      this._osc('sine', f * 2, 0.05, i * 0.07, 0.35);
    });
  }

  // Wrong answer — descending wah-wah buzzer
  wrong() {
    this._osc('sawtooth', 380, 0.14, 0,    0.14);
    this._osc('sawtooth', 260, 0.12, 0.15, 0.14);
    this._osc('sawtooth', 180, 0.10, 0.30, 0.18);
    this._noise(0.06, 0, 0.5, 200);
  }

  // Short stab played when a question appears
  questionStab() {
    this._osc('square', 220, 0.08, 0,    0.06);
    this._osc('sine',   440, 0.12, 0.06, 0.12);
    this._osc('sine',   660, 0.10, 0.14, 0.10);
  }

  // Reveal sting — tension-to-resolution
  reveal() {
    this._osc('sine', 330, 0.08, 0,   0.08);
    this._osc('sine', 660, 0.14, 0.1, 0.08);
    this._osc('sine', 990, 0.18, 0.2, 0.5);
  }

  // Big fanfare for correct on a hard question / leaderboard
  fanfare() {
    const notes = [523, 659, 784, 880, 1047, 1319, 1568];
    notes.forEach((f, i) => {
      this._osc('triangle', f, 0.15, i * 0.065, 0.6);
      this._osc('sine',     f, 0.07, i * 0.065 + 0.01, 0.5);
    });
    this._kick(0);
    this._kick(0.26);
  }

  // Connection round reveal — warmer, golden feel
  connectionReveal() {
    [261, 329, 392, 523, 659, 784, 1047].forEach((f, i) => {
      this._osc('sine',     f, 0.13, i * 0.07, 0.55);
      this._osc('triangle', f, 0.06, i * 0.07, 0.45);
    });
  }

  // Crowd cheer effect
  crowd() {
    for (let i = 0; i < 16; i++) {
      const f = 120 + Math.random() * 900;
      this._osc('sine', f, 0.015 + Math.random() * 0.025, Math.random() * 0.7, 0.4 + Math.random() * 0.5);
    }
    this._noise(0.04, 0, 1.2, 400);
  }

  // ── BACKGROUND BEAT (plays during questions) ──
  // Driving 4/4 electronic pattern — game show tension feel
  startBeat() {
    if (!this.ctx || !this.enabled) return;
    this.stopBeat();
    this._bgStep = 0;
    const BPM = 124;
    const STEP = (60 / BPM) * 500; // ms per 8th note

    const pattern = {
      kick:  [1,0,0,0, 1,0,0,0], // beats 1 & 3
      snare: [0,0,1,0, 0,0,1,0], // beats 2 & 4
      hihat: [1,1,1,1, 1,1,1,1], // every 8th
      bass:  [1,0,0,1, 0,1,0,0], // synth bass pattern
    };

    const bassNotes = [110, 110, 87.3, 110, 98, 87.3, 98, 110];

    this._bgInterval = setInterval(() => {
      if (!this.ctx || !this.enabled) return;
      const s = this._bgStep % 8;

      if (pattern.kick[s])  this._kick(0);
      if (pattern.snare[s]) {
        this._noise(0.09, 0, 0.12, 2000);
        this._osc('sine', 200, 0.06, 0, 0.08);
      }
      if (pattern.hihat[s]) this._noise(0.03, 0, 0.04, 9000);
      if (pattern.bass[s])  this._osc('sawtooth', bassNotes[s], 0.07, 0, STEP / 1000 * 0.8);

      this._bgStep++;
    }, STEP);
  }

  stopBeat() {
    if (this._bgInterval) { clearInterval(this._bgInterval); this._bgInterval = null; }
  }
}

const audio = new AudioEngine();
