import React, { useState } from 'react';
import {
  Printer,
  Copy,
  Check,
  Download,
  ShieldCheck,
  Clock,
  Sparkles,
  Zap,
  Globe,
  TrendingUp,
  Bot,
  ArrowRight
} from 'lucide-react';
import { generateProposalDocument } from '../../utils/scopePricingData';
import { trackEvent } from '../../utils/analytics';

export default function ProposalDocumentView({ scopeState, onOpenLockInModal }) {
  const [copied, setCopied] = useState(false);
  const { quote, clientName, companyName, clientEmail, projectGoals } = scopeState;

  const handleCopyMarkdown = () => {
    const md = generateProposalDocument(scopeState);
    navigator.clipboard.writeText(md);
    setCopied(true);
    trackEvent('proposal_copied_markdown', { items: quote.itemCount, total: quote.finalPrice });
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    trackEvent('proposal_printed', { items: quote.itemCount, total: quote.finalPrice });
    window.print();
  };

  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Top Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Executive Proposal Blueprint (Ready to Export)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Markdown!' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-400" />
            <span>Print / Save PDF</span>
          </button>

          <button
            onClick={onOpenLockInModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-xs font-black uppercase tracking-wider transition cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            <span>Lock In Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Printable Document Paper Card */}
      <div className="bg-white text-zinc-950 rounded-3xl p-8 sm:p-12 shadow-2xl border border-zinc-200 space-y-8 font-sans">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-zinc-200 pb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="font-black text-2xl tracking-tight text-zinc-950">
                Launch<span className="text-emerald-600">Gremlin</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-300 text-[10px] font-mono font-bold text-zinc-700">
                OFFICIAL PROPOSAL
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium">Internet-Native Growth • Websites • Content • Enterprise AI</p>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">https://launchgremlin.com • bhalisasodo10@gmail.com</p>
          </div>

          <div className="sm:text-right space-y-1 text-xs text-zinc-600 font-mono">
            <div><strong>Date:</strong> {dateStr}</div>
            <div><strong>Reference:</strong> LG-PROP-{Math.abs(quote.finalPrice * 17).toString().slice(0, 6)}</div>
            <div><strong>Sprint Model:</strong> {quote.sprint.name}</div>
            <div><strong>Estimated Turnaround:</strong> ~{quote.adjustedDays} Business Days</div>
          </div>
        </div>

        {/* Client & Goal Metadata Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-zinc-400 uppercase text-[10px] tracking-wider block">Prepared For</span>
            <div className="font-black text-base text-zinc-900">{clientName || 'Client Partner'}</div>
            {companyName && <div className="text-zinc-600 font-medium">{companyName}</div>}
            {clientEmail && <div className="text-zinc-500 font-mono">{clientEmail}</div>}
          </div>
          <div className="space-y-1">
            <span className="font-bold text-zinc-400 uppercase text-[10px] tracking-wider block">Strategic Focus</span>
            <div className="font-bold text-zinc-800 leading-snug">
              {projectGoals || 'Sub-second high-converting web architecture, audience growth engine & workflow automation.'}
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-3">
          <h3 className="text-base font-black text-zinc-900 uppercase tracking-tight flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-mono">1</span>
            Executive Summary & Target Outcomes
          </h3>
          <p className="text-xs text-zinc-700 leading-relaxed">
            LaunchGremlin has architected this comprehensive implementation plan to eliminate key operational bottlenecks, maximize inbound visitor conversion, and deliver sub-second mobile performance. Our engineering standard pairs bleeding-edge JAMstack technology with data-informed content systems.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
              <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold block">Performance</span>
              <span className="font-black text-sm text-zinc-900">100/100 Core Vitals</span>
              <span className="text-[11px] text-zinc-500 block mt-0.5">Sub-500ms TTFB globally</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
              <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold block">Turnaround</span>
              <span className="font-black text-sm text-zinc-900">~{quote.adjustedDays} Days Sprint</span>
              <span className="text-[11px] text-zinc-500 block mt-0.5">{quote.sprint.badge}</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
              <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold block">Support</span>
              <span className="font-black text-sm text-zinc-900">14-Day Hypercare</span>
              <span className="text-[11px] text-zinc-500 block mt-0.5">Post-launch zero downtime</span>
            </div>
          </div>
        </div>

        {/* Section 2: Selected Scope & Deliverables Table */}
        <div className="space-y-3">
          <h3 className="text-base font-black text-zinc-900 uppercase tracking-tight flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-mono">2</span>
            Detailed Scope of Work ({quote.itemCount} Deliverables)
          </h3>

          <div className="overflow-x-auto border border-zinc-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-100 border-b border-zinc-200 text-zinc-700 font-mono uppercase text-[10px]">
                <tr>
                  <th className="p-3 font-bold">Deliverable</th>
                  <th className="p-3 font-bold">Pillar</th>
                  <th className="p-3 font-bold">Category</th>
                  <th className="p-3 font-bold text-right">Turnaround</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {quote.chosenDeliverables.map((item, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/80">
                    <td className="p-3">
                      <div className="font-bold text-zinc-900">{item.name}</div>
                      <div className="text-[11px] text-zinc-500 mt-0.5">{item.description}</div>
                    </td>
                    <td className="p-3 font-medium text-zinc-600">{item.pillarName.split(' ')[0]}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 text-[10px] font-medium border border-zinc-200">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-right text-zinc-600">~{item.estimatedDays} Days</td>
                  </tr>
                ))}
                {quote.chosenAddons.map((addon, idx) => (
                  <tr key={`addon-${idx}`} className="bg-emerald-50/40">
                    <td className="p-3">
                      <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        {addon.name}
                      </div>
                      <div className="text-[11px] text-zinc-600 mt-0.5">{addon.description}</div>
                    </td>
                    <td className="p-3 font-medium text-emerald-800">Add-On Upgrade</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-medium">
                        Optimization
                      </span>
                    </td>
                    <td className="p-3 font-mono text-right text-emerald-800">+{addon.days} Days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Recommended Technology Stack */}
        <div className="space-y-3">
          <h3 className="text-base font-black text-zinc-900 uppercase tracking-tight flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-mono">3</span>
            Recommended Architecture Stack
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 space-y-1">
              <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                Frontend Core
              </div>
              <p className="text-zinc-600 text-[11px]">
                React 18 + Vite / Next.js with Tailwind CSS v4 design tokens, client-side caching, and sub-50ms paint times.
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 space-y-1">
              <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-emerald-600" />
                AI & Workflow Engine
              </div>
              <p className="text-zinc-600 text-[11px]">
                Node.js + Python pipelines with vector embeddings (Pinecone/Chroma) and resilient webhook integrations.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Commercial Investment Breakdown */}
        <div className="p-6 bg-zinc-900 text-white rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Total Commercial Investment
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                {quote.currencySymbol}{quote.finalPrice.toLocaleString()} <span className="text-sm font-normal text-zinc-400">{quote.currencyCode}</span>
              </div>
            </div>
            <div className="text-right text-xs text-zinc-400 space-y-1 font-mono">
              <div>Sprint: <strong>{quote.sprint.name}</strong></div>
              <div>Estimated Duration: <strong>~{quote.adjustedDays} Business Days</strong></div>
              <div className="text-emerald-400 font-bold">✓ 100/100 Core Web Vitals Guarantee</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300 pt-1 font-light">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>50/50 Milestones:</strong> 50% deposit to commence sprint, 50% upon final production sign-off.</span>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Full IP Ownership:</strong> 100% intellectual property, source code, and assets transferred to client.</span>
            </div>
          </div>
        </div>

        {/* Section 5: Authorization Sign-Off */}
        <div className="pt-4 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs text-zinc-600">
          <div className="space-y-6">
            <span className="font-bold text-zinc-900 block uppercase tracking-wider text-[10px]">For LaunchGremlin</span>
            <div className="border-b border-zinc-300 pb-1 font-mono text-zinc-900 font-bold">Bhalisa Sodo</div>
            <div className="text-[11px] text-zinc-500">Founder & Lead Systems Architect</div>
          </div>

          <div className="space-y-6">
            <span className="font-bold text-zinc-900 block uppercase tracking-wider text-[10px]">Authorized Client Acceptance</span>
            <div className="border-b border-dashed border-zinc-400 pb-1 text-zinc-400 italic">
              {clientName ? `${clientName} (Approved Online)` : 'Signature / Authorized Representative'}
            </div>
            <div className="text-[11px] text-zinc-500">Name & Title</div>
          </div>
        </div>

      </div>

      {/* Bottom Sticky Action Lock-In Bar */}
      <div className="p-6 bg-gradient-to-r from-emerald-950/60 via-zinc-900 to-zinc-900 border border-emerald-500/30 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <div>
          <h4 className="font-black text-white text-base">Ready to lock in this sprint & timeline?</h4>
          <p className="text-xs text-zinc-300 mt-0.5">
            Submit your proposal directly to senior engineering to reserve your sprint date.
          </p>
        </div>
        <button
          onClick={onOpenLockInModal}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-[0_0_25px_rgba(52,211,153,0.3)] flex items-center justify-center gap-2"
        >
          <span>Lock In Quote & Schedule Sprint</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
