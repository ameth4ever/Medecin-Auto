import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'

const handleI18n = createMiddleware({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always',
})

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/studio')) {
    return
  }

  return handleI18n(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/studio'],
}
