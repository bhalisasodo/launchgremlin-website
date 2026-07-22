import React from 'react';
import { Heart, Play, UserPlus, Sparkles, Instagram, Youtube, Linkedin, Check } from 'lucide-react';

export default function HeroFloatingUI() {
  return (
    <>
      {/* 1. Top Left Card: New Follower (+1° rotation) */}
      <div className="absolute top-[28px] left-[20px] sm:top-[35px] sm:left-[30px] z-30 transform rotate-[1deg] hover:rotate-0 transition-transform duration-300 pointer-events-auto">
        <div className="p-3 rounded-2xl bg-zinc-950/90 border border-emerald-400/40 backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex items-center gap-3 group hover:scale-105 transition-all">
          <div className="w-8 h-8 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
            <UserPlus className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase tracking-wider">
              New Follower
            </span>
            <span className="text-xs text-white font-semibold block">@creativeboss just followed</span>
          </div>
        </div>
      </div>

      {/* 2. Lower Left Card: Views (-3° rotation) */}
      <div className="absolute top-[270px] left-[15px] sm:top-[290px] sm:left-[25px] z-30 transform -rotate-[3deg] hover:rotate-0 transition-transform duration-300 pointer-events-auto">
        <div className="px-3.5 py-2 rounded-xl bg-zinc-950/90 border border-emerald-400/30 backdrop-blur-xl text-xs font-mono text-emerald-400 flex items-center gap-2 shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:scale-105 transition-all">
          <div className="p-1 rounded-md bg-emerald-400/20 text-emerald-400">
            <Play className="w-3.5 h-3.5 fill-emerald-400" />
          </div>
          <span className="font-extrabold text-white">125K</span>
          <span className="text-zinc-400 text-[10px]">Views</span>
        </div>
      </div>

      {/* 3. Lower Left Card (beneath Views): Likes (+4° rotation) */}
      <div className="absolute top-[325px] left-[30px] sm:top-[350px] sm:left-[45px] z-30 transform rotate-[4deg] hover:rotate-0 transition-transform duration-300 pointer-events-auto">
        <div className="px-3.5 py-2 rounded-xl bg-zinc-950/90 border border-rose-500/30 backdrop-blur-xl text-xs font-mono text-rose-400 flex items-center gap-2 shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:scale-105 transition-all">
          <div className="p-1 rounded-md bg-rose-500/20 text-rose-400">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          </div>
          <span className="font-extrabold text-white">4.7K</span>
          <span className="text-zinc-400 text-[10px]">Likes</span>
        </div>
      </div>

      {/* 4. Lower Accent: Creator Sticky Note (-3° rotation) */}
      <div className="absolute bottom-[20px] left-[15px] sm:bottom-[30px] sm:left-[25px] z-30 p-3 rounded-2xl bg-amber-400 text-zinc-950 font-mono text-[10px] font-bold shadow-[0_10px_25px_rgba(251,191,36,0.3)] transform -rotate-[3deg] hover:rotate-0 transition-transform pointer-events-auto hidden sm:block">
        <div className="space-y-0.5 leading-tight">
          <div>💡 IDEA</div>
          <div>📊 PLAN</div>
          <div>✏️ CREATE</div>
          <div>📈 GROW</div>
        </div>
      </div>

      {/* 5. Social Media Stack Sidebar */}
      <div className="absolute right-[15px] top-[140px] z-30 flex flex-col gap-2 p-2 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 backdrop-blur-md shadow-xl pointer-events-auto hidden sm:flex">
        <span className="p-1.5 rounded-xl text-zinc-400 hover:text-emerald-400 transition-colors">
          <Instagram className="w-3.5 h-3.5" />
        </span>
        <span className="p-1.5 rounded-xl text-zinc-400 hover:text-emerald-400 transition-colors">
          <Youtube className="w-3.5 h-3.5" />
        </span>
        <span className="p-1.5 rounded-xl text-zinc-400 hover:text-emerald-400 transition-colors">
          <Linkedin className="w-3.5 h-3.5" />
        </span>
      </div>
    </>
  );
}
