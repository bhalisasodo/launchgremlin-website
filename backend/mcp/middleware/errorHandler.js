// backend/mcp/middleware/errorHandler.js
/**
 * Standard Error Envelope implementation per LaunchGremlin MCP Spec Section 14
 */

export const ErrorCode = {
  INVALID_ARGUMENT: 'INVALID_ARGUMENT',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  NOT_FOUND: 'NOT_FOUND',
  UPSTREAM_UNAVAILABLE: 'UPSTREAM_UNAVAILABLE',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL: 'INTERNAL',
};

export class McpError extends Error {
  /**
   * @param {string} code - One of ErrorCode values
   * @param {string} message - Human-readable, non-sensitive description
   * @param {Record<string, any>} [details] - Optional non-sensitive context
   */
  constructor(code, message, details = undefined) {
    super(message);
    this.name = 'McpError';
    this.code = code || ErrorCode.INTERNAL;
    this.details = details;
  }

  toResponse() {
    return {
      error: {
        code: this.code,
        message: this.message,
        ...(this.details !== undefined && { details: this.details }),
      },
    };
  }
}

/**
 * Formats any caught error into the standard LaunchGremlin MCP error envelope
 * @param {any} err
 * @returns {{ error: { code: string, message: string, details?: any } }}
 */
export function formatErrorEnvelope(err) {
  if (err instanceof McpError) {
    return err.toResponse();
  }

  // Handle Zod validation errors
  if (err && err.name === 'ZodError') {
    const issues = err.issues?.map((i) => ({
      path: i.path.join('.'),
      message: i.message,
    }));
    return {
      error: {
        code: ErrorCode.INVALID_ARGUMENT,
        message: 'Invalid input arguments provided.',
        details: issues || err.message,
      },
    };
  }

  // Ensure internal system details, stacks, or connection strings are never leaked
  const safeMessage = err?.message && !err.message.includes('mongodb://') && !err.message.includes('password')
    ? err.message
    : 'An unexpected internal error occurred.';

  return {
    error: {
      code: ErrorCode.INTERNAL,
      message: safeMessage,
    },
  };
}
