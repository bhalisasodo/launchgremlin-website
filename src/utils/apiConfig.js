/**
 * LaunchGremlin Centralized API & Backend Configuration
 * Resolves backend origin and API endpoints based on VITE_API_URL.
 */

/**
 * Returns the normalized backend base origin URL (e.g. 'https://backend.launchgremlin.com').
 * Strips any trailing slashes and trailing '/api' path.
 */
export const getBackendBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim()) {
    return envUrl.trim().replace(/\/+$/, '').replace(/\/api$/, '');
  }

  // Local development fallback for Vite dev and preview servers
  if (typeof window !== 'undefined') {
    const port = window.location.port;
    if (['5173', '5174', '5175', '3000', '4173'].includes(port)) {
      return 'http://localhost:5000';
    }
  }

  return '';
};

/**
 * Returns the base URL for API requests (e.g. 'https://backend.launchgremlin.com/api').
 */
export const getApiBaseUrl = () => {
  const backendBase = getBackendBaseUrl();
  if (backendBase) {
    return `${backendBase}/api`;
  }
  // Fallback to relative /api for local proxies or same-origin environments
  return '/api';
};

/**
 * Normalizes media or avatar URLs returned by the backend.
 * If given a relative path (e.g. '/uploads/avatars/avatar_...'), prefixes with backend base origin.
 */
export const resolveBackendMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('blob:') || /^https?:\/\//i.test(url)) {
    return url;
  }
  const backendBase = getBackendBaseUrl();
  if (backendBase && url.startsWith('/')) {
    return `${backendBase}${url}`;
  }
  return url;
};
