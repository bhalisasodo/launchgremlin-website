import React from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import ContentStrategyHeroScene from '../components/services/ContentStrategyHeroScene';
import { Target, Share2, BarChart2 } from 'lucide-react';

export default function ContentStrategyPage({ onOpenBooking }) {
  return (
    <div className="space-y-20 pb-20">
      {/* Handcrafted Service Hero System */}
      <ServiceHeroBackground glowPosition="top-right">
        <ContentStrategyHeroScene onOpenBooking={onOpenBooking} />
      </ServiceHeroBackground>

      {/* 3 Growth Pillars Grid */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 hover:border-emerald-400/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Audience Positioning</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Clarify your unique voice, target demographic, and core messaging framework to stand out in noisy markets.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 hover:border-emerald-400/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Multi-Channel Distribution</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Repurpose core content pillar assets across YouTube, TikTok, Instagram, LinkedIn, and newsletters automatically.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 hover:border-emerald-400/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">ROI & Conversion Funnels</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Guide social media impressions into email lead magnets, strategy call bookings, and digital product sales.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
