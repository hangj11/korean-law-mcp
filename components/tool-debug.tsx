'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { UIMessage } from 'ai'

function getUIMessageText(msg: UIMessage): string {
  if (!msg.parts || !Array.isArray(msg.parts)) return ''
  return msg.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('')
}

export function ToolDebugPanel({
  messages,
}: {
  messages: UIMessage[]
}) {
  const [isOpen, setIsOpen] = useState(false)

  const toolCalls = messages
    .flatMap((msg) => msg.parts?.filter((p) => p.type === 'tool-call') || [])
    .filter(Boolean)

  const toolResults = messages
    .flatMap((msg) => msg.parts?.filter((p) => p.type === 'tool-result') || [])
    .filter(Boolean)

  if (toolCalls.length === 0 && toolResults.length === 0) {
    return null
  }

  return (
    <div className="mt-6 border-t border-border pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
        Debug Information ({toolCalls.length} tool calls)
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          {toolCalls.map((call, idx) => (
            <div key={idx} className="rounded-md bg-muted p-3 text-xs">
              <div className="font-semibold text-muted-foreground">
                Tool Call {idx + 1}: {call.toolName}
              </div>
              <pre className="mt-2 overflow-auto bg-background p-2 rounded border border-border">
                {JSON.stringify(call.args, null, 2)}
              </pre>
            </div>
          ))}

          {toolResults.map((result, idx) => (
            <div key={idx} className="rounded-md bg-muted p-3 text-xs">
              <div className="font-semibold text-muted-foreground">
                Tool Result {idx + 1}
              </div>
              <pre className="mt-2 overflow-auto bg-background p-2 rounded border border-border max-h-48">
                {typeof result.result === 'string'
                  ? result.result
                  : JSON.stringify(result.result, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
