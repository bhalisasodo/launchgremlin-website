// backend/mcp/test/foundation.test.js
import { createMcpServer } from '../server.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { ErrorCode } from '../middleware/errorHandler.js';
import { authenticateCaller, Scopes } from '../middleware/auth.js';
import { redactSensitiveData } from '../middleware/logger.js';
import { config } from '../config.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

async function runFoundationTests() {
  console.log('\n======================================================');
  console.log('🧪 RUNNING PHASE 2 FOUNDATION VERIFICATION TESTS');
  console.log('======================================================\n');

  // ---------------- Test 1: PII Redaction & Structured Logging ----------------
  console.log('Test Suite 1: PII & Credential Redaction');
  const samplePayload = {
    name: 'Bhalisa Sodo',
    email: 'bhalisa@example.com',
    phone: '+27821234567',
    notes: 'Confidential client scope inquiry',
    service: 'Web Engineering',
    budget: '$2,800',
    meta: {
      password: 'secret_password_123',
      token: 'jwt_secret_token',
    },
  };
  const redacted = redactSensitiveData(samplePayload);
  assert(redacted.email === '[REDACTED]', 'Email is redacted');
  assert(redacted.phone === '[REDACTED]', 'Phone is redacted');
  assert(redacted.notes === '[REDACTED]', 'Notes are redacted');
  assert(redacted.meta.password === '[REDACTED]', 'Nested password is redacted');
  assert(redacted.meta.token === '[REDACTED]', 'Nested token is redacted');
  assert(redacted.name === 'Bhalisa Sodo', 'Non-sensitive name is preserved');
  assert(redacted.service === 'Web Engineering', 'Service pillar is preserved');

  // ---------------- Test 2: Auth Middleware & Scopes ----------------
  console.log('\nTest Suite 2: Authentication & Scope Assertion');
  const anonAuth = authenticateCaller(null);
  assert(!anonAuth.authenticated, 'Anonymous caller is unauthenticated');
  assert(anonAuth.scopes.includes(Scopes.PUBLIC_READ), 'Anonymous caller has public:read');

  const apiKeyAuth = authenticateCaller(`Bearer ${config.mcpApiKey}`);
  assert(apiKeyAuth.authenticated, 'Valid API key caller is authenticated');
  assert(apiKeyAuth.scopes.includes(Scopes.LEADS_READ_FULL), 'API key caller has leads:read:full');

  const invalidAuth = authenticateCaller('Bearer invalid_garbage_token');
  assert(!invalidAuth.authenticated, 'Invalid token caller is unauthenticated');

  // ---------------- Test 3: MCP Server Bootstrap & In-Memory Transport ----------------
  console.log('\nTest Suite 3: MCP Server Bootstrap & Transport Handshake');
  const server = createMcpServer();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

  const client = new Client(
    { name: 'foundation-test-client', version: '1.0.0' },
    { capabilities: {} }
  );

  await server.connect(serverTransport);
  await client.connect(clientTransport);
  assert(true, 'MCP Client successfully connected to Server via Transport');

  // ---------------- Test 4: Resource Listing & Reading ----------------
  console.log('\nTest Suite 4: Resources Interface (launchgremlin://health)');
  const resourceList = await client.listResources();
  assert(
    resourceList.resources.some((r) => r.uri === 'launchgremlin://health'),
    'Server exposes launchgremlin://health resource'
  );

  const healthResource = await client.readResource({ uri: 'launchgremlin://health' });
  assert(healthResource.contents.length > 0, 'Resource returned content payload');
  const healthData = JSON.parse(healthResource.contents[0].text);
  assert(healthData.status === 'healthy', 'Health status is healthy');
  assert(healthData.server === 'launchgremlin-mcp-server', 'Server name matches config');

  // ---------------- Test 5: Tool Listing & Execution ----------------
  console.log('\nTest Suite 5: Placeholder Tool (echo_health)');
  const toolList = await client.listTools();
  assert(
    toolList.tools.some((t) => t.name === 'echo_health'),
    'Server exposes echo_health tool'
  );

  const echoResult = await client.callTool({
    name: 'echo_health',
    arguments: { message: 'LaunchGremlin MCP Foundation Active' },
  });
  assert(!echoResult.isError, 'Valid tool call did not report error');
  const echoData = JSON.parse(echoResult.content[0].text);
  assert(
    echoData.received_message === 'LaunchGremlin MCP Foundation Active',
    'Tool returned correct echo payload'
  );

  // ---------------- Test 6: Standard Error Envelope on Bad Input ----------------
  console.log('\nTest Suite 6: Standard Error Envelope Formatting');
  const errorResult = await client.callTool({
    name: 'echo_health',
    arguments: { message: 'trigger_error', force_error: true },
  });
  assert(errorResult.isError, 'Deliberate bad input returned isError: true');
  const errorEnvelope = JSON.parse(errorResult.content[0].text);
  assert(errorEnvelope.error !== undefined, 'Response matches { error: ... } envelope');
  assert(
    errorEnvelope.error.code === ErrorCode.INVALID_ARGUMENT,
    'Error code is INVALID_ARGUMENT'
  );
  assert(
    errorEnvelope.error.message.includes('Deliberate test error'),
    'Error message matches expected non-sensitive description'
  );

  // ---------------- Test Summary ----------------
  console.log('\n======================================================');
  console.log(`📊 FOUNDATION TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================================\n');

  try {
    await client.close();
    await server.close();
  } catch (e) {}

  if (failed > 0) {
    process.exit(1);
  }
  process.exit(0);
}

runFoundationTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});

