'use client'

import { usePathname, useRouter } from '@/lib/navigation'
import { useLocale } from 'next-intl'
import { Languages } from 'lucide-react'
import { cn } from '@/lib/utils'

const locales = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
] as const

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = useLocale()

  function switchLocale(locale: string) {
    router.push(pathname, { locale })
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-background p-0.5">
      <Languages className="h-3.5 w-3.5 text-muted-foreground ml-1.5 shrink-0" />
      {locales.map((loc) => (
        <button
          key={loc.code}
          onClick={() => switchLocale(loc.code)}
          className={cn(
            'rounded-md px-2 py-1 text-xs font-medium transition-all',
            currentLocale === loc.code
              ? 'bg-electric text-white shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          )}
        >
          {loc.label}
        </button>
      ))}
    </div>
  )
}
