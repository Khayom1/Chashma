let ctx: AudioContext | null = null;

function ctor(): typeof AudioContext | undefined {
  if (typeof window === "undefined") return undefined;
  const webkit = (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  return window.AudioContext ?? webkit;
}

export function unlockAudio(): void {
  const AudioCtx = ctor();
  if (!AudioCtx) return;
  if (!ctx) ctx = new AudioCtx({ latencyHint: "interactive" });
  if (ctx.state === "suspended") void ctx.resume();
}

function tone(freq: number, dur: number, type: OscillatorType, when: number, peak: number): void {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, when);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, peak), when + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(when);
  osc.stop(when + dur + 0.02);
  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
}

export function playCorrect(): void {
  if (!ctx) return;
  const now = ctx.currentTime;
  tone(523.25, 0.12, "sine", now, 0.07);
  tone(783.99, 0.16, "sine", now + 0.06, 0.05);
}

export function playWrong(): void {
  if (!ctx) return;
  const now = ctx.currentTime;
  tone(196, 0.18, "triangle", now, 0.06);
  tone(146.83, 0.22, "sine", now + 0.04, 0.045);
}

export function playTap(): void {
  if (!ctx) return;
  tone(660, 0.04, "sine", ctx.currentTime, 0.03);
}
