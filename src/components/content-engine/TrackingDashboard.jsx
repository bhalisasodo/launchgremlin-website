import React, { useState } from 'react';
import {
  TrendingUp,
  Flame,
  DollarSign,
  Download,
  Edit2,
  Check,
  Search,
  Sparkles,
  BarChart2
} from 'lucide-react';
import { evaluatePaidCandidate } from '../../utils/contentEngineData';

export default function TrackingDashboard({ trackingRows = [], onUpdateMetrics }) {
  const [editingPostId, setEditingPostId] = useState(null);
  const [editForm, setEditForm] = useState({ views: 0, saves: 0, comments: 0, shares: 0, paid_spend: 'R0' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleStartEdit = (row) => {
    setEditingPostId(row.post_id);
    setEditForm({
      views: row.views || 0,
      saves: row.saves || 0,
      comments: row.comments || 0,
      shares: row.shares || 0,
      paid_spend: row.paid_spend || 'R0'
    });
  };

  const handleSaveEdit = (postId) => {
    onUpdateMetrics(postId, editForm);
    setEditingPostId(null);
  };

  const handleExportCSV = () => {
    const headers = ['post_id', 'timestamp', 'pillar', 'account', 'format', 'status', 'views', 'saves', 'comments', 'shares', 'paid_spend', 'paid_candidate', 'hook_used'];
    const csvLines = [headers.join(',')];
    
    trackingRows.forEach((r) => {
      const line = [
        `"${r.post_id}"`,
        `"${r.timestamp || ''}"`,
        `"${r.pillar || ''}"`,
        `"${r.account || ''}"`,
        `"${r.format || ''}"`,
        `"${r.status || ''}"`,
        r.views || 0,
        r.saves || 0,
        r.comments || 0,
        r.shares || 0,
        `"${r.paid_spend || 'R0'}"`,
        `"${r.paid_candidate || 'NO'}"`,
        `"${(r.hook_used || '').replace(/"/g, '""')}"`
      ].join(',');
      csvLines.push(line);
    });

    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `launchgremlin_content_tracking_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const filteredRows = trackingRows.filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.post_id?.toLowerCase().includes(q) ||
      r.pillar?.toLowerCase().includes(q) ||
      r.account?.toLowerCase().includes(q) ||
      r.hook_used?.toLowerCase().includes(q)
    );
  });

  const paidCandidateCount = trackingRows.filter((r) => r.paid_candidate === 'YES').length;
  const totalViews = trackingRows.reduce((acc, r) => acc + (Number(r.views) || 0), 0);
  const totalSaves = trackingRows.reduce((acc, r) => acc + (Number(r.saves) || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header & Stats Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5" /> Stage 5: 30/60/90 Tracking & Paid Ad Evaluator
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Shared Performance Sheet</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Organic proves it, paid amplifies it. Posts with high saves/shares automatically get flagged for Meta ad spend.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-semibold flex items-center gap-2 border border-zinc-700 transition-colors self-start md:self-auto"
        >
          <Download className="w-4 h-4 text-emerald-400" /> Export Tracking CSV
        </button>
      </div>

      {/* KPI Highlight Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Total Views Tracked</span>
            <div className="text-2xl font-extrabold text-white">{totalViews.toLocaleString()}</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">High-Intent Saves</span>
            <div className="text-2xl font-extrabold text-white">{totalSaves.toLocaleString()}</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-amber-500/30 flex items-center gap-4 shadow-lg shadow-amber-500/5">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-amber-400 font-medium uppercase tracking-wider">Paid Candidates</span>
            <div className="text-2xl font-extrabold text-white">{paidCandidateCount} Winning Creative{paidCandidateCount === 1 ? '' : 's'}</div>
          </div>
        </div>
      </div>

      {/* Search Filter */}
      <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 max-w-md">
        <Search className="w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by post ID, pillar, or hook..."
          className="bg-transparent text-xs text-white focus:outline-none w-full"
        />
      </div>

      {/* Interactive Table */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/80">
        <table className="w-full text-left text-xs text-zinc-300">
          <thead className="bg-zinc-900 text-zinc-400 font-mono text-[11px] uppercase tracking-wider border-b border-zinc-800">
            <tr>
              <th className="py-3 px-4">Post ID</th>
              <th className="py-3 px-4">Pillar & Account</th>
              <th className="py-3 px-4">Format</th>
              <th className="py-3 px-4 text-right">Views</th>
              <th className="py-3 px-4 text-right">Saves</th>
              <th className="py-3 px-4 text-right">Shares</th>
              <th className="py-3 px-4">Paid Amplification</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 font-sans">
            {filteredRows.map((r) => {
              const isEditing = editingPostId === r.post_id;
              const isPaid = r.paid_candidate === 'YES';

              return (
                <tr key={r.post_id} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-white whitespace-nowrap">
                    {r.post_id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-zinc-200">{r.pillar}</div>
                    <div className="text-[11px] text-zinc-500">@{r.account}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-[11px] font-mono text-zinc-300">
                      {r.format}
                    </span>
                  </td>

                  {/* Views */}
                  <td className="py-3.5 px-4 text-right">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editForm.views}
                        onChange={(e) => setEditForm({ ...editForm, views: e.target.value })}
                        className="w-20 bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-right text-xs text-white"
                      />
                    ) : (
                      <span className="font-mono text-zinc-200">{Number(r.views || 0).toLocaleString()}</span>
                    )}
                  </td>

                  {/* Saves */}
                  <td className="py-3.5 px-4 text-right">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editForm.saves}
                        onChange={(e) => setEditForm({ ...editForm, saves: e.target.value })}
                        className="w-16 bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-right text-xs text-emerald-400 font-bold"
                      />
                    ) : (
                      <span className="font-mono text-emerald-400 font-semibold">{r.saves || 0}</span>
                    )}
                  </td>

                  {/* Shares */}
                  <td className="py-3.5 px-4 text-right">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editForm.shares}
                        onChange={(e) => setEditForm({ ...editForm, shares: e.target.value })}
                        className="w-16 bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-right text-xs text-sky-400"
                      />
                    ) : (
                      <span className="font-mono text-sky-400">{r.shares || 0}</span>
                    )}
                  </td>

                  {/* Paid Candidate Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {isPaid ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[11px] border border-amber-500/40 shadow-sm shadow-amber-500/20 animate-pulse">
                        <Flame className="w-3.5 h-3.5 fill-amber-400" /> 🔥 R150-200/day
                      </span>
                    ) : (
                      <span className="text-[11px] text-zinc-500">Organic Signal</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-center">
                    {isEditing ? (
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(r.post_id)}
                        className="px-2.5 py-1 rounded bg-emerald-500 text-zinc-950 font-bold text-xs shadow hover:bg-emerald-400"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleStartEdit(r)}
                        className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                        title="Update Metrics"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
