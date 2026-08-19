import React, { useState } from 'react';
import {
  Smartphone,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Music2,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Layers,
  Sparkles,
  CheckCircle2,
  MoreHorizontal,
  Send,
  ThumbsUp
} from 'lucide-react';

export default function SocialMobileSimulator({ draftPackage }) {
  const [platform, setPlatform] = useState('instagram_reel'); // 'instagram_reel', 'tiktok', 'instagram_carousel', 'linkedin'
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  if (!draftPackage || !draftPackage.formats) return null;

  const { formats, chosen_hook, title, account, pillar, cta, intake_id } = draftPackage;
  const { talking_clip, carousel, before_after, caption_only } = formats;
  const slides = carousel?.slides || [];
  const scenes = talking_clip?.scenes || [];
  const isMaserati = account === 'needmoney4maserati';
  const handle = isMaserati ? '@needmoney4maserati' : '@LaunchGremlin';
  const displayName = isMaserati ? 'Need Money for Maserati' : 'LaunchGremlin';

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
      {/* Header & Platform Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
            <Smartphone className="w-3.5 h-3.5" /> Live Mobile Viewport Simulator
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">Cross-Platform Social Preview</h3>
        </div>

        {/* Platform Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-zinc-900 border border-zinc-800 p-1.5 rounded-2xl self-start sm:self-auto">
          {[
            { id: 'instagram_reel', label: '📸 IG Reel (9:16)' },
            { id: 'tiktok', label: '🎵 TikTok (9:16)' },
            { id: 'instagram_carousel', label: '📱 IG Carousel (4:5)' },
            { id: 'linkedin', label: '💼 LinkedIn Feed' }
          ].map((p) => {
            const isActive = platform === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlatform(p.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulator Device Frame */}
      <div className="flex justify-center py-4">
        {/* Smartphone Shell */}
        <div className="w-full max-w-[360px] aspect-[9/18.5] bg-black border-4 border-zinc-800 rounded-[44px] shadow-2xl overflow-hidden relative flex flex-col justify-between ring-1 ring-zinc-700">
          {/* Top Notch & Status Bar */}
          <div className="absolute top-0 inset-x-0 h-8 bg-transparent z-40 flex items-center justify-between px-6 text-[10px] font-mono text-white/80 select-none">
            <span>09:41</span>
            {/* Camera pill */}
            <div className="w-20 h-4 bg-zinc-900 rounded-full border border-zinc-800 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-zinc-950 border border-zinc-700"></div>
            </div>
            <span>5G 100%</span>
          </div>

          {/* 1. INSTAGRAM REEL PREVIEW */}
          {platform === 'instagram_reel' && (
            <div className="w-full h-full bg-gradient-to-b from-zinc-900 via-zinc-950 to-black relative flex flex-col justify-between p-4 pt-10 select-none overflow-hidden">
              {/* Simulated Video Content Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-zinc-900 to-black flex flex-col items-center justify-center p-6 text-center">
                <div className="p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 space-y-3 max-w-[280px]">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase">
                    Scene 01 · Hook
                  </span>
                  <p className="text-sm font-extrabold text-white leading-snug">
                    "{scenes[0]?.audio_spoken || chosen_hook}"
                  </p>
                  <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {scenes[0]?.on_screen_text || '🚨 MUST WATCH'}
                  </div>
                </div>
              </div>

              {/* Right Side Vertical Action Sidebar */}
              <div className="absolute right-3 bottom-24 z-30 flex flex-col items-center gap-4 text-white">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </div>
                  <span className="text-[10px] font-bold">1.2K</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold">48</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <Bookmark className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-[10px] font-bold">184</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold">62</span>
                </div>
              </div>

              {/* Bottom Profile & Caption Overlay */}
              <div className="mt-auto z-30 space-y-2.5 max-w-[260px]">
                {/* Profile Header */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-xs text-black border border-white/20">
                    {isMaserati ? '🏎️' : 'LG'}
                  </div>
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    {handle}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                  <button
                    type="button"
                    className="px-2 py-0.5 rounded-full border border-white/30 text-[10px] font-semibold text-white bg-white/10"
                  >
                    Follow
                  </button>
                </div>

                {/* Caption with See More */}
                <div className="text-xs text-white/90 leading-relaxed font-sans">
                  <p className={isCaptionExpanded ? '' : 'line-clamp-2'}>
                    {talking_clip?.captions?.instagram || chosen_hook}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsCaptionExpanded(!isCaptionExpanded)}
                    className="text-zinc-400 text-[10px] font-semibold mt-0.5 hover:text-white"
                  >
                    {isCaptionExpanded ? 'less' : '...more'}
                  </button>
                </div>

                {/* Audio Ticker */}
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-300">
                  <Music2 className="w-3 h-3 animate-pulse text-emerald-400" />
                  <span className="truncate">Original Audio · LaunchGremlin Studio</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. TIKTOK PREVIEW */}
          {platform === 'tiktok' && (
            <div className="w-full h-full bg-gradient-to-b from-zinc-900 via-zinc-950 to-black relative flex flex-col justify-between p-4 pt-10 select-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-950/40 via-zinc-900 to-black flex flex-col items-center justify-center p-6 text-center">
                <div className="p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-teal-500/20 space-y-3 max-w-[280px]">
                  <span className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-mono font-bold uppercase">
                    TikTok Short · 45s
                  </span>
                  <p className="text-sm font-extrabold text-white leading-snug">
                    "{scenes[0]?.audio_spoken || chosen_hook}"
                  </p>
                  <div className="text-[10px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">
                    🇿🇦 SOUTH AFRICA SMALL BUSINESS
                  </div>
                </div>
              </div>

              {/* TikTok Vertical Sidebar with spinning disc */}
              <div className="absolute right-3 bottom-16 z-30 flex flex-col items-center gap-4 text-white">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-500 flex items-center justify-center font-bold text-xs text-black border-2 border-white relative">
                  {isMaserati ? '🏎️' : 'LG'}
                  <span className="absolute -bottom-1.5 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold">
                    +
                  </span>
                </div>

                <div className="flex flex-col items-center gap-0.5">
                  <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                  <span className="text-[10px] font-bold">2.4K</span>
                </div>

                <div className="flex flex-col items-center gap-0.5">
                  <MessageCircle className="w-6 h-6 fill-white text-white" />
                  <span className="text-[10px] font-bold">112</span>
                </div>

                <div className="flex flex-col items-center gap-0.5">
                  <Bookmark className="w-6 h-6 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] font-bold">420</span>
                </div>

                {/* Spinning Music Disc */}
                <div className="w-9 h-9 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center animate-spin">
                  <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                </div>
              </div>

              {/* TikTok Caption */}
              <div className="mt-auto z-30 space-y-2 max-w-[250px]">
                <span className="text-xs font-extrabold text-white block">{handle}</span>
                <p className="text-xs text-white/90 leading-tight line-clamp-2">
                  {talking_clip?.captions?.tiktok || chosen_hook}
                </p>
                <div className="text-[10px] font-mono text-zinc-300 flex items-center gap-1">
                  <Music2 className="w-3 h-3 text-teal-400" /> sound - Durban Business Beats
                </div>
              </div>
            </div>
          )}

          {/* 3. INSTAGRAM CAROUSEL POST */}
          {platform === 'instagram_carousel' && (
            <div className="w-full h-full bg-black relative flex flex-col justify-between p-3 pt-10 select-none overflow-hidden">
              {/* Post Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-[10px] text-black">
                    {isMaserati ? '🏎️' : 'LG'}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{handle}</span>
                    <span className="text-[9px] text-zinc-400">Sponsored · Durban</span>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-zinc-400" />
              </div>

              {/* Carousel 4:5 Slide Card Frame */}
              <div className="my-auto aspect-[4/5] bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between relative shadow-lg">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span className="font-bold text-white">LaunchGremlin</span>
                  <span>
                    0{carouselIdx + 1} / 0{slides.length || 5}
                  </span>
                </div>

                <div className="my-auto text-center space-y-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase">
                    {slides[carouselIdx]?.type || 'Framework'}
                  </span>
                  <h4 className="text-sm font-extrabold text-white leading-tight">
                    {slides[carouselIdx]?.headline || chosen_hook}
                  </h4>
                  {slides[carouselIdx]?.body && (
                    <p className="text-[11px] text-zinc-300 leading-relaxed line-clamp-3">
                      {slides[carouselIdx].body}
                    </p>
                  )}
                </div>

                {/* Navigation Dots & Swipe Cue */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[9px] text-zinc-400">
                  <div className="flex gap-1">
                    {slides.map((_, i) => (
                      <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${
                          carouselIdx === i ? 'bg-emerald-400 w-3' : 'bg-zinc-700'
                        } transition-all`}
                      ></span>
                    ))}
                  </div>

                  <div className="flex gap-1">
                    {carouselIdx > 0 && (
                      <button
                        type="button"
                        onClick={() => setCarouselIdx(carouselIdx - 1)}
                        className="p-1 rounded bg-zinc-800 hover:bg-zinc-700"
                      >
                        <ChevronLeft className="w-3 h-3" />
                      </button>
                    )}
                    {carouselIdx < slides.length - 1 && (
                      <button
                        type="button"
                        onClick={() => setCarouselIdx(carouselIdx + 1)}
                        className="p-1 rounded bg-emerald-500 text-black font-bold"
                      >
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Feed Action Bar & Likes */}
              <div className="space-y-2 pt-1 border-t border-zinc-900">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                    <MessageCircle className="w-4 h-4" />
                    <Send className="w-4 h-4" />
                  </div>
                  <Bookmark className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                </div>
                <span className="text-[11px] font-bold text-white block">342 likes</span>
                <p className="text-[11px] text-zinc-300 line-clamp-2 leading-tight">
                  <strong className="text-white mr-1">{handle}</strong>
                  {chosen_hook}
                </p>
              </div>
            </div>
          )}

          {/* 4. LINKEDIN / FACEBOOK FEED POST */}
          {platform === 'linkedin' && (
            <div className="w-full h-full bg-zinc-950 p-4 pt-10 select-none overflow-y-auto space-y-3 font-sans">
              {/* Post Header */}
              <div className="flex items-start justify-between">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-xs text-black">
                    {isMaserati ? '🏎️' : 'LG'}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{displayName}</span>
                    <span className="text-[10px] text-zinc-400">Digital Growth Agency · 1d · 🌐</span>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-zinc-400" />
              </div>

              {/* Post Body */}
              <p className="text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed">
                {caption_only?.text || chosen_hook}
              </p>

              {/* Action Bar */}
              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-zinc-400 text-xs">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <ThumbsUp className="w-3.5 h-3.5" /> 84
                </span>
                <span>16 comments · 8 reposts</span>
              </div>
            </div>
          )}

          {/* Bottom Home Indicator Bar */}
          <div className="absolute bottom-1 inset-x-0 h-4 flex items-center justify-center z-40 pointer-events-none">
            <div className="w-32 h-1 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
