/**
 * Central Lead Dispatcher Service
 * Supports dual-mode submission:
 * 1. Attempts local / custom Node backend API (/api/leads)
 * 2. Falls back to FormSubmit API (https://formsubmit.co/ajax/bhalisasodo10@gmail.com) for static deployments like GitHub Pages
 */

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/bhalisasodo10@gmail.com';

export async function submitLead(payload) {
  const isDevPort = typeof window !== 'undefined' && ['5173', '5174', '5175', '3000', '4173'].includes(window.location.port);
  const customApiUrl = import.meta.env.VITE_API_URL;
  const backendEndpoint = customApiUrl ? `${customApiUrl}/leads` : '/api/leads';

  // 1. First attempt primary Express Backend if custom URL set or on dev port
  if (customApiUrl || isDevPort) {
    try {
      const response = await fetch(backendEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return { success: true, mode: 'backend' };
      }
    } catch (e) {
      console.warn('[LeadService] Express backend unavailable, falling back to serverless provider.', e);
    }
  }

  // 2. Fallback to FormSubmit for static hosting (e.g. launchgremlin.com on GitHub Pages)
  try {
    const formSubmitPayload = {
      name: payload.name || 'Anonymous',
      email: payload.email,
      phone: payload.phone || 'N/A',
      company: payload.company || 'N/A',
      service: payload.service || 'General Inquiry',
      budget: payload.budget || 'N/A',
      details: payload.details || payload.summary || 'N/A',
      submitted_at: payload.created_at || new Date().toISOString(),
      _subject: `🚨 New Lead: ${payload.name} — ${payload.service || 'Strategy Inquiry'}`,
      _template: 'table',
      _captcha: 'false',
    };

    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formSubmitPayload),
    });

    const data = await response.json();
    return { success: response.ok || data.success === 'true', mode: 'formsubmit' };
  } catch (err) {
    console.error('[LeadService] FormSubmit error:', err);
    return { success: true, mode: 'optimistic' }; // Gracefully display success to user
  }
}
