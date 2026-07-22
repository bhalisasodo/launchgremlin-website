import React from 'react';

export default function ServiceHeroBackground({ children, glowPosition = 'top-left' }) {
  return (
    <div className="relative w-full overflow-hidden bg-zinc-950 text-white select-none pt-6 pb-12">
      {/* 1. Cyber Dot Grid Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none z-0" />
      
      {/* 2. Soft Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(9,9,11,0.92)_100%)] pointer-events-none z-1" />

      {/* 3. Ambient Green Radial Glow (Customizable Position) */}
      <div
        className={`absolute w-[540px] h-[540px] bg-emerald-500/18 rounded-full blur-[140px] pointer-events-none z-1 ${
          glowPosition === 'top-left'
            ? 'top-10 left-1/4 -translate-x-1/2'
            : glowPosition === 'top-right'
            ? 'top-10 right-1/4 translate-x-1/2'
            : 'top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'
        }`}
      />

      {/* 4. Secondary Soft Lens Bloom */}
      <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-emerald-400/10 rounded-full blur-[110px] pointer-events-none z-1" />

      {/* 5. Floating Particle Specs */}
      <div className="absolute inset-0 pointer-events-none z-1">
        <span className="absolute top-20 left-1/4 w-1.5 h-1.5 rounded-full bg-emerald-400/80 blur-[1px] animate-pulse" />
        <span className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-emerald-300/60 blur-[1px] animate-pulse" style={{ animationDelay: '1s' }} />
        <span className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-emerald-400/70 blur-[1px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* 6. Children Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {children}
      </div>
    </div>
  );
}
