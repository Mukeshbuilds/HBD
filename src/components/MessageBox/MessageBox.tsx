"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayData } from "@/data/birthday";
import { Heart, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { triggerBirthdayConfetti, triggerGentleHeartBurst } from "@/lib/confetti";

export function MessageBox() {
  const { messageBox } = birthdayData;
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const charCount = message.length;
  const minChars = 3;
  const maxChars = 1500;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim().length < minChars) {
      setErrorMessage("Please type a little something before sending! 🥺");
      return;
    }

    setErrorMessage(null);
    setStatus("loading");

    try {
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        triggerBirthdayConfetti();
      } else {
        setErrorMessage(data.error || "Could not send right now. Please try again.");
        setStatus("idle");
      }
    } catch {
      // In case of network interruption, show friendly message
      setErrorMessage("Network issue. Please try once more!");
      setStatus("idle");
    }
  };

  return (
    <section id="textbox" className="relative py-16 sm:py-24 px-5 z-10">
      <div className="max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {status !== "success" ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="romantic-card p-7 sm:p-10 bg-white/95 border-2 border-pink-200 shadow-xl relative"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] font-bold text-[#E63968] mb-2 bg-pink-100/70 px-3 py-1 rounded-full">
                  {messageBox.heading}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A2838] mb-2">
                  {messageBox.question}
                </h2>
                <p className="text-xs sm:text-sm text-[#8E4A68] font-medium">
                  {messageBox.hint}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder={messageBox.placeholder}
                    maxLength={maxChars}
                    disabled={status === "loading"}
                    className="w-full p-4 rounded-2xl bg-[#FFF9FA] border-2 border-pink-200 focus:border-[#FF6584] focus:outline-none focus:ring-4 focus:ring-pink-100 text-[#4A2838] placeholder-pink-300 text-sm sm:text-base resize-none transition-all"
                  />

                  {/* Character Counter & Heart icon */}
                  <div className="flex items-center justify-between text-xs text-[#B85B7A] px-1 mt-1.5 font-medium">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-[#FF85A1] text-[#FF85A1]" />
                      <span>{charCount} / {maxChars}</span>
                    </span>
                    {charCount < minChars && charCount > 0 && (
                      <span className="text-[#E63968]">A few more words...</span>
                    )}
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-xs text-[#E63968] text-center font-medium">
                    {errorMessage}
                  </p>
                )}

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading" || message.trim().length < minChars}
                    className="w-full sm:w-auto px-10 py-4 rounded-full bg-button-gradient text-white font-bold text-base shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer inline-flex items-center justify-center gap-2.5"
                  >
                    {status === "loading" ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <span>{messageBox.sendingText}</span>
                      </>
                    ) : (
                      <>
                        <span>{messageBox.buttonText}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            /* SUCCESS CONFIRMATION STATE */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="romantic-card p-8 sm:p-12 text-center bg-white/95 border-2 border-pink-300 shadow-2xl relative space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-pink-100 text-[#E63968] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-[#E63968] bg-pink-50 px-3.5 py-1.5 rounded-full border border-pink-200">
                {messageBox.successBadge}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A2838] leading-relaxed">
                {messageBox.successMessage}
              </h3>

              <p className="text-base sm:text-lg text-[#E63968] font-serif italic">
                {messageBox.thankYouText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
