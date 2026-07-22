import React from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import AIConsultingHeroScene from '../components/services/AIConsultingHeroScene';
import { Bot, Workflow, Database } from 'lucide-react';

export default function AIConsultingPage({ onOpenBooking }) {
  return (
    <div className="space-y-20 pb-20">
      {/* Handcrafted Service Hero System */}
      <ServiceHeroBackground glowPosition="top-left">
        <AIConsultingHeroScene onOpenBooking={onOpenBooking} />
      </ServiceHeroBackground>

      {/* AI Solutions Grid */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 hover:border-emerald-400/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Autonomous AI Agents</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Custom AI agents that handle lead qualification, customer onboarding, research lookups, and content generation.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 hover:border-emerald-400/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Workflow className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Operational Workflows</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Connect your CRM, database, Slack, and email systems into seamless, automated pipeline triggers.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 hover:border-emerald-400/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Knowledge Base RAG</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Convert company documentation, PDFs, and internal databases into intelligent vector search systems.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
