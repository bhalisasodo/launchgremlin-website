// backend/mcp/middleware/auth.js
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { ErrorCode, McpError } from './errorHandler.js';

export const Scopes = {
  PUBLIC_READ: 'public:read',
  LEADS_READ_SUMMARY: 'leads:read:summary',
  LEADS_READ_FULL: 'leads:read:full',
};

/**
 * Parses and verifies authorization header or query token
 * @param {string} [authHeader] - e.g. "Bearer <token>" or "Bearer <api_key>" or "ApiKey <key>"
 * @returns {{ authenticated: boolean, callerId: string, role?: string, scopes: string[] }}
 */
export function authenticateCaller(authHeader) {
  if (!authHeader) {
    return {
      authenticated: false,
      callerId: 'anonymous',
      scopes: [Scopes.PUBLIC_READ],
    };
  }

  const parts = authHeader.trim().split(' ');
  const scheme = parts.length === 2 ? parts[0] : 'Bearer';
  const token = parts.length === 2 ? parts[1] : parts[0];

  // 1. Check if token matches static MCP API Key
  if (token === config.mcpApiKey && config.mcpApiKey) {
    return {
      authenticated: true,
      callerId: 'service_account:mcp_api_key',
      role: 'admin',
      scopes: [Scopes.PUBLIC_READ, Scopes.LEADS_READ_SUMMARY, Scopes.LEADS_READ_FULL],
    };
  }

  // 2. Check if token is a valid JWT
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const callerId = decoded.sub || decoded.username || (decoded.role ? `user:${decoded.role}` : 'authenticated_user');
    let scopes = [Scopes.PUBLIC_READ];

    if (decoded.role === 'admin') {
      scopes = [Scopes.PUBLIC_READ, Scopes.LEADS_READ_SUMMARY, Scopes.LEADS_READ_FULL];
    } else if (Array.isArray(decoded.scopes)) {
      scopes = Array.from(new Set([Scopes.PUBLIC_READ, ...decoded.scopes]));
    }

    return {
      authenticated: true,
      callerId,
      role: decoded.role,
      scopes,
    };
  } catch (err) {
    // Return unauthenticated on invalid token
    return {
      authenticated: false,
      callerId: 'unauthenticated_invalid_token',
      scopes: [Scopes.PUBLIC_READ],
    };
  }
}

/**
 * Asserts that the caller context has the required scope
 * @param {{ authenticated: boolean, scopes: string[] }} authContext
 * @param {string} requiredScope
 * @param {string} [toolName]
 */
export function assertScope(authContext, requiredScope, toolName = 'tool') {
  if (requiredScope === Scopes.PUBLIC_READ) {
    return true;
  }

  if (!authContext || !authContext.authenticated) {
    throw new McpError(
      ErrorCode.UNAUTHENTICATED,
      `Authentication required to access '${toolName}'. Please provide a valid Bearer token or API key.`
    );
  }

  const hasScope =
    authContext.scopes.includes(requiredScope) ||
    (requiredScope === Scopes.LEADS_READ_SUMMARY && authContext.scopes.includes(Scopes.LEADS_READ_FULL));

  if (!hasScope) {
    throw new McpError(
      ErrorCode.PERMISSION_DENIED,
      `Permission denied: caller lacks required scope '${requiredScope}' for '${toolName}'.`
    );
  }

  return true;
}
