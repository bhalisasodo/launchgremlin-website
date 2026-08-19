import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Trash2,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  UserCheck,
  Building,
  FileText,
  Search,
  Check
} from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

export default function CapturedLeadsDrawer({ isOpen, onClose }) {
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(null);

  // Load leads from localStorage
  useEffect(() => {
    if (!isOpen) return;
    try {
      const stored = localStorage.getItem('lg_captured_leads');
      if (stored) {
        const parsed = JSON.parse(stored);
        setLeads(Array.isArray(parsed) ? parsed : []);
      }
    } catch (e) {
      console.error('Failed to load captured leads:', e);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDeleteLead = (index) => {
    const updated = leads.filter((_, idx) => idx !== index);
    setLeads(updated);
    try {
      localStorage.setItem('lg_captured_leads', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAll = () => {
    if (window.confirm('Delete all captured contacts from local storage?')) {
      setLeads([]);
      localStorage.removeItem('lg_captured_leads');
    }
  };

  const handleExportCsv = () => {
    if (leads.length === 0) return;

    const headers = ['Full Name', 'Email', 'Phone', 'Company', 'Notes', 'Date & Time'];
    const rows = leads.map(l => [
      `"${(l.fullName || l.name || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${(l.notes || l.note || '').replace(/"/g, '""')}"`,
      `"${(l.timestamp || l.submittedAt) ? new Date(l.timestamp || l.submittedAt).toLocaleString() : ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `launchgremlin-captured-contacts-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    trackEvent('leads_exported_csv', { count: leads.length });
  };

  const filteredLeads = leads.filter(l => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const name = (l.fullName || l.name || '').toLowerCase();
    const email = (l.email || '').toLowerCase();
    const phone = (l.phone || '');
    const company = (l.company || '').toLowerCase();
    const notes = (l.notes || l.note || '').toLowerCase();
    return (
      name.includes(q) ||
      email.includes(q) ||
      phone.includes(q) ||
      company.includes(q) ||
      notes.includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-end">
      <div className="bg-zinc-900 border-l border-zinc-800 w-full max-w-xl h-full flex flex-col justify-between text-white shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Captured Contacts</h3>
                <p className="text-xs text-zinc-400">
                  {leads.length} contacts received via "Exchange Info"
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search bar & Export actions */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or company..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-emerald-400 outline-none"
              />
            </div>
            {leads.length > 0 && (
              <button
                onClick={handleExportCsv}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Contacts List */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {leads.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                <UserCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-zinc-300">No Contacts Captured Yet</h4>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                When people tap "Exchange Info" on your digital card, their name, email, and notes will appear right here.
              </p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-xs">
              No contacts matching "{searchQuery}"
            </div>
          ) : (
            filteredLeads.map((lead, idx) => {
              const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9+]/g, '') : '';
              const leadName = lead.fullName || lead.name || 'Anonymous Contact';
              const leadNote = lead.notes || lead.note || '';
              const leadDate = lead.timestamp || lead.submittedAt;

              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition space-y-3 relative group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-white">{leadName}</h4>
                      {lead.company && (
                        <div className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3 text-zinc-500" />
                          <span>{lead.company}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-zinc-500">
                        {leadDate ? new Date(leadDate).toLocaleDateString() : ''}
                      </span>
                      <button
                        onClick={() => handleDeleteLead(idx)}
                        className="text-zinc-600 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                        title="Delete contact"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Notes / message */}
                  {leadNote && (
                    <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800/80 text-[11px] text-zinc-300 flex items-start gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="leading-snug italic">"{leadNote}"</p>
                    </div>
                  )}

                  {/* Action row */}
                  <div className="flex items-center gap-2 pt-1">
                    {lead.email && (
                      <a
                        href={`mailto:${lead.email}?subject=Great%20connecting!`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold border border-zinc-800 transition"
                      >
                        <Mail className="w-3 h-3 text-blue-400" />
                        <span>Email</span>
                      </a>
                    )}
                    {cleanPhone && (
                      <>
                        <a
                          href={`tel:${cleanPhone}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold border border-zinc-800 transition"
                        >
                          <Phone className="w-3 h-3 text-emerald-400" />
                          <span>Call</span>
                        </a>
                        <a
                          href={`https://wa.me/${cleanPhone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(leadName)},%20great%20connecting!`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold border border-zinc-800 transition"
                        >
                          <MessageCircle className="w-3 h-3 text-emerald-400" />
                          <span>WhatsApp</span>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {leads.length > 0 && (
          <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between">
            <button
              onClick={handleClearAll}
              className="text-xs text-red-400 hover:text-red-300 font-semibold cursor-pointer"
            >
              Clear All Contacts
            </button>
            <span className="text-[10.5px] font-mono text-zinc-500">
              🔒 Stored 100% locally in your browser
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
