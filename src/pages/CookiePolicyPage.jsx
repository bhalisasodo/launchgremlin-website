import React from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import TrustBadges from '../components/common/TrustBadges';
import { Cookie, ShieldCheck } from 'lucide-react';

export default function CookiePolicyPage({ onSelectTab, onOpenBooking }) {
  return (
    <div className="space-y-16 pb-20 select-none">
      <ServiceHeroBackground glowPosition="top-left">
        <div className="max-w-4xl mx-auto text-center space-y-6 pt-8 pb-12 px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold tracking-wider">
            <Cookie className="w-3.5 h-3.5" />
            <span>COOKIE POLICY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Cookie & Tracking Policy
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 font-mono">
            Last Updated: August 5, 2026 • Effective Date: January 1, 2026
          </p>
        </div>
      </ServiceHeroBackground>

      <TrustBadges />

      <section aria-labelledby="cookie-content" className="max-w-4xl mx-auto px-6 text-zinc-300 space-y-8 text-xs sm:text-sm leading-relaxed font-light">
        <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6">
          <h2 id="cookie-content" className="text-xl font-bold text-white uppercase tracking-tight">
            1. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files stored on your device when visiting websites. At <strong>LaunchGremlin</strong>, we utilize essential session cookies and privacy-focused telemetry to ensure fast, secure navigation.
          </p>

          <h2 className="text-xl font-bold text-white uppercase tracking-tight">
            2. Types of Cookies We Use
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400 font-mono">
            <li><strong>Strictly Necessary Cookies:</strong> Required for site navigation, tab state persistence, and form submission security.</li>
            <li><strong>Performance Analytics Cookies:</strong> Anonymized Core Web Vitals telemetry tracking page load latency and interaction speed without collecting personally identifiable data.</li>
          </ul>

          <h2 className="text-xl font-bold text-white uppercase tracking-tight">
            3. Managing Cookie Preferences
          </h2>
          <p>
            You can modify your browser settings to decline cookies at any time. Disabling essential cookies will not disrupt standard browsing on LaunchGremlin.com.
          </p>
        </div>
      </section>
    </div>
  );
}
