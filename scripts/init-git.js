import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(__filename, '../../');

console.log('[v0] Project root:', projectRoot);

try {
  // Change to project directory
  process.chdir(projectRoot);
  console.log('[v0] Changed to project directory');
  
  // Check if .git exists
  try {
    const status = execSync('git status', { encoding: 'utf-8' });
    console.log('[v0] Git repository already exists');
    console.log('[v0] Status:', status.split('\n')[0]);
  } catch (e) {
    console.log('[v0] No git repository found, initializing...');
    execSync('git init', { stdio: 'inherit' });
    console.log('[v0] Git repository initialized');
  }
  
  // Configure git user
  try {
    execSync('git config user.name "v0[bot]"', { stdio: 'inherit' });
    execSync('git config user.email "v0[bot]@users.noreply.github.com"', { stdio: 'inherit' });
    console.log('[v0] Git user configured');
  } catch (e) {
    console.log('[v0] Could not configure git user (may already be configured)');
  }
  
  // Add all files
  console.log('[v0] Adding files to git...');
  execSync('git add -A', { stdio: 'inherit' });
  
  // Create commit
  console.log('[v0] Creating commit...');
  const commitMessage = `feat: Add Korean legal chatbot web app with Next.js

- Created Next.js web application with TypeScript
- Implemented chat API route using Vercel AI SDK v6
- Integrated MCP client for Korean Law MCP server
- Built React components for chat interface with markdown rendering
- Added tool debug panel for MCP tool inspection
- Configured Tailwind CSS with legal-tech styling
- Set up environment variables and configuration
- Added comprehensive documentation and setup guide

Co-authored-by: v0[bot] <v0[bot]@users.noreply.github.com>`;
  
  execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
  console.log('[v0] ✓ Commit created successfully');
  
} catch (error) {
  console.error('[v0] Error:', error.message);
  process.exit(1);
}
