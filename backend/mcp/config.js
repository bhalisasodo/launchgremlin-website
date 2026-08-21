// backend/mcp/config.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend directory
dotenv.config({ path: path.join(__dirname, '../.env') });

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.MCP_PORT || process.env.PORT || '5000', 10),
  jwtSecret: process.env.JWT_SECRET || 'launchgremlin_super_secret_dev_key',
  mcpApiKey: process.env.MCP_API_KEY || 'lg_mcp_dev_key_2026',
  mongoUri: process.env.MONGODB_URI || '',
  logLevel: process.env.LOG_LEVEL || 'info',
  serverName: 'launchgremlin-mcp-server',
  serverVersion: '1.0.0',
};
