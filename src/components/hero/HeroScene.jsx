import React from 'react';
import HeroCreator from './HeroCreator';
import HeroLaptop from './HeroLaptop';
import HeroPhone from './HeroPhone';
import HeroFloatingUI from './HeroFloatingUI';
import HeroAnalytics from './HeroAnalytics';

export default function HeroScene() {
  return (
    <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] max-w-[620px] mx-auto select-none rounded-3xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-2xl shadow-[0_0_80px_rgba(52,211,153,0.1)] overflow-hidden">
      
      {/* LAYER 1: Background Grid, Upper-Left Lighting Source, Soft Vignette & Atmospheric Bloom */}
      <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(9,9,11,0.9)_100%)] pointer-events-none z-1" />

      {/* Upper-Left Main Light Source Radial Lens Bloom */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none z-1" />

      {/* Soft Green Atmospheric Glow behind Creator */}
      <div className="absolute top-[45%] left-[38%] -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] bg-emerald-500/15 rounded-full blur-[130px] pointer-events-none z-1" />

      {/* Faint Floating Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none z-1">
        <span className="absolute top-16 left-1/3 w-1.5 h-1.5 rounded-full bg-emerald-400/80 blur-[1px] animate-pulse" />
        <span className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-emerald-300/60 blur-[1px] animate-pulse" style={{ animationDelay: '1s' }} />
        <span className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-emerald-400/70 blur-[1px] animate-pulse" style={{ animationDelay: '2s' }} />
        <span className="absolute bottom-24 right-1/3 w-2 h-2 rounded-full bg-emerald-400/90 blur-[1px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* LAYER 2: Decorative Connection Line (Flowing seamlessly from left headline) */}
      <div className="absolute inset-0 pointer-events-none z-2">
        <svg className="w-full h-full" viewBox="0 0 600 600" fill="none">
          <path
            d="M 0 250 C 180 230, 240 380, 420 280 C 500 230, 550 160, 600 120"
            stroke="url(#sceneFlowLineGradient)"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="animate-pulse"
            opacity="0.5"
          />
          <defs>
            <linearGradient id="sceneFlowLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* LAYER 3: Creator (Visual Focal Point — Upper body and face 100% visible & unobscured) */}
      <HeroCreator style={{ left: '-15px', bottom: '-15px' }} />

      {/* LAYER 4: Laptop & Phone (Framing elements in front of creator, size -20%, rotated -5° / +6°) */}
      <HeroLaptop style={{ right: '15px', bottom: '15px' }} />
      <HeroPhone style={{ right: '35px', top: '150px' }} />

      {/* LAYER 5: Floating Analytics & Notification Cards (Organic rotations -2°, +3°, -1°, +2°, -2°) */}
      <HeroAnalytics />
      <HeroFloatingUI />

      {/* Decorative Foreground Lens Glow */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-45" />
    </div>
  );
}
