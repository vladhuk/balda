import confetti from 'canvas-confetti';

export class Confetti {
  private static readonly count = 200;

  constructor(private readonly y: number) {}

  private fireConfetti(particleRatio: number, options: confetti.Options) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    confetti({
      ...options,
      origin: {
        y: this.y,
      },
      particleCount: Math.floor(Confetti.count * particleRatio),
    });
  }

  fire() {
    this.fireConfetti(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    this.fireConfetti(0.2, {
      spread: 60,
    });
    this.fireConfetti(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    this.fireConfetti(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    this.fireConfetti(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }

  reset() {
    confetti.reset();
  }
}
