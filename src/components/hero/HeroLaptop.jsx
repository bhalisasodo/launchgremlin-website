import React from 'react';

export default function HeroLaptop() {
  return (
    <div className="absolute bottom-0 right-0 sm:right-4 z-20 w-[85%] max-w-[460px] transform -rotate-2 hover:rotate-0 transition-transform duration-500 will-change-transform pointer-events-auto">
      {/* Soft Glow Under Laptop */}
      <div className="absolute inset-0 bg-emerald-400/20 blur-2xl rounded-full pointer-events-none" />

      {/* Production Laptop Asset */}
      <img
        src="/assets/laptop-transparent.png"
        alt="LaunchGremlin Studio Laptop"
        className="w-full h-auto object-contain relative z-10 drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
      />
    </div>
  );
}
