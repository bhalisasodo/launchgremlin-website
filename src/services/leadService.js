/**
 * Central Lead Dispatcher Service
 * Supports dual-mode submission:
 * 1. Primary Node Express backend endpoint (/api/leads) if running
 * 2. FormSubmit API endpoint (https://formsubmit.co/ajax/bhalisasodo10@gmail.com) for static deployments
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
      console.warn('[LeadService] Express backend unavailable, falling back to FormSubmit provider.', e);
    }
  }

  // 2. Dispatch to FormSubmit with LaunchGremlin Branded Email Layout
  try {
    const formattedPayload = {
      _subject: `🔥 [LaunchGremlin Lead] ${payload.name || 'New Client'} — ${payload.service || 'Scope Request'} (${payload.budget || 'Inquiry'})`,
      _template: 'table',
      _captcha: 'false',
      Brand: 'LaunchGremlin (https://launchgremlin.com)',
      Client_Name: payload.name || 'N/A',
      Client_Email: payload.email || 'N/A',
      Phone_WhatsApp: payload.phone || 'N/A',
      Service_Pillar: payload.service || 'General Web & AI Inquiry',
      Budget_Tier: payload.budget || 'N/A',
      Existing_Website: payload.website || 'N/A',
      Project_Requirements: payload.details || payload.summary || payload.message || 'N/A',
      Submitted_At: payload.created_at || new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' }),
    };

    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formattedPayload),
    });

    const data = await response.json();
    return { success: response.ok || data.success === 'true', mode: 'formsubmit' };
  } catch (err) {
    console.error('[LeadService] FormSubmit error:', err);
    return { success: true, mode: 'optimistic' };
  }
}

