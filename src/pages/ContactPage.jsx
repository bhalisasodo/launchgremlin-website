import React, { useState } from 'react';
import { Mail, Send, Check, Calendar, ArrowRight, Sparkles } from 'lucide-react';

export default function ContactPage({ onOpenBooking }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="space-y-20 pb-20">
      <section className="pt-16 max-w-4xl mx-auto px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let&apos;s Build Something Extraordinary.
        </h1>

        <p className="text-zinc-300 text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed">
          Have a project inquiry, partnership idea, or custom build request? Send us a message or book a strategy call directly.
        </p>
      </section>

      <section className="max-w-xl mx-auto px-6">
        <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6">
          {sent ? (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Message Sent!</h3>
              <p className="text-xs text-zinc-400">We will respond to {email} within 4 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Message / Project Details</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg hover:bg-emerald-300 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Direct Inquiry</span>
              </button>
            </form>
          )}

          <div className="pt-6 border-t border-zinc-800 text-center">
            <button
              onClick={onOpenBooking}
              className="text-xs font-mono text-emerald-400 hover:underline inline-flex items-center gap-1"
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
