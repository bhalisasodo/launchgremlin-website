// backend/mcp/tools/getPricing.js
import { Scopes } from '../middleware/auth.js';
import { ErrorCode, McpError } from '../middleware/errorHandler.js';
import { listPricingCatalog, serviceExists, CURRENCY_RATES } from '../adapters/pricingAdapter.js';

export const getPricingDefinition = {
  name: 'get_pricing',
  description: "Returns published transparent investment pricing for LaunchGremlin's service offerings.",
  inputSchema: {
    type: 'object',
    properties: {
      service_id: {
        type: 'string',
        description: "Optional ID of a specific service (e.g. 'web-landing', 'web-multipage', 'ai-rag-search', 'content-viral30').",
      },
      currency: {
        type: 'string',
        enum: ['USD', 'ZAR'],
        description: "Target currency: 'USD' ($) or 'ZAR' (R). Defaults to 'USD'.",
      },
    },
  },
  requiredScope: Scopes.PUBLIC_READ,
  handler: async (args) => {
    const { service_id, currency = 'USD' } = args;

    const normCurrency = (currency || 'USD').toUpperCase();
    if (!CURRENCY_RATES[normCurrency]) {
      throw new McpError(
        ErrorCode.INVALID_ARGUMENT,
        `Invalid currency '${currency}'. Supported currencies are: 'USD', 'ZAR'.`
      );
    }

    if (service_id && !serviceExists(service_id)) {
      throw new McpError(
        ErrorCode.NOT_FOUND,
        `Service with ID '${service_id}' was not found in the LaunchGremlin catalog.`
      );
    }

    const pricing = listPricingCatalog(service_id, normCurrency);

    return {
      pricing,
    };
  },
};
