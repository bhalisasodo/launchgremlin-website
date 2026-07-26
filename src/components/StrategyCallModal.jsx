import React, { useState } from 'react';
import { X, Check, Sparkles, Send, User, Mail, Phone, Building } from 'lucide-react';
import { submitLead } from '../services/leadService';

export default function StrategyCallModal({ isOpen, onClose }) {
  const [pillar, setPillar] = useState('Websites');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('R4,999 (Launch Package)');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const result = await submitLead({
        name,
        email,
        phone,
        company,
        budget,
        details,
        service: pillar,
      });

      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(result.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-fade-up"
    >
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Top Bar Header */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 id="modal-title" className="text-base font-bold text-white">Book a Strategy Call</h3>
              <p className="text-xs text-zinc-400">Build. Grow. Scale your product with LaunchGremlin.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close booking modal"
            className="text-zinc-400 hover:text-white p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-all text-xs min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer focus:ring-2 focus:ring-emerald-400 focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(52,211,153,0.3)]">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">Strategy Request Received!</h4>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
              Our lead consultant will review your inquiry for <strong className="text-emerald-400">{pillar}</strong> and send your booking invitation within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-3 min-h-[48px] rounded-xl bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg hover:bg-emerald-300 transition-all cursor-pointer focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Pillar Selector */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">
                1. Select Strategic Pillar *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Websites', 'Content Strategy', 'AI Consulting'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPillar(p)}
                    className={`py-3 px-2 min-h-[48px] rounded-xl border text-[11px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center justify-center text-center focus:ring-2 focus:ring-emerald-400 focus:outline-none ${
                      pillar === p
                        ? 'bg-emerald-400/15 border-emerald-400 text-emerald-300 font-bold shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Your Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Vance"
                    className="w-full pl-10 pr-3 py-3 min-h-[48px] rounded-xl bg-zinc-900 border border-zinc-800 text-base sm:text-xs text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Work Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full pl-10 pr-3 py-3 min-h-[48px] rounded-xl bg-zinc-900 border border-zinc-800 text-base sm:text-xs text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Contact Phone *</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+27 82 123 4567"
                    className="w-full pl-10 pr-3 py-3 min-h-[48px] rounded-xl bg-zinc-900 border border-zinc-800 text-base sm:text-xs text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Company / Project Name</label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Labs"
                    className="w-full pl-10 pr-3 py-3 min-h-[48px] rounded-xl bg-zinc-900 border border-zinc-800 text-base sm:text-xs text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Estimated Budget</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-3 min-h-[48px] rounded-xl bg-zinc-900 border border-zinc-800 text-base sm:text-xs text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50"
                >
                  <option value="R4,999 (Launch Package)">R4,999 (Launch Package)</option>
                  <option value="R8,999 (Growth Engine)">R8,999 (Growth Engine)</option>
                  <option value="From R17,999 (Custom Platform)">From R17,999 (Custom Platform)</option>
                  <option value="Enterprise / Custom Retainer">Enterprise / Custom Retainer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Project Goals & Timeline</label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Briefly describe your objectives, timeframe, or key features needed..."
                className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-base sm:text-xs text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50"
              />
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-400 font-mono text-center">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 min-h-[48px] rounded-xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:bg-emerald-300 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <span>Request Strategy Booking</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
