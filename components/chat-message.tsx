'use client'

import { UIMessage } from 'ai'
import { MarkdownMessage } from './markdown-message'
import { ToolDebugPanel } from './tool-debug'

function getUIMessageText(msg: UIMessage): string {
  if (!msg.parts || !Array.isArray(msg.parts)) return ''
  return msg.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('')
}

export function ChatMessage({
  message,
  allMessages,
}: {
  message: UIMessage
  allMessages: UIMessage[]
}) {
  const isUser = message.role === 'user'
  const text = getUIMessageText(message)

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-2xl rounded-lg px-4 py-3 ${
          isUser
            ? 'bg-accent text-accent-foreground'
            : 'bg-muted text-foreground border border-border'
        }`}
      >
        {!isUser && text ? (
          <>
            <MarkdownMessage content={text} />
            {message.id && (
              <ToolDebugPanel
                messages={allMessages.filter((m) => {
                  const idx = allMessages.indexOf(m)
                  const messageIdx = allMessages.indexOf(message)
                  return idx <= messageIdx
                })}
              />
            )}
          </>
        ) : (
          <p className="whitespace-pre-wrap">{text}</p>
        )}
      </div>
    </div>
  )
}
