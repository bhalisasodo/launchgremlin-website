import React from 'react';
import HeroCreator from './HeroCreator';
import HeroLaptop from './HeroLaptop';
import HeroPhone from './HeroPhone';
import HeroFloatingUI from './HeroFloatingUI';
import HeroAnalytics from './HeroAnalytics';

export default function HeroScene() {
  return (
    <div className="relative w-full h-[550px] sm:h-[620px] lg:h-[660px] max-w-[670px] mx-auto select-none rounded-3xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-2xl shadow-[0_0_90px_rgba(52,211,153,0.12)] overflow-hidden">
      
      {/* LAYER 1: Back Layer — Cyber Grid, Ambient Glow, Soft Vignette & Atmospheric Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(9,9,11,0.95)_100%)] pointer-events-none z-1" />

      {/* Upper-Left Key Light Source Radial Bloom */}
      <div className="absolute top-0 left-0 w-[360px] h-[360px] bg-emerald-400/14 rounded-full blur-[110px] pointer-events-none z-1" />

      {/* Soft Green Atmospheric Glow behind Creator Center */}
      <div className="absolute top-[45%] left-[42%] -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none z-1" />

      {/* Faint Floating Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none z-1">
        <span className="absolute top-16 left-1/3 w-1.5 h-1.5 rounded-full bg-emerald-400/80 blur-[1px] animate-pulse" />
        <span className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-emerald-300/60 blur-[1px] animate-pulse" style={{ animationDelay: '1s' }} />
        <span className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-emerald-400/70 blur-[1px] animate-pulse" style={{ animationDelay: '2s' }} />
        <span className="absolute bottom-24 right-1/3 w-2 h-2 rounded-full bg-emerald-400/90 blur-[1px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* LAYER 2: Curved Flowing Line (Begins near GROW in headline, connects into right-hand artwork ending near tablet analytics) */}
      <div className="absolute inset-0 pointer-events-none z-2">
        <svg className="w-full h-full" viewBox="0 0 670 660" fill="none">
          <path
            d="M 0 250 C 180 230, 260 380, 480 320 C 540 280, 580 420, 620 500"
            stroke="url(#heroSceneFlowLineGradient)"
            strokeWidth="2.5"
            strokeDasharray="6 5"
            className="animate-pulse"
            opacity="0.75"
          />
          <circle cx="620" cy="500" r="4" fill="#34d399" className="animate-ping" />
          <defs>
            <linearGradient id="heroSceneFlowLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* LAYER 3: Middle Layer — Analytics Cards (z-15) & Smartphone (z-20) */}
      <HeroAnalytics />
      <HeroPhone style={{ right: '45px', top: '75px' }} />

      {/* LAYER 4: Front Layer — Creator Visual Anchor (+20% size boost, centered balance, z-25) */}
      <HeroCreator style={{ left: '-15px', bottom: '0px' }} />

      {/* LAYER 5: Front-Most Layer — Tablet (-35% size, -8° tilt, bottom-right corner, z-35, overlapping creator lower torso) */}
      <HeroLaptop style={{ right: '25px', bottom: '20px' }} />

      {/* LAYER 6: Floating Layer — Metric Chips & Social Stack Sidebar (z-40) */}
      <HeroFloatingUI />

      {/* LAYER 7: Foreground Atmosphere Glow Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-45" />
    </div>
  );
}
