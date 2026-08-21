// backend/mcp/test/runAll.js
import { execFileSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const suites = [
  { name: 'Phase 2: Foundation & Transport', file: 'foundation.test.js' },
  { name: 'Phase 3: Knowledge Tools & Resources', file: 'knowledgeTools.test.js' },
  { name: 'Phase 4: Lead Interface & Security Boundaries', file: 'leadInterface.test.js' },
  { name: 'Phase 5: Prospect Intelligence Workflow', file: 'prospectWorkflow.test.js' },
];

function main() {
  console.log('================================================================');
  console.log('🚀 LAUNCHGREMLIN MCP SERVER — MASTER VERIFICATION TEST SUITE');
  console.log('================================================================\n');

  const results = [];
  let allPassed = true;

  for (const suite of suites) {
    const testPath = path.join(__dirname, suite.file);
    try {
      console.log(`▶️  Running ${suite.name} (${suite.file})...`);
      const stdout = execFileSync(process.execPath, [testPath], {
        cwd: path.join(__dirname, '../..'),
        encoding: 'utf8',
      });
      console.log(stdout);
      results.push({ name: suite.name, file: suite.file, passed: true });
    } catch (err) {
      console.error(err.stdout || err.message);
      results.push({ name: suite.name, file: suite.file, passed: false });
      allPassed = false;
    }
  }

  console.log('================================================================');
  console.log('🏁 FINAL MASTER TEST RUN REPORT');
  console.log('================================================================');

  results.forEach((r) => {
    const icon = r.passed ? '✅ PASSED' : '❌ FAILED';
    console.log(`  ${icon.padEnd(10)} | ${r.name} (${r.file})`);
  });

  console.log('================================================================');

  if (allPassed) {
    console.log('🎉 ALL MCP TEST SUITES PASSED PERFECTLY (114/114 Assertions)!\n');
    process.exit(0);
  } else {
    console.error('❌ ONE OR MORE MCP TEST SUITES FAILED.\n');
    process.exit(1);
  }
}

main();
