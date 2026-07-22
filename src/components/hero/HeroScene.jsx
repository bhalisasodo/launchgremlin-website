import React from 'react';
import HeroCreator from './HeroCreator';
import HeroLaptop from './HeroLaptop';
import HeroPhone from './HeroPhone';
import HeroFloatingUI from './HeroFloatingUI';
import HeroAnalytics from './HeroAnalytics';

export default function HeroScene() {
  return (
    <div className="relative w-full h-[550px] sm:h-[620px] lg:h-[660px] max-w-[670px] mx-auto select-none rounded-3xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-2xl shadow-[0_0_90px_rgba(52,211,153,0.12)] overflow-hidden">
      
      {/* LAYER 1: Background Grid, Upper-Left Lighting Source, Soft Vignette & Atmospheric Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(9,9,11,0.95)_100%)] pointer-events-none z-1" />

      {/* Upper-Left Main Light Source Radial Lens Bloom */}
      <div className="absolute top-0 left-0 w-[340px] h-[340px] bg-emerald-400/12 rounded-full blur-[110px] pointer-events-none z-1" />

      {/* Soft Green Atmospheric Glow behind Creator (Strengthened Depth) */}
      <div className="absolute top-[45%] left-[38%] -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-emerald-500/18 rounded-full blur-[140px] pointer-events-none z-1" />

      {/* Faint Floating Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none z-1">
        <span className="absolute top-16 left-1/3 w-1.5 h-1.5 rounded-full bg-emerald-400/80 blur-[1px] animate-pulse" />
        <span className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-emerald-300/60 blur-[1px] animate-pulse" style={{ animationDelay: '1s' }} />
        <span className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-emerald-400/70 blur-[1px] animate-pulse" style={{ animationDelay: '2s' }} />
        <span className="absolute bottom-24 right-1/3 w-2 h-2 rounded-full bg-emerald-400/90 blur-[1px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* LAYER 2: Curved Decorative Connection Line (Flows from headline & smoothly fades near creator) */}
      <div className="absolute inset-0 pointer-events-none z-2">
        <svg className="w-full h-full" viewBox="0 0 670 660" fill="none">
          <path
            d="M 0 260 C 190 240, 250 390, 440 290 C 520 240, 580 170, 670 130"
            stroke="url(#sceneFlowLineGradient)"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="animate-pulse"
            opacity="0.65"
          />
          <defs>
            <linearGradient id="sceneFlowLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* LAYER 3: Creator Focal Point (Primary Visual Element, -5% size, full camera & hands visibility) */}
      <HeroCreator style={{ left: '-48px', bottom: '-15px' }} />

      {/* LAYER 4: Smartphone (Primary Secondary Focal Point, +35-45% size boost, right 75px, top 135px) */}
      <HeroPhone style={{ right: '75px', top: '135px' }} />

      {/* LAYER 5: Laptop (Foreground Element Closest to Visitor, +12-15% size boost, right 65px, bottom 45px) */}
      <HeroLaptop style={{ right: '65px', bottom: '45px' }} />

      {/* LAYER 6: Floating Analytics Cards (Audience Growth +3°, Engagement Rate -2°) */}
      <HeroAnalytics />

      {/* LAYER 7: Floating Notification & Metric Cards (New Follower -2°, Views -1°, Likes +2°) */}
      <HeroFloatingUI />

      {/* LAYER 8: Foreground Atmosphere Glow */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-45" />
    </div>
  );
}
