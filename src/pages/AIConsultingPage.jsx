import React from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import AIConsultingHeroScene from '../components/services/AIConsultingHeroScene';
import { Bot, Workflow, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function AIConsultingPage({ onOpenBooking }) {
  return (
    <div className="space-y-20 pb-20">
      {/* Handcrafted Service Hero System */}
      <ServiceHeroBackground glowPosition="top-left">
        <AIConsultingHeroScene onOpenBooking={onOpenBooking} />
      </ServiceHeroBackground>

      {/* AI Solutions & Outcomes Grid */}
      <section className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>BUSINESS AUTOMATION SUITE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Your AI Workforce Operates
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            Deploy specialized AI employees tailored to your exact business workflows—saving time, eliminating human error, and scaling revenue 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 hover:border-emerald-400/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Autonomous AI Employees</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Custom AI agents that handle lead qualification, customer onboarding, research lookups, and content generation continuously without manual intervention.
            </p>
            <ul className="space-y-1.5 text-xs font-mono text-emerald-400 pt-2 border-t border-zinc-800">
              <li className="flex items-center gap-2">✓ Lead Qualified in &lt; 30s</li>
              <li className="flex items-center gap-2">✓ Instant Meeting Booking</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 hover:border-emerald-400/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Workflow className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Operational Pipeline Triggers</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Connect your CRM, accounting tools, Slack, and email systems into seamless, automated pipeline triggers that eliminate repetitive tasks.
            </p>
            <ul className="space-y-1.5 text-xs font-mono text-emerald-400 pt-2 border-t border-zinc-800">
              <li className="flex items-center gap-2">✓ Automated Invoice Sent</li>
              <li className="flex items-center gap-2">✓ Real-time CRM Sync</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 hover:border-emerald-400/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">24/7 Knowledge & Data Autopilot</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Convert company documentation, SOPs, customer guides, and internal databases into an intelligent workforce that answers inquiries and drafts proposals.
            </p>
            <ul className="space-y-1.5 text-xs font-mono text-emerald-400 pt-2 border-t border-zinc-800">
              <li className="flex items-center gap-2">✓ Customer Ticket Resolved</li>
              <li className="flex items-center gap-2">✓ Proposal Auto-Generated</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
