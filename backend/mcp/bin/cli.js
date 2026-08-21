#!/usr/bin/env node
// backend/mcp/bin/cli.js
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createMcpServer } from '../server.js';

async function run() {
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('[LaunchGremlin MCP] Server running on stdio transport.');
}

run().catch((err) => {
  console.error('[LaunchGremlin MCP] Fatal error starting server:', err);
  process.exit(1);
});
