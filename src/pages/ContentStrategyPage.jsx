import React from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import ContentStrategyHeroScene from '../components/services/ContentStrategyHeroScene';
import { Calendar, Share2, TrendingUp } from 'lucide-react';

export default function ContentStrategyPage({ onOpenBooking }) {
  return (
    <div className="space-y-20 pb-20 select-none">
      {/* Handcrafted Service Hero System */}
      <ServiceHeroBackground glowPosition="top-right">
        <ContentStrategyHeroScene onOpenBooking={onOpenBooking} />
      </ServiceHeroBackground>

      {/* 3 Creator Growth Pillars Grid — Equal Height Geometric Cards */}
      <section aria-labelledby="content-pillars-title" className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
            Audience Building Engine
          </span>
          <h2 id="content-pillars-title" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Content Growth & Distribution Systems
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            Turn content into predictable client acquisition with multi-channel distribution funnels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: 30 Days Planned & AI Optimized */}
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] transition-all duration-300 group h-full flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                30 Days Planned & AI Optimized
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                End-to-end content calendar with tested hooks, retention scripting, peak posting times, and automated publishing queues.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800/80 text-[10px] font-mono text-emerald-400 font-bold">
              ● AUTOMATED PUBLISHING QUEUE
            </div>
          </div>

          {/* Card 2: Multi-Channel Auto Distribution */}
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] transition-all duration-300 group h-full flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                Multi-Channel Distribution
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Automatically repurpose core short-form reels across TikTok, Instagram Reels, YouTube Shorts, LinkedIn, and Beehiiv.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800/80 text-[10px] font-mono text-emerald-400 font-bold">
              ● 5-PLATFORM REPURPOSING
            </div>
          </div>

          {/* Card 3: Algorithm Ready Conversion Funnels */}
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] transition-all duration-300 group h-full flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                Algorithm Ready Funnels
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Convert viral social media reach into email newsletter subscribers, lead magnet downloads, and high-ticket strategy calls.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800/80 text-[10px] font-mono text-emerald-400 font-bold">
              ● HIGH CONVERSION RETENTION
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
