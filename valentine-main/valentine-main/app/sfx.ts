type ToneType = 'sine' | 'triangle' | 'square' | 'sawtooth';

let audioContext: AudioContext | null = null;
let sfxEnabled = true;
let lastPlay = 0;

const getContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

const resumeIfSuspended = async () => {
  const ctx = getContext();
  if (ctx.state === 'suspended') {
    try {
      await ctx.resume();
    } catch {
      // Ignore resume errors; some browsers block without user interaction.
    }
  }
};

const playTone = async (frequency: number, duration = 0.08, volume = 0.06, type: ToneType = 'triangle') => {
  if (!sfxEnabled) return;
  const now = performance.now();
  if (now - lastPlay < 40) return;
  lastPlay = now;

  await resumeIfSuspended();
  const ctx = getContext();
  const start = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
};

export const setSfxEnabled = (enabled: boolean) => {
  sfxEnabled = enabled;
};

export const playClick = () => playTone(960, 0.06, 0.05, 'triangle');

export const playPop = () => playTone(640, 0.09, 0.06, 'sine');

export const playSuccess = () => {
  playTone(520, 0.08, 0.06, 'triangle');
  setTimeout(() => playTone(740, 0.08, 0.06, 'triangle'), 80);
  setTimeout(() => playTone(980, 0.1, 0.05, 'triangle'), 160);
};
