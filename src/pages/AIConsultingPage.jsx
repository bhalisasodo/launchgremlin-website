import React from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import PricingSection from '../components/common/PricingSection';
import TrustBadges from '../components/common/TrustBadges';
import VectorRagSandbox from '../components/interactive/VectorRagSandbox';
import { ArrowRight, Bot, Cpu, Database, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AIConsultingPage({ onSelectTab, onOpenBooking }) {
  const handleLinkClick = (e, tab) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(tab);
  };

  const supportingArticles = [
    { slug: 'how-to-build-custom-ai-agents-for-business', title: 'How to Build Custom Autonomous AI Agents for Your Business in 2026', readTime: '14 min read' },
    { slug: 'ai-workflow-automation-for-small-business', title: 'AI Workflow Automation for Small Business: Save 100+ Hours Every Month', readTime: '10 min read' },
    { slug: 'retrieval-augmented-generation-rag-guide', title: 'The Enterprise Guide to RAG (Retrieval-Augmented Generation) & Vector Databases', readTime: '15 min read' },
    { slug: 'ai-lead-qualification-chatbots', title: 'AI Lead Qualification: Convert Web Traffic into Booked Appointments 24/7', readTime: '9 min read' }
  ];

  return (
    <div className="space-y-20 pb-20 select-none">
      {/* Hero Section */}
      <ServiceHeroBackground glowPosition="top-right">
        <div className="max-w-5xl mx-auto text-center space-y-6 pt-8 pb-12 px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold tracking-wider">
            <Bot className="w-3.5 h-3.5" />
            <span>ENTERPRISE AI CONSULTING & WORKFLOWS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
            AUTONOMOUS AI AGENTS & WORKFLOW PIPELINES.
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            Save hundreds of hours monthly. We build custom 24/7 AI agents, internal knowledge RAG vector search, and CRM automation pipelines.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Book AI Audit Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/websites"
              onClick={(e) => handleLinkClick(e, 'websites')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-semibold hover:border-emerald-400 hover:text-white transition-all cursor-pointer"
            >
              <span>Explore Custom Web Development</span>
            </a>
          </div>
        </div>
      </ServiceHeroBackground>

      <TrustBadges />

      {/* Feature Pillars */}
      <section aria-labelledby="ai-features-title" className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
            Autonomous Systems
          </span>
          <h2 id="ai-features-title" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Custom AI Workforce & Pipelines
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <Bot className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">24/7 Lead Qualification Agents</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Conversational AI agents pre-screen prospective clients, answer technical questions, and schedule meetings directly into your calendar.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <Database className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Vector Search RAG Systems</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Transform private PDFs, documentation, and CRM data into secure internal AI search engines with zero public data leaks.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <Cpu className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">CRM & Database Automation</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Automated data entry, lead scoring, proposal generation, and multi-app integrations connecting Stripe, HubSpot, and Zapier.
            </p>
          </div>
        </div>
      </section>

      {/* HUMAN AI INTEGRATION VISUAL STORYTELLING SHOWCASE */}
      <section aria-labelledby="ai-human-heading" className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-8 sm:p-12 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl">
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
              Human-Centric AI Automation
            </span>
            <h2 id="ai-human-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase leading-tight">
              AI Built To Empower Teams, Not Replace Them.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
              We deploy intelligent AI agents that handle repetitive administrative workflows, qualifying leads, routing client data, and pulling documentation so your team can focus on high-value strategy and creative execution.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-zinc-200 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Save 100+ Hours Per Month Per Team Member</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-200 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Enterprise Data Privacy & Local Vector Vector Security</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-emerald-400/30 shadow-[0_0_40px_rgba(52,211,153,0.15)]">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80"
                alt="Professionals reviewing AI workflow dashboards in modern office"
                width="1000"
                height="700"
                loading="lazy"
                decoding="async"
                className="w-full h-[380px] sm:h-[440px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Vector RAG & Semantic Search Sandbox */}
      <VectorRagSandbox onOpenBooking={onOpenBooking} />

      {/* Pricing Section */}
      <PricingSection onOpenBooking={onOpenBooking} onSelectTab={onSelectTab} />

      {/* Supporting Blog Guides */}
      <section aria-labelledby="ai-blogs-title" className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">
              AI Engineering Knowledge Base
            </span>
            <h2 id="ai-blogs-title" className="text-2xl font-extrabold text-white uppercase tracking-tight">
              Supporting AI Technical Guides & Case Studies
            </h2>
          </div>
          <a
            href="/blog"
            onClick={(e) => handleLinkClick(e, 'blog')}
            className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All 100 Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {supportingArticles.map((art) => (
            <a
              key={art.slug}
              href={`/blog/${art.slug}`}
              onClick={(e) => handleLinkClick(e, `blog/${art.slug}`)}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-400/50 transition-all space-y-3 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                  {art.readTime}
                </span>
                <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {art.title}
                </h3>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 group-hover:text-emerald-400">
                <span>Read AI Blueprint</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section aria-labelledby="ai-cta-title" className="max-w-4xl mx-auto px-6">
        <div className="p-10 sm:p-14 rounded-3xl bg-zinc-900/90 border border-emerald-400/40 text-center space-y-6 shadow-[0_0_50px_rgba(52,211,153,0.15)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Automate Your Workflows</span>
          </div>

          <h2 id="ai-cta-title" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Deploy Custom AI Agents For Your Business.
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
            Schedule an AI architecture consultation with our engineering team to map out your autonomous workforce.
          </p>

          <button
            onClick={onOpenBooking}
            aria-label="Book AI Strategy Call"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
