// backend/mcp/resources/pricingResource.js
import { listPricingCatalog, CURRENCY_RATES, TIMELINE_SPRINTS } from '../adapters/pricingAdapter.js';

export const pricingResourceDefinition = {
  uri: 'launchgremlin://pricing',
  name: 'Complete Pricing Matrix & Sprint Models',
  description: 'Published fixed-price tiers, sprint speed multipliers, and currency conversion benchmarks.',
  mimeType: 'application/json',
  handler: async () => {
    const pricingUSD = listPricingCatalog(undefined, 'USD');
    const pricingZAR = listPricingCatalog(undefined, 'ZAR');
    return {
      pricing_usd: pricingUSD,
      pricing_zar: pricingZAR,
      currency_rates: CURRENCY_RATES,
      sprint_models: TIMELINE_SPRINTS,
    };
  },
};
