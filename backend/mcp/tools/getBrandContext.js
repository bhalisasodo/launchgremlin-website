// backend/mcp/tools/getBrandContext.js
import { Scopes } from '../middleware/auth.js';
import { ErrorCode, McpError } from '../middleware/errorHandler.js';

export const getBrandContextDefinition = {
  name: 'get_brand_context',
  description: "Returns LaunchGremlin's brand positioning, operating philosophy, tone guidelines, and audience context for AI reasoning and content generation.",
  inputSchema: {
    type: 'object',
    properties: {
      audience: {
        type: 'string',
        enum: ['general', 'technical'],
        description: "Target audience context: 'general' for business founders/creators, 'technical' for software engineering & AI architecture details.",
      },
    },
  },
  requiredScope: Scopes.PUBLIC_READ,
  handler: async (args) => {
    const { audience = 'general' } = args;

    if (audience && !['general', 'technical'].includes(audience)) {
      throw new McpError(
        ErrorCode.INVALID_ARGUMENT,
        `Invalid audience '${audience}'. Must be one of: 'general', 'technical'.`
      );
    }

    if (audience === 'technical') {
      return {
        brand_name: 'LaunchGremlin',
        positioning: 'AI-Native Digital Product Studio & High-Performance Web Engineering for Modern Operators',
        tone_guidelines: 'Authoritative, concise, technical, direct, engineering-first, zero fluff.',
        target_audience: 'Technical founders, CTOs, product managers, and modern internet enterprises demanding sub-second load times and production AI pipelines.',
        voice_examples: [
          'Sub-second speed is not an optimization; it is a fundamental conversion architecture.',
          'We engineer deterministic AI workflows and vector search systems that eliminate operational drag.',
          'React 18 + Vite + Edge CDN delivery guarantees 100/100 Core Web Vitals with zero plugin overhead.',
        ],
        founder_background: {
          founder: 'Bhalisa Sodo',
          role: 'Founder & Visionary Architect',
          disciplines: ['Data Science & Systems Development', 'Autonomous AI Workflows', 'Full-Stack Web Engineering'],
          philosophy: 'Combining human strategy with AI-powered execution to help businesses move faster, make better decisions, and build scalable digital systems.',
        },
      };
    }

    return {
      brand_name: 'LaunchGremlin',
      positioning: 'Build, Grow, Scale — High-Performance Websites, Content Engines, and AI Consulting',
      tone_guidelines: 'Direct, modern, ambitious, energetic, growth-focused, transparent.',
      target_audience: 'Founders, ambitious creators, independent consultants, and fast-growing small-to-medium businesses seeking aggressive online expansion.',
      voice_examples: [
        'Speed, simplicity, and aggressive iteration win on the modern internet.',
        'Turn raw website traffic into predictable inbound revenue with conversion-engineered digital homes.',
        'We build high-performance digital products and automated content systems that scale with your ambitions.',
      ],
      core_pillars: [
        'Web Engineering & Digital Products (Sub-second React/Next.js platforms)',
        'Content Strategy & Audience Engines (30-day viral short-form and multi-channel pipelines)',
        'Enterprise AI Consulting & Workflow Automation (Autonomous 24/7 agents and vector search RAG)',
      ],
      founder_background: {
        founder: 'Bhalisa Sodo',
        role: 'Founder & Visionary Architect',
        disciplines: ['Data Science & Systems Development', 'AI Innovation', 'Digital Strategy'],
        philosophy: 'Combining human strategy with AI-powered execution to help businesses move faster and build a stronger digital presence.',
      },
    };
  },
};
