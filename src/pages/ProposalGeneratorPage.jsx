import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Calculator,
  Globe,
  TrendingUp,
  Bot,
  Zap,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Download,
  FileText,
  DollarSign,
  Send,
  X
} from 'lucide-react';
import {
  SCOPE_PILLARS,
  TIMELINE_SPRINTS,
  TECHNICAL_ADDONS,
  CURRENCY_RATES,
  calculateScopeQuote
} from '../utils/scopePricingData';
import ProposalDocumentView from '../components/proposal/ProposalDocumentView';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import { submitLead } from '../services/leadService';
import { trackEvent, trackConversion } from '../utils/analytics';

export default function ProposalGeneratorPage({ onOpenBooking, onSelectTab }) {
  // Configurator state
  const [selectedItemIds, setSelectedItemIds] = useState(['web-landing', 'content-viral30']);
  const [selectedSprintId, setSelectedSprintId] = useState('sprint-2week');
  const [selectedAddonIds, setSelectedAddonIds] = useState(['addon-vitals']);
  const [currency, setCurrency] = useState('USD');
  const [activeTab, setActiveTab] = useState('configurator'); // 'configurator', 'proposal'

  // Client Details state
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [projectGoals, setProjectGoals] = useState('');
  const [isLockInModalOpen, setIsLockInModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute live quote
  const quote = useMemo(() => {
    return calculateScopeQuote(selectedItemIds, selectedSprintId, selectedAddonIds, currency);
  }, [selectedItemIds, selectedSprintId, selectedAddonIds, currency]);

  // Toggle item selection
  const handleToggleItem = (itemId) => {
    setSelectedItemIds(prev => {
      const exists = prev.includes(itemId);
      const updated = exists ? prev.filter(id => id !== itemId) : [...prev, itemId];
      trackEvent('scope_item_toggled', { itemId, selected: !exists });
      return updated;
    });
  };

  // Toggle add-on selection
  const handleToggleAddon = (addonId) => {
    setSelectedAddonIds(prev => {
      const exists = prev.includes(addonId);
      const updated = exists ? prev.filter(id => id !== addonId) : [...prev, addonId];
      trackEvent('scope_addon_toggled', { addonId, selected: !exists });
      return updated;
    });
  };

  // Reset to default package
  const handleResetScope = () => {
    setSelectedItemIds(['web-landing', 'content-viral30']);
    setSelectedSprintId('sprint-2week');
    setSelectedAddonIds(['addon-vitals']);
  };

  // Lock In Quote Submission
  const handleLockInSubmit = async (e) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    setIsSubmitting(true);
    try {
      const scopeSummary = {
        deliverables: quote.chosenDeliverables.map(d => `${d.name} (${d.category})`),
        addons: quote.chosenAddons.map(a => a.name),
        sprintModel: quote.sprint.name,
        estimatedDuration: `~${quote.adjustedDays} Business Days`,
        estimatedInvestment: `${quote.currencySymbol}${quote.finalPrice.toLocaleString()} ${quote.currencyCode}`,
        projectGoals: projectGoals || 'Standard digital growth & conversion build'
      };

      await submitLead({
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        company: companyName,
        service: `Scope Proposal (${quote.sprint.name})`,
        budget: `${quote.currencySymbol}${quote.finalPrice.toLocaleString()} ${quote.currencyCode}`,
        details: JSON.stringify(scopeSummary, null, 2)
      });

      trackConversion('proposal_locked_in', {
        items: quote.itemCount,
        total: quote.finalPrice,
        currency
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to submit quote lock-in:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scopeState = {
    quote,
    clientName,
    companyName,
    clientEmail,
    clientPhone,
    projectGoals
  };

  return (
    <div className="w-full bg-zinc-950 text-white min-h-screen pb-24 select-none">
      
      {/* Hero Header */}
      <ServiceHeroBackground glowPosition="top-right">
        <div className="max-w-5xl mx-auto text-center space-y-6 pt-8 pb-10 px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>INSTANT PROJECT SCOPE & AI PROPOSAL GENERATOR</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
            Configure Your Scope. <br />
            <span className="text-emerald-400">Generate Your Proposal.</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            Select your required deliverables across Web, Content, and AI. Calculate real-time pricing and timeline estimates, then instantly export an executive technical blueprint.
          </p>

          {/* View Toggle Bar (Configurator vs. Proposal Document) */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <div className="p-1.5 bg-zinc-900/90 border border-zinc-800 rounded-2xl flex items-center gap-2 shadow-2xl">
              <button
                onClick={() => {
                  setActiveTab('configurator');
                  trackEvent('view_configurator_tab');
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'configurator'
                    ? 'bg-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>1. Scope Configurator</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('proposal');
                  trackEvent('view_proposal_tab');
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'proposal'
                    ? 'bg-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>2. AI Proposal Document ({quote.itemCount})</span>
              </button>
            </div>
          </div>
        </div>
      </ServiceHeroBackground>

      {/* Main Workspace Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        
        {activeTab === 'configurator' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT 8 COLS: Deliverables & Sprint Matrix */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Currency & Control Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Select Project Deliverables</h3>
                  <p className="text-[11px] text-zinc-400">Click deliverables below to build your custom scope.</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 p-1 bg-zinc-950 border border-zinc-800 rounded-xl">
                    {Object.keys(CURRENCY_RATES).map(c => (
                      <button
                        key={c}
                        onClick={() => {
                          setCurrency(c);
                          trackEvent('currency_changed', { currency: c });
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                          currency === c
                            ? 'bg-emerald-400 text-zinc-950'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {CURRENCY_RATES[c].label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleResetScope}
                    className="p-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition cursor-pointer"
                    title="Reset to default scope"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* PILLAR SECTIONS */}
              {SCOPE_PILLARS.map(pillar => {
                const isPillarSelected = pillar.items.some(i => selectedItemIds.includes(i.id));
                return (
                  <div key={pillar.id} className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase">
                            {pillar.badge}
                          </span>
                          <h3 className="font-extrabold text-lg text-white">{pillar.title}</h3>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">{pillar.description}</p>
                      </div>
                    </div>

                    {/* Pillar Items Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {pillar.items.map(item => {
                        const isSelected = selectedItemIds.includes(item.id);
                        const rate = CURRENCY_RATES[currency].rate;
                        const itemPrice = Math.round(item.basePriceUSD * rate);

                        return (
                          <div
                            key={item.id}
                            onClick={() => handleToggleItem(item.id)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                              isSelected
                                ? 'bg-emerald-950/30 border-emerald-400 shadow-lg shadow-emerald-500/10'
                                : 'bg-zinc-950/80 border-zinc-800/90 hover:border-zinc-700 hover:bg-zinc-900/80'
                            }`}
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-start justify-between gap-2">
                                <span className="text-xs font-bold text-white leading-snug">{item.name}</span>
                                <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected
                                    ? 'bg-emerald-400 border-emerald-400 text-zinc-950'
                                    : 'border-zinc-700 bg-zinc-900'
                                }`}>
                                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                              </div>
                              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">{item.description}</p>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                              <span className="text-[10.5px] font-mono text-zinc-500">~{item.estimatedDays} Business Days</span>
                              <span className="font-mono font-bold text-emerald-400">
                                {CURRENCY_RATES[currency].symbol}{itemPrice.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* TIMELINE SPRINT SELECTION */}
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 space-y-5">
                <div>
                  <h3 className="font-extrabold text-lg text-white">Sprint Speed & Execution Model</h3>
                  <p className="text-xs text-zinc-400">Choose the pace and discovery depth that matches your launch timeline.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {TIMELINE_SPRINTS.map(sprint => {
                    const isSelected = selectedSprintId === sprint.id;
                    return (
                      <div
                        key={sprint.id}
                        onClick={() => {
                          setSelectedSprintId(sprint.id);
                          trackEvent('sprint_selected', { sprintId: sprint.id });
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                          isSelected
                            ? 'bg-emerald-950/40 border-emerald-400 shadow-lg shadow-emerald-500/10 scale-[1.02]'
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <div className="space-y-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] font-mono font-bold text-zinc-300">
                            {sprint.badge}
                          </span>
                          <h4 className="text-xs font-bold text-white pt-1">{sprint.name}</h4>
                          <p className="text-[11px] text-zinc-400 font-light leading-snug">{sprint.description}</p>
                        </div>
                        <div className="pt-2 border-t border-white/5 text-[10px] text-emerald-400 font-mono">
                          {sprint.idealFor}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* TECHNICAL ADD-ONS */}
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 space-y-5">
                <div>
                  <h3 className="font-extrabold text-lg text-white">Technical Add-Ons & Optimizations</h3>
                  <p className="text-xs text-zinc-400">Optional enterprise guarantees and infrastructure enhancements.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {TECHNICAL_ADDONS.map(addon => {
                    const isSelected = selectedAddonIds.includes(addon.id);
                    const rate = CURRENCY_RATES[currency].rate;
                    const addonPrice = Math.round(addon.priceUSD * rate);

                    return (
                      <div
                        key={addon.id}
                        onClick={() => handleToggleAddon(addon.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                          isSelected
                            ? 'bg-emerald-950/30 border-emerald-400'
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-white block">{addon.name}</span>
                            <p className="text-[11px] text-zinc-400 font-light leading-snug">{addon.description}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-emerald-400 border-emerald-400 text-zinc-950' : 'border-zinc-700 bg-zinc-900'
                          }`}>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                          <span className="text-[10px] font-mono text-zinc-500">+{addon.days} Days QA</span>
                          <span className="font-mono font-bold text-emerald-400">
                            +{CURRENCY_RATES[currency].symbol}{addonPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* RIGHT 4 COLS: Floating Live Quote Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
              <div className="p-6 sm:p-7 rounded-3xl bg-zinc-900 border-2 border-emerald-400/40 shadow-[0_0_50px_rgba(52,211,153,0.15)] space-y-6">
                
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Live Quote Estimate
                    </span>
                    <h4 className="text-sm font-bold text-white">Selected Scope Summary</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-xs font-mono font-bold text-zinc-300">
                    {quote.itemCount} Items
                  </span>
                </div>

                {/* Price Display */}
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                    {quote.currencySymbol}{quote.finalPrice.toLocaleString()}
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                    <span>Currency: {quote.currencyCode}</span>
                    <span>Sprint: {quote.sprint.name.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Timeline & Guarantee Specs */}
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-zinc-300 font-medium">
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" /> Estimated Timeline
                    </span>
                    <span className="font-mono font-bold text-white">~{quote.adjustedDays} Business Days</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-300 font-medium">
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" /> Speed Guarantee
                    </span>
                    <span className="font-mono font-bold text-emerald-400">100/100 Vitals</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-300 font-medium">
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Milestone Split
                    </span>
                    <span className="font-mono text-zinc-300">50% / 50%</span>
                  </div>
                </div>

                {/* Scope Item Preview Pills */}
                <div className="space-y-2">
                  <span className="text-[10.5px] font-mono text-zinc-400 uppercase tracking-wider block">
                    Active Deliverables:
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1 scrollbar-none">
                    {quote.chosenDeliverables.map(d => (
                      <span key={d.id} className="text-[10px] px-2 py-0.5 rounded-lg bg-zinc-800 text-zinc-300 font-medium truncate max-w-[240px]">
                        ✓ {d.name}
                      </span>
                    ))}
                    {quote.chosenAddons.map(a => (
                      <span key={a.id} className="text-[10px] px-2 py-0.5 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-medium truncate max-w-[240px]">
                        ✦ {a.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      setActiveTab('proposal');
                      trackEvent('generate_proposal_clicked', { items: quote.itemCount, total: quote.finalPrice });
                    }}
                    className="w-full py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    <span>Generate AI Proposal Blueprint</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsLockInModalOpen(true)}
                    className="w-full py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                  >
                    Lock In Quote Directly
                  </button>
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* TAB 2: PROPOSAL DOCUMENT VIEW */
          <div className="max-w-4xl mx-auto">
            <ProposalDocumentView
              scopeState={scopeState}
              onOpenLockInModal={() => setIsLockInModalOpen(true)}
            />
          </div>
        )}

      </div>

      {/* Lock In Quote Modal Dialog */}
      {isLockInModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-white relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsLockInModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleLockInSubmit} className="space-y-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Lock In Your Sprint Rate
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Submit Proposal Scope to Senior Engineering
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Lock in this estimated price of <strong>{quote.currencySymbol}{quote.finalPrice.toLocaleString()} {quote.currencyCode}</strong> (~{quote.adjustedDays} days). We'll confirm technical viability within 2 hours.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Sarah Jenkins"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                        Company / Brand Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Apex Media"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="sarah@apexmedia.com"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                      Project Goals / Target Launch Date
                    </label>
                    <textarea
                      rows={2}
                      value={projectGoals}
                      onChange={(e) => setProjectGoals(e.target.value)}
                      placeholder="e.g. Q3 product launch, redesigning our funnel, need 100/100 Lighthouse score..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-emerald-400 outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-[0_0_25px_rgba(52,211,153,0.3)] disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Submitting Proposal Scope...' : 'Lock In Quote & Schedule Discovery'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-400/20 border border-emerald-400/50 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                  <CheckCircle2 className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-xl font-black text-white">Proposal Scope Locked In!</h3>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{clientName}</strong>. Our senior systems architects have received your full scope configuration ({quote.itemCount} deliverables, {quote.currencySymbol}{quote.finalPrice.toLocaleString()} {quote.currencyCode}) and will review your blueprint within 2 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setIsLockInModalOpen(false);
                    }}
                    className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
