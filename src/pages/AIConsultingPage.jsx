import React from 'react';
import { Bot, ArrowRight, Cpu, Zap, CheckCircle, Database, Workflow, ShieldCheck, Sparkles } from 'lucide-react';

export default function AIConsultingPage({ onOpenBooking }) {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="pt-16 max-w-5xl mx-auto px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono">
          <Bot className="w-3.5 h-3.5" />
          <span>Pillar 03 — Custom AI Consulting & Workflows</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Automate Operations with Custom AI Agents. <br />
          <span className="text-emerald-400 italic">Save 100+ Hours Every Month.</span>
        </h1>

        <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Don&apos;t settle for basic ChatGPT prompts. We engineer custom AI agents, fine-tuned RAG pipelines, and automated LLM workflows tailored to your business operations.
        </p>

        <div className="pt-4 flex justify-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-bold text-sm shadow-[0_0_25px_rgba(52,211,153,0.35)] hover:bg-emerald-300 transition-all"
          >
            <span>Book AI Audit Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* AI Solutions Grid */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Autonomous AI Agents</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Custom AI agents that handle lead qualification, customer onboarding, research lookups, and content generation.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Workflow className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Operational Workflows</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Connect your CRM, database, Slack, and email systems into seamless, automated pipeline triggers.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
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
