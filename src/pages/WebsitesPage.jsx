import React from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import WebsitesHeroScene from '../components/services/WebsitesHeroScene';
import PricingSection from '../components/common/PricingSection';
import { Gauge, Code, Zap } from 'lucide-react';

export default function WebsitesPage({ onOpenBooking }) {
  return (
    <div className="space-y-20 pb-20 select-none">
      {/* Handcrafted Service Hero System */}
      <ServiceHeroBackground glowPosition="top-left">
        <WebsitesHeroScene onOpenBooking={onOpenBooking} />
      </ServiceHeroBackground>

      {/* Feature Grid */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 hover:border-emerald-400/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Gauge className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">100 Lighthouse Performance</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Sub-second page loading speeds, optimized asset pipelines, and zero layout shifts for flawless Core Web Vitals.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 hover:border-emerald-400/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Modern Modular Stack</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Built with React 18, Vite, Next.js, and TailwindCSS v4. Scalable, maintainable, and completely future-proof.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 hover:border-emerald-400/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Conversion Architecture</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Every layout decision is guided by UX data, clear hierarchy, and high-converting calls to action.
            </p>
          </div>
        </div>
      </section>

      {/* AI-NATIVE PRICING SECTION */}
      <PricingSection onOpenBooking={onOpenBooking} />
    </div>
  );
}
