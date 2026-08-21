// backend/mcp/tools/getServices.js
import { Scopes } from '../middleware/auth.js';
import { ErrorCode, McpError } from '../middleware/errorHandler.js';
import { listServicesCatalog, isValidCategory } from '../adapters/pricingAdapter.js';

export const getServicesDefinition = {
  name: 'get_services',
  description: "Returns LaunchGremlin's active service catalog, deliverables, and estimated sprint turnaround times.",
  inputSchema: {
    type: 'object',
    properties: {
      category: {
        type: 'string',
        enum: ['web', 'content', 'ai', 'all'],
        description: "Filter services by core pillar: 'web' (Web Engineering), 'content' (Content Strategy), 'ai' (AI Consulting), or 'all'.",
      },
    },
  },
  requiredScope: Scopes.PUBLIC_READ,
  handler: async (args) => {
    const { category } = args;

    if (category && !isValidCategory(category)) {
      throw new McpError(
        ErrorCode.INVALID_ARGUMENT,
        `Invalid category '${category}'. Valid categories are: 'web', 'content', 'ai', 'all'.`
      );
    }

    const services = listServicesCatalog(category);

    return {
      services: services.map((s) => ({
        id: s.id,
        name: s.name,
        description: s.description,
        category: s.category,
      })),
    };
  },
};
