import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Video,
  Layers,
  Smartphone,
  FileText,
  Copy,
  Check,
  Building2,
  FileCode,
  Download,
  CheckSquare,
  ArrowLeft,
  Send,
  MessageSquare
} from 'lucide-react';
import { contentEngineService } from '../services/contentEngineService';
import { tenantManager } from '../utils/tenantConfig';
import { downloadLeadMagnetHtml } from '../utils/leadMagnetGenerator';
import VoiceoverStudio from '../components/content-engine/VoiceoverStudio';
import SlideExporterModal from '../components/content-engine/SlideExporterModal';

export default function ClientApprovalPortalPage({ packageId }) {
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('video'); // 'video', 'carousel', 'before_after', 'caption'
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [copiedKey, setCopiedKey] = useState(null);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);

  // Approval Form State
  const [clientName, setClientName] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApprovedSuccess, setIsApprovedSuccess] = useState(false);

  useEffect(() => {
    async function fetchDraft() {
      setLoading(true);
      try {
        const drafts = await contentEngineService.getDrafts();
        const found = drafts.find(
          (d) => d.intake_id === packageId || d.id === packageId
        ) || drafts[0];
        setDraft(found || null);
      } finally {
        setLoading(false);
      }
    }
    fetchDraft();
  }, [packageId]);

  const activeTenant = tenantManager.getActiveTenant();

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-mono text-zinc-400">Loading Client Review Portal...</p>
        </div>
      </div>
    );
  }

  if (!draft) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 text-white">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md text-center space-y-4">
          <Building2 className="w-10 h-10 text-zinc-500 mx-auto" />
          <h2 className="text-lg font-bold">Package Not Found</h2>
          <p className="text-xs text-zinc-400">
            The content package with ID "{packageId}" could not be located.
          </p>
          <a
            href="/content-engine"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Content Engine
          </a>
        </div>
      </div>
    );
  }

  const { formats, chosen_hook, title, intake_id, status } = draft;
  const tc = formats?.talking_clip || {};
  const caro = formats?.carousel || {};
  const ba = formats?.before_after || {};
  const co = formats?.caption_only || {};

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleClientApprove = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const fullNotes = `Approved by ${clientName || 'Client'}: ${reviewNotes || 'Approved without changes'}`;
      await contentEngineService.approveDraft(draft.intake_id || draft.id, fullNotes);
      setDraft({
        ...draft,
        status: 'APPROVED',
        review_notes: fullNotes
      });
      setIsApprovedSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top White-Label Client Brand Bar */}
      <header className="border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-black shadow-md"
              style={{ backgroundColor: activeTenant.accentColor || '#10b981' }}
            >
              <Building2 className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-white leading-none">{activeTenant.name}</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                  Client Portal
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 font-mono">{activeTenant.handle}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-3 py-1 rounded-full font-bold font-mono ${
                draft.status === 'APPROVED'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              }`}
            >
              {draft.status === 'APPROVED' ? 'STATUS: APPROVED ✅' : 'PENDING REVIEW ⏳'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Review Body */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Title & Core Hook Header */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span>PACKAGE REF: {intake_id}</span>
            <span>·</span>
            <span>PILLAR: {draft.pillar || 'Educational'}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{title}</h2>
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
              Core Strategic Hook:
            </span>
            <p className="text-base font-bold text-white">"{chosen_hook}"</p>
          </div>
        </div>

        {/* 4 Formats Interactive Tab Strip */}
        <div className="flex border-b border-zinc-800 bg-zinc-900/50 rounded-2xl p-1.5 gap-1 overflow-x-auto">
          {[
            { id: 'video', label: '🎬 1. Video Script & Voiceover', icon: Video },
            { id: 'carousel', label: '📱 2. 5-Slide Carousel Guide', icon: Layers },
            { id: 'before_after', label: '⚖️ 3. Before & After Proof', icon: Smartphone },
            { id: 'caption', label: '✍️ 4. Social Feed Captions', icon: FileText }
          ].map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`px-5 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Views */}
        <div className="space-y-6">
          {/* TAB 1: VIDEO SCRIPT & VOICEOVER */}
          {activeTab === 'video' && (
            <div className="space-y-6">
              {/* Embedded Voiceover Synthesizer */}
              <VoiceoverStudio scriptScenes={tc.scenes || []} cta={draft.cta} />

              {/* Scene Cards Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tc.scenes?.map((sc) => (
                  <div
                    key={sc.scene}
                    className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        SCENE 0{sc.scene}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded">
                        {sc.on_screen_text}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase font-semibold block">
                        Spoken Voice:
                      </span>
                      <p className="text-sm font-semibold text-white mt-0.5 leading-relaxed">
                        "{sc.audio_spoken}"
                      </p>
                    </div>
                    <div className="text-xs text-zinc-400 pt-2 border-t border-zinc-850">
                      <span className="text-zinc-500">Visual:</span> {sc.visual}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: 5-SLIDE CAROUSEL */}
          {activeTab === 'carousel' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">
                  Swipe through the 5-Slide Carousel cards below:
                </span>
                <button
                  type="button"
                  onClick={() => setIsSlideModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-4 h-4" /> Download 1080×1350 PNG Cards
                </button>
              </div>

              {/* Slide Buttons */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {caro.slides?.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlideIdx(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border ${
                      activeSlideIdx === idx
                        ? 'bg-emerald-500 text-zinc-950 border-emerald-400 font-bold'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                    }`}
                  >
                    Slide 0{s.slide_number}
                  </button>
                ))}
              </div>

              {/* Interactive Card */}
              {caro.slides?.[activeSlideIdx] && (
                <div className="aspect-[4/3] max-w-lg mx-auto bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border-2 border-zinc-800 rounded-3xl p-8 flex flex-col justify-between shadow-2xl">
                  <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <span className="font-bold text-white">{activeTenant.name}</span>
                    <span>
                      0{caro.slides[activeSlideIdx].slide_number} / 0{caro.slides.length}
                    </span>
                  </div>

                  <div className="my-auto space-y-3 text-center">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold uppercase">
                      {caro.slides[activeSlideIdx].type}
                    </span>
                    <h3 className="text-xl font-extrabold text-white leading-tight">
                      {caro.slides[activeSlideIdx].headline}
                    </h3>
                    {caro.slides[activeSlideIdx].body && (
                      <p className="text-xs text-zinc-300 leading-relaxed max-w-sm mx-auto">
                        {caro.slides[activeSlideIdx].body}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
                    <span className="truncate">🎨 {caro.slides[activeSlideIdx].visual_cue}</span>
                    <span className="text-emerald-400 font-bold ml-2">Swipe 👉</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BEFORE & AFTER */}
          {activeTab === 'before_after' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-zinc-900 border border-red-500/20 space-y-3">
                <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold uppercase">
                  {ba.before_state?.badge || '❌ Traditional Approach'}
                </span>
                <h4 className="text-base font-bold text-white">{ba.before_state?.label}</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">{ba.before_state?.description}</p>
              </div>

              <div className="p-6 rounded-3xl bg-zinc-900 border border-emerald-500/40 space-y-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">
                  {ba.after_state?.badge || '⚡ High Conversion Standard'}
                </span>
                <h4 className="text-base font-bold text-white">{ba.after_state?.label}</h4>
                <p className="text-xs text-zinc-200 leading-relaxed">{ba.after_state?.description}</p>
              </div>
            </div>
          )}

          {/* TAB 4: SOCIAL CAPTIONS */}
          {activeTab === 'caption' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-bold text-zinc-300">Ready-to-Post Instagram & LinkedIn Caption:</span>
                <button
                  type="button"
                  onClick={() => handleCopy(tc.captions?.instagram || co.text || '', 'client-cap')}
                  className="text-xs text-emerald-400 font-bold flex items-center gap-1"
                >
                  {copiedKey === 'client-cap' ? (
                    <>
                      <Check className="w-4 h-4" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy Caption
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed">
                {tc.captions?.instagram || co.text || 'No caption generated.'}
              </pre>
            </div>
          )}
        </div>

        {/* Lead Magnet Asset Download */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Download Companion Action Checklist</h4>
              <p className="text-xs text-zinc-400">
                1-page printable checklist for "Comment 'CHECKLIST'" lead generation funnels.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => downloadLeadMagnetHtml(draft)}
            className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-400" /> Download Checklist (HTML/PDF)
          </button>
        </div>

        {/* Client Sign-Off & Approval Form */}
        <div className="bg-zinc-900 border-2 border-emerald-500/40 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Client Review Sign-Off</h3>
              <p className="text-xs text-zinc-400">
                Approve this content batch for production scheduling or request revisions below.
              </p>
            </div>
          </div>

          {isApprovedSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Content Approved for Scheduling! 🎉</h4>
              <p className="text-xs text-zinc-300">
                Thank you! Your approval signature and notes have been logged to the LaunchGremlin engine.
              </p>
            </div>
          ) : (
            <form onSubmit={handleClientApprove} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Your Full Name / Signer
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Dr. Sarah Moodley"
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Approval Notes / Revision Requests (Optional)
                  </label>
                  <input
                    type="text"
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="e.g. Approved! Looks great to post on Tuesday."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !clientName.trim()}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  {isSubmitting ? 'Recording Approval...' : '✅ Approve Copy for Publishing'}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Slide Exporter Modal */}
      <SlideExporterModal
        isOpen={isSlideModalOpen}
        onClose={() => setIsSlideModalOpen(false)}
        draftPackage={draft}
      />
    </div>
  );
}
