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

  // ── BACKGROUND BEAT — 5 clearly distinct variants ──
  startBeat(variant = 0) {
    if (!this.ctx || !this.enabled) return;
    this.stopBeat();
    this._bgStep = 0;

    // ── Variant definitions ──────────────────────────────────────────────────
    // 0 : Steady 4/4, 126 BPM — the classic opener
    // 1 : Punchier, 134 BPM, busier hi-hat, melody up a 2nd
    // 2 : Stripped & slow, 108 BPM, half-time feel, pad-led, melody down
    // 3 : Urgent, 144 BPM, 16th-note hi-hats, higher key
    // 4 : Epic finale, 130 BPM, full sound, highest key, extra kick hits

    const v = variant % 5;

    const CONFIGS = [
      // 0 — original
      { bpm:126, f:1.00,
        kick : [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
        snare: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
        hihat: [1,1,1,1, 1,0,1,0, 1,1,1,1, 1,0,1,1, 1,1,1,0, 1,1,1,1, 0,1,1,1, 1,0,1,0],
        ohhat: [0,0,0,0, 0,1,0,0, 0,0,0,0, 0,1,0,0, 0,0,0,0, 0,1,0,0, 0,0,0,0, 0,1,0,0],
        mel  : [0,0,0,0,0,0,0,0, 0,0,659,0,0,0,784,0, 659,0,0,0,523,0,659,0, 784,0,659,0,523,0,0,0],
        bass : [110,0,110,0,0,87.3,0,98, 110,0,0,110,98,0,87.3,0, 82.4,0,87.3,0,92.5,0,98,0, 110,0,98,0,87.3,98,110,0],
        pad  : [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 523,0,0,0,0,0,0,0, 0,0,0,0,659,0,0,0] },

      // 1 — punchier, busier hi-hats, melody up a major 2nd (×1.122)
      { bpm:134, f:1.122,
        kick : [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,1,0, 1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,1,0],
        snare: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
        hihat: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
        ohhat: [0,0,0,0, 0,1,0,0, 0,0,0,0, 0,0,0,1, 0,0,0,0, 0,1,0,0, 0,0,0,0, 0,0,0,1],
        mel  : [0,0,659,0,0,0,0,0, 0,0,659,0,0,0,784,0, 880,0,0,0,659,0,784,0, 880,0,784,0,659,0,0,0],
        bass : [110,0,110,0,0,87.3,0,98, 110,0,0,110,98,0,87.3,0, 82.4,0,87.3,0,92.5,0,98,0, 110,0,98,0,87.3,98,110,0],
        pad  : [0,0,0,0,0,0,0,0, 523,0,0,0,0,0,0,0, 0,0,0,0,523,0,0,0, 659,0,0,0,0,0,0,0] },

      // 2 — stripped half-time, 108 BPM, pad-led, melody down (×0.891)
      { bpm:108, f:0.891,
        kick : [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,1,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
        snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
        hihat: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
        ohhat: [0,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,0,1],
        mel  : [0,0,0,0,0,0,0,0, 0,0,523,0,0,0,0,0, 523,0,0,0,440,0,523,0, 587,0,0,0,523,0,0,0],
        bass : [110,0,0,0,0,87.3,0,0, 98,0,0,0,0,87.3,0,0, 82.4,0,0,0,0,87.3,0,0, 98,0,0,0,87.3,0,110,0],
        pad  : [523,0,0,0,0,0,0,0, 0,0,0,0,440,0,0,0, 523,0,0,0,0,0,0,0, 440,0,0,0,523,0,0,0] },

      // 3 — urgent/tense, 144 BPM, 16th-note hi-hats, higher key (×1.335)
      { bpm:144, f:1.335,
        kick : [1,0,0,1, 1,0,0,0, 1,0,0,1, 1,0,0,0, 1,0,0,1, 1,0,0,0, 1,0,0,1, 1,0,0,0],
        snare: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,1, 0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,1],
        hihat: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
        ohhat: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,1,0,0, 0,0,0,0, 0,1,0,0],
        mel  : [0,0,0,0,0,0,0,0, 0,0,784,0,0,0,880,0, 784,0,0,0,659,0,784,0, 880,0,784,0,659,0,0,0],
        bass : [110,0,110,0,0,98,0,110, 98,0,0,110,87.3,0,98,0, 82.4,0,92.5,0,98,0,110,0, 123.5,0,110,0,98,87.3,110,0],
        pad  : [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 659,0,0,0,0,0,0,0, 0,0,0,0,784,0,0,0] },

      // 4 — epic finale, 130 BPM, full sound, highest key (×1.587), extra kick hits
      { bpm:130, f:1.587,
        kick : [1,0,0,0, 1,0,1,0, 1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,1,0, 1,0,0,0, 1,0,1,0],
        snare: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0, 0,1,1,0, 0,0,1,0],
        hihat: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,0,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,0,1,0],
        ohhat: [0,0,0,0, 0,1,0,0, 0,0,0,0, 0,1,0,0, 0,0,0,0, 0,1,0,0, 0,0,0,0, 0,1,0,1],
        mel  : [0,0,659,0,0,0,784,0, 0,0,659,0,0,0,784,0, 880,0,784,0,659,0,784,0, 1047,0,880,0,784,0,659,0],
        bass : [110,0,110,0,98,0,110,0, 110,0,0,110,98,0,87.3,0, 82.4,0,87.3,0,98,0,110,0, 110,98,87.3,0,82.4,98,110,0],
        pad  : [523,0,0,0,0,0,0,0, 0,0,523,0,0,0,0,0, 659,0,0,0,523,0,0,0, 0,0,523,0,659,0,784,0] },
    ];

    const cfg = CONFIGS[v];
    const STEP_MS = (60000 / cfg.bpm) / 2;

    this._bgInterval = setInterval(() => {
      if (!this.ctx || !this.enabled) return;
      const s = this._bgStep % 32;
      const stepSec = STEP_MS / 1000;
      const f = cfg.f;

      if (cfg.kick[s])  this._kick(0);
      if (cfg.snare[s]) { this._noise(0.08, 0, 0.1, 2000); this._osc('sine', 200, 0.05, 0, 0.08); }
      if (cfg.hihat[s]) this._noise(0.025, 0, 0.035, 9000);
      if (cfg.ohhat[s]) this._noise(0.04,  0, 0.09,  7000);
      if (cfg.bass[s])  this._osc('sawtooth', cfg.bass[s] * f, 0.08, 0, stepSec * 1.6);
      if (cfg.mel[s])   this._osc('triangle', cfg.mel[s]  * f, 0.07, 0, stepSec * 1.8);
      if (cfg.pad[s])   this._osc('sine',     cfg.pad[s]  * f, 0.04, 0, stepSec * 3.5);

      this._bgStep++;
    }, STEP_MS);
  }

  stopBeat() {
    if (this._bgInterval) { clearInterval(this._bgInterval); this._bgInterval = null; }
  }
}

const audio = new AudioEngine();
