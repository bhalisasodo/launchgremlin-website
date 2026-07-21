import React from 'react';
import { TrendingUp, ArrowRight, CheckCircle, Video, Target, BarChart2, Share2, Sparkles, Users } from 'lucide-react';

export default function ContentStrategyPage({ onOpenBooking }) {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="pt-16 max-w-5xl mx-auto px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Pillar 02 — Content Strategy & Audience Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Turn Content Into a Repeatable Growth Engine. <br />
          <span className="text-emerald-400 italic">Build Trust. Drive Distribution. Scale Revenue.</span>
        </h1>

        <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Posting random content without strategy wastes time. We build data-informed content funnels and creator growth frameworks that turn attention into high-value customer relationships.
        </p>

        <div className="pt-4 flex justify-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-bold text-sm shadow-[0_0_25px_rgba(52,211,153,0.35)] hover:bg-emerald-300 transition-all"
          >
            <span>Launch Content Engine</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3 Growth Pillars */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Audience Positioning</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Clarify your unique voice, target demographic, and core messaging framework to stand out in noisy markets.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Multi-Channel Distribution</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Repurpose core content pillar assets across YouTube, X/Twitter, LinkedIn, and newsletters automatically.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
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
