import React from 'react';

export default function HeroCreator({ style }) {
  return (
    <div
      style={style}
      className="absolute z-25 w-[132%] max-w-[690px] transition-all duration-500 will-change-transform pointer-events-none"
    >
      {/* 1. Upper-Left Front Key Light & Soft Green Radial Lens Bloom */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] sm:w-[540px] sm:h-[540px] rounded-full border border-emerald-400/30 shadow-[0_0_170px_rgba(52,211,153,0.4)] bg-emerald-500/20 blur-3xl animate-pulse-slow pointer-events-none" />

      {/* 2. Green Rim Light Accent Glow */}
      <div className="absolute top-10 right-10 w-[280px] h-[280px] rounded-full bg-emerald-400/15 blur-2xl pointer-events-none" />

      {/* 3. Creator High-Res Image Asset (+20% size boost, centered balance, hands & camera unobstructed) */}
      <img
        src="/assets/hero-creator.png"
        alt="LaunchGremlin Creator"
        className="w-full h-auto object-contain relative z-10 drop-shadow-[-15px_25px_50px_rgba(0,0,0,0.9)] filter contrast-[1.06] brightness-[1.04]"
      />
    </div>
  );
}
