// backend/mcp/tools/searchContent.js
import { Scopes } from '../middleware/auth.js';
import { ErrorCode, McpError } from '../middleware/errorHandler.js';
import { searchPublishedContent } from '../adapters/contentAdapter.js';

export const searchContentDefinition = {
  name: 'search_content',
  description: "Searches LaunchGremlin's published Content Hub and strategic guides for relevant articles, case studies, and knowledge assets.",
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search query or keywords (e.g. "Core Web Vitals", "AI automation", "pricing", "landing page conversion").',
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 50,
        description: 'Maximum number of results to return (default: 10, max: 50).',
      },
      cursor: {
        type: 'string',
        description: 'Opaque pagination cursor from previous search_content response.',
      },
    },
    required: ['query'],
  },
  requiredScope: Scopes.PUBLIC_READ,
  handler: async (args) => {
    const { query, limit = 10, cursor = null } = args;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new McpError(
        ErrorCode.INVALID_ARGUMENT,
        "Parameter 'query' is required and must be a non-empty string."
      );
    }

    if (query.length > 500) {
      throw new McpError(
        ErrorCode.INVALID_ARGUMENT,
        "Parameter 'query' exceeds maximum permitted length of 500 characters."
      );
    }

    const clampedLimit = Math.min(Math.max(1, parseInt(limit, 10) || 10), 50);

    const searchResult = searchPublishedContent({
      query: query.trim(),
      limit: clampedLimit,
      cursor,
    });

    return searchResult;
  },
};
