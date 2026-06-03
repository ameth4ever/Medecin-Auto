'use client'

import { motion } from 'framer-motion'
import { Link } from '@/lib/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { MotionWrapper, MotionItem } from '@/components/MotionWrapper'
import { ServiceCard } from '@/components/ServiceCard'
import { VehicleCard } from '@/components/VehicleCard'
import { Testimonials } from '@/components/Testimonials'
import { FAQ } from '@/components/FAQ'
import { CTASection } from '@/components/CTASection'
import {
  ShieldCheck,
  SearchCheck,
  Clock,
  ThumbsUp,
  Users,
  Award,
  Wrench,
  Star,
  CheckCircle2,
  Gauge,
  Cog,
  Car,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  ClipboardCheck,
  CalendarCheck,
  ArrowRight,
} from 'lucide-react'
import type { SiteSettings, Service, Vehicle, Rental, Testimonial, FaqItem } from '@/types'

const brands = [
  'Toyota', 'Mercedes-Benz', 'BMW', 'Audi',
  'Volkswagen', 'Nissan', 'Hyundai', 'Ford',
]

const partners = [
  { src: '/parteners/asp.jpeg', alt: 'ASP', width: 100 },
  { src: '/parteners/dkt.png', alt: 'DKT', width: 100 },
  { src: '/parteners/senelec.jpeg', alt: 'Senelec', width: 140 },
  { src: '/parteners/ansd.jpeg', alt: 'ANSD', width: 100 },
  { src: '/parteners/arcop.jpeg', alt: 'ARCOP', width: 100 },
  { src: '/parteners/finances.png', alt: 'Finances', width: 100 },
  { src: '/parteners/saar.jpeg', alt: 'SAAR', width: 100 },
  { src: '/parteners/ssimsarl.jpeg', alt: 'SSIMSARL', width: 100 },
]

function FileTextIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function SectionHeader({
  label,
  title,
  description,
  className,
}: {
  label?: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <MotionWrapper variant="fade" direction="up" className={cn('text-center max-w-3xl mx-auto', className)}>
      {label && (
        <span className="inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-electric uppercase mb-5">
          {label}
        </span>
      )}
      <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </MotionWrapper>
  )
}

function DecorativeLine({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn('flex items-center justify-center gap-2 mt-8', className)}
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: 'auto', opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <span className="h-px w-8 bg-electric/40" />
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-electric"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="h-px w-8 bg-electric/40" />
    </motion.div>
  )
}

interface HomeContentProps {
  settings: SiteSettings | null
  featuredServices: Service[]
  featuredRentals: Rental[]
  featuredTestimonials: Testimonial[]
  featuredFaqs: FaqItem[]
}

export function HomeContent({
  settings,
  featuredServices,
  featuredRentals,
  featuredTestimonials,
  featuredFaqs,
}: HomeContentProps) {
  const t = useTranslations('home')
  const c = useTranslations('common')

  const trustReasons = [
    {
      icon: ShieldCheck,
      title: t('serviceCertifie'),
      description: t('serviceCertifieDesc'),
    },
    {
      icon: SearchCheck,
      title: t('diagnosticPrecis'),
      description: t('diagnosticPrecisDesc'),
    },
    {
      icon: Clock,
      title: t('interventionRapide'),
      description: t('interventionRapideDesc'),
    },
    {
      icon: ThumbsUp,
      title: t('transparenceTotale'),
      description: t('transparenceTotaleDesc'),
    },
    {
      icon: Users,
      title: t('equipeExperte'),
      description: t('equipeExperteDesc'),
    },
    {
      icon: Award,
      title: t('garantiePremium'),
      description: t('garantiePremiumDesc'),
    },
  ]

  const stats = [
    { icon: Cog, value: '50+', label: t('statsServices') },
    { icon: Car, value: '200+', label: t('statsVehicules') },
    { icon: Star, value: '500+', label: t('statsClients') },
    { icon: Award, value: '10+', label: t('statsAnnees') },
  ]

  const expertisePoints = [
    {
      icon: Gauge,
      title: t('performanceMoteur'),
      description: t('performanceMoteurDesc'),
    },
    {
      icon: ShieldCheck,
      title: t('securiteRenforcee'),
      description: t('securiteRenforceeDesc'),
    },
    {
      icon: CheckCircle2,
      title: t('maintenancePreventive'),
      description: t('maintenancePreventiveDesc'),
    },
  ]

  const workingProcess = [
    {
      step: '01',
      icon: ClipboardCheck,
      title: t('processEtape1Titre'),
      description: t('processEtape1Desc'),
      color: 'from-electric/20 to-electric/5',
    },
    {
      step: '02',
      icon: FileTextIcon,
      title: t('processEtape2Titre'),
      description: t('processEtape2Desc'),
      color: 'from-performance/20 to-performance/5',
    },
    {
      step: '03',
      icon: Wrench,
      title: t('processEtape3Titre'),
      description: t('processEtape3Desc'),
      color: 'from-electric/20 to-electric/5',
    },
    {
      step: '04',
      icon: CalendarCheck,
      title: t('processEtape4Titre'),
      description: t('processEtape4Desc'),
      color: 'from-performance/20 to-performance/5',
    },
  ]

  return (
    <>
      {/* Marques */}
      <MotionWrapper variant="fade">
        <section className="py-16 border-b border-border/40">
          <div className="container">
            <motion.p
              className="text-center text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t('marquesConfiance')}
            </motion.p>
            <MotionWrapper variant="stagger" className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {brands.map((brand) => (
                <MotionItem key={brand} direction="up" distance={20}>
                  <span className="font-heading text-xl font-bold text-muted-foreground/40 hover:text-electric/60 transition-colors cursor-default tracking-tight">
                    {brand}
                  </span>
                </MotionItem>
              ))}
            </MotionWrapper>
          </div>
        </section>
      </MotionWrapper>

      {/* Partenaires */}
      <MotionWrapper variant="fade">
        <section className="py-16 border-b border-border/40 overflow-hidden">
          <div className="container">
            <motion.p
              className="text-center text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t('partenaires')}
            </motion.p>
            <div className="relative">
              <motion.div
                className="flex items-center gap-14"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  ease: 'linear',
                  duration: 30,
                  repeat: Infinity,
                }}
              >
                {[...partners, ...partners].map((partner, i) => (
                  <div
                    key={`${partner.alt}-${i}`}
                    className="relative h-14 flex-shrink-0 flex items-center justify-center opacity-40 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                  >
                    <Image
                      src={partner.src}
                      alt={partner.alt}
                      width={partner.width}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </MotionWrapper>

      {/* Pourquoi Nous Choisir */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-electric)/0.05,_transparent_50%)] pointer-events-none" />
        <div className="container relative">
          <SectionHeader
            label={t('pourquoiNous')}
            title={t('excellenceAutomobile')}
            description={t('excellenceDesc')}
          />
          <DecorativeLine />
          <MotionWrapper variant="stagger" className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {trustReasons.map((reason) => (
              <MotionItem key={reason.title} direction="up">
                <motion.div
                  className="group relative rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-electric/20"
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-electric/10 text-electric mb-6 transition-all duration-300 group-hover:bg-electric group-hover:text-white group-hover:shadow-lg group-hover:shadow-electric/25"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <reason.icon className="h-7 w-7" />
                  </motion.div>
                  <h3 className="font-heading text-lg font-semibold">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </motion.div>
              </MotionItem>
            ))}
          </MotionWrapper>
        </div>
      </section>

      {/* Chiffres Clés */}
      <section className="py-24 bg-gradient-to-br from-nuit via-nuit to-profond text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-electric)/0.08,_transparent_50%)] pointer-events-none" />
        <div className="container relative">
          <SectionHeader
            title={t('chiffres')}
            description={t('chiffresDesc')}
            className="text-white"
          />
          <MotionWrapper variant="stagger" className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <MotionItem key={stat.label} direction="up">
                <motion.div
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 text-electric border border-white/10 transition-all duration-300 group-hover:bg-electric group-hover:border-electric group-hover:shadow-lg group-hover:shadow-electric/25"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="h-9 w-9" />
                  </motion.div>
                  <motion.p
                    className="mt-6 font-heading text-4xl font-bold tracking-tight lg:text-5xl"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="mt-2 text-sm text-argent/60">{stat.label}</p>
                </motion.div>
              </MotionItem>
            ))}
          </MotionWrapper>
        </div>
      </section>

      {/* Services */}
      {featuredServices.length > 0 && (
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--color-performance)/0.03,_transparent_50%)] pointer-events-none" />
          <div className="container relative">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <SectionHeader
                label={t('nosServices')}
                title={t('solutionsCompletes')}
                description={t('solutionsDesc')}
                className="text-left lg:max-w-2xl"
              />
              <MotionWrapper variant="fade" direction="right">
                <Link
                  href="/services"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'shrink-0 group'
                  )}
                >
                  {t('tousLesServices')}{' '}
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </MotionWrapper>
            </div>
            <MotionWrapper variant="stagger" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => (
                <MotionItem key={service._id} direction="up">
                  <ServiceCard service={service} />
                </MotionItem>
              ))}
            </MotionWrapper>
          </div>
        </section>
      )}

      {/* Notre Processus */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_var(--color-electric)/0.04,_transparent_50%)] pointer-events-none" />
        <div className="container relative">
          <SectionHeader
            label={t('notreProcessus')}
            title={t('commentNousTravaillons')}
            description={t('processusDesc')}
          />
          <DecorativeLine />
          <MotionWrapper variant="stagger" className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {workingProcess.map((step, index) => (
              <MotionItem key={step.step} direction="up" delay={index * 0.1}>
                <div className="relative group">
                  <motion.div
                    className="rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:shadow-xl"
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div
                      className={cn(
                        'inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br mb-6',
                        step.color
                      )}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <step.icon className="h-8 w-8 text-electric" />
                    </motion.div>
                    <span className="font-heading text-4xl font-black text-muted-foreground/10 select-none">
                      {step.step}
                    </span>
                    <h3 className="mt-4 font-heading text-lg font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                  {index < workingProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 z-10">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ChevronRight className="h-6 w-6 text-electric/30" />
                      </motion.div>
                    </div>
                  )}
                </div>
              </MotionItem>
            ))}
          </MotionWrapper>
        </div>
      </section>

      {/* Expertise Mécanique */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--color-electric)/0.04,_transparent_50%)] pointer-events-none" />
        <div className="container relative">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <MotionWrapper
              variant="fade"
              direction="left"
              className="relative aspect-[4/3] rounded-3xl bg-gradient-to-br from-electric/10 to-nuit/10 flex items-center justify-center overflow-hidden order-2 lg:order-1"
            >
              <motion.div
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-15"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="relative z-10 p-12 text-center">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Wrench className="h-24 w-24 text-electric/30 mx-auto" />
                </motion.div>
                <p className="mt-4 text-sm text-muted-foreground/60 font-medium">
                  {t('equipementsDerniereGeneration')}
                </p>
              </div>
            </MotionWrapper>
            <MotionWrapper variant="fade" direction="right" className="order-1 lg:order-2">
              <span className="inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-electric uppercase mb-5">
                {t('notreExpertise')}
              </span>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                <span className="text-electric">{t('expertisePremium')}</span>
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
                {t('expertiseDesc')}
              </p>
              <MotionWrapper variant="stagger" className="mt-10 space-y-8">
                {expertisePoints.map((point) => (
                  <MotionItem key={point.title} direction="up" distance={20}>
                    <div className="flex gap-5 group">
                      <motion.div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-electric/10 text-electric transition-all duration-300 group-hover:bg-electric group-hover:text-white group-hover:shadow-lg group-hover:shadow-electric/25"
                        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.4 }}
                      >
                        <point.icon className="h-7 w-7" />
                      </motion.div>
                      <div className="pt-0.5">
                        <h3 className="font-heading text-lg font-semibold">
                          {point.title}
                        </h3>
                        <p className="mt-1.5 text-muted-foreground">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </MotionItem>
                ))}
              </MotionWrapper>
              <motion.div
                className="mt-10 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link
                  href="/services"
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'lg' }),
                    'bg-electric text-white hover:bg-electric/90'
                  )}
                >
                  {t('decouvrirServices')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
                >
                  {t('demanderDevis')}
                </Link>
              </motion.div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Engagement Qualité */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-electric)/0.04,_transparent_50%)] pointer-events-none" />
        <div className="container relative">
          <SectionHeader
            label={t('notreEngagement')}
            title={t('standardQualite')}
            description={t('engagementDesc')}
          />
          <DecorativeLine />
          <MotionWrapper variant="stagger" className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Award,
                title: t('certificationPro'),
                description: t('certificationProDesc'),
              },
              {
                icon: ShieldCheck,
                title: t('garantieEtendue'),
                description: t('garantieEtendueDesc'),
              },
              {
                icon: Cog,
                title: t('piecesOEM'),
                description: t('piecesOEMDesc'),
              },
              {
                icon: ClipboardCheck,
                title: t('controleQualite'),
                description: t('controleQualiteDesc'),
              },
              {
                icon: SearchCheck,
                title: t('diagnosticApprofondi'),
                description: t('diagnosticApprofondiDesc'),
              },
              {
                icon: Users,
                title: t('serviceClient'),
                description: t('serviceClientDesc'),
              },
            ].map((item) => (
              <MotionItem key={item.title} direction="up">
                <motion.div
                  className="group relative rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-electric/20"
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-electric/10 text-electric mb-6 transition-all duration-300 group-hover:bg-electric group-hover:text-white group-hover:shadow-lg group-hover:shadow-electric/25"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <item.icon className="h-7 w-7" />
                  </motion.div>
                  <h3 className="font-heading text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </MotionItem>
            ))}
          </MotionWrapper>
        </div>
      </section>

      {/* Pourquoi Choisir */}
      <section className="py-24 bg-gradient-to-br from-nuit via-nuit to-profond text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-electric)/0.06,_transparent_50%)] pointer-events-none" />
        <div className="container relative">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <MotionWrapper variant="fade" direction="left">
              <span className="inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-electric uppercase mb-5">
                {t('notreDifference')}
              </span>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-[1.15]">
                {t('artMecanique')}
              </h2>
              <p className="mt-6 text-argent/80 leading-relaxed text-lg max-w-xl">
                {t('differenceDesc')}
              </p>
              <MotionWrapper variant="stagger" className="mt-10 space-y-6">
              {[
                {
                  icon: Clock,
                  title: t('intervention24h'),
                  description: t('intervention24hDesc'),
                },
                {
                  icon: ShieldCheck,
                  title: t('devisTransparent'),
                  description: t('devisTransparentDesc'),
                },
                {
                  icon: Car,
                  title: t('vehiculeCourtoisie'),
                  description: t('vehiculeCourtoisieDesc'),
                },
              ].map((item) => (
                  <MotionItem key={item.title} direction="up" distance={20}>
                    <div className="flex gap-5 group">
                      <motion.div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-electric/10 text-electric transition-all duration-300 group-hover:bg-electric group-hover:text-white"
                        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.4 }}
                      >
                        <item.icon className="h-7 w-7" />
                      </motion.div>
                      <div className="pt-0.5">
                        <h3 className="font-heading text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-argent/60">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </MotionItem>
                ))}
              </MotionWrapper>
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'lg' }),
                    'bg-electric text-white hover:bg-electric/90'
                  )}
                >
                  {t('demanderDevis')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            </MotionWrapper>
            <MotionWrapper
              variant="fade"
              direction="right"
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '10+', label: t('anneesExpertise') },
                  { value: '5000+', label: t('vehiculesRepares') },
                  { value: '98%', label: t('statsClients') },
                  { value: '24/7', label: t('assistanceDisponible') },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm hover:border-electric/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <p className="font-heading text-3xl font-bold text-electric sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm text-argent/60">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="mt-6 rounded-2xl border border-electric/20 bg-electric/5 p-6 text-center backdrop-blur-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-sm text-argent/80">
                  {t('certifiePartenaire')}
                </p>
              </motion.div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Location */}
      {featuredRentals.length > 0 && (
        <section className="py-24 bg-muted/30">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <SectionHeader
                label={t('location')}
                title={t('locationVehicules')}
                description={t('locationDesc')}
                className="text-left lg:max-w-2xl"
              />
              <MotionWrapper variant="fade" direction="right">
                <Link
                  href="/rentals"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'shrink-0 group'
                  )}
                >
                  {t('voirTout')}{' '}
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </MotionWrapper>
            </div>
            <MotionWrapper variant="stagger" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredRentals.map((rental) => (
                <MotionItem key={rental._id} direction="up">
                  <VehicleCard vehicle={rental.vehicle} />
                </MotionItem>
              ))}
            </MotionWrapper>
          </div>
        </section>
      )}

      <Testimonials testimonials={featuredTestimonials} />

      {/* Valeurs & Vision */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-electric)/0.04,_transparent_50%)] pointer-events-none" />
        <div className="container relative">
          <SectionHeader
            label={t('notrePhilosophie')}
            title={t('visionValeurs')}
            description={t('philosophieDesc')}
          />
          <DecorativeLine />
          <MotionWrapper variant="stagger" className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: t('integrite'),
                description: t('integriteDesc'),
                stat: '100%',
                statLabel: t('devisTransparents'),
              },
              {
                icon: Cog,
                title: t('innovation'),
                description: t('innovationDesc'),
                stat: '15 000+',
                statLabel: t('heuresFormation'),
              },
              {
                icon: Users,
                title: t('proximite'),
                description: t('proximiteDesc'),
                stat: '98%',
                statLabel: t('clientsRecommandent'),
              },
            ].map((item) => (
              <MotionItem key={item.title} direction="up">
                <motion.div
                  className="group relative rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-electric/20 h-full flex flex-col"
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-electric/10 text-electric mb-6 transition-all duration-300 group-hover:bg-electric group-hover:text-white group-hover:shadow-lg group-hover:shadow-electric/25"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <item.icon className="h-7 w-7" />
                  </motion.div>
                  <h3 className="font-heading text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                    {item.description}
                  </p>
                  <div className="mt-8 pt-6 border-t border-border/40">
                    <p className="font-heading text-2xl font-bold text-electric">
                      {item.stat}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.statLabel}
                    </p>
                  </div>
                </motion.div>
              </MotionItem>
            ))}
          </MotionWrapper>
        </div>
      </section>

      {/* Newsletter */}
      <MotionWrapper variant="fade">
        <section className="py-16 border-b border-border/40">
          <div className="container">
            <motion.div
              className="relative rounded-3xl bg-gradient-to-br from-electric/5 to-electric/[0.02] border border-electric/10 px-8 py-12 sm:px-16 sm:py-16 overflow-hidden"
              whileInView={{ scale: 1 }}
              initial={{ scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-electric)/0.06,_transparent_50%)] pointer-events-none" />
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                    {t('restezInforme')}
                  </h3>
                  <p className="mt-2 text-muted-foreground max-w-lg">
                    {t('newsletterDesc')}
                  </p>
                </div>
                <form className="flex w-full max-w-md gap-3" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className="flex h-11 w-full rounded-xl border border-border bg-background px-4 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric"
                    required
                  />
                  <motion.button
                    type="submit"
                    className={cn(
                      buttonVariants({ variant: 'default' }),
                      'bg-electric text-white hover:bg-electric/90 shrink-0'
                    )}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {t('sabonner')}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </MotionWrapper>

      <FAQ faqs={featuredFaqs} />

      <CTASection />
    </>
  )
}
