"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayData } from "@/data/birthday";
import { Sparkles, Heart, ArrowRight } from "lucide-react";
import { triggerBirthdayConfetti, triggerGentleHeartBurst } from "@/lib/confetti";

interface QuizProps {
  onComplete: () => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const { quiz } = birthdayData;
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | "done">(1);
  const [q2Feedback, setQ2Feedback] = useState<string | null>(null);
  const [noCountQ3, setNoCountQ3] = useState(0);
  const [q3PlayfulMessage, setQ3PlayfulMessage] = useState<string | null>(null);

  // Growth scale for Q3 YES button: 1 -> 1.1 -> 1.25 -> 1.45 -> 1.7
  const yesScales = [1, 1.1, 1.25, 1.45, 1.7];
  const currentYesScale = yesScales[Math.min(noCountQ3, yesScales.length - 1)];

  const playfulNoResponses = [
    "Are you sure? Look at how shiny that YES button is looking 😌",
    "Come on, just look at that YES button getting bigger for you! 😂",
    "Hmm, the algorithm seems to strongly suggest clicking YES 👀",
    "Okay, now you're just clicking NO to see how big it gets! 😉",
    "Resistance is futile, Shalini. Click YES already ❤️",
  ];

  const handleQ1Answer = (e: React.MouseEvent) => {
    triggerGentleHeartBurst(e.clientX, e.clientY);
    setTimeout(() => {
      setCurrentStep(2);
    }, 600);
  };

  const handleQ2Answer = (isYes: boolean, e: React.MouseEvent) => {
    triggerGentleHeartBurst(e.clientX, e.clientY);
    if (isYes) {
      setQ2Feedback("Good… because I really like talking to you. 🥰");
    } else {
      setQ2Feedback("Okay okay… I'll behave. 😂");
    }

    setTimeout(() => {
      setQ2Feedback(null);
      setCurrentStep(3);
    }, 1600);
  };

  const handleQ3No = (e: React.MouseEvent) => {
    triggerGentleHeartBurst(e.clientX, e.clientY);
    setNoCountQ3((prev) => prev + 1);
    const msg = playfulNoResponses[noCountQ3 % playfulNoResponses.length];
    setQ3PlayfulMessage(msg);
  };

  const handleQ3Yes = (e: React.MouseEvent) => {
    triggerBirthdayConfetti();
    setCurrentStep("done");
  };

  return (
    <section id="quiz" className="relative py-16 sm:py-24 px-5 z-10">
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] font-bold text-[#E63968] mb-2 bg-pink-100/70 px-3 py-1 rounded-full">
            Mini Quiz
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#4A2838] mb-2">
            {quiz.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#8E4A68] font-medium">
            {quiz.subtitle}
          </p>
        </div>

        {/* Progress indicator */}
        {currentStep !== "done" && (
          <div className="mb-6 flex items-center justify-between text-xs font-mono font-semibold text-[#B85B7A] px-2">
            <span>Question {currentStep} of 3</span>
            <div className="flex gap-1.5">
              <span className={`w-3 h-1.5 rounded-full transition-colors ${currentStep >= 1 ? "bg-[#FF6584]" : "bg-pink-200"}`} />
              <span className={`w-3 h-1.5 rounded-full transition-colors ${currentStep >= 2 ? "bg-[#FF6584]" : "bg-pink-200"}`} />
              <span className={`w-3 h-1.5 rounded-full transition-colors ${currentStep >= 3 ? "bg-[#FF6584]" : "bg-pink-200"}`} />
            </div>
          </div>
        )}

        <div className="romantic-card p-7 sm:p-10 text-center relative overflow-hidden bg-white/95 border-2 border-pink-200/80 shadow-xl min-h-[300px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {/* QUESTION 1 */}
            {currentStep === 1 && (
              <motion.div
                key="q1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="w-14 h-14 rounded-full bg-pink-100 text-2xl flex items-center justify-center mx-auto shadow-inner">
                  🥹
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A2838]">
                  Are you happy with me? 🥹
                </h3>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleQ1Answer}
                    className="px-8 py-3.5 rounded-full bg-button-gradient text-white text-base font-bold shadow-lg cursor-pointer"
                  >
                    YES ❤️
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleQ1Answer}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFAAA6] to-[#FF85A1] text-white text-base font-bold shadow-lg cursor-pointer"
                  >
                    OF COURSE 😌
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* QUESTION 2 */}
            {currentStep === 2 && (
              <motion.div
                key="q2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="w-14 h-14 rounded-full bg-pink-100 text-2xl flex items-center justify-center mx-auto shadow-inner">
                  👀
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A2838]">
                  Do you feel comfortable with me? 👀
                </h3>

                {q2Feedback ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 rounded-2xl bg-pink-50 border border-pink-200 text-[#E63968] font-serif text-xl sm:text-2xl font-bold"
                  >
                    {q2Feedback}
                  </motion.div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleQ2Answer(true, e)}
                      className="px-8 py-3.5 rounded-full bg-button-gradient text-white text-base font-bold shadow-lg cursor-pointer"
                    >
                      YES 💗
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleQ2Answer(false, e)}
                      className="px-8 py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-base font-semibold border border-gray-300 transition-all cursor-pointer"
                    >
                      NO
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}

            {/* QUESTION 3 — PLAYFUL GROWING YES BUTTON */}
            {currentStep === 3 && (
              <motion.div
                key="q3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="w-14 h-14 rounded-full bg-pink-100 text-2xl flex items-center justify-center mx-auto shadow-inner">
                  ✨
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A2838]">
                  Is there possibility to say okay for me? 👀❤️
                </h3>

                {q3PlayfulMessage && (
                  <motion.p
                    key={noCountQ3}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs sm:text-sm text-[#E63968] font-medium italic"
                  >
                    {q3PlayfulMessage}
                  </motion.p>
                )}

                <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
                  {/* Dynamic Growing YES Button */}
                  <motion.button
                    animate={{ scale: currentYesScale }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    whileTap={{ scale: currentYesScale * 0.95 }}
                    onClick={handleQ3Yes}
                    className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-button-gradient text-white font-bold text-base sm:text-lg shadow-xl cursor-pointer"
                  >
                    YES ❤️
                  </motion.button>

                  {/* NO Button stays visible and clickable */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleQ3No}
                    className="px-7 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold border border-gray-300 transition-all cursor-pointer"
                  >
                    NO
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* QUIZ COMPLETED CELEBRATION */}
            {currentStep === "done" && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF758F] to-[#FFAAA6] text-white flex items-center justify-center text-3xl mx-auto shadow-lg">
                  🥰
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#E63968]">
                  I knew you had good taste. 😌❤️
                </h3>

                <p className="text-base text-[#6E3C53] font-medium">
                  Okayyy… now one last thing.
                </p>

                <div className="pt-2">
                  <button
                    onClick={onComplete}
                    className="px-8 py-3.5 rounded-full bg-button-gradient text-white font-bold text-sm sm:text-base inline-flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Go to your turn 💌</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
