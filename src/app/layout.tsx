import type { Metadata, Viewport } from 'next'
import { getLocale } from 'next-intl/server'
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${clashDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
