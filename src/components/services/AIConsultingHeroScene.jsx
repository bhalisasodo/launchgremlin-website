import React, { useState, useEffect } from 'react';
import {
  Bot, ArrowRight, ShieldCheck, Sparkles, CheckCircle2,
  Users, MessageSquare, Zap, Clock, TrendingUp, Calendar,
  Building, ChevronRight, Activity, ArrowUpRight, Award,
  Check, FileText, Send, RefreshCw, Layers
} from 'lucide-react';

export default function AIConsultingHeroScene({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('all');
  const [activeStep, setActiveStep] = useState(2);
  const [liveLogIndex, setLiveLogIndex] = useState(0);

  // Simulated continuous business automation stream
  const activityLogs = [
    {
      time: '00:02s ago',
      agent: 'Sales AI Agent',
      badge: 'Sales',
      action: '✓ Qualified inbound enterprise lead (Alex Vance)',
      detail: 'Score: 98/100 · Budget: R50k+ · Meeting scheduled for tomorrow 10:00 AM',
      icon: Calendar,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10 border-emerald-400/30',
    },
    {
      time: '00:14s ago',
      agent: 'Support AI Agent',
      badge: 'Support',
      action: '✓ Resolved customer inquiry in 18 seconds',
      detail: 'Custom onboarding guide dispatched · Customer rating: 5.0 ★',
      icon: MessageSquare,
      color: 'text-teal-400',
      bg: 'bg-teal-400/10 border-teal-400/30',
    },
    {
      time: '00:29s ago',
      agent: 'Operations AI Agent',
      badge: 'Ops',
      action: '✓ Automated invoice #4920 & synced ledger',
      detail: 'Client: Acme Corp · Payment link sent · CRM status set to Invoiced',
      icon: CheckCircle2,
      color: 'text-emerald-300',
      bg: 'bg-emerald-300/10 border-emerald-300/30',
    },
    {
      time: '00:45s ago',
      agent: 'Content AI Agent',
      badge: 'Marketing',
      action: '✓ Published weekly market newsletter & social posts',
      detail: 'Rebuild cross-posted across LinkedIn & X · 1.4k subscribers notified',
      icon: Sparkles,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10 border-emerald-400/30',
    },
    {
      time: '01:02s ago',
      agent: 'Research AI Agent',
      badge: 'Intel',
      action: '✓ Completed competitor pricing audit',
      detail: 'Analyzed 24 industry benchmarks · Executive summary delivered to Slack',
      icon: TrendingUp,
      color: 'text-teal-300',
      bg: 'bg-teal-300/10 border-teal-300/30',
    },
  ];

  // Auto-progress story step & activity log loop
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
      badgeBg: 'bg-emerald-400/15 border-emerald-400/40 text-emerald-300',
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
      badgeBg: 'bg-teal-400/15 border-teal-400/40 text-teal-300',
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
      badgeBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400',
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
      badgeBg: 'bg-emerald-400/15 border-emerald-400/40 text-emerald-300',
    },
  ];

  const filteredAgents = activeTab === 'all' 
    ? aiAgents 
    : aiAgents.filter((a) => a.id === activeTab);

  const storySteps = [
    { num: 1, title: 'Lead Arrives', desc: 'Inquiry received via web or email' },
    { num: 2, title: 'AI Understands', desc: 'Analyzes intent, budget & goals' },
    { num: 3, title: 'Research', desc: 'Checks internal scope & pricing' },
    { num: 4, title: 'Autonomous Action', desc: 'Sends proposal & books call' },
    { num: 5, title: 'Business Growth', desc: 'Revenue & CRM updated 24/7' },
  ];

  return (
    <div className="space-y-10 pt-4 pb-12 max-w-7xl mx-auto">
      {/* ---------------- SECTION HEADER & VALUE PROPOSITION ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8 space-y-5">
          {/* Pillar Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-emerald-400/40 text-emerald-400 text-xs font-mono font-bold tracking-wider shadow-[0_0_20px_rgba(52,211,153,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>PILLAR 03 — AUTONOMOUS AI WORKFORCE</span>
          </div>

          {/* Main Outcome-Focused Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] uppercase">
            HIRE AI EMPLOYEES THAT <br />
            <span className="relative inline-block text-emerald-400">
              WORK 24/7.
              <svg
                className="absolute -bottom-2 inset-x-0 w-full h-3 text-emerald-400/80 overflow-visible"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M3 9C50 3 150 2 297 8"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Value Proposition Description */}
          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-2xl">
            Stop doing repetitive manual work. We build custom autonomous AI employees for your business—sales agents, customer support specialists, operations bots, and content strategists that work continuously while you sleep.
          </p>
        </div>

        {/* Action Button & Compliance Badge */}
        <div className="lg:col-span-4 space-y-4 lg:text-right">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Deploy Your AI Workforce</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="flex items-center lg:justify-end gap-2 text-xs font-mono text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ISAE 3000 Compliant & Enterprise Ready</span>
          </div>
        </div>
      </div>

      {/* ---------------- REALISTIC BUSINESS KPIs BAR ---------------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md space-y-1">
          <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider block">Time Returned</span>
          <span className="text-2xl font-black font-mono text-emerald-400 block">184 hrs / mo</span>
          <span className="text-[11px] text-zinc-400">Saved per team member</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md space-y-1">
          <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider block">Tasks Automated</span>
          <span className="text-2xl font-black font-mono text-white block">14,280+</span>
          <span className="text-[11px] text-emerald-400">100% Error-Free</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md space-y-1">
          <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider block">Lead Response Time</span>
          <span className="text-2xl font-black font-mono text-emerald-400 block">&lt; 30 Seconds</span>
          <span className="text-[11px] text-zinc-400">24 Hours / 7 Days</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md space-y-1">
          <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider block">Monthly Cost Saved</span>
          <span className="text-2xl font-black font-mono text-white block">R45,000+</span>
          <span className="text-[11px] text-emerald-400">Direct OpEx Reduction</span>
        </div>
      </div>

      {/* ---------------- COHESIVE AI CONTROL CENTER SOFTWARE WINDOW ---------------- */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden relative">
        
        {/* TOP WINDOW HEADER BAR */}
        <div className="bg-zinc-900/90 px-6 py-3.5 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Window dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-zinc-700 inline-block" />
              <span className="w-3 h-3 rounded-full bg-zinc-700 inline-block" />
            </div>
            <div className="h-4 w-px bg-zinc-800 mx-1" />
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white font-mono tracking-wide">
                LaunchGremlin OS <span className="text-zinc-500">v4.2 — Autonomous Control Center</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>4 AI EMPLOYEES ONLINE · 24/7 ACTIVE</span>
            </div>
          </div>
        </div>

        {/* ---------------- STORY FLOW: LEFT-TO-RIGHT WORKFLOW PIPELINE BAR ---------------- */}
        <div className="bg-zinc-900/40 p-4 border-b border-zinc-800 overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2 px-1 uppercase font-semibold">
              <span>Autonomous Workflow Story Flow</span>
              <span className="text-emerald-400">Step {activeStep} of 5 Active</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {storySteps.map((s) => {
                const isActive = s.num === activeStep;
                const isPassed = s.num < activeStep;
                return (
                  <div
                    key={s.num}
                    onClick={() => setActiveStep(s.num)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                      isActive
                        ? 'bg-emerald-400/15 border-emerald-400 text-white shadow-[0_0_20px_rgba(52,211,153,0.25)]'
                        : isPassed
                        ? 'bg-zinc-900/80 border-zinc-700 text-zinc-200'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-500'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 inset-x-0 h-1 bg-emerald-400 animate-pulse" />
                    )}
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-bold font-mono ${isActive ? 'text-emerald-300' : 'text-zinc-400'}`}>
                        0{s.num}. {s.title}
                      </span>
                      {isPassed ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : isActive ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      ) : null}
                    </div>
                    <p className="text-[10px] font-sans font-light leading-tight">
                      {s.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MAIN OS CANVAS: AI WORKFORCE & LIVE ACTIVITY STREAM */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: AI WORKFORCE ROSTER (7 Columns) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  Active AI Workforce Roster
                </h3>
              </div>
              
              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-[10px] font-mono">
                {['all', 'sales', 'support', 'ops', 'content'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2.5 py-1 rounded-lg uppercase font-bold transition-all ${
                      activeTab === tab
                        ? 'bg-emerald-400 text-zinc-950'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Agents Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-400/40 transition-all space-y-3 relative group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl p-2 rounded-xl bg-zinc-950 border border-zinc-800">
                        {agent.avatar}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-white font-sans">{agent.name}</h4>
                        <span className="text-[10px] font-mono text-zinc-400 block">{agent.role}</span>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${agent.badgeBg}`}>
                      ● {agent.status}
                    </span>
                  </div>

                  {/* Current Active Task */}
                  <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-[11px] text-zinc-300 font-sans space-y-1">
                    <span className="text-[9px] font-mono text-zinc-400 uppercase font-semibold block">Current Task:</span>
                    <p className="leading-snug text-zinc-200">{agent.currentTask}</p>
                  </div>

                  {/* Completed Outcomes Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {agent.completedActions.map((action, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-[10px] font-mono"
                      >
                        {action}
                      </span>
                    ))}
                  </div>

                  {/* Efficiency Metric Footer */}
                  <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-zinc-400">Efficiency Metric</span>
                    <span className="text-emerald-400 font-bold">{agent.kpi}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: LIVE ACTIVITY STREAM & OUTCOMES (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  Live Activity Feed
                </h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">Streaming Real-Time</span>
            </div>

            {/* Stream List */}
            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3 font-mono">
              {activityLogs.map((log, i) => {
                const LogIcon = log.icon;
                const isSelected = i === liveLogIndex;
                return (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-zinc-950 border-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.15)]'
                        : 'bg-zinc-950/60 border-zinc-800/80 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <span className={`p-1 rounded-md border ${log.bg}`}>
                          <LogIcon className={`w-3 h-3 ${log.color}`} />
                        </span>
                        <span className="font-bold text-white">{log.agent}</span>
                      </div>
                      <span className="text-zinc-400">{log.time}</span>
                    </div>

                    <p className="text-xs text-emerald-400 font-semibold font-sans">
                      {log.action}
                    </p>

                    <p className="text-[10px] text-zinc-400 font-sans font-light">
                      {log.detail}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Business Outcomes Checklist Summary */}
            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                Automated Outcome Checklist
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-zinc-300">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Lead Qualified
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Meeting Booked
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Invoice Sent
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Email Replied
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM OS STATUS BAR */}
        <div className="bg-zinc-900/90 px-6 py-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Autonomous Execution: <strong className="text-white font-semibold">100% Operational</strong></span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Continuous Business Autopilot</span>
            <span className="text-emerald-400 font-bold">● Zero Human Bottlenecks</span>
          </div>
        </div>

      </div>
    </div>
  );
}
