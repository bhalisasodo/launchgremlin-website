// backend/mcp/server.js
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { config } from './config.js';
import { ErrorCode, McpError, formatErrorEnvelope } from './middleware/errorHandler.js';
import { logToolAudit, generateTraceId } from './middleware/logger.js';
import { Scopes, assertScope } from './middleware/auth.js';

// Tools
import { getBrandContextDefinition } from './tools/getBrandContext.js';
import { getServicesDefinition } from './tools/getServices.js';
import { getPricingDefinition } from './tools/getPricing.js';
import { searchContentDefinition } from './tools/searchContent.js';
import { searchLeadsDefinition } from './tools/searchLeads.js';
import { getLeadDefinition } from './tools/getLead.js';

// Resources
import { brandContextResourceDefinition } from './resources/brandContextResource.js';
import { servicesResourceDefinition } from './resources/servicesResource.js';
import { pricingResourceDefinition } from './resources/pricingResource.js';

/**
 * Creates and initializes the LaunchGremlin MCP Server instance
 * @param {object} [options]
 * @param {object} [options.authContext] - Optional caller auth context (e.g. from HTTP headers)
 * @returns {Server}
 */
export function createMcpServer(options = {}) {
  const defaultAuthContext = options.authContext || {
    authenticated: false,
    callerId: 'anonymous',
    scopes: [Scopes.PUBLIC_READ],
  };

  const server = new Server(
    {
      name: config.serverName,
      version: config.serverVersion,
    },
    {
      capabilities: {
        tools: {},
        resources: {},
      },
    }
  );

  // In-memory registry of tools and resources
  const toolRegistry = new Map();
  const resourceRegistry = new Map();

  /**
   * Helper to register tools on this MCP server
   */
  server.registerMcpTool = ({
    name,
    description,
    inputSchema,
    requiredScope = Scopes.PUBLIC_READ,
    handler,
  }) => {
    toolRegistry.set(name, {
      name,
      description,
      inputSchema,
      requiredScope,
      handler,
    });
  };

  /**
   * Helper to register resources on this MCP server
   */
  server.registerMcpResource = ({
    uri,
    name,
    description,
    mimeType = 'application/json',
    handler,
  }) => {
    resourceRegistry.set(uri, {
      uri,
      name,
      description,
      mimeType,
      handler,
    });
  };

  // ---------------- MCP Handlers ----------------

  // 1. List Tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    const tools = Array.from(toolRegistry.values()).map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema || { type: 'object', properties: {} },
    }));
    return { tools };
  });

  // 2. Call Tool
  server.setRequestHandler(CallToolRequestSchema, async (request, extra) => {
    const startTime = Date.now();
    const traceId = generateTraceId();
    const toolName = request.params.name;
    const tool = toolRegistry.get(toolName);
    const authContext = extra?.authContext || defaultAuthContext;

    if (!tool) {
      const durationMs = Date.now() - startTime;
      const errorObj = {
        error: {
          code: ErrorCode.NOT_FOUND,
          message: `Tool '${toolName}' is not registered on this server.`,
        },
      };
      logToolAudit({
        level: 'warn',
        tool: toolName,
        traceId,
        callerId: authContext.callerId,
        scopes: authContext.scopes,
        durationMs,
        status: 'ERROR',
        errorCode: ErrorCode.NOT_FOUND,
        params: request.params.arguments,
      });
      return {
        isError: true,
        content: [{ type: 'text', text: JSON.stringify(errorObj, null, 2) }],
      };
    }

    try {
      // Step A: Scope Authorization Check
      assertScope(authContext, tool.requiredScope, toolName);

      // Step B: Execute Tool Handler
      const result = await tool.handler(request.params.arguments || {}, {
        authContext,
        traceId,
      });

      const durationMs = Date.now() - startTime;
      logToolAudit({
        level: 'info',
        tool: toolName,
        traceId,
        callerId: authContext.callerId,
        scopes: authContext.scopes,
        durationMs,
        status: 'SUCCESS',
        params: request.params.arguments,
      });

      return {
        content: [
          {
            type: 'text',
            text: typeof result === 'string' ? result : JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (err) {
      const durationMs = Date.now() - startTime;
      const formattedError = formatErrorEnvelope(err);

      logToolAudit({
        level: 'error',
        tool: toolName,
        traceId,
        callerId: authContext.callerId,
        scopes: authContext.scopes,
        durationMs,
        status: 'ERROR',
        errorCode: formattedError.error.code,
        params: request.params.arguments,
        message: formattedError.error.message,
      });

      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: JSON.stringify(formattedError, null, 2),
          },
        ],
      };
    }
  });

  // 3. List Resources
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    const resources = Array.from(resourceRegistry.values()).map((r) => ({
      uri: r.uri,
      name: r.name,
      description: r.description,
      mimeType: r.mimeType,
    }));
    return { resources };
  });

  // 4. Read Resource
  server.setRequestHandler(ReadResourceRequestSchema, async (request, extra) => {
    const resource = resourceRegistry.get(request.params.uri);
    if (!resource) {
      throw new McpError(ErrorCode.NOT_FOUND, `Resource '${request.params.uri}' not found.`);
    }

    const authContext = extra?.authContext || defaultAuthContext;
    const content = await resource.handler({ authContext });

    return {
      contents: [
        {
          uri: resource.uri,
          mimeType: resource.mimeType,
          text: typeof content === 'string' ? content : JSON.stringify(content, null, 2),
        },
      ],
    };
  });

  // ---------------- Default Health Resource ----------------
  server.registerMcpResource({
    uri: 'launchgremlin://health',
    name: 'Server Health & Information',
    description: 'Real-time operational health, server version, and environment metrics.',
    mimeType: 'application/json',
    handler: async () => ({
      status: 'healthy',
      server: config.serverName,
      version: config.serverVersion,
      environment: config.env,
      timestamp: new Date().toISOString(),
    }),
  });

  // ---------------- Phase 3 Knowledge Resources (Spec 11.8) ----------------
  server.registerMcpResource(brandContextResourceDefinition);
  server.registerMcpResource(servicesResourceDefinition);
  server.registerMcpResource(pricingResourceDefinition);

  // ---------------- Phase 3 Knowledge Tools (Spec 11.1 - 11.4) ----------------
  server.registerMcpTool(getBrandContextDefinition);
  server.registerMcpTool(getServicesDefinition);
  server.registerMcpTool(getPricingDefinition);
  server.registerMcpTool(searchContentDefinition);

  // ---------------- Phase 4 Lead Interface Tools (Spec 11.5 - 11.7) ----------------
  server.registerMcpTool(searchLeadsDefinition);
  server.registerMcpTool(getLeadDefinition);

  // ---------------- Phase 2 Placeholder Tool ----------------
  server.registerMcpTool({
    name: 'echo_health',
    description: 'Phase 2 Foundation Verification Tool — validates input schemas and error envelope.',
    inputSchema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Echo test message' },
        force_error: { type: 'boolean', description: 'Trigger deliberate test error' },
      },
      required: ['message'],
    },
    requiredScope: Scopes.PUBLIC_READ,
    handler: async (args) => {
      if (args.force_error) {
        throw new McpError(ErrorCode.INVALID_ARGUMENT, 'Deliberate test error triggered successfully.');
      }
      return {
        status: 'healthy',
        received_message: args.message,
        timestamp: new Date().toISOString(),
      };
    },
  });

  return server;
}
