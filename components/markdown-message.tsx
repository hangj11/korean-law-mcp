'use client'

import { renderMarkdown } from '@/lib/markdown'

export function MarkdownMessage({ content }: { content: string }) {
  const html = renderMarkdown(content)

  return (
    <div
      className="prose prose-sm max-w-none text-foreground space-y-2"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
