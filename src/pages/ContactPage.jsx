import React, { useState } from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import TrustBadges from '../components/common/TrustBadges';
import { Phone, MapPin, Send, CheckCircle2, ArrowRight, ShieldCheck, Lock, Sparkles, Calculator } from 'lucide-react';
import { submitLead } from '../services/leadService';

export default function ContactPage({ onOpenBooking, onSelectTab }) {
  const [selectedService, setSelectedService] = useState('Web Engineering');
  const [selectedBudget, setSelectedBudget] = useState('R15k - R30k');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        service: selectedService,
        budget: selectedBudget,
        details: formData.message
      });
    } catch (err) {
      console.error('[ContactPage] Submit lead failed:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="space-y-16 pb-20 select-none">
      {/* Hero Section */}
      <ServiceHeroBackground glowPosition="top-left">
        <div className="max-w-5xl mx-auto text-center space-y-6 pt-8 pb-12 px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT SCOPE BUILDER & INQUIRY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
            LET'S BUILD SOMETHING EXTRAORDINARY.
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            Ready to upgrade your web architecture, deploy custom AI workflows, or accelerate audience growth? Configure your scope proposal online or schedule a 1-on-1 session.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onSelectTab && onSelectTab('proposal')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Interactive Scope & Quote Calculator</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>Schedule Strategy Call Directly</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </ServiceHeroBackground>

      <TrustBadges />

      {/* Main Scope Builder & Form Section */}
      <section aria-labelledby="contact-form-heading" className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Micro-Trust */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                Direct Engineering Access
              </span>
              <h2 id="contact-form-heading" className="text-3xl font-extrabold text-white uppercase tracking-tight">
                Get Your Project Proposal
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Fill out the quick scope builder on the right or try our <button onClick={() => onSelectTab && onSelectTab('proposal')} className="text-emerald-400 underline font-bold cursor-pointer">Interactive Scope & AI Proposal Generator</button> for instant pricing.
              </p>
            </div>

            {/* Welcoming Office Photography */}
            <div className="rounded-3xl overflow-hidden border border-zinc-800 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80"
                alt="Modern LaunchGremlin creative workspace"
                width="800"
                height="500"
                loading="lazy"
                decoding="async"
                className="w-full h-48 object-cover"
              />
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 block">Direct Phone & WhatsApp</span>
                  <a href="https://wa.me/2768965502" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">
                    +27 689 65502
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Scope Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Pillar Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-zinc-200 uppercase block">
                      1. Select Required Service *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Web Engineering', 'Content Strategy', 'AI Consulting'].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedService(s)}
                          className={`p-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                            selectedService === s
                              ? 'bg-emerald-400 text-zinc-950 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-zinc-200 uppercase block">
                      2. Estimated Budget Tier *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['R10k - R20k', 'R20k - R50k', 'R50k+ Custom'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setSelectedBudget(b)}
                          className={`p-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                            selectedBudget === b
                              ? 'bg-emerald-400 text-zinc-950 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="contact-name" className="text-xs font-mono text-zinc-400 block">
                        Your Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full px-4 py-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-email" className="text-xs font-mono text-zinc-400 block">
                        Work Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="contact-phone" className="text-xs font-mono text-zinc-400 block">
                        Phone / WhatsApp
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+27 689 65502"
                        className="w-full px-4 py-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-website" className="text-xs font-mono text-zinc-400 block">
                        Current Website URL
                      </label>
                      <input
                        id="contact-website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://yoursite.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-message" className="text-xs font-mono text-zinc-400 block">
                      Project Requirements & Target Launch Date
                    </label>
                    <textarea
                      id="contact-message"
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Detail your core features, target audience, or specific requirements..."
                      className="w-full px-4 py-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'Submitting Scope Proposal...' : 'Submit Scope Proposal Request'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-400/20 border border-emerald-400/50 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white uppercase">
                      Scope Request Received!
                    </h2>
                    <p className="text-xs text-zinc-300 font-light max-w-md mx-auto leading-relaxed">
                      Thank you <strong>{formData.name}</strong>. Our engineering leads are analyzing your project specifications for <strong>{selectedService}</strong> ({selectedBudget}) and will send a custom proposal to <strong>{formData.email}</strong> within 24 hours.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-zinc-800 text-zinc-200 text-xs font-mono font-bold hover:bg-zinc-700 transition-colors"
                  >
                    Submit Another Scope
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
