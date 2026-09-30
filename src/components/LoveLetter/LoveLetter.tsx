"use client";

import { motion } from "framer-motion";
import { birthdayData } from "@/data/birthday";
import { Heart, MailOpen } from "lucide-react";

export function LoveLetter() {
  const { letter } = birthdayData;

  return (
    <section id="letter" className="relative py-16 sm:py-24 px-5 z-10">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="romantic-card p-8 sm:p-12 relative overflow-hidden bg-gradient-to-br from-white via-[#FFF9FA] to-[#FFF0F4] border-2 border-pink-200/90 shadow-2xl"
        >
          {/* Cute envelope seal header */}
          <div className="flex items-center justify-between border-b border-pink-100 pb-5 mb-7">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-pink-100/80 flex items-center justify-center text-[#E63968]">
                <MailOpen className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A2838]">
                {letter.heading}
              </h2>
            </div>
            <div className="px-3 py-1 rounded-full bg-pink-100 text-[#E63968] text-xs font-mono font-semibold">
              OCT 01
            </div>
          </div>

          {/* Salutation */}
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#E63968] mb-5">
            {letter.salutation}
          </h3>

          {/* Letter Body */}
          <div className="space-y-4 text-base sm:text-lg text-[#5C3246] font-normal leading-relaxed">
            {letter.body.map((para, idx) => (
              <p key={idx} className="tracking-wide">
                {para}
              </p>
            ))}
          </div>

          {/* Closing & Signature */}
          <div className="mt-8 pt-6 border-t border-pink-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono tracking-wider uppercase text-[#9E657D] mb-1">
                {letter.closing}
              </p>
              <p className="font-serif italic text-2xl sm:text-3xl font-bold text-gradient-rose">
                {letter.signature}
              </p>
            </div>

            {/* Cute stamp */}
            <div className="flex items-center gap-2 bg-pink-50 border border-pink-200 px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
              <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
              <span className="text-xs font-medium text-[#E63968]">Only for Shalini</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
