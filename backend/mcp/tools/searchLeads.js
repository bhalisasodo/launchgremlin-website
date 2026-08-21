// backend/mcp/tools/searchLeads.js
import { Scopes } from '../middleware/auth.js';
import { ErrorCode, McpError } from '../middleware/errorHandler.js';
import { queryLeadsStore } from '../adapters/leadsAdapter.js';

const VALID_STATUSES = new Set(['new', 'contacted', 'in progress', 'archived', 'all']);

export const searchLeadsDefinition = {
  name: 'search_leads',
  description: "Searches prospective clients and inbound inquiries in LeadGremlin with field-level privacy minimization.",
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Free-text search query across client name, company, project summary, or challenge.',
      },
      status: {
        type: 'string',
        enum: ['New', 'Contacted', 'In Progress', 'Archived', 'all'],
        description: "Filter leads by status ('New', 'Contacted', 'In Progress', 'Archived', 'all').",
      },
      service: {
        type: 'string',
        description: "Filter leads by requested service pillar (e.g. 'Websites', 'AI Consulting', 'Content Strategy').",
      },
      territory: {
        type: 'string',
        description: "Filter leads by geographical territory or market region.",
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 25,
        description: 'Maximum number of leads to return (default: 10, max: 25).',
      },
      cursor: {
        type: 'string',
        description: 'Pagination cursor from previous search_leads response.',
      },
    },
  },
  requiredScope: Scopes.LEADS_READ_SUMMARY,
  handler: async (args) => {
    const { query, status, service, territory, limit = 10, cursor = null } = args;

    // Protection against unbounded "dump all leads" queries (Spec Section 11.5)
    const hasFilter =
      (query && query.trim().length > 0) ||
      (status && status.trim().length > 0) ||
      (service && service.trim().length > 0) ||
      (territory && territory.trim().length > 0);

    if (!hasFilter) {
      throw new McpError(
        ErrorCode.INVALID_ARGUMENT,
        "At least one search filter ('query', 'status', 'service', or 'territory') must be provided to prevent unbounded queries."
      );
    }

    if (status && !VALID_STATUSES.has(status.toLowerCase().trim())) {
      throw new McpError(
        ErrorCode.INVALID_ARGUMENT,
        `Invalid status '${status}'. Allowed values are: 'New', 'Contacted', 'In Progress', 'Archived', 'all'.`
      );
    }

    const { leads, next_cursor } = await queryLeadsStore({
      query: query ? query.trim() : undefined,
      status: status ? status.trim() : undefined,
      service: service ? service.trim() : undefined,
      territory: territory ? territory.trim() : undefined,
      limit,
      cursor,
    });

    // Enforce field-level minimization: Summary fields only (no emails, phone numbers, notes)
    const minimizedLeads = leads.map((lead) => ({
      id: lead.id,
      name: lead.name || 'Anonymous Prospect',
      company: lead.company || 'N/A',
      territory: lead.territory || 'Global / Remote',
      status: lead.status || 'New',
      service: lead.service || 'General Inquiry',
      created_at: lead.created_at ? new Date(lead.created_at).toISOString() : new Date().toISOString(),
    }));

    return {
      leads: minimizedLeads,
      next_cursor,
    };
  },
};
