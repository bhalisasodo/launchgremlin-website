import React from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import WebsitesHeroScene from '../components/services/WebsitesHeroScene';
import { Gauge, Code, Zap, CheckCircle } from 'lucide-react';

export default function WebsitesPage({ onOpenBooking }) {
  return (
    <div className="space-y-20 pb-20">
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

      {/* Package Roadmap */}
      <section className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold text-white">Transparent Build Tiers</h2>
          <p className="text-xs text-zinc-400 font-mono">No hidden agency fees. Clear deliverables.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier 1 */}
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Starter</span>
              <h4 className="text-2xl font-bold text-white">Fast-Track Launch</h4>
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">R12,500</span>
              <p className="text-xs text-zinc-400 font-light">Ideal for creators and startups needing a high-impact web presence quickly.</p>
              <ul className="space-y-2 text-xs text-zinc-300 font-mono">
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Custom 1-3 Page React App</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Mobile Responsive</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Lead Capture Integration</li>
              </ul>
            </div>
            <button onClick={onOpenBooking} className="w-full py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-white hover:border-emerald-400 transition-all">
              Choose Starter
            </button>
          </div>

          {/* Tier 2 */}
          <div className="p-8 rounded-3xl bg-zinc-900/90 border-2 border-emerald-400/50 shadow-[0_0_30px_rgba(52,211,153,0.2)] space-y-6 flex flex-col justify-between relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-400 text-zinc-950 font-bold text-[10px] uppercase font-mono">
              Most Popular
            </span>
            <div className="space-y-4">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">Pro Scale</span>
              <h4 className="text-2xl font-bold text-white">Custom Growth Platform</h4>
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">R28,000</span>
              <p className="text-xs text-zinc-400 font-light">Complete multi-page web platform with CMS integration and custom UI animations.</p>
              <ul className="space-y-2 text-xs text-zinc-300 font-mono">
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Up to 8 Custom Pages</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Full SEO & Analytics Setup</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> CMS / Blog Scaffold</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Custom Motion & FX</li>
              </ul>
            </div>
            <button onClick={onOpenBooking} className="w-full py-3 rounded-xl bg-emerald-400 text-zinc-950 font-bold text-xs hover:bg-emerald-300 transition-all">
              Choose Pro Scale
            </button>
          </div>

          {/* Tier 3 */}
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Enterprise</span>
              <h4 className="text-2xl font-bold text-white">Full Product Engineering</h4>
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">R55,000+</span>
              <p className="text-xs text-zinc-400 font-light">Custom web applications, dashboards, API backends, and multi-tenant systems.</p>
              <ul className="space-y-2 text-xs text-zinc-300 font-mono">
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Custom Full-Stack Architecture</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Auth & Database Integrations</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> AI Agent / LLM Pipelines</li>
              </ul>
            </div>
            <button onClick={onOpenBooking} className="w-full py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-white hover:border-emerald-400 transition-all">
              Request Enterprise Scope
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
