import React from 'react';
import { Calendar, ShieldCheck, CheckCircle2, Award, Clock } from 'lucide-react';

export default function AuthorBio({ author, publishDate, updatedDate, readTime }) {
  const authorProfile = {
    name: 'LaunchGremlin AI Editorial Team',
    role: 'Specialized Multi-Agent AI Editorial Suite',
    credentials: 'Research • Strategy • Drafting • SEO • Quality Assurance',
    avatar: '/assets/logo-icon.png',
    bio: 'Every article published in the LaunchGremlin Content Hub is researched, written, reviewed, and optimized by our specialized team of autonomous AI agents working alongside senior technical editors to deliver maximum accuracy, speed, and real commercial value.'
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-6">
      {/* Date & Metadata Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Calendar className="w-3.5 h-3.5" />
            <span>Published: {publishDate || 'August 5, 2026'}</span>
          </span>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Updated: {updatedDate || 'August 5, 2026'}</span>
          </span>
        </div>

        {readTime && (
          <span className="px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-emerald-400 font-bold">
            {readTime}
          </span>
        )}
      </div>

      {/* Author Profile */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <img
          src={authorProfile.avatar}
          alt={authorProfile.name}
          width="64"
          height="64"
          loading="lazy"
          decoding="async"
          className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400/50 shrink-0"
        />

        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">
              {authorProfile.name}
            </h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[10px] font-mono font-bold">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified Author</span>
            </span>
          </div>

          <p className="text-xs font-mono text-emerald-400 font-semibold">
            {authorProfile.role} — {authorProfile.credentials}
          </p>

          <p className="text-xs text-zinc-400 leading-relaxed font-light">
            {authorProfile.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
