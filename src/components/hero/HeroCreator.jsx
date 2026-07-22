import React from 'react';

export default function HeroCreator({ style }) {
  return (
    <div
      style={style}
      className="absolute z-10 w-[112%] max-w-[540px] transition-all duration-500 will-change-transform pointer-events-none"
    >
      {/* Radial Green Glow behind Creator for crisp background separation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] rounded-full border border-emerald-400/30 shadow-[0_0_120px_rgba(52,211,153,0.35)] bg-emerald-400/10 blur-xl animate-pulse-slow pointer-events-none" />

      {/* Creator Handcrafted Artwork Image */}
      <img
        src="/assets/hero-creator.png"
        alt="LaunchGremlin Creator"
        className="w-full h-auto object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] filter contrast-[1.05]"
      />
    </div>
  );
}
