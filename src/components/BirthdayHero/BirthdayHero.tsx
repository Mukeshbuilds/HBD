"use client";

import { motion } from "framer-motion";
import { birthdayData } from "@/data/birthday";
import { Sparkles, Heart } from "lucide-react";
import { triggerGentleHeartBurst } from "@/lib/confetti";

interface BirthdayHeroProps {
  onOpenSurprise: () => void;
}

export function BirthdayHero({ onOpenSurprise }: BirthdayHeroProps) {
  const { hero } = birthdayData;

  const handleClick = (e: React.MouseEvent) => {
    triggerGentleHeartBurst(e.clientX, e.clientY);
    onOpenSurprise();
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-5 py-16 text-center z-10">
      {/* Soft romantic glowing gradient orb behind hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-gradient-to-tr from-[#FFD4BA]/40 via-[#FF85A1]/25 to-[#EBD4F4]/40 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-2xl mx-auto flex flex-col items-center"
      >
        {/* Animated Cake / Sparkle Illustration */}
        <motion.div
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/90 border border-pink-200/80 shadow-lg shadow-pink-200/50 flex items-center justify-center mb-6 text-4xl sm:text-5xl select-none"
        >
          🎂
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200/60 shadow-sm mb-5 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FF6584]" />
          <span className="text-xs sm:text-sm font-medium tracking-wide text-[#E63968]">
            {hero.badge}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#4A2838] leading-tight mb-2"
        >
          {hero.title}
        </motion.h1>

        {/* Name in large flirty text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-black text-gradient-sunset tracking-normal mb-4 flex items-center justify-center gap-2"
        >
          <span>{hero.name}</span>
        </motion.div>

        {/* 25 looks pretty good on you. 😉 */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-sans text-lg sm:text-2xl text-[#8E4A68] font-medium mb-10 max-w-md mx-auto"
        >
          {hero.subtitle}
        </motion.p>

        {/* Large "Open your surprise 💕" button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <button
            onClick={handleClick}
            className="group px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-button-gradient text-white text-base sm:text-lg font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-3 shadow-xl"
          >
            <span>{hero.buttonText}</span>
            <Heart className="w-5 h-5 fill-white text-white group-hover:animate-ping" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
