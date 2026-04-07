#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

console.log('[v0] Project root:', projectRoot);
console.log('[v0] Attempting to commit changes...\n');

try {
  // Change to project root
  process.chdir(projectRoot);
  
  // Check git status
  console.log('[v0] Checking git status...');
  const status = execSync('git status --short', { encoding: 'utf8' });
  console.log('[v0] Modified files:');
  console.log(status);

  // Add all changes
  console.log('[v0] Adding all changes...');
  execSync('git add .', { stdio: 'inherit' });

  // Create commit
  const commitMessage = `feat: Add Korean legal chatbot web app with Next.js and AI SDK

- Initialize Next.js 16 project with TypeScript and Tailwind CSS
- Create chat API route using Vercel AI SDK 6 with MCP tool integration
- Implement real-time streaming chat UI with useChat hook
- Add markdown message rendering with syntax highlighting
- Create tool debug panel for MCP tool call transparency
- Set up environment variables and configuration for MCP server connection
- Add Korean legal system prompt and styling
- Include comprehensive setup and deployment documentation`;

  console.log('\n[v0] Creating commit...');
  execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });

  console.log('\n✅ Successfully committed changes!');
  console.log('\n[v0] You can now push to GitHub with: git push');

} catch (error) {
  console.error('[v0] Error:', error.message);
  process.exit(1);
}
