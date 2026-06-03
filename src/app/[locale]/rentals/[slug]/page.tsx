import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import {
  ArrowLeft, Check, Gauge, Fuel, Settings, Calendar,
  Clock, ShieldCheck, MapPin, Phone, MessageCircle, FileText,
} from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { rentalBySlugQuery, rentalSlugsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { generatePageMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site'
import type { Rental } from '@/types'
import { cn } from '@/lib/utils'

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(rentalSlugsQuery)
    return slugs.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await props.params
  const rental = await client.fetch<Rental>(rentalBySlugQuery, { slug })
  if (!rental) return {}
  return generatePageMetadata(rental.seo, locale)
}

export default async function RentalDetailPage(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await props.params
  const t = await getTranslations({ locale, namespace: 'rentals' })
  const rental = await client.fetch<Rental>(rentalBySlugQuery, { slug })

  if (!rental) notFound()

  const transmissionLabel =
    rental.vehicle?.transmission === 'automatic' ? t('automatique') : t('manuelle')

  const availabilityLabel: Record<string, string> = {
    disponible: t('disponible'),
    loue: t('enLocation'),
    maintenance: t('enMaintenance'),
  }

  const availabilityStyles: Record<string, string> = {
    disponible: 'bg-green-500/15 text-green-500',
    loue: 'bg-amber-500/15 text-amber-500',
    maintenance: 'bg-red-500/15 text-red-500',
  }

  const images = rental.images?.map((img) => urlFor(img).width(1200).height(800).url()) || []

  const whatsappUrl = siteConfig.social.whatsapp

  const vehicle = rental.vehicle

  return (
    <>
      <section className="py-8 bg-gradient-to-b from-nuit/5 to-transparent">
        <div className="container">
          <Link
            href="/rentals"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('retour')}
          </Link>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-electric/5 to-nuit/10">
                {images.length > 0 ? (
                  <Image
                    src={images[0]}
                    alt={rental.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl text-muted-foreground/20">🚗</span>
                  </div>
                )}
                {rental.availability && (
                  <span className={cn(
                    'absolute top-5 right-5 z-10 rounded-full px-4 py-1.5 text-xs font-semibold capitalize backdrop-blur-sm',
                    availabilityStyles[rental.availability] || 'bg-white/10 text-white'
                  )}>
                    {availabilityLabel[rental.availability] || rental.availability}
                  </span>
                )}
                {rental.isFeatured && (
                  <span className="absolute top-5 left-5 z-10 rounded-full bg-electric px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    {t('alaUne')}
                  </span>
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {images.map((url, index) => (
                    <div
                      key={index}
                      className={cn(
                        'relative shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer',
                        index === 0 ? 'border-electric' : 'border-transparent hover:border-electric/50'
                      )}
                    >
                      <Image
                        src={url}
                        alt={`${rental.title} - ${t('imageAlt')} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl leading-[1.15]">
                {vehicle?.title || rental.title}
              </h1>

              {vehicle && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
                    <Calendar className="h-5 w-5 text-electric mx-auto" />
                    <p className="mt-2 text-xs text-muted-foreground">{t('annee')}</p>
                    <p className="font-heading text-sm font-semibold">{vehicle.year}</p>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
                    <Gauge className="h-5 w-5 text-electric mx-auto" />
                    <p className="mt-2 text-xs text-muted-foreground">{t('kilometrage')}</p>
                    <p className="font-heading text-sm font-semibold">{vehicle.mileage?.toLocaleString()} {t('km')}</p>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
                    <Fuel className="h-5 w-5 text-electric mx-auto" />
                    <p className="mt-2 text-xs text-muted-foreground">{t('carburant')}</p>
                    <p className="font-heading text-sm font-semibold capitalize">{vehicle.fuelType}</p>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
                    <Settings className="h-5 w-5 text-electric mx-auto" />
                    <p className="mt-2 text-xs text-muted-foreground">{t('transmissionLabel')}</p>
                    <p className="font-heading text-sm font-semibold">{transmissionLabel}</p>
                  </div>
                </div>
              )}

              <div className="mt-8">
                <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-electric" />
                  {t('tarifsLocation')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {rental.dailyRate && (
                    <div className="relative rounded-xl border border-electric/20 bg-electric/[0.03] p-5 text-center transition-all hover:border-electric/40 hover:shadow-md">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {t('journalierLabel')}
                      </p>
                      <p className="font-heading text-2xl font-bold text-foreground">
                        {rental.dailyRate.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">{t('parJour')}</p>
                    </div>
                  )}
                  {rental.weeklyRate && (
                    <div className="relative rounded-xl border border-border/50 bg-card p-5 text-center transition-all hover:border-electric/40 hover:shadow-md">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {t('hebdomadaireLabel')}
                      </p>
                      <p className="font-heading text-2xl font-bold text-foreground">
                        {rental.weeklyRate.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">{t('parSemaine')}</p>
                    </div>
                  )}
                  {rental.monthlyRate && (
                    <div className="relative rounded-xl border border-border/50 bg-card p-5 text-center transition-all hover:border-electric/40 hover:shadow-md">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {t('mensuelLabel')}
                      </p>
                      <p className="font-heading text-2xl font-bold text-foreground">
                        {rental.monthlyRate.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">{t('parMois')}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {rental.deposit && (
                  <div className="rounded-xl border border-border/50 bg-card p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{t('cautionLabel')}</p>
                    <p className="font-heading text-lg font-bold mt-1">{rental.deposit.toLocaleString()} {t('fcfa')}</p>
                  </div>
                )}
                {rental.mileageLimit && (
                  <div className="rounded-xl border border-border/50 bg-card p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{t('kmInclusLabel')}</p>
                    <p className="font-heading text-lg font-bold mt-1">{rental.mileageLimit.toLocaleString()} {t('km')}</p>
                  </div>
                )}
              </div>

              {rental.insurance && (
                <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-green-500/5 border border-green-500/15 p-4">
                  <ShieldCheck className="h-5 w-5 text-green-500 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{t('assurance')}</p>
                    <p className="text-sm text-muted-foreground">{rental.insurance}</p>
                  </div>
                </div>
              )}

              {rental.features && rental.features.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-heading text-lg font-semibold mb-4">
                    {t('equipementsInclus')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {rental.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10">
                          <Check className="h-3 w-3 text-green-500" />
                        </span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {rental.conditions && rental.conditions.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-electric" />
                    {t('conditions')}
                  </h3>
                  <ul className="space-y-2">
                    {rental.conditions.map((condition, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/10">
                          <Check className="h-3 w-3 text-electric" />
                        </span>
                        {condition}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-10 p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-electric/[0.02] to-transparent">
                <p className="font-heading text-base font-semibold mb-1">{t('ctaTitle')}</p>
                <p className="text-sm text-muted-foreground mb-5">
                  {t('ctaDesc')}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/contact?rental=${rental.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-electric px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-electric/90 hover:shadow-lg hover:shadow-electric/25"
                  >
                    <Phone className="h-4 w-4" />
                    {t('ctaButton')}
                  </Link>
                  <Link
                    href={`${whatsappUrl}?text=${encodeURIComponent('Hi, I am interested in renting ' + rental.title)}`}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-green-500/5 px-6 py-3 text-sm font-semibold text-green-600 transition-all hover:bg-green-500/10 hover:border-green-500/50"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t('whatsapp')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
