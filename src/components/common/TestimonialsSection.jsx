import React from 'react';
import { Star, CheckCircle2, Quote, TrendingUp, Zap } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Marcus Thorne',
      role: 'Founder & CEO',
      company: 'Apex Fitness Studios',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      metric: '+240% Day Pass Leads in 30 Days',
      quote: 'LaunchGremlin completely rebuilt our gym website in 7 days. Our mobile page load speed dropped to 0.24 seconds, and our free trial bookings jumped by over 240% in the first month alone.'
    },
    {
      name: 'Elena Rostova',
      role: 'Managing Partner',
      company: 'Rostova Legal Group',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      metric: '100/100 Core Web Vitals Score',
      quote: 'The automated case evaluation intake and local SEO schemas put us at the top of Google Maps in our city. The quality of qualified case inquiries has been extraordinary.'
    },
    {
      name: 'David Vance',
      role: 'Tech Creator & Founder',
      company: 'CodeFlow Media',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      metric: '72-Hour MVP Delivered On Time',
      quote: 'I needed a functional SaaS landing page and AI agent workflow delivered before our pitch call. LaunchGremlin delivered a flawless, production-ready product in 72 hours.'
    }
  ];

  return (
    <section aria-labelledby="testimonials-heading" className="max-w-7xl mx-auto px-6 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>VERIFIED CLIENT PROOF</span>
        </div>
        <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          Trusted by High-Growth Founders & Businesses
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-light">
          Here is what happens when extreme sub-second speed meets conversion-engineered design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-400/40 hover:shadow-[0_0_30px_rgba(52,211,153,0.12)] transition-all flex flex-col justify-between space-y-6 relative group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-zinc-700 group-hover:text-emerald-400/40 transition-colors" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[11px] font-mono font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{t.metric}</span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light italic">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                width="44"
                height="44"
                loading="lazy"
                decoding="async"
                className="w-11 h-11 rounded-full object-cover border border-emerald-400/40"
              />
              <div>
                <span className="text-xs font-bold text-white block flex items-center gap-1">
                  {t.name}
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {t.role}, {t.company}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
