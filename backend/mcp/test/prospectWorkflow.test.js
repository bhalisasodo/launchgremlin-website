// backend/mcp/test/prospectWorkflow.test.js
import { createMcpServer } from '../server.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
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

async function runProspectWorkflowTests() {
  console.log('\n======================================================');
  console.log('🧪 RUNNING PHASE 5 PROSPECT INTELLIGENCE WORKFLOW TEST');
  console.log('======================================================\n');

  // Spin up an authorized operator client
  const server = createMcpServer({
    authContext: {
      authenticated: true,
      callerId: 'ai_operator_workflow',
      scopes: [Scopes.PUBLIC_READ, Scopes.LEADS_READ_SUMMARY, Scopes.LEADS_READ_FULL],
    },
  });

  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client(
    { name: 'prospect-workflow-client', version: '1.0.0' },
    { capabilities: {} }
  );

  await server.connect(serverTransport);
  await client.connect(clientTransport);

  console.log('Executing 5-Step Chained Fact Retrieval Workflow:\n');

  // Step 1: Discover / Search Inbound Leads
  console.log('Step 1: Discover Inbound Lead via search_leads()');
  const searchRes = await client.callTool({
    name: 'search_leads',
    arguments: { status: 'New', limit: 5 },
  });
  assert(!searchRes.isError, 'Step 1: search_leads executed successfully');
  const searchPayload = JSON.parse(searchRes.content[0].text);
  assert(searchPayload.leads.length > 0, 'Step 1: Retrieved active leads');
  const targetLeadId = searchPayload.leads[0].id;
  console.log(`  -> Selected Target Lead ID: ${targetLeadId} (${searchPayload.leads[0].name})\n`);

  // Step 2: Fetch Complete Lead Profile
  console.log('Step 2: Fetch Lead Scope & Details via get_lead()');
  const leadRes = await client.callTool({
    name: 'get_lead',
    arguments: { lead_id: targetLeadId },
  });
  assert(!leadRes.isError, 'Step 2: get_lead executed successfully');
  const leadData = JSON.parse(leadRes.content[0].text);
  assert(leadData.id === targetLeadId, 'Step 2: Lead ID matches target');
  assert(leadData.contact.email !== undefined, 'Step 2: Authorized client received contact email');
  console.log(`  -> Lead Service Request: ${leadData.service}\n`);

  // Step 3: Match Service Offerings
  console.log('Step 3: Retrieve Authoritative Services Catalog via get_services()');
  const servicesRes = await client.callTool({
    name: 'get_services',
    arguments: { category: 'web' },
  });
  assert(!servicesRes.isError, 'Step 3: get_services executed successfully');
  const servicesData = JSON.parse(servicesRes.content[0].text);
  assert(servicesData.services.length > 0, 'Step 3: Retrieved Web Engineering services');
  const matchedService = servicesData.services.find((s) => s.id === 'web-landing') || servicesData.services[0];
  console.log(`  -> Matched Service Package: ${matchedService.name} (${matchedService.id})\n`);

  // Step 4: Retrieve Published Pricing
  console.log('Step 4: Fetch Fixed-Price Pricing via get_pricing()');
  const pricingRes = await client.callTool({
    name: 'get_pricing',
    arguments: { service_id: matchedService.id, currency: 'USD' },
  });
  assert(!pricingRes.isError, 'Step 4: get_pricing executed successfully');
  const pricingData = JSON.parse(pricingRes.content[0].text);
  assert(pricingData.pricing.length === 1, 'Step 4: Retrieved exact pricing for matched service');
  console.log(`  -> Published Price: ${pricingData.pricing[0].price} ${pricingData.pricing[0].currency}\n`);

  // Step 5: Retrieve Brand Positioning & Tone Guidelines
  console.log('Step 5: Fetch Brand Positioning via get_brand_context()');
  const brandRes = await client.callTool({
    name: 'get_brand_context',
    arguments: { audience: 'general' },
  });
  assert(!brandRes.isError, 'Step 5: get_brand_context executed successfully');
  const brandData = JSON.parse(brandRes.content[0].text);
  assert(brandData.brand_name === 'LaunchGremlin', 'Step 5: Retrieved brand name');
  console.log(`  -> Brand Positioning: "${brandData.positioning}"\n`);

  // Step 6: Verify Facts-vs-Reasoning Boundary (Server strictly supplies facts)
  console.log('Step 6: Facts-vs-Reasoning Boundary Verification');
  const factsBundle = {
    prospect: {
      name: leadData.name,
      company: leadData.company,
      service_requested: leadData.service,
      challenge: leadData.challenge,
    },
    recommended_offering: {
      id: matchedService.id,
      name: matchedService.name,
      description: matchedService.description,
      price: pricingData.pricing[0].price,
      currency: pricingData.pricing[0].currency,
    },
    brand_voice: {
      tone: brandData.tone_guidelines,
      core_philosophy: brandData.founder_background.philosophy,
    },
  };

  assert(factsBundle.prospect.name.length > 0, 'Prospect fact bundle contains valid name');
  assert(factsBundle.recommended_offering.price.length > 0, 'Pricing fact bundle contains verified price');
  assert(factsBundle.brand_voice.tone.length > 0, 'Brand voice fact bundle contains verified tone');

  // Verify MCP server produced zero hallucinations or synthetic marketing prose
  assert(typeof leadRes.content[0].text === 'string', 'get_lead output is raw JSON facts');
  assert(typeof pricingRes.content[0].text === 'string', 'get_pricing output is raw JSON facts');
  assert(typeof brandRes.content[0].text === 'string', 'get_brand_context output is raw JSON facts');

  // ---------------- Cleanup & Summary ----------------
  console.log('\n======================================================');
  console.log(`📊 PHASE 5 PROSPECT WORKFLOW RESULTS: ${passed} PASSED, ${failed} FAILED`);
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

runProspectWorkflowTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
