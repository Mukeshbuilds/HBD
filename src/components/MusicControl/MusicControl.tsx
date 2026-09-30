"use client";

import { useBackgroundMusic } from "@/hooks/useSound";
import { Music } from "lucide-react";
import { useState } from "react";

export function MusicControl() {
  const { isPlaying, toggleMusic, hasCustomAudio } = useBackgroundMusic();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative flex items-center">
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-white/95 text-xs text-[#E63968] font-medium whitespace-nowrap shadow-lg border border-pink-200 pointer-events-none transition-all">
            {isPlaying
              ? "Pause music"
              : hasCustomAudio
              ? "Play birthday music ♪"
              : "Play gentle ambient chimes ♪"}
          </div>
        )}

        <button
          onClick={toggleMusic}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label={isPlaying ? "Mute audio" : "Play music"}
          className={`relative p-3.5 rounded-full border transition-all duration-300 shadow-xl cursor-pointer group flex items-center justify-center ${
            isPlaying
              ? "border-pink-300 bg-gradient-to-r from-[#FF758F] to-[#FFAAA6] text-white shadow-pink-300/50"
              : "bg-white/90 border-pink-200 text-[#E63968] hover:bg-pink-50"
          }`}
        >
          {isPlaying ? (
            <div className="flex items-center gap-0.5 h-4 w-4 justify-center">
              <span className="w-[2px] h-3 bg-white rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-[2px] h-4 bg-white rounded-full animate-[pulse_1.1s_ease-in-out_infinite_0.2s]" />
              <span className="w-[2px] h-2.5 bg-white rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" />
            </div>
          ) : (
            <Music className="w-4 h-4 text-[#E63968] group-hover:scale-110 transition-transform" />
          )}

          {/* Glowing pulse ring when playing */}
          {isPlaying && (
            <span className="absolute -inset-1 rounded-full border border-pink-400/40 animate-ping pointer-events-none" />
          )}
        </button>
      </div>
    </div>
  );
}
