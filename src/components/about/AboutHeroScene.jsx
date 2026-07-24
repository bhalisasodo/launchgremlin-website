import React, { useState, useEffect } from 'react';
import {
  Sparkles, Zap, Terminal, Cpu, Activity, CheckCircle2, GitCommit, ArrowRight,
  Flame, Globe, ShieldCheck, Repeat, Rocket, Layers, Code, Check, RefreshCw
} from 'lucide-react';

export default function AboutHeroScene() {
  const [activeLoopIndex, setActiveLoopIndex] = useState(2); // SHIP
  const [activeActivityIndex, setActiveActivityIndex] = useState(0);

  const loopSteps = [
    { name: 'IDEA', label: '01. Idea', icon: Sparkles },
    { name: 'BUILD', label: '02. Build', icon: Code },
    { name: 'SHIP', label: '03. Ship', icon: Rocket },
    { name: 'MEASURE', label: '04. Measure', icon: Activity },
    { name: 'LEARN', label: '05. Learn', icon: ShieldCheck },
    { name: 'ITERATE', label: '06. Iterate', icon: RefreshCw },
    { name: 'REPEAT', label: '07. Repeat', icon: Repeat },
  ];

  const liveActivities = [
    {
      time: '00:04s ago',
      type: 'SHIP',
      title: '🚀 Deployed: Edge UI Engine v4.5 to 32 Global Nodes',
      desc: 'Lighthouse score: 100/100 · Load time: 140ms',
      badgeBg: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30',
    },
    {
      time: '00:18s ago',
      type: 'FEEDBACK',
      title: '💬 Creator Feedback: "Shipped in 3 days. Unreal velocity."',
      desc: 'Founder: Vance Labs · Conversion rate +240%',
      badgeBg: 'bg-teal-400/10 text-teal-400 border-teal-400/30',
    },
    {
      time: '00:35s ago',
      type: 'EXPERIMENT',
      title: '🧪 Experiment #92: 24/7 AI Autonomous Agent',
      desc: 'Status: Verified · Automated 1,420 lead responses',
      badgeBg: 'bg-emerald-300/10 text-emerald-300 border-emerald-300/30',
    },
    {
      time: '00:52s ago',
      type: 'OPTIMIZE',
      title: '⚡ Performance Audit: Zero Layout Shift Achieved',
      desc: 'Refactored CSS container bounds across desktop & mobile',
      badgeBg: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30',
    },
  ];

  useEffect(() => {
    const loopInterval = setInterval(() => {
      setActiveLoopIndex((prev) => (prev + 1) % loopSteps.length);
    }, 3000);

    const activityInterval = setInterval(() => {
      setActiveActivityIndex((prev) => (prev + 1) % liveActivities.length);
    }, 4200);

    return () => {
      clearInterval(loopInterval);
      clearInterval(activityInterval);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[620px] mx-auto select-none rounded-3xl border border-zinc-800 bg-zinc-950/90 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden">
      
      {/* ---------------- TOP WINDOW HEADER BAR ---------------- */}
      <div className="bg-zinc-900/90 px-5 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Mac style window dots */}
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="h-3 w-px bg-zinc-800 mx-1.5" />
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-bold text-white font-mono">
            LaunchGremlin OS <span className="text-zinc-500">v4.5</span>
          </span>
        </div>

        <span className="px-2.5 py-0.5 rounded-md bg-emerald-400/10 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-400/20">
          ● BUILDER MODE · LIVE SHIPPING
        </span>
      </div>

      {/* ---------------- OPERATING BUILD LOOP BAR ---------------- */}
      <div className="bg-zinc-900/50 p-3 border-b border-zinc-800">
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-2 px-1 font-semibold uppercase">
          <span>Operating Philosophy: The Build Loop</span>
          <span className="text-emerald-400">{loopSteps[activeLoopIndex].name} PHASE</span>
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {loopSteps.map((step, idx) => {
            const isActive = idx === activeLoopIndex;
            const StepIcon = step.icon;
            return (
              <div
                key={step.name}
                onClick={() => setActiveLoopIndex(idx)}
                className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-emerald-400/20 border-emerald-400 text-emerald-300 font-bold shadow-[0_0_12px_rgba(52,211,153,0.25)]'
                    : 'bg-zinc-900/70 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <StepIcon className={`w-3 h-3 mx-auto mb-0.5 ${isActive ? 'text-emerald-400 animate-pulse' : ''}`} />
                <span className="text-[9px] font-mono block leading-none">{step.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------- MAIN OPERATING SYSTEM CONTENT ---------------- */}
      <div className="p-5 space-y-4">
        
        {/* CURRENT SPRINT & EXPERIMENTS PANEL */}
        <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <div className="flex items-center gap-2">
              <GitCommit className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-bold text-white font-mono">Current Build Sprint</span>
            </div>
            <span className="text-[9px] font-mono text-emerald-400 font-bold">SPRINT 42 ACTIVE</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
            <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-0.5">
              <span className="text-zinc-500 uppercase font-bold block text-[9px]">Ideas in Progress</span>
              <span className="text-zinc-200 font-semibold block">72-Hour MVP Scaffold</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-0.5">
              <span className="text-zinc-500 uppercase font-bold block text-[9px]">Experiments Running</span>
              <span className="text-emerald-400 font-semibold block">24/7 AI Workforce Stream</span>
            </div>
          </div>
        </div>

        {/* LIVE ACTIVITY FEED */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-1.5 text-white font-bold uppercase">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live System Momentum</span>
            </div>
            <span className="text-[9px] text-zinc-500">Streaming Real-Time</span>
          </div>

          <div className="space-y-2 font-mono text-[11px]">
            {liveActivities.map((act, i) => {
              const isSelected = i === activeActivityIndex;
              return (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-zinc-900 border-emerald-400/50 text-white shadow-[0_0_15px_rgba(52,211,153,0.15)]'
                      : 'bg-zinc-900/50 border-zinc-800/80 text-zinc-400 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-emerald-400 text-[10px]">{act.title}</span>
                    <span className="text-[9px] text-zinc-500">{act.time}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 font-sans font-light leading-tight">
                    {act.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CULTURAL VALUES BADGES GRID */}
        <div className="pt-1">
          <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold block mb-2">
            Cultural Operating Principles:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Ship > Perfect',
              'Build in Public',
              'Creator First',
              'Default to Action',
              'Never Stop Shipping',
              'Customer > Ego',
            ].map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-emerald-400 font-semibold hover:border-emerald-400/40 transition-colors"
              >
                ● {tag}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* ---------------- BOTTOM STATUS BAR ---------------- */}
      <div className="bg-zinc-900/90 px-5 py-2.5 border-t border-zinc-800 flex items-center justify-between text-[10px] font-mono text-zinc-400">
        <span className="flex items-center gap-1.5">
          <Globe className="w-3 h-3 text-emerald-400" />
          <span>Global Edge Network: <strong className="text-emerald-400">32 Regions Live</strong></span>
        </span>
        <span className="text-zinc-500 font-bold">100% BUILD UPTIME</span>
      </div>

    </div>
  );
}
