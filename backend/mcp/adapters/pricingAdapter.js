import {
  SCOPE_PILLARS,
  TECHNICAL_ADDONS,
  TIMELINE_SPRINTS,
  CURRENCY_RATES,
  calculateScopeQuote,
} from '../../../src/utils/scopePricingData.js';

/**
 * Authoritative Services & Pricing Adapter for LaunchGremlin MCP Server
 */

/**
 * Lists all services formatted per MCP specification
 * @param {string} [category] - Optional category filter ('web', 'content', 'ai')
 * @returns {Array<{ id: string, name: string, description: string, category: string, base_price_usd: number, turnaround_days: number }>}
 */
export function listServicesCatalog(category = undefined) {
  const normCategory = category ? category.toLowerCase().trim() : undefined;
  const services = [];

  SCOPE_PILLARS.forEach((pillar) => {
    if (normCategory && normCategory !== 'all' && pillar.id !== normCategory) {
      return;
    }

    pillar.items.forEach((item) => {
      services.push({
        id: item.id,
        name: item.name,
        description: item.description,
        category: pillar.title,
        pillar_id: pillar.id,
        base_price_usd: item.basePriceUSD,
        turnaround_days: item.estimatedDays,
      });
    });
  });

  return services;
}

/**
 * Lists technical add-ons
 */
export function listTechnicalAddons() {
  return TECHNICAL_ADDONS.map((addon) => ({
    id: addon.id,
    name: addon.name,
    description: addon.description,
    price_usd: addon.priceUSD,
    turnaround_days: addon.days,
  }));
}

/**
 * Lists published pricing per MCP specification
 * @param {string} [serviceId] - Optional service ID filter
 * @param {string} [currency='USD'] - Target currency ('USD' or 'ZAR')
 * @returns {Array<{ service_id: string, name: string, price: string, currency: string, billing_period: string }>}
 */
export function listPricingCatalog(serviceId = undefined, currency = 'USD') {
  const normCurrency = (currency || 'USD').toUpperCase();
  const rateInfo = CURRENCY_RATES[normCurrency] || CURRENCY_RATES.USD;
  const pricing = [];

  SCOPE_PILLARS.forEach((pillar) => {
    pillar.items.forEach((item) => {
      if (serviceId && item.id !== serviceId) {
        return;
      }

      const localPrice = Math.round(item.basePriceUSD * rateInfo.rate);
      pricing.push({
        service_id: item.id,
        name: item.name,
        price: `${rateInfo.symbol}${localPrice.toLocaleString()}`,
        currency: normCurrency,
        billing_period: 'Fixed Project Sprint',
      });
    });
  });

  return pricing;
}

/**
 * Checks if a service ID exists in the catalog
 * @param {string} serviceId
 * @returns {boolean}
 */
export function serviceExists(serviceId) {
  if (!serviceId) return false;
  return SCOPE_PILLARS.some((pillar) => pillar.items.some((item) => item.id === serviceId));
}

/**
 * Validates whether a category is known
 * @param {string} category
 * @returns {boolean}
 */
export function isValidCategory(category) {
  if (!category || category === 'all') return true;
  const validCategories = new Set(['web', 'content', 'ai']);
  return validCategories.has(category.toLowerCase().trim());
}

export { calculateScopeQuote, TIMELINE_SPRINTS, CURRENCY_RATES };
