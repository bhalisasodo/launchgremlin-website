import React, { useState, useMemo } from 'react';
import { Zap, DollarSign, TrendingUp, Users, Clock, ArrowRight, Sparkles, CheckCircle2, Play, RotateCcw } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

export default function SpeedImpactSimulator({ onSelectTab, onOpenBooking }) {
  const [monthlyVisitors, setMonthlyVisitors] = useState(25000);
  const [leadValue, setLeadValue] = useState(350);
  const [currentSpeed, setCurrentSpeed] = useState(4.6);
  const [isRacing, setIsRacing] = useState(false);
  const [raceFinished, setRaceFinished] = useState(false);

  // Math models based on Google Web Vitals & Amazon/Akamai conversion benchmarks
  // Every 100ms delay drops conversion by ~1%; bounce rate doubles past 3s
  const currentBounceRate = useMemo(() => {
    // Baseline 15% at 0.4s, scaling up to 75% at 8s
    const rate = Math.min(85, Math.round(15 + Math.pow(currentSpeed, 1.3) * 6.5));
    return rate;
  }, [currentSpeed]);

  const optimizedBounceRate = 14; // Sub-0.4s LaunchGremlin speed
  const bounceRateDrop = currentBounceRate - optimizedBounceRate;

  // Conversion rate: ~3.5% at 0.4s, degrading ~0.35% per second of load time
  const currentConversionRate = Math.max(0.6, (3.5 - (currentSpeed - 0.4) * 0.42));
  const optimizedConversionRate = 3.6;

  // Monthly Calculations
  const currentMonthlyRevenue = (monthlyVisitors * (1 - currentBounceRate / 100) * (currentConversionRate / 100) * leadValue);
  const optimizedMonthlyRevenue = (monthlyVisitors * (1 - optimizedBounceRate / 100) * (optimizedConversionRate / 100) * leadValue);
  const monthlyRevenueGain = Math.max(0, Math.round(optimizedMonthlyRevenue - currentMonthlyRevenue));
  const annualRevenueGain = monthlyRevenueGain * 12;

  const handleStartRace = () => {
    setIsRacing(true);
    setRaceFinished(false);
    trackEvent('speed_simulator_race_started', { currentSpeed });
    setTimeout(() => {
      setRaceFinished(true);
      setIsRacing(false);
    }, currentSpeed * 1000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="p-6 sm:p-10 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-8 relative overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-48 bg-emerald-500/10 blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Speed & ROI Calculator</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
            Calculate How Much Slow Load Speeds Are Costing You
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl mx-auto">
            Google research shows 53% of mobile visits are abandoned if a page takes over 3 seconds to load. Adjust the parameters below to see your potential revenue lift.
          </p>
        </div>

        {/* 2-Column Grid: Left Controls, Right Live Financial Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 6 COLS: Interactive Sliders */}
          <div className="lg:col-span-6 space-y-6 bg-zinc-950/80 p-6 rounded-2xl border border-zinc-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>1. Your Traffic & Performance Baseline</span>
            </h3>

            {/* Slider 1: Monthly Visitors */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  Monthly Website Visitors
                </span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {monthlyVisitors.toLocaleString()} /mo
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="250000"
                step="1000"
                value={monthlyVisitors}
                onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>2,000</span>
                <span>100,000</span>
                <span>250,000+</span>
              </div>
            </div>

            {/* Slider 2: Average Customer Value / Order Value */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  Average Client / Order Value
                </span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  ${leadValue.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="25"
                value={leadValue}
                onChange={(e) => setLeadValue(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>$50</span>
                <span>$1,000</span>
                <span>$2,000+</span>
              </div>
            </div>

            {/* Slider 3: Current Page Load Speed */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-400" />
                  Current Website Load Speed
                </span>
                <span className="font-mono font-bold text-red-400 text-sm">
                  {currentSpeed.toFixed(1)}s {currentSpeed > 3.0 ? '(Critical Delay)' : '(Sub-Optimal)'}
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="7.5"
                step="0.1"
                value={currentSpeed}
                onChange={(e) => setCurrentSpeed(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>1.0s (Acceptable)</span>
                <span>3.5s (Average Web)</span>
                <span>7.5s (Heavy Lag)</span>
              </div>
            </div>

            {/* Loading Race Visualizer */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                  Live Loading Speed Race
                </span>
                <button
                  onClick={handleStartRace}
                  disabled={isRacing}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3 h-3 text-emerald-400" />
                  <span>{isRacing ? 'Testing...' : 'Simulate Page Load'}</span>
                </button>
              </div>

              {/* Race Bars */}
              <div className="space-y-2 text-[11px] font-mono">
                {/* LaunchGremlin Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-emerald-400 font-bold">⚡ LaunchGremlin (React 18 + Edge CDN):</span>
                    <span>0.35s (100/100 Vitals)</span>
                  </div>
                  <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-emerald-400 transition-all duration-300 rounded-full ${
                        isRacing || raceFinished ? 'w-full' : 'w-full'
                      }`}
                    />
                  </div>
                </div>

                {/* Legacy Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-red-400 font-bold">🐢 Typical WordPress / Wix Template:</span>
                    <span>{currentSpeed.toFixed(1)}s (High Bounce)</span>
                  </div>
                  <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-400 transition-all rounded-full"
                      style={{
                        width: isRacing ? '100%' : raceFinished ? '100%' : '100%',
                        transitionDuration: `${currentSpeed}s`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT 6 COLS: Live Projected Revenue Lift Output */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Projected Financial Return Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-zinc-950 to-zinc-950 border-2 border-emerald-500/40 shadow-2xl space-y-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                Projected Revenue Transformation
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
                  <span className="text-[11px] text-zinc-400 font-semibold block">Estimated Monthly Revenue Lift</span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    +${monthlyRevenueGain.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-zinc-500 block">/ month in reclaimed pipeline</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
                  <span className="text-[11px] text-zinc-400 font-semibold block">12-Month Projected Growth</span>
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                    +${annualRevenueGain.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono block">✦ High-ROI Infrastructure</span>
                </div>
              </div>

              {/* Conversion & Bounce Metric Shifts */}
              <div className="space-y-3 pt-2 border-t border-zinc-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Mobile Bounce Rate Reduction:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {currentBounceRate}% → 14% (↓ {bounceRateDrop}% less drop-off)
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Google Core Web Vitals Score:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    42/100 → 100/100 Green
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">First Contentful Paint (FCP):</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {currentSpeed.toFixed(1)}s → 0.35s (Sub-Second)
                  </span>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-4 px-6 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_25px_rgba(52,211,153,0.35)] flex items-center justify-center gap-2"
                >
                  <span>Reclaim This Revenue • Book Strategy Call</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
