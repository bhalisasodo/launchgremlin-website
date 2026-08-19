/**
 * Digital Business Card Service
 * Handles card saving, avatar uploads, and clean short URL resolution.
 */
import { DEMO_PROFILES } from '../utils/cardData';

const API_BASE = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000';
const LOCAL_STORAGE_KEY_PREFIX = 'lg_card_';

export const cardService = {
  /**
   * Save a card profile to local storage & backend API
   */
  saveCard: async (card) => {
    const slug = (card.slug || 'card').toLowerCase().trim();
    
    // 1. Always save locally first for instant offline access
    try {
      localStorage.setItem(`lg_card_draft`, JSON.stringify(card));
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${slug}`, JSON.stringify(card));
    } catch (e) {
      console.warn('localStorage save warning:', e);
    }

    // 2. Persist to Backend API if available
    try {
      const res = await fetch(`${API_BASE}/api/cards/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(card)
      });
      if (res.ok) {
        const data = await res.json();
        return { success: true, slug, url: data.url };
      }
    } catch (e) {
      // Backend not running, local persistence succeeds
    }

    return { success: true, slug, url: `/c/${slug}` };
  },

  /**
   * Fetch a card profile by slug
   */
  getCardBySlug: async (slug) => {
    const cleanSlug = (slug || '').toLowerCase().trim();

    // 1. Check local storage
    try {
      const stored = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}${cleanSlug}`);
      if (stored) {
        return JSON.parse(stored);
      }
      const draft = localStorage.getItem('lg_card_draft');
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.slug === cleanSlug || !cleanSlug) return parsed;
      }
    } catch (e) {}

    // 2. Check Demo Profiles
    const demo = DEMO_PROFILES.find((p) => p.slug === cleanSlug || p.id === cleanSlug);
    if (demo) return demo;

    // 3. Query Backend API
    try {
      const res = await fetch(`${API_BASE}/api/cards/${cleanSlug}`);
      if (res.ok) {
        const data = await res.json();
        if (data.card) {
          localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${cleanSlug}`, JSON.stringify(data.card));
          return data.card;
        }
      }
    } catch (e) {}

    return DEMO_PROFILES[0];
  },

  /**
   * Upload an avatar photo to the backend
   */
  uploadAvatar: async (slug, imageBase64) => {
    try {
      const res = await fetch(`${API_BASE}/api/cards/upload-avatar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, imageBase64 })
      });
      if (res.ok) {
        const data = await res.json();
        return data.avatarUrl; // e.g. /uploads/avatars/avatar_alex_12345.jpg
      }
    } catch (e) {
      // Offline fallback returns base64
    }
    return imageBase64;
  }
};
