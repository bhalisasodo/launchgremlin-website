import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  Layers,
  Sparkles,
  Copy,
  Check,
  Play,
  Pause,
  RotateCcw,
  Share2,
  CheckCircle2,
  Smartphone,
  Maximize2,
  FileText,
  Clock,
  ArrowRight,
  Download,
  Flame,
  Zap,
  Sliders,
  Type,
  Eye,
  FileCode,
  Image as ImageIcon,
  CheckSquare
} from 'lucide-react';
import { generateMarkdownBrief } from '../../utils/contentEngineData';
import {
  generateSrtContent,
  generateVttContent,
  downloadSubtitleFile
} from '../../utils/subtitleGenerator';
import { downloadLeadMagnetHtml } from '../../utils/leadMagnetGenerator';
import SlideExporterModal from './SlideExporterModal';
import SocialMobileSimulator from './SocialMobileSimulator';
import VoiceoverStudio from './VoiceoverStudio';

export default function MultiFormatPreview({
  draftPackage,
  onApprove,
  isApproving,
  onDeriveMaserati
}) {
  const [activeFormatTab, setActiveFormatTab] = useState('talking_clip');
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [copiedKey, setCopiedKey] = useState(null);
  const [captionPlatform, setCaptionPlatform] = useState('instagram');
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [showVoiceStudio, setShowVoiceStudio] = useState(false);

  // Teleprompter & Recording Studio state
  const [teleprompterMode, setTeleprompterMode] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeedWpm, setScrollSpeedWpm] = useState(140);
  const [fontSizeTier, setFontSizeTier] = useState('large'); // 'normal', 'large', 'xlarge'
  const [isMirrored, setIsMirrored] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const teleprompterRef = useRef(null);
  const scrollAnimRef = useRef(null);

  if (!draftPackage || !draftPackage.formats) {
    return (
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-12 text-center text-zinc-500">
        <Sparkles className="w-8 h-8 mx-auto mb-3 text-zinc-600 animate-pulse" />
        <p className="text-sm">No generated package selected. Use the Intake Studio above to multiply formats.</p>
      </div>
    );
  }

  const { formats, chosen_hook, title, account, pillar, cta, intake_id, status } = draftPackage;
  const { talking_clip, carousel, before_after, caption_only } = formats;

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Teleprompter Scrolling Logic
  const startRecordingFlow = () => {
    if (isScrolling) {
      setIsScrolling(false);
      return;
    }
    setCountdown(3);
    const countInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countInterval);
          setIsScrolling(true);
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };

  const resetTeleprompter = () => {
    setIsScrolling(false);
    setCountdown(null);
    if (teleprompterRef.current) {
      teleprompterRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    if (!isScrolling) {
      if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current);
      return;
    }

    const container = teleprompterRef.current;
    if (!container) return;

    let lastTimestamp = performance.now();
    const pixelsPerSecond = (scrollSpeedWpm / 60) * 32;

    const step = (now) => {
      const delta = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 5) {
        setIsScrolling(false);
        return;
      }

      container.scrollTop += pixelsPerSecond * delta;
      scrollAnimRef.current = requestAnimationFrame(step);
    };

    scrollAnimRef.current = requestAnimationFrame(step);
    return () => {
      if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current);
    };
  }, [isScrolling, scrollSpeedWpm]);

  // Export handlers
  const handleDownloadMarkdown = () => {
    const mdContent = generateMarkdownBrief(draftPackage);
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${intake_id}_READY_TO_POST.md`;
    link.click();
  };

  const handleDownloadSrt = () => {
    const srtContent = generateSrtContent(talking_clip?.scenes || []);
    downloadSubtitleFile(srtContent, `${intake_id}_Captions`, 'srt');
  };

  const handleDownloadVtt = () => {
    const vttContent = generateVttContent(talking_clip?.scenes || []);
    downloadSubtitleFile(vttContent, `${intake_id}_Captions`, 'vtt');
  };

  const handleDownloadLeadMagnet = () => {
    downloadLeadMagnetHtml(draftPackage);
  };

  return (
    <div className="space-y-6">
      {/* Main Studio Container */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl space-y-0">
        {/* Header Banner */}
        <div className="p-6 border-b border-zinc-800/80 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                {intake_id}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium">
                {account === 'needmoney4maserati' ? '@needmoney4maserati' : '@LaunchGremlin'}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  status === 'APPROVED'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}
              >
                {status || 'PENDING_REVIEW'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
            <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
              <strong className="text-emerald-400">Chosen Hook:</strong> "{chosen_hook}"
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* Live Mobile Simulator Toggle */}
            <button
              type="button"
              onClick={() => setShowSimulator(!showSimulator)}
              className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                showSimulator
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{showSimulator ? 'Hide Phone' : 'Live Phone Preview'}</span>
            </button>

            {/* Maserati Derivation Button */}
            {account !== 'needmoney4maserati' && onDeriveMaserati && (
              <button
                type="button"
                onClick={() => onDeriveMaserati(draftPackage)}
                className="px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105"
                title="Derive a founder build-in-public story for @needmoney4maserati from this proof point"
              >
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                Derive Maserati
              </button>
            )}

            {/* Lead Magnet Checklist Download */}
            <button
              type="button"
              onClick={handleDownloadLeadMagnet}
              className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold border border-zinc-700 transition-colors flex items-center gap-1.5"
              title="Download 1-page Action Checklist & Lead Magnet HTML/PDF"
            >
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Lead Magnet</span>
            </button>

            {/* Export Markdown */}
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold border border-zinc-700 transition-colors flex items-center gap-1.5"
              title="Download formatted READY_TO_POST.md brief"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">.MD</span>
            </button>

            {/* Approve Draft */}
            <button
              type="button"
              onClick={() => onApprove(intake_id)}
              disabled={isApproving || status === 'APPROVED'}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
            >
              {status === 'APPROVED' ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Package Approved ✅
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Approve & Schedule
                </>
              )}
            </button>
          </div>
        </div>

        {/* Format Switcher Tabs */}
        <div className="flex border-b border-zinc-800 bg-zinc-950/60 overflow-x-auto px-4">
          {[
            { id: 'talking_clip', label: '🎬 1. Video Script & Studio', icon: Video },
            { id: 'carousel', label: '📱 2. 5-Slide Carousel', icon: Layers },
            { id: 'before_after', label: '⚖️ 3. Before & After Proof', icon: Smartphone },
            { id: 'caption_only', label: '✍️ 4. High-Engagement Post', icon: FileText }
          ].map((tab) => {
            const isActive = activeFormatTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFormatTab(tab.id)}
                className={`px-5 py-3.5 text-xs font-semibold whitespace-nowrap transition-all border-b-2 flex items-center gap-2 ${
                  isActive
                    ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Format Content Panel */}
        <div className="p-6">
          {/* 1. TALKING CLIP SCRIPT & RECORDING STUDIO */}
          {activeFormatTab === 'talking_clip' && talking_clip && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-950/60 border border-zinc-800/80 p-3 rounded-xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 text-xs font-mono text-zinc-300">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" /> {talking_clip.duration || '45-60s'}
                  </span>

                  <button
                    type="button"
                    onClick={() => setTeleprompterMode(!teleprompterMode)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                      teleprompterMode
                        ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                        : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:text-white'
                    }`}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    {teleprompterMode ? 'Close Teleprompter' : '🎙️ Teleprompter'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowVoiceStudio(!showVoiceStudio)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                      showVoiceStudio
                        ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md'
                        : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:text-white'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    {showVoiceStudio ? 'Hide Voiceover' : '🔊 AI Voiceover'}
                  </button>
                </div>

                {/* Subtitle Downloads & Copy Script */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadSrt}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors"
                    title="Download .SRT subtitle file for Premiere / CapCut"
                  >
                    <FileCode className="w-3.5 h-3.5 text-emerald-400" /> .SRT
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadVtt}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors"
                    title="Download .VTT subtitle file for Web / TikTok"
                  >
                    <FileCode className="w-3.5 h-3.5 text-sky-400" /> .VTT
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        talking_clip.scenes
                          ?.map(
                            (s) =>
                              `[Scene ${s.scene}]\nVISUAL: ${s.visual}\nSPOKEN: "${s.audio_spoken}"\nON-SCREEN: ${s.on_screen_text}`
                          )
                          .join('\n\n'),
                        'script'
                      )
                    }
                    className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 flex items-center gap-1.5 border border-zinc-700 transition-colors"
                  >
                    {copiedKey === 'script' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Script
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* EMBEDDED VOICEOVER SYNTHESIZER */}
              {showVoiceStudio && (
                <VoiceoverStudio scriptScenes={talking_clip.scenes || []} cta={cta} />
              )}

              {/* LIVE RECORDING TELEPROMPTER STUDIO */}
              {teleprompterMode ? (
                <div className="bg-zinc-950 border-2 border-emerald-500/40 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                  {/* Teleprompter Top Controls Ribbon */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={startRecordingFlow}
                        className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                          isScrolling
                            ? 'bg-amber-500 text-black animate-pulse'
                            : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/20'
                        }`}
                      >
                        {isScrolling ? (
                          <>
                            <Pause className="w-4 h-4 fill-current" /> Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current" /> Start Recording
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={resetTeleprompter}
                        className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                        title="Reset Teleprompter"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Tuning Parameters */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300">
                      <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
                        <span className="text-zinc-500 font-mono">Speed:</span>
                        <input
                          type="range"
                          min="90"
                          max="220"
                          step="5"
                          value={scrollSpeedWpm}
                          onChange={(e) => setScrollSpeedWpm(Number(e.target.value))}
                          className="w-20 accent-emerald-400 cursor-pointer"
                        />
                        <span className="font-mono text-emerald-400 font-bold">{scrollSpeedWpm} WPM</span>
                      </div>

                      <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
                        {['normal', 'large', 'xlarge'].map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setFontSizeTier(size)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono uppercase transition-colors ${
                              fontSizeTier === size ? 'bg-zinc-800 text-emerald-400 font-bold' : 'text-zinc-500'
                            }`}
                          >
                            {size[0].toUpperCase()}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsMirrored(!isMirrored)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-colors ${
                          isMirrored ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        Mirror: {isMirrored ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  </div>

                  {/* Countdown Splash */}
                  {countdown !== null && (
                    <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center space-y-4">
                      <span className="text-8xl font-black text-emerald-400 animate-ping font-mono">{countdown}</span>
                      <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">Get Ready to Record 🎙️</span>
                    </div>
                  )}

                  {/* Teleprompter Scroll View */}
                  <div
                    ref={teleprompterRef}
                    className={`h-96 overflow-y-auto px-4 py-8 space-y-8 text-center scroll-smooth relative ${
                      isMirrored ? 'scale-x-[-1]' : ''
                    }`}
                  >
                    <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest pb-4 border-b border-zinc-800/60 max-w-sm mx-auto">
                      🎬 TELEPROMPTER ACTIVE · {talking_clip.duration || '45-60s'}
                    </div>

                    {talking_clip.scenes?.map((sc, idx) => (
                      <div
                        key={sc.scene}
                        className={`p-6 rounded-2xl transition-all max-w-3xl mx-auto space-y-3 ${
                          activeSceneIndex === idx
                            ? 'bg-zinc-900/90 border border-emerald-500/40 shadow-xl'
                            : 'bg-zinc-950/40 border border-zinc-850 opacity-90'
                        }`}
                        onClick={() => setActiveSceneIndex(idx)}
                      >
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                          <span className="font-bold text-emerald-400">SCENE {sc.scene}</span>
                          <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                            {sc.on_screen_text}
                          </span>
                        </div>

                        <p
                          className={`font-sans font-extrabold text-white leading-relaxed ${
                            fontSizeTier === 'xlarge'
                              ? 'text-3xl md:text-4xl'
                              : fontSizeTier === 'large'
                              ? 'text-2xl md:text-3xl'
                              : 'text-lg md:text-xl'
                          }`}
                        >
                          "{sc.audio_spoken}"
                        </p>

                        <div className="text-xs text-zinc-400 font-mono italic">
                          🎥 Visual: {sc.visual}
                        </div>
                      </div>
                    ))}

                    <div className="pt-12 text-zinc-600 font-mono text-xs">
                      🏁 END OF SCRIPT · {cta}
                    </div>
                  </div>
                </div>
              ) : (
                /* Standard Scene Cards */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {talking_clip.scenes?.map((sc) => (
                    <div
                      key={sc.scene}
                      className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3 flex flex-col justify-between hover:border-zinc-700 transition-colors"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
                          <span className="text-xs font-extrabold font-mono text-emerald-400">
                            SCENE {sc.scene}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded-md">
                            {sc.on_screen_text}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">
                            🎙️ Audio Spoken:
                          </span>
                          <p className="text-sm font-medium text-white mt-1 leading-relaxed">
                            "{sc.audio_spoken}"
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-zinc-900 text-xs text-zinc-400">
                        <span className="text-zinc-500 font-medium">🎥 Visual Direction:</span> {sc.visual}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Captions Block */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 pb-3 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-300">Social Caption Variants:</span>
                    {['instagram', 'tiktok', 'facebook'].map((plat) => (
                      <button
                        key={plat}
                        type="button"
                        onClick={() => setCaptionPlatform(plat)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors ${
                          captionPlatform === plat
                            ? 'bg-emerald-500 text-zinc-950 font-bold shadow'
                            : 'bg-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {plat}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(talking_clip.captions?.[captionPlatform] || '', `cap-${captionPlatform}`)
                    }
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                  >
                    {copiedKey === `cap-${captionPlatform}` ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Caption
                      </>
                    )}
                  </button>
                </div>

                <pre className="text-xs text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed">
                  {talking_clip.captions?.[captionPlatform] || 'No caption generated.'}
                </pre>
              </div>
            </div>
          )}

          {/* 2. 5-SLIDE CAROUSEL VISUALIZER */}
          {activeFormatTab === 'carousel' && carousel && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-zinc-400">
                  5-Slide Instagram/LinkedIn Carousel Visualizer (Click slide tabs below to preview)
                </span>

                <div className="flex items-center gap-2">
                  {/* 1-Click High-Res PNG Exporter Modal Trigger */}
                  <button
                    type="button"
                    onClick={() => setIsSlideModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Export High-Res Slides (1080×1350 PNG)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        carousel.slides
                          ?.map(
                            (s) =>
                              `Slide ${s.slide_number} (${s.type})\nHEADLINE: ${s.headline}\nBODY: ${s.body || 'N/A'}\nVISUAL: ${s.visual_cue}`
                          )
                          .join('\n\n'),
                        'carousel-all'
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 flex items-center gap-1.5 border border-zinc-700 transition-colors"
                  >
                    {copiedKey === 'carousel-all' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied Text!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Text
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Slide Navigation Buttons */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {carousel.slides?.map((slide, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                      activeSlideIndex === idx
                        ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md shadow-emerald-500/20 font-bold'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    Slide {slide.slide_number}: {slide.type}
                  </button>
                ))}
              </div>

              {/* Interactive Slide Canvas Mockup */}
              {carousel.slides?.[activeSlideIndex] && (
                <div className="aspect-[4/3] max-w-xl mx-auto bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border-2 border-zinc-800 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  {/* Brand Badge */}
                  <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <span className="flex items-center gap-1.5 font-bold text-white">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span> LaunchGremlin
                    </span>
                    <span>
                      Slide {carousel.slides[activeSlideIndex].slide_number} / 5
                    </span>
                  </div>

                  {/* Main Slide Typography */}
                  <div className="my-auto space-y-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
                      {carousel.slides[activeSlideIndex].type}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-white leading-tight tracking-tight max-w-md mx-auto">
                      {carousel.slides[activeSlideIndex].headline}
                    </h3>
                    {carousel.slides[activeSlideIndex].body && (
                      <p className="text-xs md:text-sm text-zinc-300 font-sans leading-relaxed max-w-md mx-auto whitespace-pre-line">
                        {carousel.slides[activeSlideIndex].body}
                      </p>
                    )}
                  </div>

                  {/* Footer Visual Direction Cue */}
                  <div className="pt-4 border-t border-zinc-800/80 text-[11px] text-zinc-400 flex items-center justify-between">
                    <span className="truncate">
                      🎨 Visual Cue: {carousel.slides[activeSlideIndex].visual_cue}
                    </span>
                    <span className="text-emerald-400 font-bold ml-2">Swipe 👉</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. BEFORE & AFTER PROOF */}
          {activeFormatTab === 'before_after' && before_after && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">
                  Visual Contrast Brief for Static/Carousel Social Proof
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      `BEFORE: ${before_after.before_state?.description}\n\nAFTER: ${before_after.after_state?.description}\n\nCAPTION: ${before_after.post_caption}`,
                      'ba-copy'
                    )
                  }
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 flex items-center gap-1.5 border border-zinc-700 transition-colors"
                >
                  {copiedKey === 'ba-copy' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Comparison
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Before Card */}
                <div className="p-6 rounded-2xl bg-zinc-950 border border-red-500/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider">
                      {before_after.before_state?.badge || '❌ High Friction'}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">Traditional</span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {before_after.before_state?.label}
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {before_after.before_state?.description}
                  </p>
                </div>

                {/* After Card */}
                <div className="p-6 rounded-2xl bg-zinc-950 border border-emerald-500/40 space-y-4 shadow-lg shadow-emerald-500/5">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      {before_after.after_state?.badge || '⚡ High Conversion'}
                    </span>
                    <span className="text-xs font-mono text-emerald-400">LaunchGremlin</span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {before_after.after_state?.label}
                  </h4>
                  <p className="text-xs text-zinc-200 leading-relaxed">
                    {before_after.after_state?.description}
                  </p>
                </div>
              </div>

              {/* Design Direction & Post Caption */}
              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  🎨 Graphic Designer Brief:
                </span>
                <p className="text-xs text-zinc-300">{before_after.visual_direction}</p>
                <div className="pt-3 border-t border-zinc-800">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                    Ready Post Caption:
                  </span>
                  <p className="text-xs text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed">
                    {before_after.post_caption}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4. CAPTION ONLY POST */}
          {activeFormatTab === 'caption_only' && caption_only && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">
                  Standalone Rich Post (Ideal for LinkedIn, Facebook, and Instagram Text Carousel)
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(caption_only.text, 'text-post')}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                >
                  {copiedKey === 'text-post' ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied Text Post!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Post
                    </>
                  )}
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                <pre className="text-sm text-zinc-200 font-sans whitespace-pre-wrap leading-relaxed">
                  {caption_only.text}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cross-Platform Social Mobile Simulator (Collapsible) */}
      {showSimulator && (
        <SocialMobileSimulator draftPackage={draftPackage} />
      )}

      {/* High-Res 1080x1350 Canvas Slide Exporter Modal */}
      <SlideExporterModal
        isOpen={isSlideModalOpen}
        onClose={() => setIsSlideModalOpen(false)}
        draftPackage={draftPackage}
      />
    </div>
  );
}
