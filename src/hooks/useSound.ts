"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function useBackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSynthPlaying, setIsSynthPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Soft ambient chime synthesizer fallback (gentle pentatonic scale in C Major: C4, E4, G4, A4, B4, C5)
  const playSoftChime = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const notes = [261.63, 329.63, 392.0, 440.0, 493.88, 523.25, 659.25];
      const note = notes[Math.floor(Math.random() * notes.length)];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(note, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 2.6);
    } catch {
      // AudioContext unavailable or blocked
    }
  }, []);

  const startSynthMelody = useCallback(() => {
    setIsSynthPlaying(true);
    playSoftChime();
    synthIntervalRef.current = setInterval(() => {
      playSoftChime();
    }, 1800);
  }, [playSoftChime]);

  const stopSynthMelody = useCallback(() => {
    setIsSynthPlaying(false);
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Check if audio file exists or handle errors gracefully
    const audio = new Audio("/music/birthday.mp3");
    audio.loop = true;
    audio.preload = "none";
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      // If /music/birthday.mp3 is not found, don't crash
      setHasError(true);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
      stopSynthMelody();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stopSynthMelody]);

  const toggleMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (isPlaying || isSynthPlaying) {
      if (audio) audio.pause();
      stopSynthMelody();
      setIsPlaying(false);
      return;
    }

    if (audio && !hasError) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // If file not found or failed, fallback to peaceful ambient chime
        startSynthMelody();
        setIsPlaying(true);
      }
    } else {
      startSynthMelody();
      setIsPlaying(true);
    }
  }, [isPlaying, isSynthPlaying, hasError, startSynthMelody, stopSynthMelody]);

  return {
    isPlaying: isPlaying || isSynthPlaying,
    toggleMusic,
    hasCustomAudio: !hasError,
  };
}
