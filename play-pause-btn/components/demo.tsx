"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/utlis/utils";

// Original constants - preserved as requested
const PAUSE = {
  left: "M5 5L9 5L9 19L5 19Z",
  right: "M15 5L19 5L19 19L15 19Z",
} as const;

const PLAY = {
  left: "M7 5L13 8.5L13 15.5L7 19Z",
  right: "M13 8.5L19 12L19 12L13 15.5Z",
} as const;

const TRANSITION = {
  type: "spring" as const,
  stiffness: 360,
  damping: 40,
};

interface PlayPauseButtonProps {
  theme?: "light" | "dark";
}

const PlayPauseButton = ({ theme = "light" }: PlayPauseButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const target = isPlaying ? PLAY : PAUSE;

  return (
    <button
      className={cn(
        "glass-button group/btn relative w-24 h-24 rounded-full flex items-center justify-center cursor-pointer overflow-hidden",
        theme === "light" ? "text-neutral-600" : "text-white"
      )}
      onClick={() => setIsPlaying(!isPlaying)}
      aria-label={isPlaying ? "Play" : "Pause"}
    >
      {/* Glossy highlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinejoin="round"
        strokeLinecap="round"
        className="relative z-10"
      >
        <motion.path
          initial={false}
          animate={{ d: target.left }}
          transition={TRANSITION}
        />
        <motion.path
          initial={false}
          animate={{ d: target.right }}
          transition={TRANSITION}
        />
      </svg>
    </button>
  );
};

const Demo = () => {
  return (
    <div className="font-sans h-screen mesh-gradient text-white p-6 md:p-12 flex flex-col items-center justify-center gap-12 md:gap-16 overflow-x-hidden selection:bg-white/30">
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl animate-in fade-in zoom-in-95 duration-1000 delay-200">
        {/* Light Context Card */}
        <div className="relative h-[400px] rounded-[2rem] overflow-hidden group/card shadow-2xl shadow-black/10">
          <img
            src="https://images.unsplash.com/photo-1542349314-b0ceb4d90f2d?auto=format&w=800&q=80"
            alt="Sunny clouds - Billy Huynh"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-white/10 backdrop-brightness-110" />
          <div className="relative h-full flex flex-col items-center justify-center gap-6">
            <span className="text-black/50 font-bold text-xs tracking-[0.3em] uppercase">
              Light Context
            </span>
            <PlayPauseButton theme="light" />
          </div>
        </div>

        {/* Dark Context Card */}
        <div className="relative h-[400px] rounded-[2rem] overflow-hidden group/card shadow-2xl shadow-black/20">
          <img
            src="https://images.unsplash.com/photo-1687844599821-e0eceea6f6a1?auto=format&w=800&q=80"
            alt="Dark abstract neon - Jatin Gajjar"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full flex flex-col items-center justify-center gap-6">
            <span className="text-white/40 font-bold text-xs tracking-[0.3em] uppercase">
              Dark Context
            </span>
            <PlayPauseButton theme="dark" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
