// backend/mcp/middleware/logger.js
import crypto from 'crypto';

/**
 * Structured JSON Logger per LaunchGremlin MCP Spec Section 15
 * Enforces automated PII and credential redaction.
 */

const PII_KEYS = new Set([
  'email',
  'phone',
  'notes',
  'password',
  'token',
  'authorization',
  'jwt',
  'secret',
  'apikey',
  'api_key',
  'mcpapikey',
]);

/**
 * Recursively redacts sensitive PII fields from log objects
 * @param {any} data
 * @returns {any}
 */
export function redactSensitiveData(data) {
  if (!data || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(redactSensitiveData);
  }

  const sanitized = {};
  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase();
    if (PII_KEYS.has(lowerKey)) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = redactSensitiveData(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

/**
 * Generates a unique trace identifier
 * @returns {string}
 */
export function generateTraceId() {
  return crypto.randomUUID ? crypto.randomUUID() : `trace_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Emits a structured JSON audit log entry
 * @param {object} params
 * @param {string} params.level - 'info' | 'warn' | 'error' | 'debug'
 * @param {string} params.tool - Name of the invoked tool or resource
 * @param {string} [params.traceId] - Unique trace UUID
 * @param {string} [params.callerId] - Identifier of the caller / client
 * @param {string[]} [params.scopes] - Scopes held by caller
 * @param {number} [params.durationMs] - Execution duration in ms
 * @param {'SUCCESS' | 'ERROR'} params.status - Tool execution outcome
 * @param {string} [params.errorCode] - Error code if status is ERROR
 * @param {Record<string, any>} [params.params] - Tool input parameters (sanitized)
 * @param {string} [params.message] - Optional narrative log message
 */
export function logToolAudit({
  level = 'info',
  tool,
  traceId = generateTraceId(),
  callerId = 'anonymous',
  scopes = ['public:read'],
  durationMs = 0,
  status = 'SUCCESS',
  errorCode = undefined,
  params = undefined,
  message = undefined,
}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    trace_id: traceId,
    level,
    tool,
    caller_id: callerId,
    scopes,
    duration_ms: durationMs,
    status,
    ...(errorCode && { error_code: errorCode }),
    ...(params && { params: redactSensitiveData(params) }),
    ...(message && { message }),
  };

  // Structured stdout stream for cloud/log aggregator ingestion
  console.log(JSON.stringify(logEntry));
  return logEntry;
}
