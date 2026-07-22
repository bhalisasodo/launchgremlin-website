import React from 'react';

export default function HeroLaptop({ style }) {
  return (
    <div
      style={style}
      className="absolute z-25 w-[54%] max-w-[315px] transform -rotate-[5deg] hover:-rotate-[2deg] transition-all duration-500 will-change-transform pointer-events-auto"
    >
      {/* Realist Diffused Directional Ground Shadow (Light from Upper-Left) */}
      <div className="absolute inset-x-2 bottom-[-10px] h-12 bg-black/80 blur-xl rounded-full pointer-events-none transform translate-x-4 translate-y-2" />

      {/* Production Laptop Asset Container with New High-Res Transparent Image */}
      <div className="relative z-10 overflow-hidden rounded-2xl">
        <img
          src="/assets/laptop-trans.png"
          alt="LaunchGremlin Studio Laptop"
          className="w-full h-auto object-contain drop-shadow-[-15px_20px_40px_rgba(0,0,0,0.9)]"
          style={{
            maskImage: 'linear-gradient(to bottom, black 70%, transparent 98%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 98%)',
          }}
        />
        {/* Soft Shadow Vignette Mask for Seamless Lighting Blend */}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
