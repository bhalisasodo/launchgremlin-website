import React from 'react';
import HeroCreator from './HeroCreator';
import HeroLaptop from './HeroLaptop';
import HeroPhone from './HeroPhone';
import HeroFloatingUI from './HeroFloatingUI';
import HeroAnalytics from './HeroAnalytics';

export default function HeroScene() {
  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto flex items-center justify-center select-none overflow-visible">
      {/* Background Cyber Space Grid */}
      <div className="absolute inset-0 bg-zinc-900/60 rounded-3xl border border-zinc-800/80 backdrop-blur-2xl shadow-[0_0_60px_rgba(52,211,153,0.1)] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
      </div>

      {/* Layer 01: Creator Focal Anchor */}
      <HeroCreator />

      {/* Layer 02: Tilted Product Laptop */}
      <HeroLaptop />

      {/* Layer 03: Floating Foreground Smartphone */}
      <HeroPhone />

      {/* Layer 04: Glassmorphic Product UI Badges & Sticky Note */}
      <HeroFloatingUI />

      {/* Layer 05: Audience Growth & Engagement Analytics Widgets */}
      <HeroAnalytics />
    </div>
  );
}
