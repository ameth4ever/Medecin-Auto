import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { rentalsQuery } from "@/sanity/lib/queries";
import { generatePageMetadata } from "@/lib/seo";
import type { Rental } from "@/types";
import { RentalCard } from "@/components/RentalCard";
import { CTASection } from "@/components/CTASection";
import { MotionWrapper, MotionItem } from "@/components/MotionWrapper";
import {
  Car,
  Shield,
  Clock,
  ThumbsUp,
  ArrowRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'rentals' })
  return generatePageMetadata({
    title: t('metaTitle'),
    description: t('metaDesc'),
  }, locale)
}

export default async function RentalsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'rentals' })
  const rentals = await client.fetch<Rental[]>(rentalsQuery).catch(() => [])

  const stats = [
    { icon: Car, value: "30+", label: t('statLocation') },
    { icon: Shield, value: "100%", label: t('statAssurance') },
    { icon: Clock, value: "24/7", label: t('statAssistance') },
    { icon: ThumbsUp, value: "500+", label: t('statClients') },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nuit via-nuit to-profond text-white">
        <div className="absolute inset-0">
          <Image
            src="/rental.jpg"
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
                  {t('voirOffres')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:text-white"
                >
                  {t('demanderDevis')}
                </Link>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-br from-nuit/5 via-transparent to-electric/5">
        <div className="container">
          <MotionWrapper
            variant="stagger"
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <MotionItem key={stat.label} direction="up">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-electric/10 text-electric mb-4">
                    <stat.icon className="h-7 w-7" />
                  </div>
                  <p className="font-heading text-3xl font-bold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </MotionItem>
            ))}
          </MotionWrapper>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="container">
          <MotionWrapper
            variant="fade"
            direction="up"
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-electric uppercase mb-5">
              {t('processBadge')}
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-[1.15]">
              {t('processTitle')}
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              {t('processDesc')}
            </p>
          </MotionWrapper>

          <MotionWrapper
            variant="stagger"
            className="mt-14 grid gap-6 sm:grid-cols-3"
          >
            {[
              {
                step: "01",
                title: t('step1Title'),
                desc: t('step1Desc'),
                icon: Search,
              },
              {
                step: "02",
                title: t('step2Title'),
                desc: t('step2Desc'),
                icon: Clock,
              },
              {
                step: "03",
                title: t('step3Title'),
                desc: t('step3Desc'),
                icon: Car,
              },
            ].map((item) => (
              <MotionItem key={item.step} direction="up">
                <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 text-center transition-all hover:shadow-lg">
                  <span className="font-heading text-6xl font-black text-electric/10 leading-none select-none">
                    {item.step}
                  </span>
                  <div className="relative mt-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-electric/10 text-electric mb-5">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </MotionItem>
            ))}
          </MotionWrapper>
        </div>
      </section>

      {/* Listing */}
      <section
        id="liste"
        className="py-20 bg-gradient-to-b from-nuit/5 to-transparent"
      >
        <div className="container">
          <MotionWrapper
            variant="fade"
            direction="up"
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-electric uppercase mb-5">
              {t('flotteBadge')}
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-[1.15]">
              {rentals.length > 0
                ? `${rentals.length} ${t('vehiculesDisponibles')}`
                : t('aucunVehicule')}
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              {rentals.length > 0
                ? t('descriptionDisponible')
                : t('descriptionIndisponible')}
            </p>
          </MotionWrapper>

          {rentals.length > 0 ? (
            <>
              {rentals.length >= 3 && (
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
                      <option value="">{t('dureeToutes')}</option>
                      <option value="daily">{t('journaliere')}</option>
                      <option value="weekly">{t('hebdomadaire')}</option>
                      <option value="monthly">{t('mensuelle')}</option>
                    </select>
                    <select className="rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-electric/20">
                      <option value="asc">{t('triCroissant')}</option>
                      <option value="desc">{t('triDecroissant')}</option>
                    </select>
                  </div>
                </div>
              )}

              <MotionWrapper
                variant="stagger"
                className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {rentals.map((rental) => (
                  <MotionItem key={rental._id} direction="up">
                    <RentalCard rental={rental} />
                  </MotionItem>
                ))}
              </MotionWrapper>
            </>
          ) : (
            <MotionWrapper
              variant="fade"
              direction="up"
              className="mt-16 text-center"
            >
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

      {/* Why rent from us */}
      <section className="py-20">
        <div className="container">
          <MotionWrapper
            variant="fade"
            direction="up"
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-electric uppercase mb-5">
              {t('whyBadge')}
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-[1.15]">
              {t('whyTitle')}
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              {t('whyDesc')}
            </p>
          </MotionWrapper>

          <MotionWrapper
            variant="stagger"
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                icon: Shield,
                title: t('whyAssuranceTitle'),
                desc: t('whyAssuranceDesc'),
              },
              {
                icon: Clock,
                title: t('whyRecentsTitle'),
                desc: t('whyRecentsDesc'),
              },
              {
                icon: Car,
                title: t('whyPropresTitle'),
                desc: t('whyPropresDesc'),
              },
              {
                icon: ThumbsUp,
                title: t('whyAssistanceTitle'),
                desc: t('whyAssistanceDesc'),
              },
            ].map((item) => (
              <MotionItem key={item.title} direction="up">
                <div className="rounded-2xl border border-border/50 bg-card p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-electric/10 text-electric mb-5">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </MotionItem>
            ))}
          </MotionWrapper>
        </div>
      </section>

      <CTASection />
    </>
  );
}
