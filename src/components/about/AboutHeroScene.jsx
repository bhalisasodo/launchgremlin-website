import React from 'react';
import {
  Sparkles, Zap, Code, Terminal, Cpu, Camera, Mic, Activity, CheckCircle, GitCommit, ArrowRight, Compass
} from 'lucide-react';

export default function AboutHeroScene() {
  return (
    <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] max-w-[620px] mx-auto select-none rounded-3xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-2xl shadow-[0_0_80px_rgba(52,211,153,0.12)] overflow-hidden">
      
      {/* Cyber Dot Grid Backdrop & Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(9,9,11,0.9)_100%)] pointer-events-none z-1" />

      {/* Radial Green Ambient Atmosphere */}
      <div className="absolute top-[45%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] bg-emerald-500/18 rounded-full blur-[130px] pointer-events-none z-1" />

      {/* Central "Creative Operating System" Window Artwork */}
      <div className="absolute top-[75px] left-[50%] -translate-x-1/2 z-15 w-[85%] max-w-[460px] bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden transform -rotate-[1.5deg] hover:rotate-0 transition-all duration-500 pointer-events-auto">
        {/* Top Header Bar */}
        <div className="bg-zinc-950 px-4 py-2.5 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-400">
            <Terminal className="w-3 h-3 text-emerald-400" />
            <span className="text-zinc-200">LaunchGremlin OS v3.0</span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-emerald-400/10 text-emerald-400 text-[9px] font-mono font-bold">
            BUILDER MODE
          </span>
        </div>

        {/* Console & IDE Terminal Screen */}
        <div className="p-4 bg-zinc-950 font-mono space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white font-sans">
              <GitCommit className="w-4 h-4 text-emerald-400" />
              <span>git commit -m &quot;Aggressive Iteration&quot;</span>
            </div>
            <span className="text-[9px] text-emerald-400 font-bold">LIVE DEPLOYED</span>
          </div>

          {/* Code Stream Display */}
          <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-[10px] text-zinc-300 leading-relaxed font-mono space-y-1">
            <div className="text-emerald-400">// LaunchGremlin Culture Manifesto</div>
            <div><span className="text-purple-400">const</span> mindset = [<span className="text-amber-300">&apos;BUILD&apos;</span>, <span className="text-amber-300">&apos;SHIP&apos;</span>, <span className="text-amber-300">&apos;MEASURE&apos;</span>, <span className="text-amber-300">&apos;IMPROVE&apos;</span>, <span className="text-amber-300">&apos;REPEAT&apos;</span>];</div>
            <div><span className="text-blue-400">await</span> shipFast({'{'} quality: <span className="text-emerald-300">true</span>, speed: <span className="text-emerald-300">&apos;10x&apos;</span> {'}'});</div>
          </div>

          {/* Creator & AI Hardware Stack Indicator */}
          <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-2 text-zinc-300">
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              <Mic className="w-3.5 h-3.5 text-emerald-400" />
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-zinc-400 font-sans">Creator Hardware & AI Stack</span>
            </div>
            <span className="text-emerald-400 font-bold">Connected 🟢</span>
          </div>
        </div>
      </div>

      {/* Floating Badges */}

      {/* Card 1: Aggressive Iteration (Top Left -2°) */}
      <div className="absolute top-[20px] left-[15px] z-35 transform -rotate-[2deg] animate-float-slow pointer-events-auto">
        <div className="p-3 rounded-2xl bg-zinc-950/90 border border-emerald-400/40 backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.7)] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-400/30">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-zinc-400 block font-bold uppercase">Philosophy</span>
            <span className="text-xs text-emerald-400 font-extrabold font-mono">Aggressive Iteration</span>
          </div>
        </div>
      </div>

      {/* Card 2: Ship Velocity 10x (Top Right +3°) */}
      <div className="absolute top-[15px] right-[20px] z-35 transform rotate-[3deg] animate-float-reverse pointer-events-auto">
        <div className="px-3.5 py-2.5 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl text-xs font-mono text-emerald-400 flex items-center gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-bold text-white">Ship Velocity</span>
          <span className="text-emerald-400 font-extrabold">10x</span>
        </div>
      </div>

      {/* Card 3: AI Native Workflow (Middle Right -2°) */}
      <div className="absolute top-[175px] right-[15px] z-35 transform -rotate-[2deg] animate-float-slow pointer-events-auto">
        <div className="p-3 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.7)] w-44">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-zinc-400 text-[10px] uppercase font-bold">DNA</span>
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-base font-extrabold font-mono text-emerald-400 block">AI Native</span>
          <span className="text-[9px] font-mono text-zinc-400 block">Deep AI Automation</span>
        </div>
      </div>

      {/* Card 4: Data Informed 100% (Middle Left -1°) */}
      <div className="absolute top-[250px] left-[12px] z-35 transform -rotate-[1deg] animate-float-reverse pointer-events-auto">
        <div className="px-3.5 py-2 rounded-2xl bg-zinc-950/90 border border-emerald-400/30 backdrop-blur-xl text-xs font-mono text-emerald-400 flex items-center gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-bold text-white">Data Informed</span>
          <span className="text-emerald-400 font-bold">100%</span>
        </div>
      </div>

      {/* Card 5: Creator Obsessed (Lower Left +2°) */}
      <div className="absolute bottom-[35px] left-[20px] z-35 transform rotate-[2deg] animate-float-slow pointer-events-auto">
        <div className="px-3.5 py-2 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl text-xs font-mono text-white flex items-center gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-bold">Creator Obsessed</span>
        </div>
      </div>

      {/* Card 6: Deployed 100% Uptime (Lower Right +1°) */}
      <div className="absolute bottom-[40px] right-[25px] z-35 transform rotate-[1deg] animate-float-reverse pointer-events-auto">
        <div className="px-3.5 py-2 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl text-xs font-mono text-white flex items-center gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-bold">100% Uptime</span>
        </div>
      </div>

    </div>
  );
}
