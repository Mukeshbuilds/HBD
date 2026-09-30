"use client";

import { FloatingHearts } from "@/components/FloatingHearts/FloatingHearts";
import { BirthdayHero } from "@/components/BirthdayHero/BirthdayHero";
import { BirthdayMessage } from "@/components/BirthdayMessage/BirthdayMessage";
import { LoveLetter } from "@/components/LoveLetter/LoveLetter";
import { Quiz } from "@/components/Quiz/Quiz";
import { MessageBox } from "@/components/MessageBox/MessageBox";
import { FinalCelebration } from "@/components/FinalCelebration/FinalCelebration";
import { MusicControl } from "@/components/MusicControl/MusicControl";

export default function Home() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen selection:bg-[#FF85A1]/30 selection:text-[#E63968]">
      {/* Continuous Floating Hearts in Background */}
      <FloatingHearts />

      {/* Floating Music Control */}
      <MusicControl />

      {/* 1. Hero: Colorful, cheerful, birthday greeting */}
      <BirthdayHero onOpenSurprise={() => scrollTo("message")} />

      {/* 2. Birthday Message: Cute card */}
      <BirthdayMessage />

      {/* 3. Short Flirty Letter: Sweet, playful, 80-120 words */}
      <LoveLetter />

      {/* 4. Interactive Quiz: 3 questions with playful growing YES button */}
      <Quiz onComplete={() => scrollTo("textbox")} />

      {/* 5. The Text Box: "Do you like me or love me or both, and say why?? 👀" with backend email delivery */}
      <MessageBox />

      {/* 6. Final Birthday Celebration */}
      <FinalCelebration />
    </main>
  );
}
