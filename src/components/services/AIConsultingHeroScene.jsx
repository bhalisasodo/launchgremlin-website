import React, { useState, useEffect } from 'react';
import {
  Bot, ArrowRight, ShieldCheck, Sparkles, CheckCircle2,
  Users, MessageSquare, Zap, Clock, TrendingUp, Calendar,
  Activity, Check, Terminal, Globe, Workflow, RefreshCw
} from 'lucide-react';

export default function AIConsultingHeroScene({ onOpenBooking }) {
  const [activeStep, setActiveStep] = useState(2);
  const [liveLogIndex, setLiveLogIndex] = useState(0);

  const activityLogs = [
    {
      time: '00:02s ago',
      agent: 'Sales AI Agent',
      action: '✓ Qualified inbound enterprise lead (Alex Vance)',
      detail: 'Score: 98/100 · Budget: R50k+ · Meeting scheduled for tomorrow 10:00 AM',
      icon: Calendar,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10 border-emerald-400/30',
    },
    {
      time: '00:14s ago',
      agent: 'Support AI Agent',
      action: '✓ Resolved customer inquiry in 18 seconds',
      detail: 'Custom onboarding guide dispatched · Customer rating: 5.0 ★',
      icon: MessageSquare,
      color: 'text-teal-400',
      bg: 'bg-teal-400/10 border-teal-400/30',
    },
    {
      time: '00:29s ago',
      agent: 'Operations AI Agent',
      action: '✓ Automated invoice #4920 & synced ledger',
      detail: 'Client: Acme Corp · Payment link sent · CRM status set to Invoiced',
      icon: CheckCircle2,
      color: 'text-emerald-300',
      bg: 'bg-emerald-300/10 border-emerald-300/30',
    },
    {
      time: '00:45s ago',
      agent: 'Content AI Agent',
      action: '✓ Published weekly market newsletter & social posts',
      detail: 'Rebuild cross-posted across LinkedIn & X · 1.4k subscribers notified',
      icon: Sparkles,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10 border-emerald-400/30',
    },
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev % 5) + 1);
    }, 3500);

    const logInterval = setInterval(() => {
      setLiveLogIndex((prev) => (prev + 1) % activityLogs.length);
    }, 4000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(logInterval);
    };
  }, []);

  const aiAgents = [
    {
      id: 'sales',
      name: 'Sales & Growth Agent',
      role: 'Lead Qualification & Booking',
      status: 'Working 24/7',
      currentTask: 'Qualifying enterprise inquiry & generating tailored scope',
      completedActions: ['✓ Lead Qualified', '✓ Meeting Booked', '✓ CRM Updated'],
      kpi: '< 30s Response Time',
      avatar: '🤖',
    },
    {
      id: 'support',
      name: 'Customer Success Agent',
      role: '24/7 Ticket Resolution',
      status: 'Working 24/7',
      currentTask: 'Answering client onboarding questions & sending resources',
      completedActions: ['✓ Ticket Resolved', '✓ Solution Sent', '✓ Follow-up Set'],
      kpi: '99.4% CSAT Score',
      avatar: '💬',
    },
    {
      id: 'ops',
      name: 'Operations & Finance Agent',
      role: 'Invoicing & Pipeline Automation',
      status: 'Working 24/7',
      currentTask: 'Generating client retainer invoice & syncing accounting ledger',
      completedActions: ['✓ Invoice Sent', '✓ Slack Notified', '✓ Ledger Synced'],
      kpi: '0% Manual Effort',
      avatar: '⚡',
    },
    {
      id: 'content',
      name: 'Content & Marketing Agent',
      role: 'Campaign & Audience Growth',
      status: 'Working 24/7',
      currentTask: 'Drafting weekly creator newsletter & scheduling social posts',
      completedActions: ['✓ Content Scheduled', '✓ Social Post Live', '✓ Analytics Tracked'],
      kpi: '5x Output Speed',
      avatar: '✨',
    },
  ];

  const storySteps = [
    { num: 1, title: 'Lead Arrives', desc: 'Inquiry received via web or email' },
    { num: 2, title: 'AI Understands', desc: 'Analyzes intent, budget & goals' },
    { num: 3, title: 'Research', desc: 'Checks internal scope & pricing' },
    { num: 4, title: 'Autonomous Action', desc: 'Sends proposal & books call' },
    { num: 5, title: 'Business Growth', desc: 'Revenue & CRM updated 24/7' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-6 pb-12">
      {/* LEFT COLUMN — Value Proposition & Action CTAs */}
      <div className="lg:col-span-5 space-y-7 text-left">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-400/35 text-emerald-400 text-xs font-mono font-medium tracking-wide shadow-[0_0_20px_rgba(52,211,153,0.15)] backdrop-blur-md">
          <Bot className="w-3.5 h-3.5 fill-current" />
          <span>PILLAR 03 — CUSTOM AI CONSULTING & WORKFLOWS</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.03] uppercase">
          AI WORKFORCE THAT <br />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-200 font-black">
            WORKS 24/7.
            <svg
              className="absolute -bottom-2 inset-x-0 w-full h-3.5 text-emerald-400/90 overflow-visible pointer-events-none"
              viewBox="0 0 300 14"
              fill="none"
            >
              <path
                d="M3 10 C 60 3, 160 2, 297 9"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Copy */}
        <p className="text-base text-zinc-300 font-light leading-relaxed max-w-xl">
          Stop doing repetitive manual operations. We build custom autonomous AI employees for your business—sales agents, support specialists, operations bots, and content strategists that work continuously 24 hours a day.
        </p>

        {/* Outcome Pill Checklist */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono text-zinc-300 pt-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Lead Qualified in &lt;30s</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Automated Invoicing</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>24/7 Customer Support</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>180+ Hours Saved/Mo</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
          >
            <span>Deploy AI Workforce</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-400 px-4 py-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ISAE 3000 Enterprise Compliant</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN — SINGLE COHESIVE APPLICATION WINDOW (NO FLOATING CARDS) */}
      <div className="lg:col-span-7 relative z-10">
        
        {/* Ambient Glows */}
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* SINGLE UNIFIED COHESIVE APPLICATION WINDOW */}
        <div className="relative w-full rounded-2xl bg-zinc-950/90 border border-zinc-800/90 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.95)] overflow-hidden transition-all duration-300">
          
          {/* BROWSER CHROME HEADER */}
          <div className="bg-zinc-900/90 px-4 py-3 flex flex-wrap items-center justify-between border-b border-zinc-800/80 gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-zinc-300 font-bold hidden sm:inline">
                LaunchGremlin OS — AI Workforce Control Center
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-950 border border-zinc-800/80 text-[11px] font-mono text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>4 AI AGENTS ONLINE · 24/7 ACTIVE</span>
            </div>
          </div>

          {/* STORY FLOW: WORKFLOW PIPELINE BAR INSIDE WINDOW */}
          <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800/60 overflow-x-auto custom-scrollbar">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1.5 px-1 font-semibold uppercase">
              <span>Autonomous Workflow Pipeline</span>
              <span className="text-emerald-400">Step {activeStep} of 5</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5 min-w-[500px]">
              {storySteps.map((s) => {
                const isActive = s.num === activeStep;
                const isPassed = s.num < activeStep;
                return (
                  <div
                    key={s.num}
                    onClick={() => setActiveStep(s.num)}
                    className={`p-2 rounded-lg border transition-all cursor-pointer relative ${
                      isActive
                        ? 'bg-emerald-400/15 border-emerald-400 text-white shadow-sm'
                        : isPassed
                        ? 'bg-zinc-900/80 border-zinc-700 text-zinc-300'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-bold font-mono ${isActive ? 'text-emerald-300' : 'text-zinc-400'}`}>
                        0{s.num}. {s.title}
                      </span>
                      {isPassed ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : isActive ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MAIN APPLICATION DASHBOARD GRID INSIDE WINDOW */}
          <div className="p-5 space-y-4 bg-zinc-950">
            
            {/* AI WORKFORCE ROSTER GRID (2x2 INSIDE WINDOW) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {aiAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90 space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl p-1.5 rounded-lg bg-zinc-950 border border-zinc-800">
                        {agent.avatar}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-white font-sans">{agent.name}</h4>
                        <span className="text-[9px] font-mono text-zinc-400 block">{agent.role}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-400/10 border border-emerald-400/30 text-emerald-400">
                      ● Active
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-zinc-950 text-[10px] text-zinc-300 font-sans space-y-0.5 border border-zinc-800/60">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase font-semibold block">Task:</span>
                    <p className="leading-tight text-zinc-300 text-[10px]">{agent.currentTask}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {agent.completedActions.map((action, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-emerald-400/10 text-emerald-400 text-[9px] font-mono">
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* LIVE ACTIVITY FEED INSIDE WINDOW */}
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90 space-y-2 font-mono text-[10px]">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="font-bold text-white uppercase flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" /> Live Business Activity Log
                </span>
                <span className="text-[9px] text-zinc-400">Streaming Real-Time</span>
              </div>

              <div className="space-y-1.5">
                {activityLogs.map((log, i) => {
                  const isSelected = i === liveLogIndex;
                  return (
                    <div
                      key={i}
                      className={`p-2 rounded-lg border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-zinc-950 border-emerald-400/40 text-white'
                          : 'bg-zinc-950/60 border-zinc-800/60 text-zinc-400 opacity-70'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-400">{log.agent}:</span>
                        <span className="text-zinc-200 font-sans">{log.action}</span>
                      </div>
                      <span className="text-[9px] text-zinc-500 shrink-0 ml-2">{log.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* CHROME FOOTER STATUS BAR */}
          <div className="bg-zinc-900/90 px-4 py-2 border-t border-zinc-800/80 flex flex-wrap items-center justify-between text-[10px] font-mono text-zinc-400 gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Autonomous Business Engine Active</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200">184h/mo Saved</span>
              <span className="px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-400 font-bold">0% Error Rate</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
