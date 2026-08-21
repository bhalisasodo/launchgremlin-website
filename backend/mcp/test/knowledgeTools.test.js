// backend/mcp/test/knowledgeTools.test.js
import { createMcpServer } from '../server.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { ErrorCode } from '../middleware/errorHandler.js';

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

async function runKnowledgeTests() {
  console.log('\n======================================================');
  console.log('🧪 RUNNING PHASE 3 KNOWLEDGE TOOLS & RESOURCES TESTS');
  console.log('======================================================\n');

  const server = createMcpServer();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

  const client = new Client(
    { name: 'knowledge-test-client', version: '1.0.0' },
    { capabilities: {} }
  );

  await server.connect(serverTransport);
  await client.connect(clientTransport);

  // ---------------- Test Suite 1: get_brand_context & Resource ----------------
  console.log('Test Suite 1: get_brand_context (Tool & Resource)');
  const brandToolRes = await client.callTool({
    name: 'get_brand_context',
    arguments: { audience: 'general' },
  });
  assert(!brandToolRes.isError, 'get_brand_context (general) succeeded');
  const brandData = JSON.parse(brandToolRes.content[0].text);
  assert(brandData.brand_name === 'LaunchGremlin', 'Brand name is LaunchGremlin');
  assert(brandData.positioning.length > 0, 'Positioning is present');
  assert(Array.isArray(brandData.voice_examples) && brandData.voice_examples.length > 0, 'Voice examples array present');

  // Technical audience
  const techBrandRes = await client.callTool({
    name: 'get_brand_context',
    arguments: { audience: 'technical' },
  });
  assert(!techBrandRes.isError, 'get_brand_context (technical) succeeded');
  const techBrandData = JSON.parse(techBrandRes.content[0].text);
  assert(techBrandData.founder_background.founder === 'Bhalisa Sodo', 'Founder background includes Bhalisa Sodo');

  // Invalid audience
  const badBrandRes = await client.callTool({
    name: 'get_brand_context',
    arguments: { audience: 'invalid_audience' },
  });
  assert(badBrandRes.isError, 'get_brand_context (invalid audience) returned error');
  const badBrandError = JSON.parse(badBrandRes.content[0].text);
  assert(badBrandError.error.code === ErrorCode.INVALID_ARGUMENT, 'Invalid audience returned INVALID_ARGUMENT');

  // Brand Resource Read
  const brandResource = await client.readResource({ uri: 'launchgremlin://brand-context' });
  assert(brandResource.contents.length > 0, 'launchgremlin://brand-context returned data');
  const brandResData = JSON.parse(brandResource.contents[0].text);
  assert(brandResData.brand_name === 'LaunchGremlin', 'Resource brand name matches');

  // ---------------- Test Suite 2: get_services & Resource ----------------
  console.log('\nTest Suite 2: get_services (Tool & Resource)');
  const allServicesRes = await client.callTool({
    name: 'get_services',
    arguments: {},
  });
  assert(!allServicesRes.isError, 'get_services (all) succeeded');
  const allServicesData = JSON.parse(allServicesRes.content[0].text);
  assert(Array.isArray(allServicesData.services) && allServicesData.services.length >= 10, 'Services catalog contains >= 10 items');

  // Filtered by category
  const webServicesRes = await client.callTool({
    name: 'get_services',
    arguments: { category: 'web' },
  });
  const webServicesData = JSON.parse(webServicesRes.content[0].text);
  assert(
    webServicesData.services.every((s) => s.category.includes('Web')),
    'Category filter web returns only Web Engineering services'
  );

  const aiServicesRes = await client.callTool({
    name: 'get_services',
    arguments: { category: 'ai' },
  });
  const aiServicesData = JSON.parse(aiServicesRes.content[0].text);
  assert(
    aiServicesData.services.every((s) => s.category.includes('AI')),
    'Category filter ai returns only AI Consulting services'
  );

  // Invalid category
  const badCategoryRes = await client.callTool({
    name: 'get_services',
    arguments: { category: 'invalid_category_xyz' },
  });
  assert(badCategoryRes.isError, 'Invalid category returned error');
  const badCatErr = JSON.parse(badCategoryRes.content[0].text);
  assert(badCatErr.error.code === ErrorCode.INVALID_ARGUMENT, 'Error code is INVALID_ARGUMENT');

  // Services Resource Read
  const servicesResource = await client.readResource({ uri: 'launchgremlin://services' });
  const servicesResData = JSON.parse(servicesResource.contents[0].text);
  assert(Array.isArray(servicesResData.services), 'Services resource returns services array');
  assert(Array.isArray(servicesResData.technical_addons), 'Services resource returns technical_addons array');

  // ---------------- Test Suite 3: get_pricing & Resource ----------------
  console.log('\nTest Suite 3: get_pricing (Tool & Resource)');
  const allPricingRes = await client.callTool({
    name: 'get_pricing',
    arguments: { currency: 'USD' },
  });
  assert(!allPricingRes.isError, 'get_pricing (USD) succeeded');
  const allPricingData = JSON.parse(allPricingRes.content[0].text);
  assert(allPricingData.pricing.length > 0, 'Pricing catalog returned items');
  assert(allPricingData.pricing[0].currency === 'USD', 'Pricing currency is USD');
  assert(allPricingData.pricing[0].price.startsWith('$'), 'USD price has $ symbol');

  // ZAR Currency conversion
  const zarPricingRes = await client.callTool({
    name: 'get_pricing',
    arguments: { currency: 'ZAR' },
  });
  const zarPricingData = JSON.parse(zarPricingRes.content[0].text);
  assert(zarPricingData.pricing[0].currency === 'ZAR', 'Pricing currency is ZAR');
  assert(zarPricingData.pricing[0].price.startsWith('R'), 'ZAR price has R symbol');

  // Single service pricing
  const singlePricingRes = await client.callTool({
    name: 'get_pricing',
    arguments: { service_id: 'web-landing', currency: 'USD' },
  });
  const singlePricingData = JSON.parse(singlePricingRes.content[0].text);
  assert(singlePricingData.pricing.length === 1, 'Single service pricing returns exactly 1 item');
  assert(singlePricingData.pricing[0].service_id === 'web-landing', 'Returned correct service_id');

  // Non-existent service ID
  const notFoundPricingRes = await client.callTool({
    name: 'get_pricing',
    arguments: { service_id: 'nonexistent_service_999' },
  });
  assert(notFoundPricingRes.isError, 'Non-existent service ID returned error');
  const notFoundErr = JSON.parse(notFoundPricingRes.content[0].text);
  assert(notFoundErr.error.code === ErrorCode.NOT_FOUND, 'Error code is NOT_FOUND');

  // Invalid currency
  const badCurrencyRes = await client.callTool({
    name: 'get_pricing',
    arguments: { currency: 'EUR_INVALID' },
  });
  assert(badCurrencyRes.isError, 'Invalid currency returned error');
  const badCurrErr = JSON.parse(badCurrencyRes.content[0].text);
  assert(badCurrErr.error.code === ErrorCode.INVALID_ARGUMENT, 'Error code is INVALID_ARGUMENT');

  // Pricing Resource Read
  const pricingResource = await client.readResource({ uri: 'launchgremlin://pricing' });
  const pricingResData = JSON.parse(pricingResource.contents[0].text);
  assert(Array.isArray(pricingResData.pricing_usd), 'Pricing resource contains pricing_usd');
  assert(Array.isArray(pricingResData.pricing_zar), 'Pricing resource contains pricing_zar');

  // ---------------- Test Suite 4: search_content & Published Verification ----------------
  console.log('\nTest Suite 4: search_content (Published Only & Query Verification)');
  const contentRes = await client.callTool({
    name: 'search_content',
    arguments: { query: 'speed', limit: 5 },
  });
  assert(!contentRes.isError, 'search_content with query "speed" succeeded');
  const contentData = JSON.parse(contentRes.content[0].text);
  assert(Array.isArray(contentData.results), 'search_content returned results array');
  assert(contentData.results.length > 0, 'Found matching published articles');
  assert(
    contentData.results.every((r) => r.id && r.title && r.summary && r.url && r.published_at),
    'Every search result matches the required schema (id, title, summary, url, published_at)'
  );

  // Pagination cursor
  const pagedContentRes = await client.callTool({
    name: 'search_content',
    arguments: { query: 'website', limit: 2 },
  });
  const pagedData = JSON.parse(pagedContentRes.content[0].text);
  assert(pagedData.results.length === 2, 'Limit 2 returned exactly 2 items');
  assert(pagedData.next_cursor !== null, 'Pagination returned next_cursor');

  // Missing query validation
  const emptyQueryRes = await client.callTool({
    name: 'search_content',
    arguments: { query: '   ' },
  });
  assert(emptyQueryRes.isError, 'Empty query returned error');
  const emptyQueryErr = JSON.parse(emptyQueryRes.content[0].text);
  assert(emptyQueryErr.error.code === ErrorCode.INVALID_ARGUMENT, 'Empty query returned INVALID_ARGUMENT');

  // Query exceeding max length
  const hugeQueryRes = await client.callTool({
    name: 'search_content',
    arguments: { query: 'a'.repeat(501) },
  });
  assert(hugeQueryRes.isError, 'Query > 500 chars returned error');
  const hugeQueryErr = JSON.parse(hugeQueryRes.content[0].text);
  assert(hugeQueryErr.error.code === ErrorCode.INVALID_ARGUMENT, 'Oversized query returned INVALID_ARGUMENT');

  // Published-only boundary assertion
  assert(
    contentData.results.every((r) => !r.id.includes('DRAFT') && !r.title.includes('DRAFT')),
    'Published content filter strictly excludes internal drafts'
  );

  // ---------------- Cleanup & Summary ----------------
  console.log('\n======================================================');
  console.log(`📊 PHASE 3 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
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

runKnowledgeTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
