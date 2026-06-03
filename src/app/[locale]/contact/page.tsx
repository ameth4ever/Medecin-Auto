import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import {
  Phone, Mail, MapPin, Clock, MessageCircle,
  Send, ChevronRight, ArrowRight, MessageSquare,
} from 'lucide-react'
import { generatePageMetadata } from '@/lib/seo'
import { ContactForm } from '@/components/ContactForm'
import { CTASection } from '@/components/CTASection'
import { siteConfig } from '@/config/site'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return generatePageMetadata({
    title: t('metaTitle'),
    description: t('metaDesc'),
  }, locale)
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  const c = await getTranslations({ locale, namespace: 'cta' })

  const contactMethods = [
    {
      icon: Phone,
      label: t('telephone'),
      value: `${siteConfig.contact.phone} / ${siteConfig.contact.phoneSecondary}`,
      href: `tel:${siteConfig.contact.phone}`,
      description: t('disponible7j'),
    },
    {
      icon: Mail,
      label: t('email'),
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      description: t('reponse24h'),
    },
    {
      icon: MapPin,
      label: t('adresse'),
      value: siteConfig.contact.address,
      href: 'https://maps.app.goo.gl/z9roU8WcQk82hsRQ8',
      description: t('venezNousRencontrer'),
    },
    {
      icon: Clock,
      label: t('horaires'),
      value: t('horairesValue'),
      href: null,
      description: t('fermeDimanche'),
    },
  ]

  const quickLinks = [
    { label: t('nosServices'), href: '/services' },
    { label: t('vehiculesDisponibles'), href: '/vehicles' },
    { label: t('locationVehicules'), href: '/rentals' },
    { label: t('faq2'), href: '/faq' },
  ]

  const faqItems = [
    { q: t('faq1Q'), a: t('faq1R') },
    { q: t('faq2Q'), a: t('faq2R') },
    { q: t('faq3Q'), a: t('faq3R') },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nuit via-nuit to-profond text-white">
        <div className="absolute inset-0">
          <Image
            src="/about.jpg"
            alt={t('heroAlt')}
            fill
            className="object-cover opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-nuit/95 via-nuit/80 to-nuit/60" />
        </div>
        <div className="container relative py-32">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-electric/20 bg-electric/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-electric uppercase mb-5">
              {t('badge')}
            </span>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
              {t('title')}
            </h1>
            <p className="mt-5 text-lg text-argent/80 max-w-2xl leading-relaxed">
              {t('heroDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method) => {
              const Icon = method.icon
              if (!method.href) {
                return (
                  <div
                    key={method.label}
                    className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all hover:shadow-lg hover:border-electric/20 hover:-translate-y-1"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-electric/5 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150" />
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric/10 text-electric mb-4">
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        {method.label}
                      </p>
                      <p className="font-heading text-lg font-bold text-foreground">
                        {method.value}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {method.description}
                      </p>
                    </div>
                  </div>
                )
              }
              return (
                <Link
                  key={method.label}
                  href={method.href}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all hover:shadow-lg hover:border-electric/20 hover:-translate-y-1"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-electric/5 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150" />
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric/10 text-electric mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      {method.label}
                    </p>
                    <p className="font-heading text-lg font-bold text-foreground">
                      {method.value}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                  <ChevronRight className="absolute bottom-5 right-5 h-4 w-4 text-muted-foreground/40 transition-transform group-hover:translate-x-1 group-hover:text-electric" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border/50 bg-card p-8 sm:p-10">
                <div className="mb-8">
                  <span className="inline-block rounded-full border border-electric/20 bg-electric/5 px-3 py-1 text-xs font-semibold text-electric uppercase tracking-wider mb-3">
                    {t('formulaire')}
                  </span>
                  <h2 className="font-heading text-2xl font-bold tracking-tight">
                    {t('envoyerMessage')}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t('formDesc')}
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>

            {/* Map + Quick Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl overflow-hidden border border-border/50 bg-card">
                <div className="flex items-center justify-between px-5 py-3 border-b border-border/30">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-electric/10 text-electric">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t('notreEmplacement')}</p>
                      <p className="text-xs text-muted-foreground">{t('dakar')}</p>
                    </div>
                  </div>
                  <Link
                    href="https://maps.app.goo.gl/z9roU8WcQk82hsRQ8"
                    target="_blank"
                    className="flex items-center gap-1.5 text-xs font-medium text-electric hover:text-electric/80 transition-colors"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>
                    {t('ouvrir')}
                  </Link>
                </div>
                <div className="h-64 sm:h-72">
                  <iframe
                    src="https://maps.google.com/maps?q=14.799575,-17.292215&z=16&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t('mapTitle')}
                  />
                </div>
              </div>

              {/* Quick Contact */}
              <div className="rounded-2xl border border-border/50 bg-card p-6">
                <h3 className="font-heading text-base font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-electric" />
                  {t('contactRapide')}
                </h3>
                <div className="space-y-3">
                  <Link
                    href={siteConfig.social.whatsapp}
                    target="_blank"
                    className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3 text-sm font-medium text-green-600 transition-all hover:bg-green-500/10 hover:border-green-500/30"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>{t('whatsappSocial')}</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>
                  <Link
                    href={siteConfig.social.facebook}
                    target="_blank"
                    className="flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-sm font-medium text-blue-600 transition-all hover:bg-blue-500/10 hover:border-blue-500/30"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    <span>{t('facebookSocial')}</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>
                  <Link
                    href={siteConfig.social.instagram}
                    target="_blank"
                    className="flex items-center gap-3 rounded-xl border border-pink-500/20 bg-pink-500/5 px-4 py-3 text-sm font-medium text-pink-600 transition-all hover:bg-pink-500/10 hover:border-pink-500/30"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                    <span>{t('instagramSocial')}</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Why Contact Us */}
      <section className="py-16 bg-gradient-to-br from-nuit/5 via-transparent to-electric/5">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* FAQ */}
            <div>
              <span className="inline-block rounded-full border border-electric/20 bg-electric/5 px-3 py-1 text-xs font-semibold text-electric uppercase tracking-wider mb-4">
                {t('faq')}
              </span>
              <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                {t('questionsFrequentes')}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t('faqDesc')}
              </p>
              <div className="mt-8 space-y-4">
                {faqItems.map((item) => (
                  <div
                    key={item.q}
                    className="rounded-xl border border-border/50 bg-card p-5 transition-all hover:border-electric/20 hover:shadow-sm"
                  >
                    <h3 className="font-heading text-sm font-semibold">{item.q}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <span className="inline-block rounded-full border border-electric/20 bg-electric/5 px-3 py-1 text-xs font-semibold text-electric uppercase tracking-wider mb-4">
                {t('liensUtiles')}
              </span>
              <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                {t('explorezNotreSite')}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t('explorezDesc')}
              </p>
              <div className="mt-8 space-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group flex items-center justify-between rounded-xl border border-border/50 bg-card px-5 py-4 transition-all hover:border-electric/20 hover:shadow-sm hover:-translate-y-0.5"
                  >
                    <span className="font-heading text-sm font-semibold">{link.label}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-electric group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={c('immediateTitle')}
        description={c('immediateDesc')}
        ctaLabel={c('appelerMaintenant')}
        ctaLink={`tel:${siteConfig.contact.phone}`}
      />
    </>
  )
}
