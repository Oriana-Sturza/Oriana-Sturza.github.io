class AudioEngine {
  constructor() { this.ctx = null; this.enabled = true; }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  _play(freq, type, vol, start, dur, freqEnd) {
    if (!this.ctx || !this.enabled) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + start);
    if (freqEnd) osc.frequency.exponentialRampToValueAtTime(freqEnd, this.ctx.currentTime + start + dur);
    gain.gain.setValueAtTime(0, this.ctx.currentTime + start);
    gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + start + dur);
    osc.start(this.ctx.currentTime + start);
    osc.stop(this.ctx.currentTime + start + dur + 0.05);
  }

  tick() { this._play(660, 'sine', 0.08, 0, 0.08); }
  urgentTick() { this._play(1100, 'sine', 0.15, 0, 0.08); }

  correct() {
    [0, 0.08, 0.16, 0.26].forEach((t, i) => {
      this._play([523, 659, 784, 1047][i], 'triangle', 0.12, t, 0.35);
    });
  }

  wrong() {
    this._play(220, 'sawtooth', 0.1, 0, 0.15);
    this._play(160, 'sawtooth', 0.08, 0.15, 0.2);
  }

  fanfare() {
    [523, 659, 784, 880, 1047, 1319].forEach((f, i) => {
      this._play(f, 'triangle', 0.12, i * 0.07, 0.5);
    });
  }

  reveal() {
    this._play(440, 'sine', 0.1, 0, 0.08);
    this._play(880, 'sine', 0.15, 0.1, 0.4);
  }

  connectionReveal() {
    [261, 329, 392, 523, 659, 784].forEach((f, i) => {
      this._play(f, 'sine', 0.1, i * 0.06, 0.4);
    });
  }

  crowd() {
    for (let i = 0; i < 8; i++) {
      const freq = 200 + Math.random() * 600;
      this._play(freq, 'sine', 0.03 + Math.random() * 0.05, Math.random() * 0.5, 0.3 + Math.random() * 0.4);
    }
  }
}

const audio = new AudioEngine();
