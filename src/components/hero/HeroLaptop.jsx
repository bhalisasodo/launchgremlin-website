import React from 'react';

export default function HeroLaptop({ style }) {
  return (
    <div
      style={style}
      className="absolute z-20 w-[68%] max-w-[370px] transform -rotate-[6deg] hover:-rotate-[3deg] transition-all duration-500 will-change-transform pointer-events-auto"
    >
      {/* Laptop Glow & Ground Shadow */}
      <div className="absolute inset-0 bg-emerald-400/20 blur-2xl rounded-full pointer-events-none" />

      {/* Production Laptop Container with Strict Dark Gradient Bottom Mask to prevent any checkerboard pattern */}
      <div className="relative z-10 overflow-hidden rounded-2xl">
        <img
          src="/assets/laptop-transparent.png"
          alt="LaunchGremlin Studio Laptop"
          className="w-full h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
          style={{
            maskImage: 'linear-gradient(to bottom, black 70%, transparent 98%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 98%)',
          }}
        />
        {/* Soft Bottom Shadow Vignette Mask */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
