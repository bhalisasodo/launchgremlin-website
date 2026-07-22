import React from 'react';
import { Heart, Play, UserPlus, Instagram, Youtube, Linkedin, Sparkles } from 'lucide-react';

export default function HeroFloatingUI() {
  return (
    <>
      {/* 1. Top Left Card: New Follower (+1° rotation + floatSlow) */}
      <div className="absolute top-[28px] left-[20px] sm:top-[35px] sm:left-[30px] z-30 transform rotate-[1deg] animate-float-slow pointer-events-auto">
        <div className="p-3.5 rounded-2xl bg-zinc-950/90 border border-emerald-400/40 backdrop-blur-2xl shadow-[0_12px_30px_rgba(0,0,0,0.7)] flex items-center gap-3.5 group hover:scale-105 transition-all">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-400/40 shadow-[0_0_12px_rgba(52,211,153,0.3)]">
              <UserPlus className="w-4 h-4" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-zinc-950 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                New Follower
              </span>
              <Sparkles className="w-3 h-3 text-emerald-400" />
            </div>
            <span className="text-xs text-white font-semibold block">@creativeboss just followed</span>
          </div>
        </div>
      </div>

      {/* 2. Lower Left Card: Views (-3° rotation + floatReverse) */}
      <div className="absolute top-[270px] left-[15px] sm:top-[290px] sm:left-[25px] z-30 transform -rotate-[3deg] animate-float-reverse pointer-events-auto">
        <div className="px-4 py-2.5 rounded-2xl bg-zinc-950/90 border border-emerald-400/35 backdrop-blur-2xl text-xs font-mono text-emerald-400 flex items-center gap-2.5 shadow-[0_12px_25px_rgba(0,0,0,0.6)] hover:scale-105 transition-all">
          <div className="p-1.5 rounded-lg bg-emerald-400/20 text-emerald-400 border border-emerald-400/30">
            <Play className="w-3.5 h-3.5 fill-emerald-400" />
          </div>
          <span className="font-extrabold text-white text-sm">125K</span>
          <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Views</span>
        </div>
      </div>

      {/* 3. Lower Left Card (beneath Views): Likes (+4° rotation + floatSlow) */}
      <div className="absolute top-[330px] left-[30px] sm:top-[355px] sm:left-[45px] z-30 transform rotate-[4deg] animate-float-slow pointer-events-auto">
        <div className="px-4 py-2.5 rounded-2xl bg-zinc-950/90 border border-rose-500/35 backdrop-blur-2xl text-xs font-mono text-rose-400 flex items-center gap-2.5 shadow-[0_12px_25px_rgba(0,0,0,0.6)] hover:scale-105 transition-all">
          <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          </div>
          <span className="font-extrabold text-white text-sm">4.7K</span>
          <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Likes</span>
        </div>
      </div>

      {/* 4. Lower Accent: Creator Sticky Note (-3° rotation + floatReverse) */}
      <div className="absolute bottom-[20px] left-[15px] sm:bottom-[30px] sm:left-[25px] z-30 p-3.5 rounded-2xl bg-amber-400 text-zinc-950 font-mono text-[10px] font-extrabold shadow-[0_12px_30px_rgba(251,191,36,0.35)] transform -rotate-[3deg] animate-float-reverse pointer-events-auto hidden sm:block">
        <div className="space-y-1 leading-tight tracking-wider">
          <div className="flex items-center gap-1.5"><span>💡</span> <span>IDEA</span></div>
          <div className="flex items-center gap-1.5"><span>📊</span> <span>PLAN</span></div>
          <div className="flex items-center gap-1.5"><span>✏️</span> <span>CREATE</span></div>
          <div className="flex items-center gap-1.5 text-emerald-950"><span>📈</span> <span>GROW</span></div>
        </div>
      </div>

      {/* 5. Social Stack Sidebar */}
      <div className="absolute right-[15px] top-[140px] z-30 flex flex-col gap-2.5 p-2 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 backdrop-blur-xl shadow-2xl pointer-events-auto hidden sm:flex">
        <span className="p-2 rounded-xl text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900 transition-all">
          <Instagram className="w-3.5 h-3.5" />
        </span>
        <span className="p-2 rounded-xl text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900 transition-all">
          <Youtube className="w-3.5 h-3.5" />
        </span>
        <span className="p-2 rounded-xl text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900 transition-all">
          <Linkedin className="w-3.5 h-3.5" />
        </span>
      </div>
    </>
  );
}
