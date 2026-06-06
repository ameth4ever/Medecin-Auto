'use client'

import { Phone, Mail, MapPin, ArrowUp, Clock, ChevronRight } from 'lucide-react'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import { siteConfig } from '@/config/site'
import { Logo } from '@/components/Logo'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const t = useTranslations('footer')
  const n = useTranslations('nav')
  const c = useTranslations('common')

  return (
    <footer className="relative bg-nuit text-premium overflow-hidden">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-electric to-transparent opacity-60" />

      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-1/2 h-96 bg-[radial-gradient(ellipse_at_top_right,_var(--color-electric)/0.06,_transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-64 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-electric)/0.04,_transparent_60%)] pointer-events-none" />

      {/* Main footer content */}
      <div className="container relative pt-20 pb-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand - spans 3 cols */}
          <div className="lg:col-span-3">
            <Logo variant="light" large />
            <p className="mt-4 text-sm text-argent/60 leading-relaxed">
              {siteConfig.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-argent/60 transition-all duration-300 hover:bg-[#1877F2] hover:text-white hover:shadow-lg hover:shadow-[#1877F2]/20"
                aria-label={t('facebookLabel')}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-argent/60 transition-all duration-300 hover:bg-gradient-to-br hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white hover:shadow-lg hover:shadow-[#DD2A7B]/20"
                aria-label={t('instagramLabel')}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-argent/60 transition-all duration-300 hover:bg-[#25D366] hover:text-white hover:shadow-lg hover:shadow-[#25D366]/20"
                aria-label={t('whatsappLabel')}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-argent/60 transition-all duration-300 hover:bg-[#010101] hover:text-white hover:shadow-lg hover:shadow-[#010101]/20"
                aria-label={t('tiktokLabel')}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation - spans 2 cols */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-sm font-semibold tracking-wider text-white/80 uppercase mb-5">
              {t('navigation')}
            </h3>
            <ul className="space-y-3">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-argent/60 transition-all duration-300 hover:text-electric"
                  >
                    <ChevronRight className="h-3 w-3 text-electric/0 transition-all duration-300 group-hover:text-electric" />
                    {n(link.label.toLowerCase() as Lowercase<typeof link.label>)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - spans 3 cols */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-sm font-semibold tracking-wider text-white/80 uppercase mb-5">
              {t('contact')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-argent/60">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-electric/10 text-electric">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-argent/40 uppercase tracking-wider">{t('telephone')}</p>
                  <a href={`tel:${siteConfig.contact.phone}`} className="transition-colors hover:text-electric">
                    {siteConfig.contact.phone}
                  </a>
                  <span className="mx-2 text-argent/30">|</span>
                  <a href={`tel:${siteConfig.contact.phoneSecondary}`} className="transition-colors hover:text-electric">
                    {siteConfig.contact.phoneSecondary}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-argent/60">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-electric/10 text-electric">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-argent/40 uppercase tracking-wider">{t('email')}</p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-electric">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-argent/60">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-electric/10 text-electric mt-0.5">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-argent/40 uppercase tracking-wider">{t('adresse')}</p>
                  <span>{siteConfig.contact.address}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Horaires & CTA - spans 4 cols */}
          <div className="lg:col-span-4">
            <h3 className="font-heading text-sm font-semibold tracking-wider text-white/80 uppercase mb-5">
              {t('horaires')}
            </h3>
            <ul className="space-y-3 text-sm text-argent/60">
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-electric" />
                <span>{t('lunVen')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-electric" />
                <span>{t('sam')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-electric" />
                <span className="text-argent/40">{t('dimFerme')}</span>
              </li>
            </ul>
            <div className="mt-6 rounded-xl border border-electric/20 bg-electric/5 p-5">
              <p className="font-heading text-sm font-semibold text-white">
                {t('urgence')}
              </p>
              <p className="mt-1 text-xs text-argent/60">
                {t('urgenceDesc')}
              </p>
              <Link
                href="/contact"
                className="group mt-4 inline-flex items-center gap-2 rounded-lg bg-electric px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-electric/90 hover:shadow-lg hover:shadow-electric/25"
              >
                {t('prendreRdv')}
                <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-xs text-argent/40">
            &copy; {currentYear} {c('siteName')}. {t('droitsReserves')}
          </p>
          <p className="text-xs text-argent/40">
            Conçu et développé par{' '}
            <a
              href="https://jolofnexus.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric/70 hover:text-electric transition-colors"
            >
              Jolof Nexus
            </a>
          </p>

        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-argent/50 transition-all duration-300 hover:border-electric/30 hover:bg-electric/10 hover:text-electric hover:shadow-lg hover:shadow-electric/10"
        aria-label={t('retourEnHaut')}
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </footer>
  )
}
