import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  Search, LogOut, Filter, CheckCircle, Clock, 
  Briefcase, FileText, ChevronRight, Copy, Check, 
  TrendingUp, Award, AlertCircle, MessageSquare
} from 'lucide-react';

const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) return envUrl;
  const port = window.location.port;
  if (port && ['5173', '5174', '5175', '3000'].includes(port)) {
    return 'http://localhost:5000/api';
  }
  return '/api';
};
const API_URL = getApiUrl();

const getStoredLeads = () => {
  try {
    const raw = localStorage.getItem('launchgremlin_leads');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

/* ------------------ Glassmorphic Card ------------------ */
const GlassCard = ({ children, className = '' }) => (
  <div className={`bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.37)] ${className}`}>
    {children}
  </div>
);

/* ------------------ Admin Login Component ------------------ */
export function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const isDevPort = ['5173', '5174', '5175', '3000'].includes(window.location.port);
      if (import.meta.env.VITE_API_URL || isDevPort) {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('application/json')) {
          const data = await res.json();
          localStorage.setItem('launchgremlin_admin_token', data.token);
          onLoginSuccess(data.token);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend API login unavailable, falling back to static/local login:', err);
    }

    // Static / GitHub Pages fallback authentication
    const customPass = localStorage.getItem('launchgremlin_custom_admin_pass') || import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    if (username === 'admin' && (password === customPass || password === 'admin123' || password === 'admin')) {
      const fallbackToken = 'gh_pages_static_admin_token_' + Date.now();
      localStorage.setItem('launchgremlin_admin_token', fallbackToken);
      onLoginSuccess(fallbackToken);
    } else {
      setError('Invalid username or password.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-950 text-white relative">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <GlassCard className="w-full max-w-md border-emerald-500/20 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl mb-4">
            <LockIcon className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Portal</h2>
          <p className="text-gray-400 mt-2 text-sm">Sign in to track and manage leads</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-emerald-400 transition"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-emerald-400 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-emerald-400 hover:bg-emerald-300 disabled:bg-emerald-500/50 text-black font-semibold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] transition duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : 'Sign In'}
          </button>
        </form>
      </GlassCard>
    </div>
  );
}

/* ------------------ Admin Dashboard Component ------------------ */
export default function AdminDashboard({ token, onLogout }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedService, setSelectedService] = useState('All');
  const [activeLead, setActiveLead] = useState(null);
  
  // Lead details editing states
  const [editingNotes, setEditingNotes] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Password Modal state
  const [showPassModal, setShowPassModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passMessage, setPassMessage] = useState('');

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!newPassword.trim() || newPassword.length < 4) {
      setPassMessage('Password must be at least 4 characters long.');
      return;
    }
    localStorage.setItem('launchgremlin_custom_admin_pass', newPassword.trim());
    setPassMessage('Password updated successfully!');
    setTimeout(() => {
      setShowPassModal(false);
      setNewPassword('');
      setPassMessage('');
    }, 1500);
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    let loadedLeads = [];
    let fromBackend = false;

    const isDevPort = ['5173', '5174', '5175', '3000'].includes(window.location.port);
    const hasBackendConfig = Boolean(import.meta.env.VITE_API_URL || isDevPort);

    if (hasBackendConfig && !token.startsWith('gh_pages_static_admin_token_')) {
      try {
        const res = await fetch(`${API_URL}/leads`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('application/json')) {
          loadedLeads = await res.json();
          fromBackend = true;
        } else if (res.status === 401 || res.status === 403) {
          onLogout();
          throw new Error('Session expired');
        }
      } catch (err) {
        console.warn('Backend API fetch error, using local storage leads:', err);
      }
    }

    const localLeads = getStoredLeads();
    if (fromBackend) {
      const backendIds = new Set(loadedLeads.map(l => l._id || l.id));
      const unsynced = localLeads.filter(l => !backendIds.has(l.id) && !backendIds.has(l._id));
      loadedLeads = [...loadedLeads, ...unsynced];
    } else {
      loadedLeads = localLeads;
    }

    setLeads(loadedLeads);
    setLoading(false);
  };

  const handleUpdateLead = async () => {
    if (!activeLead) return;
    setSaveLoading(true);
    const leadId = activeLead._id || activeLead.id;

    const isDevPort = ['5173', '5174', '5175', '3000'].includes(window.location.port);
    const hasBackendConfig = Boolean(import.meta.env.VITE_API_URL || isDevPort);

    if (hasBackendConfig && !token.startsWith('gh_pages_static_admin_token_')) {
      try {
        const res = await fetch(`${API_URL}/leads/${leadId}`, {
          method: 'PATCH',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status: updatingStatus, notes: editingNotes })
        });
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('application/json')) {
          const updatedLead = await res.json();
          setLeads(prev => prev.map(l => (l._id || l.id) === leadId ? updatedLead : l));
          setActiveLead(updatedLead);

          const localLeads = getStoredLeads();
          const updatedLocal = localLeads.map(l => (l._id || l.id) === leadId ? updatedLead : l);
          localStorage.setItem('launchgremlin_leads', JSON.stringify(updatedLocal));

          setSaveLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Backend update failed, updating local storage:', err);
      }
    }

    const localLeads = getStoredLeads();
    const updatedLeadObj = { ...activeLead, status: updatingStatus, notes: editingNotes };
    const updatedLocal = localLeads.map(l => (l._id || l.id) === leadId ? updatedLeadObj : l);
    localStorage.setItem('launchgremlin_leads', JSON.stringify(updatedLocal));

    setLeads(prev => prev.map(l => (l._id || l.id) === leadId ? updatedLeadObj : l));
    setActiveLead(updatedLeadObj);
    setSaveLoading(false);
  };

  const exportLeadsCSV = () => {
    if (!leads || leads.length === 0) {
      alert('No leads available to export.');
      return;
    }
    const headers = ['Name', 'Email', 'Company', 'Service', 'Budget', 'Timeline', 'Status', 'Created At', 'Notes'];
    const rows = leads.map(l => [
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${(l.budget || '').replace(/"/g, '""')}"`,
      `"${(l.timeline || '').replace(/"/g, '""')}"`,
      `"${(l.status || '').replace(/"/g, '""')}"`,
      `"${(l.created_at || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `launchgremlin_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeadClick = (lead) => {
    setActiveLead(lead);
    setEditingNotes(lead.notes || '');
    setUpdatingStatus(lead.status || 'New');
  };

  // Metric Calculation
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const activeLeadsCount = leads.filter(l => l.status === 'Contacted' || l.status === 'In Progress').length;
  const conversionRate = totalLeadsCount 
    ? Math.round((leads.filter(l => l.status === 'Closed' || l.status === 'In Progress').length / totalLeadsCount) * 100) 
    : 0;

  // Filter Leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || lead.status === selectedStatus;
    const matchesService = selectedService === 'All' || lead.service === selectedService;

    return matchesSearch && matchesStatus && matchesService;
  });

  // Services Breakdown calculation for custom SVG visualisation
  const serviceCounts = leads.reduce((acc, lead) => {
    acc[lead.service] = (acc[lead.service] || 0) + 1;
    return acc;
  }, {});

  const serviceChartData = Object.entries(serviceCounts).map(([name, value]) => ({
    name,
    value,
    percentage: Math.round((value / totalLeadsCount) * 100)
  })).sort((a, b) => b.value - a.value);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans relative pb-20">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/40 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="./legacy_and_assets/web-icon.png" alt="Logo" className="w-10 h-10" />
            <h1 className="text-xl md:text-2xl font-bold">
              Launch<span className="text-emerald-400">Gremlin</span> <span className="text-xs uppercase font-normal tracking-widest text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md border border-emerald-400/20 ml-2">Console</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPassModal(true)}
              className="flex items-center gap-2 px-3 py-2 border border-zinc-800 text-gray-300 rounded-xl hover:border-emerald-400/40 hover:text-emerald-300 transition text-xs font-semibold bg-zinc-900/60"
            >
              <LockIcon className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Set Passcode</span>
            </button>
            <button
              onClick={exportLeadsCSV}
              className="flex items-center gap-2 px-3.5 py-2 border border-emerald-400/30 text-emerald-400 rounded-xl hover:bg-emerald-400/10 transition text-xs font-semibold"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Export Leads (CSV)</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 border border-zinc-800 rounded-xl hover:border-rose-500/40 hover:text-rose-400 transition bg-zinc-900/60"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Log out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8">
        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-2xl text-sm flex justify-between items-center">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
            <button onClick={fetchLeads} className="underline text-xs hover:text-rose-300">Retry</button>
          </div>
        )}

        {/* 1. Metrics Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-emerald-400">
              <Briefcase className="w-16 h-16" />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Total Leads</p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-400">{loading ? '...' : totalLeadsCount}</h3>
            <p className="text-xs text-gray-500 mt-2">Received via onboarding form</p>
          </GlassCard>

          <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-emerald-400">
              <Clock className="w-16 h-16" />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">New Leads</p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-amber-400">{loading ? '...' : newLeadsCount}</h3>
            <p className="text-xs text-gray-500 mt-2">Awaiting initial contact</p>
          </GlassCard>

          <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-emerald-400">
              <CheckCircle className="w-16 h-16" />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Active Followups</p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-cyan-400">{loading ? '...' : activeLeadsCount}</h3>
            <p className="text-xs text-gray-500 mt-2">Contacted & in progress</p>
          </GlassCard>

          <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-emerald-400">
              <TrendingUp className="w-16 h-16" />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Interest Conversion</p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-purple-400">{loading ? '...' : `${conversionRate}%`}</h3>
            <p className="text-xs text-gray-500 mt-2">Percentage closing rate</p>
          </GlassCard>
        </section>

        {/* 2. Visualisations and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Service requested breakdown (Bespoke Chart) */}
          <GlassCard className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" /> Service Interest
            </h4>
            {loading ? (
              <div className="h-48 flex items-center justify-center text-gray-400 text-sm">Loading metrics...</div>
            ) : totalLeadsCount === 0 ? (
              <div className="h-48 flex items-center justify-center text-gray-500 text-sm">No data available</div>
            ) : (
              <div className="space-y-4">
                {serviceChartData.map((item, idx) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300 font-medium truncate max-w-[200px]">{item.name}</span>
                      <span className="text-emerald-400 font-semibold">{item.value} ({item.percentage}%)</span>
                    </div>
                    {/* SVG bar gauge */}
                    <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          idx === 0 ? 'bg-emerald-400' :
                          idx === 1 ? 'bg-cyan-400' :
                          idx === 2 ? 'bg-purple-400' : 'bg-zinc-600'
                        }`} 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Lead Table and List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search and Filter Panel */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-zinc-900/30 backdrop-blur-xl border border-zinc-800 rounded-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search lead, email, company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-zinc-950/80 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-emerald-400 transition"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-800 rounded-xl bg-zinc-950/40 text-xs">
                  <Filter className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-400">Status:</span>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-transparent text-emerald-400 outline-none cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-800 rounded-xl bg-zinc-950/40 text-xs">
                  <span className="text-gray-400">Service:</span>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="bg-transparent text-emerald-400 outline-none cursor-pointer max-w-[120px]"
                  >
                    <option value="All">All Services</option>
                    <option value="Website Development">Website Dev</option>
                    <option value="Build Your First Product">First Product</option>
                    <option value="AI Consulting">AI Consulting</option>
                    <option value="Data Analytics">Analytics</option>
                    <option value="AI Agent Implementation">AI Agent</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Lead list rows */}
            <GlassCard className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-xs uppercase tracking-wider text-gray-400 bg-zinc-900/30">
                      <th className="px-6 py-4 font-semibold">Lead Info</th>
                      <th className="px-6 py-4 font-semibold">Service Needed</th>
                      <th className="px-6 py-4 font-semibold">Budget</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-sm">
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                          <span className="inline-block w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mb-2" />
                          <p>Retrieving leads from backend...</p>
                        </td>
                      </tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                          No leads match the specified criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const leadId = lead._id || lead.id;
                        const isSelected = activeLead && (activeLead._id || activeLead.id) === leadId;
                        return (
                          <tr 
                            key={leadId} 
                            onClick={() => handleLeadClick(lead)}
                            className={`hover:bg-zinc-800/30 cursor-pointer transition ${
                              isSelected ? 'bg-emerald-500/5' : ''
                            }`}
                          >
                            <td className="px-6 py-4">
                              <div className="font-semibold text-white truncate max-w-[180px]">{lead.name}</div>
                              <div className="text-xs text-gray-400 truncate max-w-[180px]">{lead.email || 'No email provided'}</div>
                              {lead.company && <div className="text-[10px] text-emerald-400/80">{lead.company}</div>}
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-gray-300">{lead.service}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-mono text-zinc-300 text-xs">{lead.budget || '—'}</span>
                            </td>
                            <td className="px-6 py-4">
                              <StatusBadge status={lead.status} />
                            </td>
                            <td className="px-6 py-4 text-right">
                              <ChevronRight className="w-5 h-5 text-gray-500 inline group-hover:text-white" />
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>

      {/* 3. Details Drawer Overlay */}
      {activeLead && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop blur clickout */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setActiveLead(null)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-2xl bg-zinc-900 border-l border-zinc-800 h-full shadow-2xl flex flex-col justify-between text-white z-10 animate-slide-in-right">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-400">Lead Details</p>
                <h3 className="text-xl font-bold mt-1 truncate max-w-[400px]">{activeLead.name}</h3>
              </div>
              <button 
                onClick={() => setActiveLead(null)}
                className="p-2 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition"
              >
                ✕
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800">
                  <span className="text-xs text-gray-400 block mb-1">Email Address</span>
                  {activeLead.email ? (
                    <a href={`mailto:${activeLead.email}`} className="text-sm text-emerald-300 hover:underline break-all">
                      {activeLead.email}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-500 italic">No email provided</span>
                  )}
                </div>
                <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800">
                  <span className="text-xs text-gray-400 block mb-1">Company / Project</span>
                  <span className="text-sm font-semibold block">{activeLead.company || '—'}</span>
                </div>
                <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800">
                  <span className="text-xs text-gray-400 block mb-1">Timeline</span>
                  <span className="text-sm text-zinc-300 block">{activeLead.timeline || 'Flexible'}</span>
                </div>
                <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800">
                  <span className="text-xs text-gray-400 block mb-1">Budget</span>
                  <span className="text-sm font-mono text-zinc-300 block">{activeLead.budget || 'Unspecified'}</span>
                </div>
              </div>

              {/* Main Questionnaire Summary */}
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300 mb-1 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" /> Project Idea / Summary
                  </h5>
                  <p className="text-sm text-zinc-200 bg-zinc-950/40 p-4 rounded-xl border border-zinc-800/50 leading-relaxed whitespace-pre-wrap">
                    {activeLead.summary}
                  </p>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-gray-300 mb-1">Core Challenge</h5>
                  <p className="text-sm text-zinc-200 bg-zinc-950/40 p-4 rounded-xl border border-zinc-800/50">
                    {activeLead.challenge}
                  </p>
                </div>
              </div>

              {/* Action Pipeline Controller */}
              <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 space-y-4">
                <h5 className="text-sm font-bold text-emerald-400">Pipeline Action Center</h5>
                
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <label className="text-xs text-gray-400 block mb-1">Lead Status</label>
                    <select
                      value={updatingStatus}
                      onChange={(e) => setUpdatingStatus(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-emerald-400"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                  <div className="flex-1 flex justify-end items-end h-full">
                    <button
                      onClick={handleUpdateLead}
                      disabled={saveLoading}
                      className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold rounded-lg transition disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {saveLoading ? 'Saving...' : 'Update Lead'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">Internal Operational Notes</label>
                  <textarea
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    placeholder="Enter customer call details, team assignments, or general follow-up logs..."
                    className="w-full min-h-[90px] px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none focus:border-emerald-400 resize-none"
                  />
                </div>
              </div>

              {/* Render AI Project Guide */}
              {activeLead.guide && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-400" /> Generated AI Project Guide
                    </h5>
                    <button
                      onClick={() => copyToClipboard(activeLead.guide)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 py-1 px-2.5 rounded-lg border border-emerald-400/20 hover:bg-emerald-400/10 transition"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied' : 'Copy Guide'}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap break-words text-xs leading-6 text-gray-300 bg-zinc-950 p-5 rounded-2xl border border-zinc-800 font-mono">
                    {activeLead.guide}
                  </pre>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/75 backdrop-blur-sm">
          <GlassCard className="w-full max-w-sm border-emerald-500/30 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Admin Passcode</h3>
              <button onClick={() => setShowPassModal(false)} className="text-gray-400 hover:text-white text-sm font-bold">✕</button>
            </div>
            <p className="text-xs text-gray-400 mb-4">Set a custom passcode for accessing your admin console.</p>
            {passMessage && (
              <p className={`text-xs p-3 rounded-lg mb-3 ${passMessage.includes('successfully') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'}`}>
                {passMessage}
              </p>
            )}
            <form onSubmit={handleChangePassword} className="space-y-4">
              <input
                type="password"
                required
                placeholder="Enter new admin passcode"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-400"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPassModal(false)}
                  className="w-1/2 py-2.5 bg-zinc-800 text-gray-300 hover:text-white rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-emerald-400 text-black font-semibold rounded-xl text-xs hover:bg-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                >
                  Save Passcode
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

/* ------------------ Status Badge Component ------------------ */
function StatusBadge({ status }) {
  const styles = {
    'New': 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30',
    'Contacted': 'bg-amber-400/10 text-amber-400 border-amber-400/30',
    'In Progress': 'bg-cyan-400/10 text-cyan-400 border-cyan-400/30',
    'Closed': 'bg-purple-400/10 text-purple-400 border-purple-400/30',
    'Archived': 'bg-zinc-800 text-zinc-500 border-zinc-800'
  }[status] || 'bg-zinc-800 text-zinc-400';

  return (
    <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full border ${styles}`}>
      {status}
    </span>
  );
}

/* ------------------ SVG Lock Icon ------------------ */
function LockIcon(props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

GlassCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

AdminLogin.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

AdminDashboard.propTypes = {
  token: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};
