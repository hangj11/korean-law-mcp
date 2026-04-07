'use client'

import { useRef } from 'react'
import { Send } from 'lucide-react'

export function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
}: {
  input: string
  setInput: (value: string) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault()
      const form = textareaRef.current?.form
      if (form) {
        const submitEvent = new Event('submit', { bubbles: true })
        form.dispatchEvent(submitEvent)
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-3">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="법률 질문을 입력하세요... (Ask a legal question...)"
        disabled={isLoading}
        rows={3}
        className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground disabled:opacity-50 resize-none focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-accent-foreground disabled:opacity-50 hover:opacity-90"
      >
        <Send size={20} />
      </button>
    </form>
  )
}
