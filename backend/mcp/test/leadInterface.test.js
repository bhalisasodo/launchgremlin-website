// backend/mcp/test/leadInterface.test.js
import { createMcpServer } from '../server.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { ErrorCode } from '../middleware/errorHandler.js';
import { Scopes } from '../middleware/auth.js';

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

async function runLeadInterfaceTests() {
  console.log('\n======================================================');
  console.log('🧪 RUNNING PHASE 4 LEAD INTERFACE & SECURITY TESTS');
  console.log('======================================================\n');

  // Helper to spin up a client with specific auth context
  async function setupTestClient(authContext) {
    const server = createMcpServer({ authContext });
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

    const client = new Client(
      { name: 'lead-test-client', version: '1.0.0' },
      { capabilities: {} }
    );

    await server.connect(serverTransport);
    await client.connect(clientTransport);
    return { server, client };
  }

  // ---------------- Test 1: Unauthenticated Callers Rejected ----------------
  console.log('Test Suite 1: Unauthenticated Caller Boundary (UNAUTHENTICATED)');
  const { client: anonClient } = await setupTestClient({
    authenticated: false,
    callerId: 'anonymous',
    scopes: [Scopes.PUBLIC_READ],
  });

  const anonSearch = await anonClient.callTool({
    name: 'search_leads',
    arguments: { status: 'New' },
  });
  assert(anonSearch.isError, 'Unauthenticated search_leads call returned isError: true');
  const anonSearchErr = JSON.parse(anonSearch.content[0].text);
  assert(anonSearchErr.error.code === ErrorCode.UNAUTHENTICATED, 'Error code is UNAUTHENTICATED');

  const anonGet = await anonClient.callTool({
    name: 'get_lead',
    arguments: { lead_id: 'sample-lead-01' },
  });
  assert(anonGet.isError, 'Unauthenticated get_lead call returned isError: true');
  const anonGetErr = JSON.parse(anonGet.content[0].text);
  assert(anonGetErr.error.code === ErrorCode.UNAUTHENTICATED, 'Error code is UNAUTHENTICATED');

  // ---------------- Test 2: Under-scoped Caller Rejected ----------------
  console.log('\nTest Suite 2: Under-Scoped Authenticated Caller (PERMISSION_DENIED)');
  const { client: underClient } = await setupTestClient({
    authenticated: true,
    callerId: 'external_client_no_leads_scope',
    scopes: [Scopes.PUBLIC_READ], // authenticated, but missing leads scope
  });

  const underSearch = await underClient.callTool({
    name: 'search_leads',
    arguments: { status: 'New' },
  });
  assert(underSearch.isError, 'Under-scoped search_leads call returned isError: true');
  const underSearchErr = JSON.parse(underSearch.content[0].text);
  assert(underSearchErr.error.code === ErrorCode.PERMISSION_DENIED, 'Error code is PERMISSION_DENIED');

  const underGet = await underClient.callTool({
    name: 'get_lead',
    arguments: { lead_id: 'sample-lead-01' },
  });
  assert(underGet.isError, 'Under-scoped get_lead call returned isError: true');
  const underGetErr = JSON.parse(underGet.content[0].text);
  assert(underGetErr.error.code === ErrorCode.PERMISSION_DENIED, 'Error code is PERMISSION_DENIED');

  // ---------------- Test 3: Caller with Summary Scope (PII Redacted) ----------------
  console.log('\nTest Suite 3: Summary-Scoped Caller (Minimization & PII Redaction)');
  const { client: summaryClient } = await setupTestClient({
    authenticated: true,
    callerId: 'triage_agent',
    scopes: [Scopes.PUBLIC_READ, Scopes.LEADS_READ_SUMMARY],
  });

  const summarySearch = await summaryClient.callTool({
    name: 'search_leads',
    arguments: { status: 'New', limit: 10 },
  });
  assert(!summarySearch.isError, 'Summary-scoped search_leads succeeded');
  const searchData = JSON.parse(summarySearch.content[0].text);
  assert(Array.isArray(searchData.leads) && searchData.leads.length > 0, 'Found leads in search');
  assert(searchData.leads[0].id !== undefined, 'Lead summary has id');
  assert(searchData.leads[0].name !== undefined, 'Lead summary has name');
  assert(searchData.leads[0].email === undefined, 'Lead summary excludes email completely');
  assert(searchData.leads[0].phone === undefined, 'Lead summary excludes phone completely');

  // get_lead with summary scope -> PII must be explicitly redacted
  const summaryGet = await summaryClient.callTool({
    name: 'get_lead',
    arguments: { lead_id: 'ox16ifde9womrzesfoh' },
  });
  assert(!summaryGet.isError, 'Summary-scoped get_lead succeeded');
  const summaryGetData = JSON.parse(summaryGet.content[0].text);
  assert(summaryGetData.contact.email === '[REDACTED]', 'Email is masked as [REDACTED]');
  assert(summaryGetData.contact.phone === '[REDACTED]', 'Phone is masked as [REDACTED]');

  // ---------------- Test 4: Caller with Full Scope (Unredacted PII) ----------------
  console.log('\nTest Suite 4: Full-Scoped Caller (leads:read:full)');
  const { client: fullClient } = await setupTestClient({
    authenticated: true,
    callerId: 'operator_admin',
    scopes: [Scopes.PUBLIC_READ, Scopes.LEADS_READ_SUMMARY, Scopes.LEADS_READ_FULL],
  });

  const fullGet = await fullClient.callTool({
    name: 'get_lead',
    arguments: { lead_id: 'ox16ifde9womrzesfoh' },
  });
  assert(!fullGet.isError, 'Full-scoped get_lead succeeded');
  const fullGetData = JSON.parse(fullGet.content[0].text);
  assert(fullGetData.contact.email === 'bhalisasodo10@gmail.com', 'Full scope sees real email');
  assert(fullGetData.contact.phone === '0821234567', 'Full scope sees real phone');
  assert(fullGetData.service === 'Websites', 'Service pillar matches');

  // ---------------- Test 5: Unbounded Query Protection ----------------
  console.log('\nTest Suite 5: Unbounded "Dump All Leads" Query Protection');
  const dumpAttempt = await fullClient.callTool({
    name: 'search_leads',
    arguments: {}, // No filter provided
  });
  assert(dumpAttempt.isError, 'Unbounded search_leads attempt was rejected');
  const dumpErr = JSON.parse(dumpAttempt.content[0].text);
  assert(dumpErr.error.code === ErrorCode.INVALID_ARGUMENT, 'Error code is INVALID_ARGUMENT');
  assert(dumpErr.error.message.includes('At least one search filter'), 'Error message specifies filter requirement');

  // ---------------- Test 6: Non-Existent Lead ID Handling ----------------
  console.log('\nTest Suite 6: Non-Existent Lead ID (NOT_FOUND vs PERMISSION_DENIED)');
  const notFoundLead = await fullClient.callTool({
    name: 'get_lead',
    arguments: { lead_id: 'nonexistent_lead_id_9999' },
  });
  assert(notFoundLead.isError, 'Non-existent lead ID returned error');
  const notFoundErr = JSON.parse(notFoundLead.content[0].text);
  assert(notFoundErr.error.code === ErrorCode.NOT_FOUND, 'Authorized caller gets NOT_FOUND for non-existent lead');

  // ---------------- Test 7: Parameter Validation & Enums ----------------
  console.log('\nTest Suite 7: Status Enum & Input Validation');
  const badStatusSearch = await fullClient.callTool({
    name: 'search_leads',
    arguments: { status: 'INVALID_STATUS_XYZ' },
  });
  assert(badStatusSearch.isError, 'Invalid status search returned error');
  const badStatusErr = JSON.parse(badStatusSearch.content[0].text);
  assert(badStatusErr.error.code === ErrorCode.INVALID_ARGUMENT, 'Invalid status returned INVALID_ARGUMENT');

  const emptyIdGet = await fullClient.callTool({
    name: 'get_lead',
    arguments: { lead_id: '   ' },
  });
  assert(emptyIdGet.isError, 'Empty lead_id returned error');
  const emptyIdErr = JSON.parse(emptyIdGet.content[0].text);
  assert(emptyIdErr.error.code === ErrorCode.INVALID_ARGUMENT, 'Empty lead_id returned INVALID_ARGUMENT');

  // ---------------- Summary ----------------
  console.log('\n======================================================');
  console.log(`📊 PHASE 4 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
  process.exit(0);
}

runLeadInterfaceTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
