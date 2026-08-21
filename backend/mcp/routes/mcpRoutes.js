// backend/mcp/routes/mcpRoutes.js
import express from 'express';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { createMcpServer } from '../server.js';
import { authenticateCaller } from '../middleware/auth.js';
import { config } from '../config.js';

const router = express.Router();

// Map of active SSE sessions: sessionId -> { transport, server, authContext }
const activeSessions = new Map();

/**
 * 1. SSE Connection Stream Endpoint
 * GET /api/mcp/sse
 * Used by remote AI agents (Google Spark, Gemini, external MCP clients)
 */
router.get('/sse', async (req, res) => {
  // Extract auth from header or query param
  const authHeader = req.headers['authorization'] || (req.query.api_key ? `Bearer ${req.query.api_key}` : null);
  const authContext = authenticateCaller(authHeader);

  console.log(`[MCP SSE] New connection from caller: ${authContext.callerId} (authenticated: ${authContext.authenticated})`);

  const transport = new SSEServerTransport('/api/mcp/messages', res);
  const server = createMcpServer({ authContext });

  const sessionId = transport.sessionId;
  activeSessions.set(sessionId, { transport, server, authContext });

  transport.onclose = () => {
    console.log(`[MCP SSE] Session ${sessionId} closed by client.`);
    activeSessions.delete(sessionId);
  };

  try {
    await server.connect(transport);
  } catch (err) {
    console.error(`[MCP SSE] Error establishing session ${sessionId}:`, err);
    activeSessions.delete(sessionId);
  }
});

/**
 * 2. Incoming JSON-RPC Messages Endpoint
 * POST /api/mcp/messages?sessionId=...
 */
router.post('/messages', async (req, res) => {
  const sessionId = req.query.sessionId;

  if (!sessionId || !activeSessions.has(sessionId)) {
    return res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: `MCP session '${sessionId}' not found or has expired. Please reconnect to /api/mcp/sse.`,
      },
    });
  }

  const { transport } = activeSessions.get(sessionId);

  try {
    await transport.handlePostMessage(req, res, req.body);
  } catch (err) {
    console.error(`[MCP SSE] Error processing message for session ${sessionId}:`, err);
    if (!res.headersSent) {
      res.status(500).json({ error: { code: 'INTERNAL', message: err.message } });
    }
  }
});

/**
 * 3. Public Health & Discovery Endpoint
 * GET /api/mcp/health
 */
router.get('/health', (req, res) => {
  return res.json({
    status: 'healthy',
    server: config.serverName,
    version: config.serverVersion,
    transports_supported: ['stdio', 'sse', 'http'],
    active_sse_sessions: activeSessions.size,
    endpoints: {
      sse_stream: '/api/mcp/sse',
      message_post: '/api/mcp/messages',
    },
    tools: [
      'get_brand_context',
      'get_services',
      'get_pricing',
      'search_content',
      'search_leads',
      'get_lead',
    ],
    resources: [
      'launchgremlin://health',
      'launchgremlin://brand-context',
      'launchgremlin://services',
      'launchgremlin://pricing',
    ],
  });
});

export default router;
