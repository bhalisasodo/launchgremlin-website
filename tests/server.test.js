import test from 'node:test';
import assert from 'node:assert/strict';
import { createLeadRecord } from '../server.js';

test('createLeadRecord adds metadata and preserves the submitted fields', () => {
  const rawLead = {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    company: 'LaunchGremlin',
    summary: 'Build an AI assistant',
    service: 'MVP',
    challenge: 'Need product direction',
    timeline: '2 weeks',
    budget: '$10k',
    guide: 'Launch plan',
  };

  const lead = createLeadRecord(rawLead);

  assert.equal(lead.name, 'Ada Lovelace');
  assert.equal(lead.email, 'ada@example.com');
  assert.equal(lead.company, 'LaunchGremlin');
  assert.equal(lead.summary, 'Build an AI assistant');
  assert.equal(lead.source, 'launchgremlin-website');
  assert.match(lead.created_at, /T/);
});
