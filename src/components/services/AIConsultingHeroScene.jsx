import React from 'react';
import {
  Bot, ArrowRight, Workflow, Database, Cpu, Zap, CheckCircle, ShieldCheck, Sparkles, Network, RefreshCw, Clock
} from 'lucide-react';

export default function AIConsultingHeroScene({ onOpenBooking }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 pb-12">
      {/* LEFT COLUMN — Value Proposition & Action CTAs */}
      <div className="lg:col-span-6 space-y-6">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-400/40 text-emerald-400 text-xs font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(52,211,153,0.2)]">
          <Bot className="w-3.5 h-3.5 fill-current" />
          <span>PILLAR 03 — CUSTOM AI CONSULTING & WORKFLOWS</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] uppercase">
          AI SYSTEMS THAT WORK <br />
          <span className="relative inline-block text-emerald-400">
            WHILE YOU SLEEP.
            <svg
              className="absolute -bottom-2 inset-x-0 w-full h-3 text-emerald-400/80 overflow-visible"
              viewBox="0 0 300 12"
              fill="none"
            >
              <path
                d="M3 9C50 3 150 2 297 8"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Copy */}
        <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-xl">
          Don&apos;t settle for basic ChatGPT prompts. We engineer custom AI agents, fine-tuned RAG vector search pipelines, and automated LLM workflows tailored to your exact business operations to save 100+ hours every month.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Book AI Audit Session</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>SOC2 Compliant & Enterprise Ready</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN — Intelligent AI Automation Laboratory Artwork Scene */}
      <div className="lg:col-span-6 relative mt-6 lg:mt-0">
        <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] max-w-[620px] mx-auto select-none rounded-3xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-2xl shadow-[0_0_80px_rgba(52,211,153,0.12)] overflow-hidden">
          
          {/* Cyber Dot Grid & Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(9,9,11,0.9)_100%)] pointer-events-none z-1" />

          {/* Central AI Node Graph & Workflow Laboratory Canvas */}
          <div className="absolute top-[80px] left-[50%] -translate-x-1/2 z-15 w-[85%] max-w-[460px] bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden transform -rotate-[1deg] hover:rotate-0 transition-all duration-500">
            {/* Header Bar */}
            <div className="bg-zinc-950 px-4 py-2.5 flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white font-sans">LaunchGremlin Autonomous AI Agent Node</span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-400/10 text-emerald-400 text-[9px] font-mono font-bold">
                100% ACTIVE
              </span>
            </div>

            {/* Workflow Pipeline Grid Canvas */}
            <div className="p-4 bg-zinc-950 font-mono space-y-3 relative overflow-hidden">
              {/* Connected Nodes Flow Diagram */}
              <div className="grid grid-cols-3 gap-2 text-center text-[9px]">
                {/* Node 1: Trigger */}
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <span className="text-zinc-400 block">TRIGGER</span>
                  <span className="text-emerald-400 font-bold block">Lead Form Ingest</span>
                </div>

                {/* Connection Beam 1 */}
                <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-emerald-400/30 space-y-1 shadow-[0_0_12px_rgba(52,211,153,0.2)]">
                  <span className="text-zinc-400 block">AGENT RAG</span>
                  <span className="text-white font-bold block">Vector Search</span>
                </div>

                {/* Node 3: Output */}
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <span className="text-zinc-400 block">ACTION</span>
                  <span className="text-emerald-400 font-bold block">CRM & Slack Sync</span>
                </div>
              </div>

              {/* Data Stream Execution Terminal */}
              <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-[10px] text-zinc-300 font-mono leading-relaxed space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>[LOG 00:14:22] Autonomous Agent Execution Success</span>
                </div>
                <div className="text-zinc-400 text-[9px]">
                  &gt; Vector distance: 0.984 | Context injected: 1,420 tokens <br />
                  &gt; Execution time: 142ms | Error rate: 0.00%
                </div>
              </div>
            </div>
          </div>

          {/* Floating AI System Metric Cards */}

          {/* Card 1: AI Agent Active (Top Left -2°) */}
          <div className="absolute top-[20px] left-[15px] z-35 transform -rotate-[2deg] animate-float-slow pointer-events-auto">
            <div className="p-3 rounded-2xl bg-zinc-950/90 border border-emerald-400/40 backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.7)] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-400/30">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 block font-bold uppercase">System Status</span>
                <span className="text-xs text-emerald-400 font-extrabold font-mono">AI Agent Active 🤖</span>
              </div>
            </div>
          </div>

          {/* Card 2: Workflow Pipeline Running (Top Right +3°) */}
          <div className="absolute top-[15px] right-[20px] z-35 transform rotate-[3deg] animate-float-reverse pointer-events-auto">
            <div className="px-3.5 py-2.5 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl text-xs font-mono text-emerald-400 flex items-center gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
              <Workflow className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold text-white">Workflow Pipeline</span>
              <span className="text-emerald-400 font-extrabold">RUNNING</span>
            </div>
          </div>

          {/* Card 3: Time Saved 140 hrs/mo (Middle Right -2°) */}
          <div className="absolute top-[175px] right-[15px] z-35 transform -rotate-[2deg] animate-float-slow pointer-events-auto">
            <div className="p-3 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.7)] w-44">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono text-zinc-400 text-[10px] uppercase font-bold">Time Saved</span>
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="text-base font-extrabold font-mono text-emerald-400 block">140 hrs / mo</span>
              <span className="text-[9px] font-mono text-zinc-400 block">Saved per team member</span>
            </div>
          </div>

          {/* Card 4: Tasks Automated 12,400 (Middle Left -1°) */}
          <div className="absolute top-[250px] left-[12px] z-35 transform -rotate-[1deg] animate-float-reverse pointer-events-auto">
            <div className="px-3.5 py-2 rounded-2xl bg-zinc-950/90 border border-emerald-400/30 backdrop-blur-xl text-xs font-mono text-emerald-400 flex items-center gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold text-white">Tasks Automated</span>
              <span className="text-emerald-400 font-bold">12,400+</span>
            </div>
          </div>

          {/* Card 5: Knowledge Base RAG Sync (Lower Left +2°) */}
          <div className="absolute bottom-[35px] left-[20px] z-35 transform rotate-[2deg] animate-float-slow pointer-events-auto">
            <div className="px-3.5 py-2 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl text-xs font-mono text-white flex items-center gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold">Knowledge Base RAG Sync</span>
            </div>
          </div>

          {/* Card 6: API Connected (Lower Right +1°) */}
          <div className="absolute bottom-[40px] right-[25px] z-35 transform rotate-[1deg] animate-float-reverse pointer-events-auto">
            <div className="px-3.5 py-2 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl text-xs font-mono text-white flex items-center gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
              <Network className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold">API Connected (Slack + CRM)</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
