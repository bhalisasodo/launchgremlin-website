// backend/mcp/tools/getLead.js
import { Scopes } from '../middleware/auth.js';
import { ErrorCode, McpError } from '../middleware/errorHandler.js';
import { fetchLeadByIdFromStore } from '../adapters/leadsAdapter.js';

export const getLeadDefinition = {
  name: 'get_lead',
  description: "Retrieves complete record details for a specific prospect lead in LeadGremlin by ID with scope-based PII redaction.",
  inputSchema: {
    type: 'object',
    properties: {
      lead_id: {
        type: 'string',
        description: 'Unique identifier of the lead record.',
      },
    },
    required: ['lead_id'],
  },
  requiredScope: Scopes.LEADS_READ_SUMMARY,
  handler: async (args, context) => {
    const { lead_id } = args;
    const authContext = context?.authContext;

    if (!lead_id || typeof lead_id !== 'string' || lead_id.trim().length === 0) {
      throw new McpError(
        ErrorCode.INVALID_ARGUMENT,
        "Parameter 'lead_id' is required and must be a valid non-empty string."
      );
    }

    const lead = await fetchLeadByIdFromStore(lead_id.trim());

    if (!lead) {
      throw new McpError(
        ErrorCode.NOT_FOUND,
        `Lead record with ID '${lead_id}' was not found in LeadGremlin.`
      );
    }

    // Determine if caller has full PII access
    const hasFullScope = authContext?.scopes?.includes(Scopes.LEADS_READ_FULL);

    const email = hasFullScope ? lead.email || null : lead.email ? '[REDACTED]' : null;
    const phone = hasFullScope ? lead.phone || null : lead.phone ? '[REDACTED]' : null;
    const notes = hasFullScope ? lead.notes || '' : lead.notes ? '[REDACTED]' : null;

    return {
      id: lead.id,
      name: lead.name || 'Anonymous Prospect',
      company: lead.company || 'N/A',
      contact: {
        email,
        phone,
      },
      territory: lead.territory || 'Global / Remote',
      status: lead.status || 'New',
      service: lead.service || 'General Inquiry',
      summary: lead.summary || lead.details || '',
      challenge: lead.challenge || '',
      budget: lead.budget || 'N/A',
      timeline: lead.timeline || 'N/A',
      notes,
      created_at: lead.created_at ? new Date(lead.created_at).toISOString() : new Date().toISOString(),
      last_updated: lead.updated_at ? new Date(lead.updated_at).toISOString() : new Date().toISOString(),
    };
  },
};
