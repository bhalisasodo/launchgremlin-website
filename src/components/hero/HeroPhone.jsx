import React from 'react';

export default function HeroPhone({ style }) {
  return (
    <div
      style={style}
      className="absolute z-28 w-[20%] max-w-[110px] transform rotate-[5deg] hover:rotate-[2deg] transition-all duration-500 pointer-events-auto"
    >
      {/* Soft Directional Shadow (Upper-Left Light Source) */}
      <div className="absolute inset-0 bg-black/70 blur-lg rounded-2xl pointer-events-none transform translate-x-2 translate-y-3" />

      {/* Production Transparent Phone Container */}
      <div className="relative z-10 overflow-hidden rounded-xl">
        <img
          src="/assets/smartphones-trans.png"
          alt="LaunchGremlin Creator Smartphone"
          className="w-full h-auto object-contain drop-shadow-[-10px_15px_25px_rgba(0,0,0,0.85)]"
          style={{
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 98%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 98%)',
          }}
        />
      </div>
    </div>
  );
}
