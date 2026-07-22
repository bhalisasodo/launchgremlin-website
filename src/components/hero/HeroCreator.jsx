import React from 'react';

export default function HeroCreator({ style }) {
  return (
    <div
      style={style}
      className="absolute z-15 w-[125%] max-w-[620px] transition-all duration-500 will-change-transform pointer-events-none"
    >
      {/* Upper-Left Light Source Radial Atmosphere behind Creator */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] rounded-full border border-emerald-400/25 shadow-[0_0_160px_rgba(52,211,153,0.35)] bg-emerald-500/18 blur-3xl animate-pulse-slow pointer-events-none" />

      {/* Creator High-Res Asset with Crisp Camera & Shoulder Positioned behind Laptop */}
      <img
        src="/assets/hero-creator.png"
        alt="LaunchGremlin Creator"
        className="w-full h-auto object-contain relative z-10 drop-shadow-[-12px_22px_45px_rgba(0,0,0,0.85)] filter contrast-[1.05] brightness-[1.03]"
      />
    </div>
  );
}
