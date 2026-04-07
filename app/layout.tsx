import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '한국 법률 어시스턴트 | Korean Legal Chatbot',
  description:
    'AI-powered Korean legal assistant using MCP (Model Context Protocol) for accurate legal information and guidance.',
  keywords: [
    'Korean law',
    '한국법',
    'legal assistant',
    'AI',
    'MCP',
    '법률 상담',
  ],
  authors: [{ name: 'Korean Legal MCP Team' }],
  openGraph: {
    title: '한국 법률 어시스턴트',
    description: 'AI-powered Korean legal assistant',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0066cc',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
