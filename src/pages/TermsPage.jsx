import React from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import TrustBadges from '../components/common/TrustBadges';
import { ShieldCheck, FileText } from 'lucide-react';

export default function TermsPage({ onSelectTab, onOpenBooking }) {
  return (
    <div className="space-y-16 pb-20 select-none">
      <ServiceHeroBackground glowPosition="top-left">
        <div className="max-w-4xl mx-auto text-center space-y-6 pt-8 pb-12 px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>TERMS OF SERVICE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Terms of Service
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 font-mono">
            Last Updated: August 5, 2026 • Effective Date: January 1, 2026
          </p>
        </div>
      </ServiceHeroBackground>

      <TrustBadges />

      <section aria-labelledby="terms-content" className="max-w-4xl mx-auto px-6 text-zinc-300 space-y-8 text-xs sm:text-sm leading-relaxed font-light">
        <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6">
          <h2 id="terms-content" className="text-xl font-bold text-white uppercase tracking-tight">
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using <strong>LaunchGremlin</strong> (<code>https://launchgremlin.com</code>), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue use of the website immediately.
          </p>

          <h2 className="text-xl font-bold text-white uppercase tracking-tight">
            2. Intellectual Property Rights
          </h2>
          <p>
            All custom source code, brand assets, articles, documentation, software tools, and design interfaces published on LaunchGremlin are the exclusive intellectual property of LaunchGremlin.
          </p>

          <h2 className="text-xl font-bold text-white uppercase tracking-tight">
            3. Client Deliverables & 72-Hour Guarantees
          </h2>
          <p>
            Service contracts, project timelines (including 7-10 day standard delivery and 72-Hour MVP rapid sprints), and deliverable milestones are defined in formal statement of work (SOW) agreements. Performance benchmarks (including 100/100 Core Web Vitals guarantees) are backed by automated lighthouse testing scripts.
          </p>

          <h2 className="text-xl font-bold text-white uppercase tracking-tight">
            4. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, LaunchGremlin shall not be liable for indirect, incidental, or consequential damages resulting from website downtime or third-party API provider disruptions.
          </p>
        </div>
      </section>
    </div>
  );
}
