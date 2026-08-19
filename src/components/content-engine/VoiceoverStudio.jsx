import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Sliders,
  CheckCircle2,
  Mic,
  Clock
} from 'lucide-react';

export default function VoiceoverStudio({ scriptScenes = [], cta = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [speechRate, setSpeechRate] = useState(1.05); // slightly faster for punchy social media
  const [speechPitch, setSpeechPitch] = useState(1.0);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoiceIdx, setSelectedVoiceIdx] = useState(0);
  const synthRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const voices = synthRef.current.getVoices();
        const englishVoices = voices.filter((v) => v.lang.startsWith('en'));
        setAvailableVoices(englishVoices.length > 0 ? englishVoices : voices);
      };

      loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const handlePlayScene = (idx) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const targetScene = scriptScenes[idx];
    if (!targetScene) return;

    setActiveSceneIdx(idx);
    setIsPlaying(true);

    const utterance = new SpeechSynthesisUtterance(targetScene.audio_spoken);
    utterance.rate = speechRate;
    utterance.pitch = speechPitch;
    if (availableVoices[selectedVoiceIdx]) {
      utterance.voice = availableVoices[selectedVoiceIdx];
    }

    utterance.onend = () => {
      if (idx < scriptScenes.length - 1) {
        // Auto-play next scene after brief pause
        setTimeout(() => handlePlayScene(idx + 1), 350);
      } else {
        setIsPlaying(false);
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    synthRef.current.speak(utterance);
  };

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
  };

  const fullSpokenText = scriptScenes.map((s) => s.audio_spoken).join(' ');
  const totalWords = fullSpokenText.split(/\s+/).length;
  const estSeconds = Math.round(totalWords / (2.5 * speechRate));

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              AI Voiceover Audio Synthesizer
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Browser Speech API
              </span>
            </h4>
            <span className="text-[11px] text-zinc-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-500" /> Est. Time: ~{estSeconds}s ({totalWords} words)
            </span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => (isPlaying ? handleStop() : handlePlayScene(0))}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isPlaying
                ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20 animate-pulse'
                : 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" /> Stop Audio
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" /> Play Full Script
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleStop}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            title="Reset Audio"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Voice and Speed Tuners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Voice Selector */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
            Voice Actor:
          </label>
          <select
            value={selectedVoiceIdx}
            onChange={(e) => setSelectedVoiceIdx(Number(e.target.value))}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            {availableVoices.map((v, i) => (
              <option key={i} value={i}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>

        {/* Speed Slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-zinc-400">
            <span className="font-semibold uppercase tracking-wider">Pacing / Speed:</span>
            <span className="font-mono text-emerald-400 font-bold">{speechRate}x</span>
          </div>
          <input
            type="range"
            min="0.8"
            max="1.4"
            step="0.05"
            value={speechRate}
            onChange={(e) => setSpeechRate(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Interactive Scene Playback List */}
      <div className="space-y-2 pt-1">
        {scriptScenes.map((sc, idx) => {
          const isCurrent = isPlaying && activeSceneIdx === idx;
          return (
            <div
              key={sc.scene}
              onClick={() => handlePlayScene(idx)}
              className={`p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isCurrent
                  ? 'bg-emerald-500/10 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
                  : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-2.5 flex-1">
                <span
                  className={`w-6 h-6 rounded-lg font-mono font-bold text-[10px] flex items-center justify-center shrink-0 ${
                    isCurrent ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {sc.scene}
                </span>
                <p className={`line-clamp-1 ${isCurrent ? 'text-emerald-300 font-bold' : 'text-zinc-300'}`}>
                  "{sc.audio_spoken}"
                </p>
              </div>

              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded shrink-0">
                {sc.on_screen_text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
