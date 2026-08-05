import React from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import TrustBadges from '../components/common/TrustBadges';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';

export default function PrivacyPolicyPage({ onSelectTab, onOpenBooking }) {
  const handleLinkClick = (e, tab) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(tab);
  };

  return (
    <div className="space-y-16 pb-20 select-none">
      <ServiceHeroBackground glowPosition="top-left">
        <div className="max-w-4xl mx-auto text-center space-y-6 pt-8 pb-12 px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>LEGAL & COMPLIANCE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Privacy Policy
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 font-mono">
            Last Updated: August 5, 2026 • Effective Date: January 1, 2026
          </p>
        </div>
      </ServiceHeroBackground>

      <TrustBadges />

      <section aria-labelledby="privacy-content" className="max-w-4xl mx-auto px-6 text-zinc-300 space-y-8 text-xs sm:text-sm leading-relaxed font-light">
        <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6">
          <h2 id="privacy-content" className="text-xl font-bold text-white uppercase tracking-tight">
            1. Overview & Data Commitment
          </h2>
          <p>
            At <strong>LaunchGremlin</strong> ("we," "our," or "us"), operated under strict data security standards, we respect your privacy and are committed to protecting personal data collected through <code>https://launchgremlin.com</code>. This Privacy Policy explains how we collect, use, store, and safeguard your information when you interact with our website, request strategy sessions, or utilize our web development and AI consulting services.
          </p>

          <h2 className="text-xl font-bold text-white uppercase tracking-tight">
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400 font-mono">
            <li><strong>Personal Contact Data:</strong> Name, work email address, phone/WhatsApp number, company name, and website URL provided voluntarily via scope builders or booking forms.</li>
            <li><strong>Technical Analytics Data:</strong> IP address, browser type, operating system, referral URL, and interaction metrics processed via anonymized privacy-first analytics tools.</li>
            <li><strong>Project Requirements:</strong> Technical specifications, target launch dates, and budget parameters submitted during strategic audits.</li>
          </ul>

          <h2 className="text-xl font-bold text-white uppercase tracking-tight">
            3. How We Use Your Information
          </h2>
          <p>
            We use collected information solely to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400 font-mono">
            <li>Evaluate project requirements and deliver custom technical proposals.</li>
            <li>Schedule 1-on-1 strategy calls and calendar confirmations.</li>
            <li>Improve website performance, Core Web Vitals, and user experience.</li>
            <li>Maintain enterprise security and prevent fraudulent inquiries.</li>
          </ul>

          <h2 className="text-xl font-bold text-white uppercase tracking-tight">
            4. Data Confidentiality & Non-Disclosure
          </h2>
          <p>
            We adhere to strict non-disclosure standards. <strong>LaunchGremlin will never sell, rent, or trade your personal data to third parties for marketing purposes.</strong> All project communications remain 100% confidential.
          </p>

          <h2 className="text-xl font-bold text-white uppercase tracking-tight">
            5. Contact Us Regarding Privacy
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request data erasure, please contact our data protection team at <a href="mailto:privacy@launchgremlin.com" className="text-emerald-400 hover:underline">privacy@launchgremlin.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
