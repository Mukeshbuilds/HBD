"use client";

import { motion } from "framer-motion";
import { birthdayData } from "@/data/birthday";
import { Sparkles, Heart } from "lucide-react";
import { triggerBirthdayConfetti } from "@/lib/confetti";

export function FinalCelebration() {
  const { finalCelebration } = birthdayData;

  return (
    <section className="relative py-24 sm:py-32 px-5 text-center overflow-hidden z-10">
      {/* Dreamy peach/pink/lavender gradient background orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-gradient-to-tr from-[#FFD4BA]/50 via-[#FF85A1]/35 to-[#EBD4F4]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        {/* Floating Icons */}
        <div className="flex items-center justify-center gap-4 text-3xl sm:text-4xl select-none mb-2">
          <motion.span
            animate={{ y: [0, -8, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            🎂
          </motion.span>
          <motion.span
            animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            ✨
          </motion.span>
          <motion.span
            animate={{ y: [0, -7, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            💕
          </motion.span>
          <motion.span
            animate={{ y: [0, -14, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            🎈
          </motion.span>
        </div>

        {/* Large Text */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-gradient-sunset tracking-tight"
        >
          {finalCelebration.title}
        </motion.h2>

        {/* Sublines */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-2 max-w-md mx-auto"
        >
          <p className="font-serif text-lg sm:text-2xl text-[#4A2838] font-normal leading-relaxed">
            “{finalCelebration.subline1}”
          </p>
          <p className="font-serif text-lg sm:text-2xl text-[#E63968] font-semibold italic">
            “{finalCelebration.subline2}”
          </p>
        </motion.div>

        {/* Button to celebrate again */}
        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerBirthdayConfetti}
            className="px-8 py-3.5 rounded-full bg-white/90 border border-pink-200 text-[#E63968] font-bold text-sm shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#FF85A1]" />
            <span>Celebrate Again ✨</span>
          </motion.button>
        </div>

        {/* Closing Wish */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-xl sm:text-2xl text-[#6E3C53] font-bold pt-8"
        >
          {finalCelebration.closingWish}
        </motion.p>

        {/* Cute subtle footer */}
        <div className="pt-10 border-t border-pink-200/50">
          <p className="text-xs font-mono text-[#A86580]">
            Made with lots of thought for Shalini 💕 • October 2026
          </p>
        </div>
      </div>
    </section>
  );
}
