"use client";

import { motion } from "framer-motion";
import { birthdayData } from "@/data/birthday";
import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";

export function BirthdayMessage() {
  const { birthdayMessage } = birthdayData;

  return (
    <section id="message" className="relative py-16 sm:py-20 px-5 z-10">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="romantic-card romantic-card-hover p-7 sm:p-10 text-center relative overflow-hidden"
        >
          {/* Subtle top decoration badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-[#E63968] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Birthday Wish</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#4A2838] mb-4 leading-snug">
            {birthdayMessage.heading}
          </h2>

          {/* Framed Photo of Shalini */}
          <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 my-6">
            {/* Soft glowing halo */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#FF85A1] to-[#FFAAA6] blur-lg opacity-40 scale-105" />

            {/* Photo frame */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden p-1.5 bg-gradient-to-br from-pink-200 via-white to-pink-300 shadow-xl border border-pink-100/80">
              <div className="relative w-full h-full rounded-[22px] overflow-hidden">
                <Image
                  src="/images/shalini.png"
                  alt="Birthday Girl Shalini"
                  fill
                  sizes="(max-width: 640px) 192px, 224px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* Cute bottom badge */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-pink-200 shadow-md rounded-full px-3.5 py-1 flex items-center gap-1.5 text-xs font-semibold text-[#E63968] whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-[#FF85A1]" />
              <span>Birthday Girl 👑</span>
            </div>
          </div>

          <p className="text-base sm:text-lg text-[#6E3C53] font-normal leading-relaxed mb-6">
            {birthdayMessage.message}
          </p>

          <div className="pt-5 border-t border-pink-100 flex items-center justify-center gap-2 text-sm sm:text-base font-serif italic text-[#E63968]">
            <Heart className="w-4 h-4 fill-current text-[#E63968]" />
            <span>{birthdayMessage.playfulLine}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
