import React from 'react';

export default function HeroCreator({ style }) {
  return (
    <div
      style={style}
      className="absolute z-15 w-[115%] max-w-[550px] transition-all duration-500 will-change-transform pointer-events-none"
    >
      {/* Upper-Left Light Source Accent Glow behind Creator */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[440px] sm:h-[440px] rounded-full border border-emerald-400/25 shadow-[0_0_140px_rgba(52,211,153,0.3)] bg-emerald-500/15 blur-2xl animate-pulse-slow pointer-events-none" />

      {/* Creator Image Asset with Upper-Left Highlight & Soft Realist Shadow */}
      <img
        src="/assets/hero-creator.png"
        alt="LaunchGremlin Creator"
        className="w-full h-auto object-contain relative z-10 drop-shadow-[-10px_20px_45px_rgba(0,0,0,0.85)] filter contrast-[1.04] brightness-[1.02]"
      />
    </div>
  );
}
