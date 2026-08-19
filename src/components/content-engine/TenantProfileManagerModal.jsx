import React, { useState, useEffect } from 'react';
import {
  X,
  Building2,
  Sparkles,
  Sliders,
  Save,
  Trash2,
  Plus,
  CheckCircle2,
  Palette,
  Layers,
  Zap,
  Globe,
  MessageCircle,
  HelpCircle,
  BookOpen,
  PhoneCall,
  Video,
  Flame,
  Code2
} from 'lucide-react';
import { INDUSTRY_BLUEPRINTS, tenantManager } from '../../utils/tenantConfig';

const AVAILABLE_ICONS = ['BookOpen', 'PhoneCall', 'Code2', 'Video', 'Flame', 'Sparkles', 'Zap', 'HelpCircle'];

export default function TenantProfileManagerModal({
  isOpen,
  onClose,
  tenantToEdit,
  onSaveTenant,
  onDeleteTenant
}) {
  const [formData, setFormData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (tenantToEdit) {
      setFormData(JSON.parse(JSON.stringify(tenantToEdit)));
    } else {
      // New tenant template
      setFormData({
        id: `tenant_${Date.now().toString().slice(-4)}`,
        name: 'New Client Brand',
        niche: 'Custom Niche',
        handle: '@clientbrand',
        secondaryHandle: '',
        accentColor: '#10b981',
        themeKey: 'emerald',
        website: 'https://clientbrand.co.za',
        whatsapp: '+27 82 000 0000',
        defaultCta: 'Visit our website / Claim free consultation via WhatsApp (Link in bio)',
        voice: {
          name: 'Signature Brand Voice',
          tone: 'Professional, authentic, value-driven, and clear.',
          bannedWords: ['cheap', 'guaranteed overnight'],
          signatureSignoff: '⚡ Quality Service · Built to Convert'
        },
        pillars: [
          {
            id: 'pillar_1',
            name: 'Core Educational Tips',
            idPrefix: 'TIP',
            iconName: 'BookOpen',
            weeklyCadence: '2x/week',
            description: 'Actionable tips and problem solving for customers.'
          },
          {
            id: 'pillar_2',
            name: 'Client Transformations',
            idPrefix: 'TRF',
            iconName: 'Sparkles',
            weeklyCadence: '2x/week',
            description: 'Before and after case studies and proof.'
          },
          {
            id: 'pillar_3',
            name: 'Behind the Scenes',
            idPrefix: 'BTS',
            iconName: 'Video',
            weeklyCadence: '2x/week',
            description: 'Team operations and day-in-the-life footage.'
          }
        ]
      });
    }
  }, [tenantToEdit, isOpen]);

  if (!isOpen || !formData) return null;

  const handleApplyBlueprint = (blueprint) => {
    setFormData({
      ...blueprint,
      id: formData.id || blueprint.id // keep ID if editing existing
    });
  };

  const handleAddPillar = () => {
    const newPillar = {
      id: `pillar_${Date.now().toString().slice(-4)}`,
      name: 'New Custom Pillar',
      idPrefix: 'CUST',
      iconName: 'BookOpen',
      weeklyCadence: '2x/week',
      description: 'Pillar description and focus.'
    };
    setFormData({
      ...formData,
      pillars: [...(formData.pillars || []), newPillar]
    });
  };

  const handleUpdatePillar = (idx, field, value) => {
    const updated = [...formData.pillars];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData({ ...formData, pillars: updated });
  };

  const handleDeletePillar = (idx) => {
    const updated = formData.pillars.filter((_, i) => i !== idx);
    setFormData({ ...formData, pillars: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveTenant(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  const isProtected = formData.id === 'launchgremlin';

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-3xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-black"
              style={{ backgroundColor: formData.accentColor || '#10b981' }}
            >
              <Building2 className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {isProtected ? 'Edit LaunchGremlin OS Profile' : 'Brand Profile & Pillar Studio'}
              </h2>
              <p className="text-xs text-zinc-400">
                Configure brand voice, social handles, color palette, and strategic pillars.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Quick Load Blueprint Starter Pack */}
          <div className="space-y-2 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> 1-Click Industry Blueprint Preset:
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {INDUSTRY_BLUEPRINTS.map((bp) => (
                <button
                  key={bp.id}
                  type="button"
                  onClick={() => handleApplyBlueprint(bp)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 font-medium transition-all flex items-center gap-1.5"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: bp.accentColor }}
                  ></span>
                  {bp.name.split(' ')[0]} ({bp.niche.split(' ')[0]})
                </button>
              ))}
            </div>
          </div>

          {/* 2. Core Identity Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                Brand Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                Industry / Niche
              </label>
              <input
                type="text"
                value={formData.niche}
                onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                required
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                Social Handle
              </label>
              <input
                type="text"
                value={formData.handle}
                onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                required
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                WhatsApp Phone
              </label>
              <input
                type="text"
                value={formData.whatsapp || ''}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                Accent Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.accentColor || '#10b981'}
                  onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                  className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.accentColor || '#10b981'}
                  onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                Card Theme
              </label>
              <select
                value={formData.themeKey || 'emerald'}
                onChange={(e) => setFormData({ ...formData, themeKey: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="emerald">LaunchGremlin Emerald</option>
                <option value="amber">Maserati Flame Amber</option>
                <option value="slate">Minimal High-Contrast Slate</option>
                <option value="purple">Neon Builder Purple</option>
              </select>
            </div>
          </div>

          {/* 3. Conversion CTA & Voice Guidelines */}
          <div className="space-y-3 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Voice Guardrails & Call to Action
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Tone of Voice Summary</label>
                <textarea
                  rows={2}
                  value={formData.voice?.tone || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      voice: { ...formData.voice, tone: e.target.value }
                    })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-white font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Default Post CTA</label>
                <textarea
                  rows={2}
                  value={formData.defaultCta || ''}
                  onChange={(e) => setFormData({ ...formData, defaultCta: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-white font-sans"
                />
              </div>
            </div>
          </div>

          {/* 4. Strategic Content Pillars Builder */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" /> Strategic Content Pillars ({formData.pillars?.length || 0})
              </span>
              <button
                type="button"
                onClick={handleAddPillar}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-emerald-400 flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Pillar
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {formData.pillars?.map((p, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 relative group"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-zinc-400 mb-1">Pillar Name</label>
                      <input
                        type="text"
                        value={p.name}
                        onChange={(e) => handleUpdatePillar(idx, 'name', e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1">ID Prefix</label>
                      <input
                        type="text"
                        value={p.idPrefix}
                        onChange={(e) => handleUpdatePillar(idx, 'idPrefix', e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono uppercase"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1">Cadence</label>
                      <input
                        type="text"
                        value={p.weeklyCadence}
                        onChange={(e) => handleUpdatePillar(idx, 'weeklyCadence', e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={p.description}
                      onChange={(e) => handleUpdatePillar(idx, 'description', e.target.value)}
                      placeholder="Pillar strategic description..."
                      className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300"
                    />

                    {formData.pillars.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeletePillar(idx)}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-950"
                        title="Delete Pillar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <div>
              {!isProtected && onDeleteTenant && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Delete brand profile ${formData.name}?`)) {
                      onDeleteTenant(formData.id);
                      onClose();
                    }
                  }}
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Profile
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save Brand Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
