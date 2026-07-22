import React from 'react';

export default function HeroPhone({ style }) {
  return (
    <div
      style={style}
      className="absolute z-25 w-[28%] max-w-[150px] transform rotate-[6deg] hover:rotate-[2deg] transition-all duration-500 pointer-events-auto"
    >
      {/* Smartphone Ambient Shadow */}
      <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-2xl pointer-events-none" />

      <img
        src="/assets/smartphones.png"
        alt="LaunchGremlin Creator Smartphone"
        className="w-full h-auto object-contain relative z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
      />
    </div>
  );
}
