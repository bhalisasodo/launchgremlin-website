import React, { useState } from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import { Send, Check, Calendar, Sparkles } from 'lucide-react';

export default function ContactPage({ onOpenBooking }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="space-y-20 pb-20 select-none">
      {/* Handcrafted Service Hero System */}
      <ServiceHeroBackground glowPosition="top-right">
        <div className="text-center max-w-2xl mx-auto space-y-4 pt-8 pb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-400/40 text-emerald-400 text-xs font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(52,211,153,0.2)]">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>CONTACT & SCOPE BUILDER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            LET&apos;S BUILD SOMETHING <br />
            <span className="text-emerald-400">EXCEPTIONAL.</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-lg mx-auto">
            Have a project in mind? Reach out directly to our engineering team or schedule a strategy call.
          </p>
        </div>
      </ServiceHeroBackground>

      {/* Form Container */}
      <section aria-label="Contact Form Section" className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6">
          {sent ? (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/30">
                <Check className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-white">Message Sent!</h2>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We will respond to {email} ({phone}) within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-zinc-300 mb-1">Your Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Vance"
                    className="w-full px-4 py-3 min-h-[48px] rounded-xl bg-zinc-950 border border-zinc-800 text-base sm:text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-medium text-zinc-300 mb-1">Contact Phone *</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+27 82 123 4567"
                    className="w-full px-4 py-3 min-h-[48px] rounded-xl bg-zinc-950 border border-zinc-800 text-base sm:text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium text-zinc-300 mb-1">Work Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 min-h-[48px] rounded-xl bg-zinc-950 border border-zinc-800 text-base sm:text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-zinc-300 mb-1">Message / Project Details</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project goals, timeline, or requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-base sm:text-xs text-white focus:outline-none focus:border-emerald-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 min-h-[48px] rounded-xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-lg hover:bg-emerald-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Direct Inquiry</span>
              </button>
            </form>
          )}

          <div className="pt-6 border-t border-zinc-800 text-center">
            <button
              onClick={onOpenBooking}
              className="text-xs font-mono text-emerald-400 hover:underline inline-flex items-center gap-1 min-h-[44px] cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Or click here to Schedule a Strategy Call →</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
