"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeartItem {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  opacity: number;
}

const heartEmojis = ["❤️", "💕", "💗", "💖", "💓", "🌸", "✨"];

export function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartItem[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 12 : 24;

    const generated: HeartItem[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      left: Math.random() * 95, // percentage across screen
      size: Math.random() * (isMobile ? 14 : 20) + 16, // 16px - 36px
      duration: Math.random() * 6 + 7, // 7s to 13s
      delay: Math.random() * 8, // staggered starts
      driftX: (Math.random() - 0.5) * 60, // gentle left/right sway
      opacity: Math.random() * 0.4 + 0.35, // 0.35 to 0.75
    }));

    setHearts(generated);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || hearts.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute animate-heart-float select-none transition-opacity"
          style={
            {
              left: `${h.left}%`,
              bottom: "-40px",
              fontSize: `${h.size}px`,
              opacity: h.opacity,
              "--duration": `${h.duration}s`,
              "--drift-x": `${h.driftX}px`,
              animationDelay: `${h.delay}s`,
            } as React.CSSProperties
          }
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
