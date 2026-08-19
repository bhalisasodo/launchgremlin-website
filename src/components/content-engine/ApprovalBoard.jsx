import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Download,
  Copy,
  Check,
  Eye,
  FileText,
  Filter,
  Layers,
  Sparkles,
  ArrowRight,
  Flame
} from 'lucide-react';
import { generateMarkdownBrief } from '../../utils/contentEngineData';

export default function ApprovalBoard({
  drafts = [],
  onSelectDraft,
  onApproveDraft,
  activeDraftId,
  onDeriveMaserati
}) {
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL', 'PENDING_REVIEW', 'APPROVED'
  const [accountFilter, setAccountFilter] = useState('ALL');
  const [copiedBriefId, setCopiedBriefId] = useState(null);
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [approvingId, setApprovingId] = useState(null);

  const filteredDrafts = drafts.filter((d) => {
    if (statusFilter !== 'ALL' && d.status !== statusFilter) return false;
    if (accountFilter !== 'ALL' && d.account !== accountFilter) return false;
    return true;
  });

  const handleCopyBrief = (draft) => {
    const md = generateMarkdownBrief(draft);
    navigator.clipboard.writeText(md);
    setCopiedBriefId(draft.intake_id);
    setTimeout(() => setCopiedBriefId(null), 2500);
  };

  const handleDownloadBrief = (draft) => {
    const md = generateMarkdownBrief(draft);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${draft.intake_id}_READY_TO_POST.md`;
    link.click();
  };

  const handleApprove = (e, intakeId) => {
    e.stopPropagation();
    onApproveDraft(intakeId, reviewerNotes);
    setApprovingId(null);
    setReviewerNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" /> Stage 3: Human Approval Gate
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Review & Scheduling Queue</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Ensure all drafts pass brand and privacy guardrails before scheduling or exporting.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING_REVIEW">Pending Review</option>
            <option value="APPROVED">Approved</option>
          </select>

          <select
            value={accountFilter}
            onChange={(e) => setAccountFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Accounts</option>
            <option value="launchgremlin">@LaunchGremlin</option>
            <option value="needmoney4maserati">@needmoney4maserati</option>
          </select>
        </div>
      </div>

      {/* Drafts List */}
      {filteredDrafts.length === 0 ? (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-12 text-center text-zinc-500">
          <Clock className="w-8 h-8 mx-auto mb-2 text-zinc-600" />
          <p className="text-sm">No packages found matching the selected filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredDrafts.map((d) => {
            const isSelected = activeDraftId === d.intake_id;
            const isApproved = d.status === 'APPROVED';
            const isMaserati = d.account === 'needmoney4maserati';

            return (
              <div
                key={d.intake_id}
                onClick={() => onSelectDraft(d)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isSelected
                    ? 'bg-zinc-900 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/40'
                    : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50'
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                      {d.intake_id}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        isMaserati ? 'text-amber-400' : 'text-zinc-400'
                      }`}
                    >
                      {isMaserati ? '@needmoney4maserati' : '@LaunchGremlin'}
                    </span>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isApproved
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {d.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">{d.title}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-1">
                    <strong className="text-zinc-300">Hook:</strong> "{d.chosen_hook}"
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                  {/* Derive Maserati Action */}
                  {!isMaserati && onDeriveMaserati && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeriveMaserati(d);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1 transition-colors"
                      title="Derive a Maserati build-in-public post"
                    >
                      <Flame className="w-3.5 h-3.5 fill-amber-400" /> Derive Maserati
                    </button>
                  )}

                  {/* Copy Markdown */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyBrief(d);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 flex items-center gap-1.5 border border-zinc-700 transition-colors"
                    title="Copy formatted markdown brief"
                  >
                    {copiedBriefId === d.intake_id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy .MD
                      </>
                    )}
                  </button>

                  {/* Download MD Brief */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadBrief(d);
                    }}
                    className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs border border-zinc-700 transition-colors"
                    title="Download READY_TO_POST.md"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                  </button>

                  {/* Approve */}
                  {!isApproved && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setApprovingId(d.intake_id);
                      }}
                      className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Approval Modal if prompted */}
      {approvingId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Approve Content Package {approvingId}</h3>
            <p className="text-xs text-zinc-400">
              Confirm that this post complies with LaunchGremlin brand voice rules and privacy standards.
            </p>
            <textarea
              rows={3}
              value={reviewerNotes}
              onChange={(e) => setReviewerNotes(e.target.value)}
              placeholder="Optional reviewer notes (e.g. Approved for Thursday morning drop)..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setApprovingId(null)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={(e) => handleApprove(e, approvingId)}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20"
              >
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
