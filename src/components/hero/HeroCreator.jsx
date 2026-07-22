import React from 'react';

export default function HeroCreator() {
  return (
    <div className="relative z-10 w-full max-w-[480px] mx-auto transition-transform duration-500 hover:scale-[1.02]">
      {/* Neon Green Ambient Ring Glow Behind Creator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border-2 border-emerald-400/40 shadow-[0_0_80px_rgba(52,211,153,0.35)] bg-emerald-400/5 animate-pulse-slow pointer-events-none" />

      {/* Production Creator Image Asset */}
      <img
        src="/assets/hero-creator.png"
        alt="LaunchGremlin Creator"
        className="w-full h-auto object-contain relative z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
      />
    </div>
  );
}
