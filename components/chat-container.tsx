'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useEffect, useRef } from 'react'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'
import { LEGAL_DISCLAIMER } from '@/lib/prompts'

export function ChatContainer() {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, setInput, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
    maxSteps: 10,
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      sendMessage()
    }
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-white px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">
          한국 법률 어시스턴트
        </h1>
        <p className="text-sm text-muted-foreground">
          Korean Legal Assistant - Powered by Korean Law MCP
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                환영합니다
              </h2>
              <p className="text-muted-foreground">
                한국 법률에 대한 질문을 해주세요.
              </p>
            </div>
            <div className="legal-disclaimer max-w-md text-left">
              <p className="text-xs font-semibold">Legal Disclaimer:</p>
              <p className="text-xs mt-1">{LEGAL_DISCLAIMER}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, idx) => (
              <ChatMessage
                key={message.id}
                message={message}
                allMessages={messages}
              />
            ))}
            {status === 'streaming' && (
              <div className="flex gap-3">
                <div className="max-w-2xl rounded-lg bg-muted border border-border px-4 py-3">
                  <div className="flex gap-2 items-center text-muted-foreground">
                    <div className="inline-flex gap-1">
                      <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></span>
                      <span
                        className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></span>
                      <span
                        className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: '0.4s' }}
                      ></span>
                    </div>
                    <span className="text-sm">생각 중...</span>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="mx-auto max-w-2xl rounded-lg bg-red-100 text-red-800 px-4 py-3 border border-red-200">
                <p className="text-sm font-semibold">오류 발생</p>
                <p className="text-sm">{error.message}</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border bg-white px-6 py-4 shadow-sm">
        <ChatInput
          input={input}
          setInput={setInput}
          onSubmit={handleSubmit}
          isLoading={status === 'submitted' || status === 'streaming'}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Ctrl + Enter to send • 법률 상담을 위해 변호사와 상담하세요
        </p>
      </div>
    </div>
  )
}
