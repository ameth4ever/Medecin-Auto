import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { client } from '@/sanity/lib/client'
import { vehiclesQuery } from '@/sanity/lib/queries'
import { generatePageMetadata } from '@/lib/seo'
import type { Vehicle } from '@/types'
import { VehicleCard } from '@/components/VehicleCard'
import { CTASection } from '@/components/CTASection'
import { MotionWrapper, MotionItem } from '@/components/MotionWrapper'
import { Car, Shield, Wrench, Award, ArrowRight, Search, SlidersHorizontal } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'vehicles' })
  return generatePageMetadata({
    title: t('metaTitle'),
    description: t('metaDesc'),
  }, locale)
}

export default async function VehiclesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'vehicles' })
  const vehicles = await client.fetch<Vehicle[]>(vehiclesQuery).catch(() => [])
  const forSale = vehicles.filter((v) => v.isForSale)

  const stats = [
    { icon: Car, value: '50+', label: t('statDisponibles') },
    { icon: Shield, value: '100%', label: t('statCertifies') },
    { icon: Wrench, value: '6 mois', label: t('statGarantie') },
    { icon: Award, value: '500+', label: t('statClients') },
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
          <MotionWrapper variant="fade" direction="up">
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
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="#liste"
                  className="inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-electric/90 hover:shadow-lg hover:shadow-electric/25"
                >
                  {t('voirSelection')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:text-white"
                >
                  {t('nousContacter')}
                </Link>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-br from-nuit/5 via-transparent to-electric/5">
        <div className="container">
          <MotionWrapper variant="stagger" className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <MotionItem key={stat.label} direction="up">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-electric/10 text-electric mb-4">
                    <stat.icon className="h-7 w-7" />
                  </div>
                  <p className="font-heading text-3xl font-bold tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </MotionItem>
            ))}
          </MotionWrapper>
        </div>
      </section>

      {/* Filters & Listing */}
      <section id="liste" className="py-24">
        <div className="container">
          <MotionWrapper variant="fade" direction="up" className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-electric uppercase mb-5">
              {t('parcBadge')}
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-[1.15]">
              {forSale.length > 0
                ? `${forSale.length} ${t('vehiculesDisponibles')}`
                : t('aucunVehicule')}
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              {forSale.length > 0
                ? t('descriptionDisponible')
                : t('descriptionIndisponible')}
            </p>
          </MotionWrapper>

          {forSale.length > 0 ? (
            <>
              {forSale.length >= 3 && (
                <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-between p-4 rounded-2xl border border-border/50 bg-card/50">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder={t('searchPlaceholder')}
                      className="w-full sm:w-80 rounded-xl border border-border/50 bg-background pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-electric/20"
                    />
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <SlidersHorizontal className="h-4 w-4" />
                      <span>{t('filtrer')}</span>
                    </div>
                    <select className="rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-electric/20">
                      <option value="">{t('tous')}</option>
                      <option value="neuf">{t('neufs')}</option>
                      <option value="occasion">{t('occasions')}</option>
                      <option value="certifie">{t('certifies')}</option>
                    </select>
                    <select className="rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-electric/20">
                      <option value="desc">{t('triRecents')}</option>
                      <option value="asc">{t('triCroissant')}</option>
                      <option value="desc-price">{t('triDecroissant')}</option>
                    </select>
                  </div>
                </div>
              )}

              <MotionWrapper variant="stagger" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {forSale.map((vehicle) => (
                  <MotionItem key={vehicle._id} direction="up">
                    <VehicleCard vehicle={vehicle} />
                  </MotionItem>
                ))}
              </MotionWrapper>
            </>
          ) : (
            <MotionWrapper variant="fade" direction="up" className="mt-16 text-center">
              <div className="flex flex-col items-center gap-4 py-16 px-8 rounded-3xl border border-dashed border-border/50 bg-card/30">
                <Car className="h-16 w-16 text-muted-foreground/30" />
                <h3 className="font-heading text-xl font-semibold text-muted-foreground">
                  {t('emptyTitle')}
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  {t('emptyDesc')}
                </p>
                <Link
                  href="/contact"
                  className="mt-2 inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-electric/90"
                >
                  {t('emptyCTA')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </MotionWrapper>
          )}
        </div>
      </section>

      <CTASection />
    </>
  )
}
