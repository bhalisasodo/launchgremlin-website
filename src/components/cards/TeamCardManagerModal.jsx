import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Users,
  Building2,
  Plus,
  Trash2,
  Edit2,
  Download,
  Upload,
  Copy,
  Check,
  ExternalLink,
  Phone,
  Mail,
  Share2,
  Sparkles,
  CheckCircle2,
  QrCode
} from 'lucide-react';
import QRCode from 'qrcode';
import { teamManager } from '../../utils/teamCardManager';

export default function TeamCardManagerModal({
  isOpen,
  onClose,
  onSelectMemberCard
}) {
  const [teamData, setTeamData] = useState(teamManager.getTeamData());
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [isBatchDownloading, setIsBatchDownloading] = useState(false);
  const fileInputRef = useRef(null);

  // New/Edit Member Form State
  const [memberForm, setMemberForm] = useState({
    fullName: '',
    jobTitle: '',
    phone: '',
    whatsapp: '',
    email: '',
    bio: ''
  });

  if (!isOpen) return null;

  const handleOpenAdd = () => {
    setMemberForm({
      fullName: '',
      jobTitle: '',
      phone: teamData.companyPhone || '',
      whatsapp: teamData.companyWhatsapp || '',
      email: '',
      bio: ''
    });
    setEditingMemberId(null);
    setIsAddingMember(true);
  };

  const handleOpenEdit = (member) => {
    setMemberForm({ ...member });
    setEditingMemberId(member.id);
    setIsAddingMember(true);
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    if (!memberForm.fullName.trim()) return;

    if (editingMemberId) {
      teamManager.updateMember(editingMemberId, memberForm);
    } else {
      teamManager.addMember(memberForm);
    }

    setTeamData(teamManager.getTeamData());
    setIsAddingMember(false);
    setEditingMemberId(null);
  };

  const handleDeleteMember = (memberId) => {
    if (window.confirm('Remove this employee from the team directory?')) {
      teamManager.deleteMember(memberId);
      setTeamData(teamManager.getTeamData());
    }
  };

  const handleCopyMemberLink = (slug, memberId) => {
    const url = `${window.location.origin}/c/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(memberId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCsvImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        const updated = teamManager.importTeamFromCsv(text);
        setTeamData(updated);
      }
    };
    reader.readAsText(file);
  };

  const handleBatchDownloadQrs = async () => {
    setIsBatchDownloading(true);
    for (const mem of teamData.members) {
      const url = `${window.location.origin}/c/${mem.slug}`;
      const dataUrl = await QRCode.toDataURL(url, {
        width: 600,
        margin: 2,
        color: { dark: '#09090b', light: '#ffffff' }
      });
      const link = document.createElement('a');
      link.download = `${mem.slug}_QR.png`;
      link.href = dataUrl;
      link.click();
      await new Promise((r) => setTimeout(r, 200));
    }
    setIsBatchDownloading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-4xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Team & Corporate Card Directory
              </h2>
              <p className="text-xs text-zinc-400">
                Manage employees, batch import cards via CSV, and download team QR codes.
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

        {/* Company Settings Summary */}
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider">
              Company Workspace
            </span>
            <h3 className="text-base font-bold text-white">{teamData.companyName}</h3>
            <p className="text-xs text-zinc-400">{teamData.companyTagline}</p>
          </div>

          {/* Quick CSV / Batch Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => teamManager.exportTeamToCsv(teamData)}
              className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" /> Export CSV
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleCsvImport}
              accept=".csv"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 flex items-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-400" /> Import CSV
            </button>

            <button
              type="button"
              onClick={handleBatchDownloadQrs}
              disabled={isBatchDownloading}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <QrCode className="w-3.5 h-3.5" />
              {isBatchDownloading ? 'Exporting...' : 'Batch QRs'}
            </button>
          </div>
        </div>

        {/* Member Form Modal / Sub-view */}
        {isAddingMember ? (
          <form
            onSubmit={handleSaveMember}
            className="p-5 rounded-2xl bg-zinc-900 border border-emerald-500/40 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {editingMemberId ? 'Edit Team Member' : 'Add New Team Member'}
              </span>
              <button
                type="button"
                onClick={() => setIsAddingMember(false)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={memberForm.fullName}
                  onChange={(e) => setMemberForm({ ...memberForm, fullName: e.target.value })}
                  placeholder="e.g. Liam Dlamini"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Job Title</label>
                <input
                  type="text"
                  value={memberForm.jobTitle}
                  onChange={(e) => setMemberForm({ ...memberForm, jobTitle: e.target.value })}
                  placeholder="e.g. Sales Consultant"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Email Address</label>
                <input
                  type="email"
                  value={memberForm.email}
                  onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                  placeholder="liam@launchgremlin.co.za"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Direct Cell</label>
                <input
                  type="text"
                  value={memberForm.phone}
                  onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                  placeholder="+27 82 000 0000"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={memberForm.whatsapp}
                  onChange={(e) => setMemberForm({ ...memberForm, whatsapp: e.target.value })}
                  placeholder="+27 82 000 0000"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3">
                <label className="block text-[11px] text-zinc-400 mb-1">Short Bio</label>
                <input
                  type="text"
                  value={memberForm.bio}
                  onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })}
                  placeholder="Short role summary or specialty..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingMember(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs shadow-md"
              >
                Save Member
              </button>
            </div>
          </form>
        ) : null}

        {/* Team Members List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Active Team Members ({teamData.members.length})
            </span>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" /> Add Member
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
            {teamData.members.map((mem) => (
              <div
                key={mem.id}
                className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex flex-col justify-between gap-3 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-xs text-emerald-400">
                      {mem.fullName?.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">{mem.fullName}</h4>
                      <span className="text-xs text-zinc-400 block">{mem.jobTitle}</span>
                      <span className="text-[10px] font-mono text-zinc-500">/c/{mem.slug}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(mem)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
                      title="Edit Member"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteMember(mem.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800"
                      title="Delete Member"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs">
                  <button
                    type="button"
                    onClick={() => handleCopyMemberLink(mem.slug, mem.id)}
                    className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 font-mono"
                  >
                    {copiedId === mem.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" /> Copied Link!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy Link
                      </>
                    )}
                  </button>

                  {onSelectMemberCard && (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectMemberCard({
                          ...mem,
                          companyName: teamData.companyName,
                          theme: { accent: teamData.accentColor || '#10b981' }
                        });
                        onClose();
                      }}
                      className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      Open in Studio 👉
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-3 border-t border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-white"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
}
