import confetti from "canvas-confetti";

export const triggerBirthdayConfetti = () => {
  // Sophisticated rose, champagne gold, ivory palette
  const colors = ["#F1CB8E", "#D9778A", "#FAF7EE", "#E5A9B4", "#D6AE6C"];

  const count = 120;
  const defaults = {
    origin: { y: 0.7 },
    colors,
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Multi-stage fireworks-like elegant burst
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const triggerGentleHeartBurst = (x: number, y: number) => {
  confetti({
    particleCount: 15,
    angle: 90,
    spread: 50,
    origin: {
      x: x / window.innerWidth,
      y: y / window.innerHeight,
    },
    colors: ["#D9778A", "#F1CB8E", "#FFF0F2"],
    shapes: ["circle"],
    scalar: 0.7,
    ticks: 120,
    disableForReducedMotion: true,
  });
};
