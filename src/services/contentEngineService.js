/**
 * Content Engine Service
 * Connects frontend dashboard with backend API, with automatic localStorage fallback for offline/SaaS preview.
 */

import {
  INITIAL_INTAKE_ITEMS,
  INITIAL_DRAFTS,
  INITIAL_TRACKING_ROWS,
  generateLocalContentPackage,
  deriveMaseratiPackage,
  evaluatePaidCandidate
} from '../utils/contentEngineData';

const STORAGE_KEYS = {
  INTAKE: 'launchgremlin_content_intake_v1',
  DRAFTS: 'launchgremlin_content_drafts_v1',
  TRACKING: 'launchgremlin_content_tracking_v1',
  SETTINGS: 'launchgremlin_content_settings_v1'
};

const API_BASE = '/api/content-engine';

// Helper to safely access localStorage
const getLocal = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setLocal = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
};

export const contentEngineService = {
  // 1. Intake Items
  async getIntakeItems() {
    try {
      const res = await fetch(`${API_BASE}/intake`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.INTAKE, data);
        return data;
      }
    } catch (e) {
      // Backend offline, fallback to local storage
    }
    return getLocal(STORAGE_KEYS.INTAKE, INITIAL_INTAKE_ITEMS);
  },

  async addIntakeItem(itemData) {
    const items = await this.getIntakeItems();
    const prefix = itemData.pillar === 'maserati_narrative' ? 'MAS-NAR' : 'LG-EDU';
    const nextNum = items.length + 1;
    const newItem = {
      id: `${prefix}-${String(nextNum).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      status: 'REGISTERED',
      ...itemData
    };

    const updated = [newItem, ...items];
    setLocal(STORAGE_KEYS.INTAKE, updated);

    // Try notifying backend
    try {
      fetch(`${API_BASE}/intake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      }).catch(() => {});
    } catch (e) {}

    return newItem;
  },

  // 2. Drafts & Generation
  async getDrafts() {
    try {
      const res = await fetch(`${API_BASE}/drafts`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.DRAFTS, data);
        return data;
      }
    } catch (e) {}
    return getLocal(STORAGE_KEYS.DRAFTS, INITIAL_DRAFTS);
  },

  async generatePackage(intakeItem, hookIndex = 0) {
    const generated = generateLocalContentPackage(intakeItem, hookIndex);
    const drafts = await this.getDrafts();
    
    // Replace if existing or prepend
    const existingIdx = drafts.findIndex(d => d.intake_id === intakeItem.id);
    let updatedDrafts = [];
    if (existingIdx >= 0) {
      updatedDrafts = [...drafts];
      updatedDrafts[existingIdx] = generated;
    } else {
      updatedDrafts = [generated, ...drafts];
    }
    setLocal(STORAGE_KEYS.DRAFTS, updatedDrafts);

    // Also auto-log 4 assets to tracking sheet
    const trackingRows = await this.getTrackingRows();
    const formats = ['talking_clip', 'carousel', 'before_after', 'caption_only'];
    const newTrackingRows = formats.map(fmt => ({
      post_id: `${intakeItem.id}-${fmt.slice(0, 4).toUpperCase()}`,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      pillar: intakeItem.pillar,
      account: intakeItem.account,
      format: fmt,
      hook_used: generated.chosen_hook,
      status: 'PENDING_REVIEW',
      views: 0,
      saves: 0,
      comments: 0,
      shares: 0,
      paid_spend: 'R0',
      paid_candidate: 'NO',
      notes: `Auto-generated from ${intakeItem.id}`
    }));

    setLocal(STORAGE_KEYS.TRACKING, [...newTrackingRows, ...trackingRows]);

    return generated;
  },

  async deriveMaseratiPost(sourceItemOrDraft) {
    const maseratiDraft = deriveMaseratiPackage(sourceItemOrDraft);
    const drafts = await this.getDrafts();
    const updatedDrafts = [maseratiDraft, ...drafts];
    setLocal(STORAGE_KEYS.DRAFTS, updatedDrafts);

    // Auto-register in intake items
    const intakeItems = await this.getIntakeItems();
    const newIntakeItem = {
      id: maseratiDraft.intake_id,
      pillar: 'maserati_narrative',
      pillarName: 'Need Money for Maserati',
      account: 'needmoney4maserati',
      accountHandle: '@needmoney4maserati',
      title: maseratiDraft.title,
      sourceType: 'founder_milestone',
      content: maseratiDraft.chosen_hook,
      proofPointRef: maseratiDraft.proofPointRef,
      createdAt: new Date().toISOString(),
      status: 'GENERATED_DRAFT'
    };
    setLocal(STORAGE_KEYS.INTAKE, [newIntakeItem, ...intakeItems]);

    // Auto-log to tracking sheet
    const trackingRows = await this.getTrackingRows();
    const formats = ['talking_clip', 'carousel', 'before_after', 'caption_only'];
    const newTrackingRows = formats.map(fmt => ({
      post_id: `${maseratiDraft.intake_id}-${fmt.slice(0, 4).toUpperCase()}`,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      pillar: 'maserati_narrative',
      account: 'needmoney4maserati',
      format: fmt,
      hook_used: maseratiDraft.chosen_hook,
      status: 'PENDING_REVIEW',
      views: 0,
      saves: 0,
      comments: 0,
      shares: 0,
      paid_spend: 'R0',
      paid_candidate: 'NO',
      notes: `Derived from proof point ${maseratiDraft.proofPointRef}`
    }));
    setLocal(STORAGE_KEYS.TRACKING, [...newTrackingRows, ...trackingRows]);

    return maseratiDraft;
  },

  async approveDraft(intakeId, reviewerNotes = '') {
    const drafts = await this.getDrafts();
    const draft = drafts.find(d => d.intake_id === intakeId);
    if (draft) {
      draft.status = 'APPROVED';
      draft.approved_at = new Date().toISOString();
      draft.review_notes = reviewerNotes;
      setLocal(STORAGE_KEYS.DRAFTS, drafts);

      // Update intake item status
      const intakeItems = await this.getIntakeItems();
      const intakeItem = intakeItems.find(i => i.id === intakeId);
      if (intakeItem) {
        intakeItem.status = 'APPROVED_READY_TO_POST';
        setLocal(STORAGE_KEYS.INTAKE, intakeItems);
      }
    }
    return draft;
  },

  // 3. Tracking & Performance
  async getTrackingRows() {
    try {
      const res = await fetch(`${API_BASE}/tracking`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.TRACKING, data);
        return data;
      }
    } catch (e) {}
    return getLocal(STORAGE_KEYS.TRACKING, INITIAL_TRACKING_ROWS);
  },

  async updatePostMetrics(postId, metrics) {
    const rows = await this.getTrackingRows();
    const target = rows.find(r => r.post_id === postId);
    if (target) {
      target.views = Number(metrics.views) || 0;
      target.saves = Number(metrics.saves) || 0;
      target.comments = Number(metrics.comments) || 0;
      target.shares = Number(metrics.shares) || 0;
      if (metrics.paid_spend !== undefined) target.paid_spend = metrics.paid_spend;

      const evalResult = evaluatePaidCandidate(target.views, target.saves, target.comments, target.shares);
      target.paid_candidate = evalResult.isCandidate ? 'YES' : 'NO';
      target.score = evalResult.score;

      setLocal(STORAGE_KEYS.TRACKING, rows);
    }
    return target;
  },

  // 4. Settings
  getSaaSSettings() {
    return getLocal(STORAGE_KEYS.SETTINGS, {
      brandMode: 'launchgremlin', // 'launchgremlin' or 'custom_saas'
      customBrandName: 'My Growth Agency',
      customBrandHandle: '@GrowthAgency',
      customTone: 'Authoritative, direct, conversion-focused, actionable advice.',
      apiKey: '',
      provider: 'local_engine' // 'gemini', 'openai', 'local_engine'
    });
  },

  saveSaaSSettings(settings) {
    setLocal(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  }
};
