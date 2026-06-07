import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import {
  ArrowLeft, Gauge, Fuel, Settings, Calendar, Check,
  MapPin, Shield, Phone, MessageCircle,
} from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { vehicleBySlugQuery, vehicleSlugsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { generatePageMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site'
import type { Vehicle } from '@/types'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(vehicleSlugsQuery)
    return slugs.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await props.params
  const vehicle = await client.fetch<Vehicle>(vehicleBySlugQuery, { slug }).catch(() => null)
  if (!vehicle) return {}
  return generatePageMetadata(vehicle.seo, locale)
}

export default async function VehicleDetailPage(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await props.params
  const t = await getTranslations({ locale, namespace: 'vehicles' })
  const vehicle = await client.fetch<Vehicle>(vehicleBySlugQuery, { slug }).catch(() => null)

  if (!vehicle) notFound()

  const transmissionLabel = vehicle.transmission === 'automatic' ? t('automatique') : t('manuelle')

  const conditionLabel =
    vehicle.condition === 'neuf' ? t('neuf') : vehicle.condition === 'occasion' ? t('occasion') : t('certifie')

  const statusStyles: Record<string, string> = {
    disponible: 'bg-green-500/15 text-green-500',
    vendu: 'bg-red-500/15 text-red-500',
    reserve: 'bg-amber-500/15 text-amber-500',
  }

  const images = vehicle.images?.map((img) => urlFor(img).width(1200).height(800).url()) || []

  const whatsappUrl = siteConfig.social.whatsapp

  return (
    <>
      <section className="py-8 bg-gradient-to-b from-nuit/5 to-transparent">
        <div className="container">
          <Link
            href="/vehicles"
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
                    alt={vehicle.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl text-muted-foreground/20">🚗</span>
                  </div>
                )}
                {vehicle.status && (
                  <span className={cn(
                    'absolute top-5 right-5 z-10 rounded-full px-4 py-1.5 text-xs font-semibold capitalize backdrop-blur-sm',
                    statusStyles[vehicle.status] || 'bg-white/10 text-white'
                  )}>
                    {vehicle.status}
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
                        alt={`${vehicle.title} - ${t('imageAlt')} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="rounded-full bg-electric/10 px-3 py-1 text-xs font-semibold text-electric">
                  {conditionLabel}
                </span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground capitalize">
                  {vehicle.fuelType}
                </span>
              </div>

              <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl leading-[1.15]">
                {vehicle.title}
              </h1>

              <div className="mt-5">
                <span className="text-[13px] text-muted-foreground uppercase tracking-wider">{t('prix')}</span>
                <p className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                  {vehicle.price?.toLocaleString() ?? '—'} <span className="text-lg font-normal text-muted-foreground">{t('fcfa')}</span>
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
                  <Calendar className="h-5 w-5 text-electric mx-auto" />
                  <p className="mt-2 text-xs text-muted-foreground">{t('annee')}</p>
                  <p className="font-heading text-sm font-semibold">{vehicle.year ?? '—'}</p>
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
                  <p className="mt-2 text-xs text-muted-foreground">{t('transmission')}</p>
                  <p className="font-heading text-sm font-semibold">{transmissionLabel}</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-heading text-lg font-semibold mb-3">{t('description')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {vehicle.description || vehicle.shortDescription}
                </p>
              </div>

              {vehicle.features && vehicle.features.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-electric" />
                    {t('equipements')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {vehicle.features.map((feature, index) => (
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

              <div className="mt-10 p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-electric/[0.02] to-transparent">
                <p className="font-heading text-base font-semibold mb-1">{t('ctaTitle')}</p>
                <p className="text-sm text-muted-foreground mb-5">{t('ctaDesc')}</p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/contact?vehicle=${vehicle.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-electric px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-electric/90 hover:shadow-lg hover:shadow-electric/25"
                  >
                    <Phone className="h-4 w-4" />
                    {t('ctaButton')}
                  </Link>
                  <Link
                    href={`${whatsappUrl}?text=${encodeURIComponent('Hi, I am interested in ' + vehicle.title)}`}
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
