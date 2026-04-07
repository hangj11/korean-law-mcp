import { streamText, tool, convertToModelMessages } from 'ai'
import { z } from 'zod'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import {
  HTTPClientTransport,
  HTTPClientTransportOptions,
} from '@modelcontextprotocol/sdk/client/http.js'
import { LEGAL_SYSTEM_PROMPT } from '@/lib/prompts'

let mcpClient: Client | null = null

async function initMCPClient(): Promise<Client> {
  if (mcpClient) {
    return mcpClient
  }

  const serverUrl = process.env.KOREAN_LAW_MCP_URL
  if (!serverUrl) {
    throw new Error('KOREAN_LAW_MCP_URL environment variable is not set')
  }

  try {
    const transport = new HTTPClientTransport({
      url: new URL(serverUrl),
    } as HTTPClientTransportOptions)

    mcpClient = new Client({
      name: 'korean-legal-chatbot',
      version: '1.0.0',
    })

    await mcpClient.connect(transport)
    console.log('[v0] MCP client connected to', serverUrl)
    return mcpClient
  } catch (error) {
    console.error('[v0] Failed to initialize MCP client:', error)
    throw new Error(
      `Failed to connect to MCP server at ${serverUrl}: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

async function getMCPTools(): Promise<Record<string, any>> {
  const client = await initMCPClient()

  try {
    const response = await client.listTools()
    const tools: Record<string, any> = {}

    for (const mcpTool of response.tools) {
      tools[mcpTool.name] = tool({
        description: mcpTool.description || 'A tool from the MCP server',
        parameters: z.object(
          Object.entries(mcpTool.inputSchema?.properties || {}).reduce(
            (acc, [key, prop]: [string, any]) => {
              const zodType = getZodType(prop)
              const required =
                mcpTool.inputSchema?.required?.includes(key) ?? false
              acc[key] = required ? zodType : zodType.optional()
              return acc
            },
            {} as Record<string, any>
          )
        ),
        execute: async (params) => {
          try {
            const result = await client.callTool({
              name: mcpTool.name,
              arguments: params,
            })

            return result.content
              .map((c) => (c.type === 'text' ? c.text : JSON.stringify(c)))
              .join('\n')
          } catch (error) {
            console.error(`[v0] Error calling tool ${mcpTool.name}:`, error)
            return `Error: ${error instanceof Error ? error.message : String(error)}`
          }
        },
      })
    }

    return tools
  } catch (error) {
    console.error('[v0] Failed to get MCP tools:', error)
    throw new Error(
      `Failed to list MCP tools: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

function getZodType(prop: any): z.ZodType<any> {
  const type = prop.type || 'string'

  switch (type) {
    case 'string':
      return z.string()
    case 'number':
      return z.number()
    case 'integer':
      return z.number().int()
    case 'boolean':
      return z.boolean()
    case 'array':
      return z.array(z.string())
    case 'object':
      return z.record(z.any())
    default:
      return z.string()
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages format' }), {
        status: 400,
      })
    }

    const tools = await getMCPTools()

    if (Object.keys(tools).length === 0) {
      console.warn('[v0] No MCP tools available, proceeding without tools')
    }

    const convertedMessages = await convertToModelMessages(messages)

    const result = streamText({
      model: 'openai/gpt-4o-mini',
      system: LEGAL_SYSTEM_PROMPT,
      messages: convertedMessages,
      tools,
      maxSteps: 10,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('[v0] Chat API error:', error)
    const message =
      error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(
      JSON.stringify({
        error: message,
        details:
          message.includes('KOREAN_LAW_MCP_URL') ||
          message.includes('MCP server')
            ? 'Make sure KOREAN_LAW_MCP_URL environment variable is set correctly'
            : undefined,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
