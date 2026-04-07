import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import {
  HTTPClientTransport,
  HTTPClientTransportOptions,
} from '@modelcontextprotocol/sdk/client/http.js'

let client: Client | null = null

export async function initMCPClient(serverUrl: string): Promise<Client> {
  if (client) {
    return client
  }

  try {
    const transport = new HTTPClientTransport({
      url: new URL(serverUrl),
    } as HTTPClientTransportOptions)

    client = new Client({
      name: 'korean-legal-chatbot',
      version: '1.0.0',
    })

    await client.connect(transport)
    console.log('[v0] MCP client connected to', serverUrl)
    return client
  } catch (error) {
    console.error('[v0] Failed to initialize MCP client:', error)
    throw new Error(`Failed to connect to MCP server: ${error}`)
  }
}

export async function getMCPTools(client: Client) {
  try {
    const response = await client.listTools()
    console.log(
      '[v0] Available MCP tools:',
      response.tools.map((t) => t.name)
    )
    return response.tools
  } catch (error) {
    console.error('[v0] Failed to list MCP tools:', error)
    return []
  }
}

export function closeMCPClient() {
  if (client) {
    client = null
  }
}
