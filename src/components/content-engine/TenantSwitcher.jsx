import React, { useState } from 'react';
import {
  Building2,
  ChevronDown,
  Plus,
  Settings,
  Sparkles,
  Check,
  Globe
} from 'lucide-react';
import { tenantManager } from '../../utils/tenantConfig';

export default function TenantSwitcher({
  activeTenant,
  onSelectTenant,
  onOpenTenantManager,
  onCreateNewTenant
}) {
  const [isOpen, setIsOpen] = useState(false);
  const tenants = tenantManager.getTenants();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-white flex items-center gap-2.5 transition-all shadow-md"
      >
        <span
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: activeTenant.accentColor || '#10b981' }}
        ></span>
        <div className="text-left">
          <div className="text-white font-bold leading-none">{activeTenant.name}</div>
          <span className="text-[10px] text-zinc-400 font-mono leading-none">
            {activeTenant.niche}
          </span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-zinc-400 ml-1" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute left-0 mt-2 w-72 bg-zinc-950 border border-zinc-800 rounded-2xl p-2 shadow-2xl z-50 space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono uppercase text-zinc-500 font-bold border-b border-zinc-900">
              Active Client Brand Workspace
            </div>

            <div className="max-h-60 overflow-y-auto space-y-1 py-1">
              {tenants.map((t) => {
                const isSelected = t.id === activeTenant.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      onSelectTenant(t);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-zinc-900 text-white font-bold border border-zinc-700'
                        : 'text-zinc-300 hover:bg-zinc-900/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: t.accentColor || '#10b981' }}
                      ></span>
                      <div>
                        <div className="font-semibold text-white">{t.name}</div>
                        <div className="text-[10px] text-zinc-400 font-mono">{t.niche}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-zinc-900 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenTenantManager(activeTenant);
                }}
                className="flex-1 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-semibold text-zinc-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Settings className="w-3.5 h-3.5" /> Edit Brand
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onCreateNewTenant();
                }}
                className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[11px] font-bold text-zinc-950 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> + New Client
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
