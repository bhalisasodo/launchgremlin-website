// backend/mcp/adapters/leadsAdapter.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSON_DB_FILE = path.resolve(__dirname, '../../leads.json');

/**
 * Authoritative LeadGremlin Data Adapter for LaunchGremlin MCP Server
 */

/**
 * Reads local leads from leads.json safely
 * @returns {Array<object>}
 */
export function readLocalLeadsData() {
  try {
    if (!fs.existsSync(JSON_DB_FILE)) {
      return [];
    }
    const data = fs.readFileSync(JSON_DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('[LeadsAdapter] Error reading leads.json:', err.message);
    return [];
  }
}

/**
 * Queries leads with filters
 * @param {object} params
 * @param {string} [params.query] - Free text query
 * @param {string} [params.status] - Status filter ('New', 'Contacted', 'In Progress', 'Archived')
 * @param {string} [params.service] - Service filter
 * @param {string} [params.territory] - Territory filter
 * @param {number} [params.limit=10] - Number of leads to return (max 25)
 * @param {string} [params.cursor] - Offset cursor
 * @returns {Promise<{ leads: Array<object>, next_cursor: string | null }>}
 */
export async function queryLeadsStore({ query, status, service, territory, limit = 10, cursor = null }) {
  const clampedLimit = Math.min(Math.max(1, parseInt(limit, 10) || 10), 25);
  const offset = cursor ? parseInt(Buffer.from(cursor, 'base64').toString('utf8'), 10) || 0 : 0;

  const allLeads = readLocalLeadsData();

  // Sort descending by created_at
  allLeads.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

  const normQuery = (query || '').toLowerCase().trim();
  const normStatus = (status || '').toLowerCase().trim();
  const normService = (service || '').toLowerCase().trim();
  const normTerritory = (territory || '').toLowerCase().trim();

  const filtered = allLeads.filter((lead) => {
    if (normStatus && normStatus !== 'all' && (lead.status || '').toLowerCase() !== normStatus) {
      return false;
    }

    if (normService && !(lead.service || '').toLowerCase().includes(normService)) {
      return false;
    }

    if (normTerritory && !(lead.territory || '').toLowerCase().includes(normTerritory)) {
      return false;
    }

    if (normQuery) {
      const matchName = (lead.name || '').toLowerCase().includes(normQuery);
      const matchCompany = (lead.company || '').toLowerCase().includes(normQuery);
      const matchSummary = (lead.summary || '').toLowerCase().includes(normQuery);
      const matchChallenge = (lead.challenge || '').toLowerCase().includes(normQuery);
      if (!matchName && !matchCompany && !matchSummary && !matchChallenge) {
        return false;
      }
    }

    return true;
  });

  const paged = filtered.slice(offset, offset + clampedLimit);
  const nextOffset = offset + clampedLimit < filtered.length ? offset + clampedLimit : null;
  const nextCursor = nextOffset !== null ? Buffer.from(String(nextOffset)).toString('base64') : null;

  return {
    leads: paged,
    next_cursor: nextCursor,
  };
}

/**
 * Fetches a single lead by ID
 * @param {string} leadId
 * @returns {Promise<object | null>}
 */
export async function fetchLeadByIdFromStore(leadId) {
  if (!leadId) return null;
  const allLeads = readLocalLeadsData();
  const found = allLeads.find((l) => String(l.id) === String(leadId));
  return found || null;
}
