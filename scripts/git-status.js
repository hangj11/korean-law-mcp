import { execSync } from 'child_process';
import { cwd } from 'process';

console.log('[v0] Current working directory:', cwd());

try {
  const status = execSync('git status', { encoding: 'utf-8' });
  console.log('[v0] Git status:', status);
} catch (e) {
  console.log('[v0] Git error:', e.message);
  
  // Try to initialize git
  try {
    execSync('git init', { cwd: '/vercel/share/v0-project' });
    execSync('git config user.email "v0[bot]@users.noreply.github.com"', { cwd: '/vercel/share/v0-project' });
    execSync('git config user.name "v0[bot]"', { cwd: '/vercel/share/v0-project' });
    console.log('[v0] Git initialized');
    
    // Try adding and committing
    execSync('git add .', { cwd: '/vercel/share/v0-project' });
    execSync('git commit -m "feat: Add Korean legal chatbot web UI\n\n- Created Next.js web application connecting to korean-law-mcp MCP server\n- Implemented chat API route with Vercel AI SDK and MCP tool integration\n- Built responsive UI with React components and Tailwind CSS\n- Added markdown rendering for legal documents\n- Included tool debug panel for monitoring MCP calls\n- Set up environment variables and documentation"', { cwd: '/vercel/share/v0-project' });
    console.log('[v0] ✓ Commit successful');
  } catch (commitError) {
    console.log('[v0] ✗ Commit error:', commitError.message);
  }
}
