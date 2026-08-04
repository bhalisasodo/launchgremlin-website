import React from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import AIConsultingHeroScene from '../components/services/AIConsultingHeroScene';
import { Bot, Workflow, Database } from 'lucide-react';

export default function AIConsultingPage({ onOpenBooking }) {
  return (
    <div className="space-y-20 pb-20 select-none">
      {/* Handcrafted Service Hero System */}
      <ServiceHeroBackground glowPosition="top-left">
        <AIConsultingHeroScene onOpenBooking={onOpenBooking} />
      </ServiceHeroBackground>

      {/* AI Solutions Grid — Equal Height Geometric Cards */}
      <section aria-labelledby="ai-solutions-title" className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
            Enterprise AI Systems
          </span>
          <h2 id="ai-solutions-title" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Autonomous AI & Workflow Infrastructure
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            Custom AI solutions built to eliminate operational friction, automate client onboarding, and save hundreds of hours monthly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] transition-all duration-300 group h-full flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                Autonomous AI Agents
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Custom AI agents that handle lead qualification, customer onboarding, research lookups, and content generation 24/7.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800/80 text-[10px] font-mono text-emerald-400 font-bold">
              ● 24/7 AUTONOMOUS EXECUTION
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] transition-all duration-300 group h-full flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                Operational Workflows
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Connect your CRM, database, Slack, and email systems into seamless, automated pipeline triggers.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800/80 text-[10px] font-mono text-emerald-400 font-bold">
              ● ZERO MANUAL FRICTION
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] transition-all duration-300 group h-full flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                Knowledge Base RAG
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Convert company documentation, PDFs, and internal databases into intelligent vector search systems.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800/80 text-[10px] font-mono text-emerald-400 font-bold">
              ● SECURE VECTOR PIPELINE
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
