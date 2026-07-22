import React from 'react';

export default function HeroPhone() {
  return (
    <div className="absolute top-1/4 right-2 sm:right-8 z-30 w-[35%] max-w-[200px] transform rotate-6 animate-pulse-slow transition-transform duration-500 hover:scale-105 pointer-events-auto">
      {/* Smartphone Floating Shadow */}
      <div className="absolute inset-0 bg-emerald-400/25 blur-xl rounded-2xl pointer-events-none" />

      {/* Production Smartphone Asset */}
      <img
        src="/assets/smartphones.png"
        alt="LaunchGremlin Creator Smartphone"
        className="w-full h-auto object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
      />
    </div>
  );
}
