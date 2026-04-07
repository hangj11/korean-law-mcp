#!/bin/bash

# Commit the Korean legal chatbot web app implementation
git add .
git commit -m "feat: Add Korean legal chatbot web app with Next.js and MCP integration

- Create Next.js web application for Korean law MCP server
- Implement chat API route with AI SDK 6 and streaming responses
- Build React components: ChatContainer, ChatMessage, ChatInput, MarkdownMessage
- Add MCP client initialization with HTTP transport for korean-law-mcp server
- Integrate Tailwind CSS with legal-tech styling (white bg, soft shadows, responsive)
- Add legal system prompt with Korean language support and law disclaimer
- Implement tool debug panel for viewing MCP tool calls
- Add markdown rendering with syntax highlighting
- Create comprehensive setup guide (SETUP.md) and environment configuration
- Support environment variables: KOREAN_LAW_MCP_URL, OPENAI_API_KEY, OPENAI_MODEL
- Add npm scripts: dev, dev:mcp, dev:all, build:web, start:web
- Update package.json with React, Next.js, AI SDK, markdown-it dependencies
- Update README with web app section and quick start guide

Co-authored-by: v0[bot] <v0[bot]@users.noreply.github.com>"
