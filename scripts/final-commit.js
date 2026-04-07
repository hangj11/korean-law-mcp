import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

try {
  console.log('[v0] Project root:', projectRoot);
  
  // Change to project directory
  process.chdir(projectRoot);
  console.log('[v0] Changed to:', process.cwd());
  
  // Check git status
  const status = execSync('git status --porcelain', { encoding: 'utf-8' });
  console.log('[v0] Git status:\n', status);
  
  // Stage all new and modified files
  console.log('[v0] Staging files...');
  execSync('git add -A', { stdio: 'inherit' });
  
  // Create commit
  const commitMessage = `feat: Add Next.js web chatbot for Korean Legal AI

- Create Next.js 16 web application integrated with korean-law-mcp MCP server
- Implement chat API route with streaming text using Vercel AI SDK 6
- Add React components: ChatContainer, ChatMessage, ChatInput, ToolDebug
- Integrate markdown rendering for legal document display
- Set up Tailwind CSS styling with legal-tech aesthetic
- Add environment configuration and setup documentation
- Support real-time MCP tool calling and response streaming
- Include legal disclaimer and disclaimer UI components

This enables users to query Korean legal information through a web interface
while leveraging the MCP server's 14 legal research tools.`;
  
  console.log('[v0] Creating commit...');
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
  
  console.log('[v0] ✓ Commit created successfully!');
  
} catch (error) {
  console.error('[v0] Error:', error.message);
  process.exit(1);
}
