import type { Metadata, Viewport } from 'next'
import { manrope, clashDisplay } from '@/lib/fonts'
import { generatePageMetadata } from '@/lib/seo'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#0F172A',
}

export const metadata: Metadata = {
  ...generatePageMetadata(),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '96x96' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/favicon-192.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${clashDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
