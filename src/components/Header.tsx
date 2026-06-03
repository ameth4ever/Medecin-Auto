'use client'

import { useState } from 'react'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import { siteConfig } from '@/config/site'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('nav')
  const h = useTranslations('header')

  const navLinks = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '/about' },
    { label: t('services'), href: '/services' },
    { label: t('vehicles'), href: '/vehicles' },
    { label: t('rentals'), href: '/rentals' },
    { label: t('blog'), href: '/blog' },
    { label: t('contact'), href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="hidden md:block bg-nuit text-white/80 border-b border-white/5">
        <div className="container flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center gap-1.5 text-argent/70 hover:text-electric transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <span className="text-argent/40">|</span>
            <a
              href={`tel:${siteConfig.contact.phoneSecondary}`}
              className="text-argent/70 hover:text-electric transition-colors"
            >
              {siteConfig.contact.phoneSecondary}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-1.5 text-argent/70 hover:text-electric transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{siteConfig.contact.email}</span>
            </a>
            <span className="flex items-center gap-1.5 text-argent/50">
              <MapPin className="h-3.5 w-3.5" />
              <span>{siteConfig.contact.address}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-argent/50">{h('hours')}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-electric after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: 'default', size: 'sm' }),
                'bg-electric text-white hover:bg-electric/90'
              )}
            >
              {t('bookService')}
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={t('menu')}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden border-b border-border/40 bg-background/95 backdrop-blur',
          isOpen ? 'block' : 'hidden'
        )}
      >
        <nav className="container flex flex-col gap-3 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex justify-center pt-2 pb-1">
            <LanguageSwitcher />
          </div>
          <div className="border-t border-border/40 pt-4 mt-2 space-y-2">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Phone className="h-4 w-4 text-electric" />
              {siteConfig.contact.phone}
            </a>
            <a
              href={`tel:${siteConfig.contact.phoneSecondary}`}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Phone className="h-4 w-4 text-electric" />
              {siteConfig.contact.phoneSecondary}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Mail className="h-4 w-4 text-electric" />
              {siteConfig.contact.email}
            </a>
          </div>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className={cn(
              buttonVariants({ variant: 'default' }),
              'bg-electric text-white hover:bg-electric/90 w-full text-center mt-4'
            )}
          >
            {t('bookService')}
          </Link>
        </nav>
      </div>
    </header>
  )
}
