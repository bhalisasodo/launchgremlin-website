import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle, ArrowRight, ShieldCheck, Sparkles, Lock, Star } from 'lucide-react';
import { submitLead } from '../services/leadService';

export default function StrategyCallModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('websites');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

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
        details: formData.message
      });
    } catch (err) {
      console.error('[StrategyCallModal] Submit lead failed:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const resetModal = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-emerald-400/50 shadow-[0_0_60px_rgba(52,211,153,0.2)] text-left space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={resetModal}
          aria-label="Close Strategy Call Modal"
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header & Urgency Banner */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[11px] font-mono font-bold inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>100% FREE • NO OBLIGATION AUDIT</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  🔥 2 Client Spots Left
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                Book Your 30-Minute Strategy Session
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                Map out your sub-second web architecture, AI agent workflows, or content growth engine with our lead engineers.
              </p>
            </div>

            {/* Quick Interactive Service Selector (Reduces Form Friction) */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-zinc-200 uppercase block">
                Select Your Focus Area:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedService('websites')}
                  className={`p-2.5 rounded-xl border text-xs font-mono text-center font-bold transition-all cursor-pointer ${
                    selectedService === 'websites'
                      ? 'bg-emerald-400 text-zinc-950 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  🌐 Web Design
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedService('content-strategy')}
                  className={`p-2.5 rounded-xl border text-xs font-mono text-center font-bold transition-all cursor-pointer ${
                    selectedService === 'content-strategy'
                      ? 'bg-emerald-400 text-zinc-950 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  📈 Content Growth
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedService('ai-consulting')}
                  className={`p-2.5 rounded-xl border text-xs font-mono text-center font-bold transition-all cursor-pointer ${
                    selectedService === 'ai-consulting'
                      ? 'bg-emerald-400 text-zinc-950 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  🤖 AI Workflows
                </button>
              </div>
            </div>

            {/* Quick Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="modal-name" className="text-xs font-mono text-zinc-400 block">
                    Your Full Name *
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="modal-email" className="text-xs font-mono text-zinc-400 block">
                    Work Email *
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@company.com"
                    className="w-full px-3.5 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="modal-phone" className="text-xs font-mono text-zinc-400 block">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="modal-website" className="text-xs font-mono text-zinc-400 block">
                    Current Website (Optional)
                  </label>
                  <input
                    id="modal-website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://yoursite.com"
                    className="w-full px-3.5 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="modal-message" className="text-xs font-mono text-zinc-400 block">
                  Project Goals & Timeline
                </label>
                <textarea
                  id="modal-message"
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us briefly about your goals, current bottlenecks, or target launch date..."
                  className="w-full px-3.5 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Booking Strategy Session...' : 'Confirm Strategy Session Booking'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Friction Reducer Footer */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-zinc-400 border-t border-zinc-800/80">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> 100% Confidential
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 24-Hour Confirmation
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" /> 5.0 Rated Engineers
              </span>
            </div>
          </>
        ) : (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-400/20 border border-emerald-400/50 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white uppercase">
                Strategy Call Session Requested!
              </h3>
              <p className="text-xs text-zinc-300 font-light max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Our senior engineering team has received your project details and will send your calendar confirmation within 2 hours.
              </p>
            </div>

            <button
              onClick={resetModal}
              className="px-6 py-3 rounded-xl bg-zinc-800 text-zinc-200 text-xs font-mono font-bold hover:bg-zinc-700 transition-colors"
            >
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
