import React from 'react';

export default function HeroPhone({ style }) {
  return (
    <div
      style={style}
      className="absolute z-20 w-[38%] max-w-[195px] transform rotate-[8°] hover:rotate-[4°] transition-all duration-500 pointer-events-auto animate-float-reverse"
    >
      {/* 1. Soft Ambient Green Glow & Directional Drop Shadow */}
      <div className="absolute inset-0 bg-emerald-500/25 blur-2xl rounded-3xl pointer-events-none transform translate-x-2 translate-y-3" />

      {/* 2. Production Creator Smartphone Asset (+25% Size Boost) */}
      <div className="relative z-10 overflow-hidden rounded-2xl drop-shadow-[-15px_22px_40px_rgba(0,0,0,0.95)]">
        <img
          src="/assets/smartphones-trans.png"
          alt="LaunchGremlin Creator Smartphone"
          className="w-full h-auto object-contain"
          style={{
            maskImage: 'linear-gradient(to bottom, black 88%, transparent 98%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 88%, transparent 98%)',
          }}
        />
      </div>
    </div>
  );
}
