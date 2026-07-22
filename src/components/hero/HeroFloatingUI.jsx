import React from 'react';
import { Heart, Play, UserPlus, Sparkles, Instagram, Youtube, Linkedin } from 'lucide-react';

export default function HeroFloatingUI() {
  return (
    <>
      {/* 1. Top New Follower Badge */}
      <div className="absolute top-4 left-4 z-30 p-2.5 rounded-2xl bg-zinc-950/85 border border-emerald-400/40 backdrop-blur-xl shadow-[0_0_20px_rgba(52,211,153,0.25)] flex items-center gap-2.5 animate-slide-fade-in pointer-events-auto hover:scale-105 transition-transform">
        <div className="w-8 h-8 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
          <UserPlus className="w-4 h-4" />
        </div>
        <div className="text-left">
          <span className="text-[10px] font-mono text-emerald-400 block font-bold">New Follower</span>
          <span className="text-xs text-white font-semibold">@creativeboss just followed</span>
        </div>
      </div>

      {/* 2. Top Right Likes Pill */}
      <div className="absolute top-12 right-12 z-30 px-3 py-1.5 rounded-full bg-zinc-950/85 border border-zinc-800 backdrop-blur-xl text-xs font-mono text-white flex items-center gap-1.5 shadow-lg pointer-events-auto hover:scale-110 transition-transform">
        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
        <span className="font-bold">2.3K</span>
      </div>

      {/* 3. Mid Views & Likes Badges */}
      <div className="absolute top-1/2 left-0 z-30 flex flex-col gap-2 pointer-events-auto">
        <div className="px-3 py-1.5 rounded-xl bg-zinc-950/85 border border-emerald-400/30 backdrop-blur-xl text-xs font-mono text-emerald-400 flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform">
          <Play className="w-3.5 h-3.5 fill-emerald-400" />
          <span className="font-bold">125K Views</span>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-zinc-950/85 border border-rose-500/30 backdrop-blur-xl text-xs font-mono text-rose-400 flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform">
          <Heart className="w-3.5 h-3.5 fill-rose-500" />
          <span className="font-bold">4.7K Likes</span>
        </div>
      </div>

      {/* 4. Creator Sticky Note */}
      <div className="absolute bottom-6 left-6 z-30 p-3.5 rounded-2xl bg-amber-400 text-zinc-950 font-mono text-xs font-bold shadow-[0_10px_25px_rgba(251,191,36,0.3)] transform -rotate-3 hover:rotate-0 transition-transform pointer-events-auto">
        <div className="space-y-1 text-[11px]">
          <div>- IDEA 💡</div>
          <div>- PLAN 📊</div>
          <div>- CREATE ✏️</div>
          <div>- GROW 📈</div>
          <div>- REPEAT 🔄</div>
        </div>
      </div>

      {/* 5. Social Media Stack Sidebar */}
      <div className="absolute right-2 top-1/3 -translate-y-1/2 z-30 flex flex-col gap-2.5 p-2 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md shadow-xl pointer-events-auto">
        <span className="p-2 rounded-xl text-zinc-400 hover:text-emerald-400 transition-colors">
          <Instagram className="w-4 h-4" />
        </span>
        <span className="p-2 rounded-xl text-zinc-400 hover:text-emerald-400 transition-colors">
          <Youtube className="w-4 h-4" />
        </span>
        <span className="p-2 rounded-xl text-zinc-400 hover:text-emerald-400 transition-colors">
          <Linkedin className="w-4 h-4" />
        </span>
      </div>
    </>
  );
}
