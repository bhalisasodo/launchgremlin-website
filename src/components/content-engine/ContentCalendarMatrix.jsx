import React, { useState } from 'react';
import {
  Calendar,
  Flame,
  Zap,
  TrendingUp,
  Sparkles,
  BookOpen,
  PhoneCall,
  Code2,
  Video,
  ArrowRight,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Plus
} from 'lucide-react';
import {
  CALENDAR_PHASES,
  SAMPLE_30_60_90_SCHEDULE,
  CONTENT_PILLARS,
  ENGINE_VOICES
} from '../../utils/contentEngineData';

const PILLAR_ICONS = {
  educational: BookOpen,
  cold_calls: PhoneCall,
  vibe_coding_events: Code2,
  music_video_competition: Video,
  maserati_narrative: Flame
};

export default function ContentCalendarMatrix({ onSelectScheduleItem, onCreateForPillar }) {
  const [activePhaseFilter, setActivePhaseFilter] = useState(1); // 1, 2, 3, or 'all'
  const [selectedPillarFilter, setSelectedPillarFilter] = useState('all');
  const [selectedAccountFilter, setSelectedAccountFilter] = useState('all');

  const currentPhaseConfig = CALENDAR_PHASES.find((p) => p.phase === activePhaseFilter) || CALENDAR_PHASES[0];

  const filteredSchedule = SAMPLE_30_60_90_SCHEDULE.filter((item) => {
    if (activePhaseFilter !== 'all' && item.phase !== activePhaseFilter) return false;
    if (selectedPillarFilter !== 'all' && item.pillar !== selectedPillarFilter) return false;
    if (selectedAccountFilter !== 'all' && item.account !== selectedAccountFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5" /> 30/60/90 Content Roadmap
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Strategic Content Execution Matrix</h2>
          <p className="text-xs text-zinc-400 mt-1">
            "Organic proves it, paid amplifies it, cadence beats polish." 90-day structured roadmap across 5 core pillars.
          </p>
        </div>

        {/* Phase Selectors */}
        <div className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 p-1.5 rounded-2xl overflow-x-auto self-start md:self-auto">
          {[
            { id: 1, label: 'Phase 1 (Days 1–30)', sub: 'Organic Testing' },
            { id: 2, label: 'Phase 2 (Days 31–60)', sub: 'Paid Amplification' },
            { id: 3, label: 'Phase 3 (Days 61–90)', sub: 'Scale & Systemise' },
            { id: 'all', label: 'All 90 Days', sub: 'Full Timeline' }
          ].map((p) => {
            const isActive = activePhaseFilter === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePhaseFilter(p.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all text-left whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <div>{p.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Strategic Phase Goal Card */}
      {activePhaseFilter !== 'all' && (
        <div
          className={`p-6 rounded-2xl border transition-all ${
            activePhaseFilter === 1
              ? 'bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-950 border-emerald-500/30'
              : activePhaseFilter === 2
              ? 'bg-gradient-to-br from-amber-950/40 via-zinc-900 to-zinc-950 border-amber-500/30'
              : 'bg-gradient-to-br from-purple-950/40 via-zinc-900 to-zinc-950 border-purple-500/30'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                    activePhaseFilter === 1
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : activePhaseFilter === 2
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  }`}
                >
                  {currentPhaseConfig.days}
                </span>
                <h3 className="text-base font-bold text-white">{currentPhaseConfig.title}</h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">{currentPhaseConfig.goal}</p>
              <div className="text-[11px] font-mono text-zinc-400 pt-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <strong className="text-zinc-200">Paid Ad Rule:</strong> {currentPhaseConfig.paidRule}
              </div>
            </div>

            {/* Weekly Target Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-zinc-950/70 border border-zinc-800/80 p-3.5 rounded-xl text-[11px] shrink-0">
              <div className="space-y-0.5">
                <span className="text-zinc-500 block font-medium">Cold-Calls:</span>
                <span className="font-mono text-zinc-200 font-bold">
                  {currentPhaseConfig.weeklyCadence.cold_calls}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-zinc-500 block font-medium">Vibe Events:</span>
                <span className="font-mono text-zinc-200 font-bold">
                  {currentPhaseConfig.weeklyCadence.vibe_coding_events}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-zinc-500 block font-medium">Competition:</span>
                <span className="font-mono text-zinc-200 font-bold">
                  {currentPhaseConfig.weeklyCadence.music_video_competition}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-zinc-500 block font-medium">Educational:</span>
                <span className="font-mono text-zinc-200 font-bold">
                  {currentPhaseConfig.weeklyCadence.educational}
                </span>
              </div>
              <div className="col-span-2 space-y-0.5 border-t border-zinc-800/60 pt-1">
                <span className="text-amber-400 block font-bold flex items-center gap-1">
                  <Flame className="w-3 h-3" /> Maserati Spine:
                </span>
                <span className="font-mono text-amber-200 font-bold">
                  {currentPhaseConfig.weeklyCadence.maserati_narrative}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/60 border border-zinc-800 rounded-xl p-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-zinc-400 flex items-center gap-1 font-semibold mr-1">
            <Filter className="w-3.5 h-3.5" /> Pillar:
          </span>
          <button
            type="button"
            onClick={() => setSelectedPillarFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedPillarFilter === 'all'
                ? 'bg-zinc-800 text-white font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Pillars ({SAMPLE_30_60_90_SCHEDULE.length})
          </button>
          {CONTENT_PILLARS.map((p) => {
            const isSelected = selectedPillarFilter === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPillarFilter(p.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  isSelected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {p.name.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Account filter */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedAccountFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs transition-colors ${
              selectedAccountFilter === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Both Accounts
          </button>
          <button
            type="button"
            onClick={() => setSelectedAccountFilter('launchgremlin')}
            className={`px-3 py-1 rounded-lg text-xs transition-colors ${
              selectedAccountFilter === 'launchgremlin' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            @LaunchGremlin
          </button>
          <button
            type="button"
            onClick={() => setSelectedAccountFilter('needmoney4maserati')}
            className={`px-3 py-1 rounded-lg text-xs transition-colors ${
              selectedAccountFilter === 'needmoney4maserati' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            @needmoney4maserati
          </button>
        </div>
      </div>

      {/* Schedule Slots Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchedule.map((slot) => {
          const IconComp = PILLAR_ICONS[slot.pillar] || BookOpen;
          const isMaserati = slot.account === 'needmoney4maserati';
          const isPaid = slot.isPaidBoost;

          return (
            <div
              key={slot.day}
              className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 transition-all hover:scale-[1.01] relative overflow-hidden ${
                isPaid
                  ? 'bg-gradient-to-b from-amber-950/30 to-zinc-950 border-amber-500/50 shadow-lg shadow-amber-500/10'
                  : isMaserati
                  ? 'bg-zinc-900/80 border-amber-500/30'
                  : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {/* Top Meta */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-950 font-mono font-extrabold text-xs text-white border border-zinc-800">
                      DAY {slot.day}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {slot.suggestedTime}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      slot.status === 'PAID_WINNER'
                        ? 'bg-amber-500 text-zinc-950 shadow-sm shadow-amber-500/20 animate-pulse'
                        : slot.status === 'APPROVED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : slot.status === 'SCHEDULED'
                        ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {slot.status === 'PAID_WINNER' ? '🔥 PAID WINNER' : slot.status}
                  </span>
                </div>

                {/* Account & Pillar Header */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-semibold flex items-center gap-1.5 ${
                      isMaserati ? 'text-amber-400' : 'text-emerald-400'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    {isMaserati ? '@needmoney4maserati' : '@LaunchGremlin'}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase bg-zinc-800/80 px-2 py-0.5 rounded">
                    {slot.format.replace('_', ' ')}
                  </span>
                </div>

                {/* Title & Hook */}
                <div>
                  <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">{slot.title}</h4>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 italic">
                    "{slot.hook}"
                  </p>
                </div>

                {/* Maserati Linked Proof Point */}
                {slot.proofPointRef && (
                  <div className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 font-mono flex items-center justify-between">
                    <span>Proof Point:</span>
                    <strong className="text-amber-200">{slot.proofPointRef}</strong>
                  </div>
                )}

                {/* Paid Performance Badge */}
                {isPaid && (
                  <div className="px-3 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-xs text-amber-200 space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-amber-400" /> Paid Boost Active:
                      </span>
                      <span>{slot.paidSpend}</span>
                    </div>
                    <div className="text-[11px] text-amber-300/80">{slot.paidScore}</div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-zinc-500">{slot.intakeId}</span>
                <button
                  type="button"
                  onClick={() => onSelectScheduleItem(slot)}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 text-xs font-semibold text-zinc-200 transition-all flex items-center gap-1"
                >
                  Inspect Package <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
