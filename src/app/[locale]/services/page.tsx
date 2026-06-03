import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { client } from '@/sanity/lib/client'
import { servicesQuery } from '@/sanity/lib/queries'
import { generatePageMetadata } from '@/lib/seo'
import type { Service } from '@/types'
import { ServiceCard } from '@/components/ServiceCard'
import { CTASection } from '@/components/CTASection'
import { MotionWrapper, MotionItem } from '@/components/MotionWrapper'
import {
  Wrench, Gauge, Cog, Thermometer, Car, Shield, Phone,
  CheckCircle2, ArrowRight,
} from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })
  return generatePageMetadata({
    title: t('metaTitle'),
    description: t('metaDesc'),
  }, locale)
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })
  const services = await client.fetch<Service[]>(servicesQuery).catch(() => [])

  const stats = [
    { icon: Wrench, value: '15 000+', label: t('statInterventions') },
    { icon: Car, value: '8 000+', label: t('statVehicules') },
    { icon: Shield, value: '6 mois', label: t('statGarantie') },
    { icon: Gauge, value: '10+', label: t('statExpertise') },
  ]

  const steps = [
    { icon: Phone, title: t('step1Title'), description: t('step1Desc') },
    { icon: Cog, title: t('step2Title'), description: t('step2Desc') },
    { icon: Wrench, title: t('step3Title'), description: t('step3Desc') },
    { icon: Shield, title: t('step4Title'), description: t('step4Desc') },
  ]

  const pourquoi = [
    {
      icon: Wrench,
      title: t('whyEquipementsTitle'),
      description: t('whyEquipementsDesc'),
    },
    {
      icon: Shield,
      title: t('whyGarantieTitle'),
      description: t('whyGarantieDesc'),
    },
    {
      icon: Car,
      title: t('whyPretTitle'),
      description: t('whyPretDesc'),
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nuit via-nuit to-profond text-white">
        <div className="absolute inset-0">
          <Image
            src="/services.jpg"
            alt={t('heroAlt')}
            fill
            className="object-cover opacity-20"
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
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-electric/90 hover:shadow-lg hover:shadow-electric/25"
                >
                  {t('prendreRdv')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:text-white"
                >
                  {t('nosServices')}
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

      {/* Services Grid */}
      <section id="services" className="py-24">
        <div className="container">
          <MotionWrapper variant="fade" direction="up" className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-electric uppercase mb-5">
              {t('expertiseBadge')}
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-[1.15]">
              {t('expertiseTitle')}
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              {t('expertiseDesc')}
            </p>
          </MotionWrapper>
          <MotionWrapper variant="stagger" className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <MotionItem key={service._id} direction="up">
                <ServiceCard service={service} />
              </MotionItem>
            ))}
          </MotionWrapper>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-gradient-to-br from-nuit via-nuit to-profond text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-electric)/0.05,_transparent_50%)] pointer-events-none" />
        <div className="container relative">
          <MotionWrapper variant="fade" direction="up" className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full border border-electric/20 bg-electric/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-electric uppercase mb-5">
              {t('processBadge')}
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-[1.15]">
              {t('processTitle')}
            </h2>
          </MotionWrapper>
          <MotionWrapper variant="stagger" className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <MotionItem key={step.title} direction="up">
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-electric/10 text-electric text-3xl font-bold ring-2 ring-electric/20">
                      <step.icon className="h-8 w-8" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-full w-[calc(100%-5rem)] h-0.5 bg-gradient-to-r from-electric/40 to-transparent" />
                    )}
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-electric/60 font-semibold">{t('etape')} 0{index + 1}</p>
                    <h3 className="mt-2 font-heading text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm text-argent/60 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </MotionItem>
            ))}
          </MotionWrapper>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <MotionWrapper variant="fade" direction="left">
              <span className="inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-electric uppercase mb-5">
                {t('whyBadge')}
              </span>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-[1.15]">
                {t('whyTitle')}
              </h2>
              <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
                {t('whyDesc')}
              </p>
              <MotionWrapper variant="stagger" className="mt-10 space-y-6">
                {pourquoi.map((item) => (
                  <MotionItem key={item.title} direction="up">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-electric/10 text-electric">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </MotionItem>
                ))}
              </MotionWrapper>
            </MotionWrapper>
            <MotionWrapper variant="fade" direction="right">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src="/services.jpg"
                  alt={t('heroAlt')}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nuit/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-2xl bg-nuit/80 backdrop-blur-sm border border-white/10 p-5">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-8 w-8 text-electric shrink-0" />
                      <div>
                        <p className="font-heading text-sm font-semibold text-white">{t('overlayClients')}</p>
                        <p className="text-xs text-argent/60">{t('overlayCommunaute')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
