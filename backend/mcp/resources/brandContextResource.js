// backend/mcp/resources/brandContextResource.js
import { getBrandContextDefinition } from '../tools/getBrandContext.js';

export const brandContextResourceDefinition = {
  uri: 'launchgremlin://brand-context',
  name: 'Brand Context & Positioning Guide',
  description: "Static reference for LaunchGremlin's brand voice, operating philosophy, and core value proposition.",
  mimeType: 'application/json',
  handler: async () => {
    return getBrandContextDefinition.handler({ audience: 'general' });
  },
};
