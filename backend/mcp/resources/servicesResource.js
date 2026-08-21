// backend/mcp/resources/servicesResource.js
import { listServicesCatalog, listTechnicalAddons } from '../adapters/pricingAdapter.js';

export const servicesResourceDefinition = {
  uri: 'launchgremlin://services',
  name: 'Full Service Catalog & Technical Add-ons',
  description: "Complete catalog of LaunchGremlin's Web Engineering, Content Strategy, and AI Consulting offerings.",
  mimeType: 'application/json',
  handler: async () => {
    const services = listServicesCatalog();
    const addons = listTechnicalAddons();
    return {
      services,
      technical_addons: addons,
    };
  },
};
