import React from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import WebsitesHeroScene from '../components/services/WebsitesHeroScene';
import PricingSection from '../components/common/PricingSection';
import { Gauge, Search, Zap } from 'lucide-react';

export default function WebsitesPage({ onOpenBooking, onSelectTab }) {
  return (
    <div className="space-y-20 pb-20 select-none">
      {/* Handcrafted Service Hero System */}
      <ServiceHeroBackground glowPosition="top-left">
        <WebsitesHeroScene onOpenBooking={onOpenBooking} />
      </ServiceHeroBackground>

      {/* Feature Grid — Outcome-Driven Value Pillars (Equal Height Geometry) */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Lightning Fast Performance */}
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] transition-all duration-300 group h-full flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                Lightning Fast Performance
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Sub-second page load speeds (0.24s FCP), optimized asset pipelines, and zero layout shifts for 100/100 Core Web Vitals score.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800/80 text-[10px] font-mono text-emerald-400 font-bold">
              ● 100/100 LIGHTHOUSE SCORE
            </div>
          </div>

          {/* Card 2: Optimized for Google */}
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] transition-all duration-300 group h-full flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                Optimized for Google
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Automated schema metadata, clean semantic HTML5 markup, and edge-rendered indexing that ranks higher in search results.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800/80 text-[10px] font-mono text-emerald-400 font-bold">
              ● AUTOMATED SEARCH INDEXING
            </div>
          </div>

          {/* Card 3: Built to Convert */}
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] transition-all duration-300 group h-full flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                Built to Convert
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Every layout decision is guided by UX conversion telemetry, clear CTA hierarchy, and lead capture integration.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800/80 text-[10px] font-mono text-emerald-400 font-bold">
              ● CONVERSION TELEMETRY
            </div>
          </div>

        </div>
      </section>

      {/* AI-NATIVE PRICING SECTION */}
      <PricingSection onOpenBooking={onOpenBooking} onSelectTab={onSelectTab} />
    </div>
  );
}
