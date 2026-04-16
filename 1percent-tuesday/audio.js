class AudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this._bgInterval = null;
    this._bgStep = 0;
  }

  init() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  // ── PRIMITIVES ──

  _osc(type, freq, vol, t0, dur, freqEnd) {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx, t = ctx.currentTime + t0;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, t + dur * 0.75);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.start(t); o.stop(t + dur + 0.06);
  }

  _noise(vol, t0, dur, hp) {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx, t = ctx.currentTime + t0;
    const n = Math.ceil(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = hp || 1000;
    const g = ctx.createGain();
    src.connect(f); f.connect(g); g.connect(ctx.destination);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.start(t); src.stop(t + dur + 0.06);
  }

  _kick(t0) {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx, t = ctx.currentTime + t0;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.setValueAtTime(180, t);
    o.frequency.exponentialRampToValueAtTime(0.001, t + 0.4);
    g.gain.setValueAtTime(0.55, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    o.start(t); o.stop(t + 0.45);
  }

  // ── SOUND EFFECTS ──

  tick(urgent) {
    this._osc('sine', urgent ? 1320 : 880, urgent ? 0.22 : 0.12, 0, 0.07);
    if (urgent) this._osc('sine', 1760, 0.06, 0.01, 0.05);
  }

  correct() {
    [523, 659, 784, 1047, 1319].forEach((f, i) => {
      this._osc('triangle', f, 0.16, i * 0.07, 0.5);
      this._osc('sine', f * 2, 0.04, i * 0.07, 0.35);
    });
  }

  wrong() {
    this._osc('sawtooth', 380, 0.14, 0, 0.14);
    this._osc('sawtooth', 260, 0.12, 0.15, 0.14);
    this._osc('sawtooth', 180, 0.10, 0.30, 0.18);
    this._noise(0.05, 0, 0.5, 200);
  }

  questionStab() {
    this._osc('square', 200, 0.07, 0, 0.06);
    this._osc('sine', 440, 0.12, 0.06, 0.14);
    this._osc('sine', 660, 0.09, 0.16, 0.10);
  }

  reveal() {
    this._osc('sine', 330, 0.07, 0, 0.08);
    this._osc('sine', 660, 0.13, 0.1, 0.08);
    this._osc('sine', 990, 0.17, 0.2, 0.5);
  }

  fanfare() {
    [523, 659, 784, 880, 1047, 1319, 1568].forEach((f, i) => {
      this._osc('triangle', f, 0.14, i * 0.065, 0.6);
      this._osc('sine', f, 0.06, i * 0.065 + 0.01, 0.5);
    });
    this._kick(0); this._kick(0.26);
  }

  connectionReveal() {
    [261, 329, 392, 523, 659, 784, 1047].forEach((f, i) => {
      this._osc('sine', f, 0.12, i * 0.07, 0.55);
      this._osc('triangle', f, 0.05, i * 0.07, 0.45);
    });
  }

  crowd() {
    for (let i = 0; i < 16; i++) {
      this._osc('sine', 120 + Math.random() * 900, 0.01 + Math.random() * 0.02,
        Math.random() * 0.7, 0.4 + Math.random() * 0.5);
    }
    this._noise(0.035, 0, 1.2, 400);
  }

  // ── BACKGROUND BEAT — 32-step, 4-bar loop ──
  // Sounds close to the show: driving 4/4, synth bass riff, melody hook, hi-hat groove
  startBeat() {
    if (!this.ctx || !this.enabled) return;
    this.stopBeat();
    this._bgStep = 0;

    const BPM = 126;
    const STEP_MS = (60000 / BPM) / 2; // 8th-note steps

    // 32 steps = 4 bars
    // Kick: 4-on-the-floor (steps 0,4,8,12,16,20,24,28)
    const kick  = [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0,
                   1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0];
    // Snare: 2 & 4 (steps 4,12,20,28 in 8th-note grid? No — snare on beats 2&4 = steps 4,12,20,28 at 8ths)
    // Actually at 8th-note steps: bar = 8 steps. Beat 2 = step 2, beat 4 = step 6 per bar
    const snare = [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0,
                   0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0];
    // Hi-hat: varies per bar for groove
    const hihat = [1,1,1,1, 1,0,1,0, 1,1,1,1, 1,0,1,1,
                   1,1,1,0, 1,1,1,1, 0,1,1,1, 1,0,1,0];
    // Open hi-hat accent
    const ohhat = [0,0,0,0, 0,1,0,0, 0,0,0,0, 0,1,0,0,
                   0,0,0,0, 0,1,0,0, 0,0,0,0, 0,1,0,0];
    // Synth bass riff — varies per bar (Hz, 0=rest)
    const bass  = [
      // Bar 1: root feel
      110, 0, 110, 0,   0, 87.3, 0, 98,
      // Bar 2: variation
      110, 0, 0, 110,   98, 0, 87.3, 0,
      // Bar 3: build — ascending
      82.4, 0, 87.3, 0, 92.5, 0, 98, 0,
      // Bar 4: fill back to root
      110, 0, 98, 0,    87.3, 98, 110, 0
    ];
    // Melody hook — comes in bar 2 onwards (Hz, 0=rest)
    const mel = [
      // Bar 1: silence
      0,0,0,0, 0,0,0,0,
      // Bar 2: hook enters
      0,0,659,0, 0,0,784,0,
      // Bar 3: continues
      659,0,0,0, 523,0,659,0,
      // Bar 4: resolves
      784,0,659,0, 523,0,0,0
    ];
    // Counter-melody pad (softer, sustained)
    const pad = [
      0,0,0,0, 0,0,0,0,
      0,0,0,0, 0,0,0,0,
      523,0,0,0, 0,0,0,0,
      0,0,0,0, 659,0,0,0
    ];

    this._bgInterval = setInterval(() => {
      if (!this.ctx || !this.enabled) return;
      const s = this._bgStep % 32;
      const stepSec = STEP_MS / 1000;

      if (kick[s])  this._kick(0);
      if (snare[s]) { this._noise(0.08, 0, 0.1, 2000); this._osc('sine', 200, 0.05, 0, 0.08); }
      if (hihat[s]) this._noise(0.025, 0, 0.035, 9000);
      if (ohhat[s]) this._noise(0.04,  0, 0.09,  7000);
      if (bass[s])  this._osc('sawtooth', bass[s], 0.08, 0, stepSec * 1.6);
      if (mel[s])   this._osc('triangle', mel[s],  0.07, 0, stepSec * 1.8);
      if (pad[s])   this._osc('sine',     pad[s],  0.04, 0, stepSec * 3.5);

      this._bgStep++;
    }, STEP_MS);
  }

  stopBeat() {
    if (this._bgInterval) { clearInterval(this._bgInterval); this._bgInterval = null; }
  }
}

const audio = new AudioEngine();
