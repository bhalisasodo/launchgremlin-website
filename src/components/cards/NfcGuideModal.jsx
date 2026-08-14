import React, { useState } from 'react';
import { Smartphone, Check, Copy, ExternalLink, Zap, X, ArrowRight } from 'lucide-react';

export default function NfcGuideModal({ isOpen, onClose, cardUrl }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(cardUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 text-white relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            NFC Programming Guide
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Program Any NFC Card in 60 Seconds
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Write your LaunchGremlin digital card URL to any standard blank NFC card or sticker (NTAG213, NTAG215, or NTAG216).
          </p>
        </div>

        {/* URL Box */}
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-2">
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Your Card Payload URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={cardUrl}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-emerald-400 truncate outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* 3 Step Tutorial */}
        <div className="space-y-3">
          <div className="p-3.5 bg-zinc-950/60 border border-zinc-800 rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-400 text-zinc-950 font-black text-xs flex items-center justify-center shrink-0">1</span>
            <div>
              <h4 className="text-xs font-bold text-white">Download "NFC Tools" (Free App)</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Available for free on both iOS App Store and Google Play Store.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-zinc-950/60 border border-zinc-800 rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-400 text-zinc-950 font-black text-xs flex items-center justify-center shrink-0">2</span>
            <div>
              <h4 className="text-xs font-bold text-white">Add a URL Record</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Open NFC Tools &rarr; Select <strong>Write</strong> &rarr; <strong>Add a record</strong> &rarr; <strong>Custom URL / URI</strong> &rarr; Paste your card URL.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-zinc-950/60 border border-zinc-800 rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-400 text-zinc-950 font-black text-xs flex items-center justify-center shrink-0">3</span>
            <div>
              <h4 className="text-xs font-bold text-white">Tap Card to Phone</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Tap <strong>Write / 38 Bytes</strong> and hold your blank NFC card to the top edge of your iPhone or back of Android. Done!
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-zinc-400">Blank NFC cards cost ~$0.40 on Amazon</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
