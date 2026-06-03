'use client'

import Image from 'next/image'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showTagline?: boolean
  variant?: 'light' | 'dark'
  large?: boolean
}

export function Logo({ className, showTagline = false, variant = 'dark', large = false }: LogoProps) {
  const t = useTranslations('common')

  return (
    <Link href="/" className={cn('flex items-center gap-3', className)}>
      <div className="relative shrink-0">
        <Image
          src="/logo01.png"
          alt={t('siteName')}
          width={large ? 220 : 180}
          height={large ? 127 : 104}
          className="object-contain"
          priority
        />
      </div>
      {showTagline && (
        <span className={cn(
          'text-xs max-w-[180px] leading-tight hidden sm:block',
          variant === 'light' ? 'text-argent/70' : 'text-muted-foreground'
        )}>
          {t('tagline')}
        </span>
      )}
    </Link>
  )
}
