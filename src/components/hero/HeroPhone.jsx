import React from 'react';

export default function HeroPhone({ style }) {
  return (
    <div
      style={style}
      className="absolute z-25 w-[32%] max-w-[160px] transform rotate-[5deg] hover:rotate-[2deg] transition-all duration-500 pointer-events-auto"
    >
      {/* Soft Directional Shadow (Upper-Left Light Source) */}
      <div className="absolute inset-0 bg-black/80 blur-xl rounded-3xl pointer-events-none transform translate-x-3 translate-y-4" />

      {/* Production Smartphone Container with 35-45% Size Boost */}
      <div className="relative z-10 overflow-hidden rounded-2xl drop-shadow-[-12px_20px_35px_rgba(0,0,0,0.9)]">
        <img
          src="/assets/smartphones-trans.png"
          alt="LaunchGremlin Creator Smartphone"
          className="w-full h-auto object-contain"
          style={{
            maskImage: 'linear-gradient(to bottom, black 85%, transparent 98%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 98%)',
          }}
        />
      </div>
    </div>
  );
}
