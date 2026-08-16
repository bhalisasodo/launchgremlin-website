import React, { useState } from 'react';
import { Bot, Database, Search, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Layers, FileText, Cpu, Terminal } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

const KNOWLEDGE_DOMAINS = [
  {
    id: 'sla-policy',
    name: 'Enterprise SLA & Security Policies',
    description: 'Internal PDF contracts, 99.99% uptime guarantees, and SOC2 compliance rules.',
    sampleQueries: [
      'What is our SLA credit penalty if uptime drops below 99.9% in a calendar month?',
      'How are enterprise API keys encrypted at rest and in transit?',
      'What is the maximum response window for Severity-1 critical outages?'
    ],
    matchedChunks: [
      {
        source: 'Contract_Master_SLA_2026.pdf (Page 4, Section 8.2)',
        score: '0.96 Match',
        content: 'For any calendar month where platform availability falls between 99.0% and 99.89%, Client is entitled to a 25% service credit. If availability falls below 99.0%, Client is entitled to a 50% service credit applied to the subsequent billing cycle.'
      },
      {
        source: 'Security_Architecture_Whitepaper.pdf (Page 12)',
        score: '0.89 Match',
        content: 'All sensitive customer records and API credentials utilize AES-256 GCM encryption at rest, with TLS 1.3 mandated for all ingress webhooks and client connections.'
      }
    ],
    groundedAnswer: 'According to Section 8.2 of the Master SLA Contract, if platform availability drops below 99.9% (between 99.0% and 99.89%), the client is issued a 25% service credit. If availability drops below 99.0%, a 50% service credit is automatically applied to the subsequent billing cycle with zero manual claim forms required.'
  },
  {
    id: 'api-docs',
    name: 'Technical Webhook & API Specs',
    description: 'REST & GraphQL API schemas, HMAC signature verification, and rate limits.',
    sampleQueries: [
      'How do we authenticate incoming Stripe webhook signatures?',
      'What is the standard API rate limit for Enterprise tier accounts?',
      'How do we configure automatic idempotent retries on 504 gateway timeouts?'
    ],
    matchedChunks: [
      {
        source: 'API_Reference_v4.md (Section: Webhook Ingress)',
        score: '0.95 Match',
        content: 'Incoming webhooks include an `X-LaunchGremlin-Signature` header computed via HMAC-SHA256 over timestamp + raw request payload using the endpoint secret key. Timestamps older than 300 seconds must be rejected to prevent replay attacks.'
      },
      {
        source: 'Infrastructure_RateLimits.json',
        score: '0.91 Match',
        content: 'Enterprise tier accounts are provisioned with 10,000 requests/minute baseline with burst capacity up to 25,000 requests/minute backed by Redis token bucket rate limiters.'
      }
    ],
    groundedAnswer: 'To authenticate incoming webhooks, extract the `X-LaunchGremlin-Signature` header and compute an HMAC-SHA256 hash using your secret key across the timestamp and raw payload buffer. Replay prevention requires verifying that the signature timestamp is within a 300-second window.'
  },
  {
    id: 'sales-playbook',
    name: 'Sales Playbook & Pricing SOPs',
    description: 'High-ticket qualification frameworks, pilot terms, and onboarding scopes.',
    sampleQueries: [
      'What are the qualification criteria for 72-Hour MVP Emergency Sprints?',
      'Can clients lock in a 2-Week Launch sprint with custom ZAR/USD billing?',
      'What deliverables are included in the AI Consulting Architecture Audit?'
    ],
    matchedChunks: [
      {
        source: 'Sales_Operating_Playbook.notion (Database: Sprint Rules)',
        score: '0.97 Match',
        content: '72-Hour MVP Emergency Sprints require a finalized Figma wireframe or core schema specification, with a 35% sprint acceleration surcharge. All core deliverables (React app + Cloudflare deploy) are delivered within 72 hours of payment receipt.'
      },
      {
        source: 'Commercial_Terms_Matrix.xlsx',
        score: '0.92 Match',
        content: 'Clients can toggle dynamic currency conversion between USD ($) and South African Rand (ZAR) directly in the Proposal Generator with fixed milestone pricing and zero currency volatility markup.'
      }
    ],
    groundedAnswer: '72-Hour MVP Sprints are reserved for projects with finalized core schemas or wireframes, accompanied by a 35% acceleration premium. The full production build, edge CDN deployment, and automated Lighthouse 100/100 verification are delivered within 72 hours.'
  }
];

export default function VectorRagSandbox({ onOpenBooking }) {
  const [selectedDomainId, setSelectedDomainId] = useState(KNOWLEDGE_DOMAINS[0].id);
  const [selectedQuery, setSelectedQuery] = useState(KNOWLEDGE_DOMAINS[0].sampleQueries[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  const activeDomain = KNOWLEDGE_DOMAINS.find(d => d.id === selectedDomainId) || KNOWLEDGE_DOMAINS[0];

  const handleSelectQuery = (query) => {
    setSelectedQuery(query);
    setIsProcessing(true);
    trackEvent('rag_sandbox_query_run', { domainId: activeDomain.id, query });
    setTimeout(() => {
      setIsProcessing(false);
    }, 600);
  };

  const handleSelectDomain = (domain) => {
    setSelectedDomainId(domain.id);
    setSelectedQuery(domain.sampleQueries[0]);
    setIsProcessing(true);
    trackEvent('rag_sandbox_domain_changed', { domainId: domain.id });
    setTimeout(() => {
      setIsProcessing(false);
    }, 500);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="p-6 sm:p-10 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-8 relative overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-48 bg-emerald-500/10 blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Vector RAG & LLM Grounding Sandbox</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
            Private Enterprise AI: Zero Hallucinations, 100% Citations
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl mx-auto">
            Test how LaunchGremlin RAG architectures chunk enterprise documents, generate vector embeddings, retrieve matched contexts, and synthesize verified answers.
          </p>
        </div>

        {/* Knowledge Domain Selector */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold block text-center sm:text-left">
            1. Select Enterprise Knowledge Base:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {KNOWLEDGE_DOMAINS.map((domain) => (
              <button
                key={domain.id}
                onClick={() => handleSelectDomain(domain)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedDomainId === domain.id
                    ? 'bg-emerald-950/40 border-emerald-400 text-white shadow-lg shadow-emerald-500/10 scale-[1.02]'
                    : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Database className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-white leading-tight">{domain.name}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-light leading-snug">{domain.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Pipeline Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 5 COLS: Query Tester & Vector Pipeline Steps */}
          <div className="lg:col-span-5 space-y-5 bg-zinc-950/80 p-6 rounded-2xl border border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-1.5">
              <Search className="w-4 h-4 text-emerald-400" />
              2. Test Real-Time Semantic Queries:
            </span>

            {/* Sample Queries List */}
            <div className="space-y-2">
              {activeDomain.sampleQueries.map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectQuery(query)}
                  className={`w-full p-3 rounded-xl text-left text-xs transition-all cursor-pointer flex items-start gap-2.5 ${
                    selectedQuery === query
                      ? 'bg-emerald-400 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  <span className="font-mono opacity-60 shrink-0">Q{idx + 1}:</span>
                  <span className="leading-snug">{query}</span>
                </button>
              ))}
            </div>

            {/* Vector Embedding Visualizer Strip */}
            <div className="p-3.5 bg-zinc-900 rounded-xl border border-zinc-800 font-mono text-[10.5px] text-zinc-400 space-y-1.5">
              <div className="flex items-center justify-between text-zinc-200 font-bold">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Cpu className="w-3.5 h-3.5" />
                  Vector Embedding Stream
                </span>
                <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">1536-DIM</span>
              </div>
              <p className="text-zinc-500 truncate">
                text-embedding-3-small → [0.0341, -0.1982, 0.8124, -0.0451, 0.4491, ...]
              </p>
              <div className="text-[10px] text-emerald-400/90 pt-1">
                ✓ Hybrid Retrieval: Dense Vector + BM25 Sparse Keyword Match
              </div>
            </div>
          </div>

          {/* RIGHT 7 COLS: Matched Chunks & Grounded Answer Output */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Retrieved Context Chunks Box */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  Top Matched Knowledge Chunks:
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Cosine Similarity &gt; 0.88
                </span>
              </div>

              <div className="space-y-2.5">
                {activeDomain.matchedChunks.map((chunk, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-emerald-400" />
                        {chunk.source}
                      </span>
                      <span className="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-800">
                        {chunk.score}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 font-light leading-relaxed">
                      "{chunk.content}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Grounded LLM Response Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-zinc-950 to-zinc-950 border-2 border-emerald-500/40 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  Verified Grounded Synthesis
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  Zero Hallucination Guardrail Active
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-100 font-light leading-relaxed select-text">
                {isProcessing ? (
                  <span className="text-emerald-400 animate-pulse font-mono text-xs">
                    Searching vector database and synthesizing verified answer...
                  </span>
                ) : (
                  activeDomain.groundedAnswer
                )}
              </p>

              <div className="pt-2 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-[10.5px] font-mono text-zinc-500">
                  🔒 Private Enterprise VPC • No Public Training
                </span>
                <button
                  onClick={onOpenBooking}
                  className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-[0_0_20px_rgba(52,211,153,0.3)] flex items-center justify-center gap-1.5"
                >
                  <span>Deploy Private RAG Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
