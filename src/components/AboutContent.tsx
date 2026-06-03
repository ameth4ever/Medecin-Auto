"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { MotionWrapper, MotionItem } from "@/components/MotionWrapper";
import { CTASection } from "@/components/CTASection";
import {
  Wrench,
  Car,
  Shield,
  Users,
  Target,
  Eye,
  CheckCircle2,
  Award,
  Clock,
  ThumbsUp,
  ChevronRight,
  Quote,
  Gauge,
  Cog,
  Thermometer,
} from "lucide-react";

function SectionHeader({
  label,
  title,
  description,
  className,
}: {
  label?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <MotionWrapper
      variant="fade"
      direction="up"
      className={cn("max-w-3xl", className)}
    >
      {label && (
        <span className="inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-electric uppercase mb-5">
          {label}
        </span>
      )}
      <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
          {description}
        </p>
      )}
    </MotionWrapper>
  );
}

function DecorativeLine() {
  return (
    <motion.div
      className="flex items-center gap-2 mt-8"
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: "auto", opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <span className="h-px w-12 bg-electric/40" />
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-electric"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="h-px w-12 bg-electric/40" />
    </motion.div>
  );
}

export function AboutContent() {
  const t = useTranslations('about')

  const stats = [
    { icon: Wrench, label: t('interventionsRealisees'), value: "5 000+" },
    { icon: Car, label: t('statsVehiculesRepares'), value: "1 000+" },
    { icon: Shield, label: t('statsClients'), value: "500+" },
    { icon: Users, label: t('statsExpertise'), value: "5+" },
  ]

  const specialties = [
    {
      icon: Gauge,
      title: t('specialite1Title'),
      description: t('specialite1Desc'),
      tools: t('specialite1Tools'),
    },
    {
      icon: Shield,
      title: t('specialite2Title'),
      description: t('specialite2Desc'),
      tools: t('specialite2Tools'),
    },
    {
      icon: Cog,
      title: t('specialite3Title'),
      description: t('specialite3Desc'),
      tools: t('specialite3Tools'),
    },
    {
      icon: Wrench,
      title: t('specialite4Title'),
      description: t('specialite4Desc'),
      tools: t('specialite4Tools'),
    },
    {
      icon: Cog,
      title: t('specialite5Title'),
      description: t('specialite5Desc'),
      tools: t('specialite5Tools'),
    },
    {
      icon: Thermometer,
      title: t('specialite6Title'),
      description: t('specialite6Desc'),
      tools: t('specialite6Tools'),
    },
  ]

  const teamMembers = [
    {
      name: "Ousmane Dioum",
      role: t('team1Role'),
      bio: t('team1Bio'),
      initials: "OD",
      specialty: t('team1Specialty'),
      image: "/team/ousmane-dioum.jpg",
    },
    {
      name: "Amady Cissé",
      role: t('team2Role'),
      bio: t('team2Bio'),
      initials: "AC",
      specialty: t('team2Specialty'),
      image: "/team/amady cisse.jpg",
    },
    {
      name: "PAY LAU",
      role: t('team3Role'),
      bio: t('team3Bio'),
      initials: "MMT",
      specialty: t('team3Specialty'),
      image: "/team/pay.jpg",
    },
    {
      name: "Ibrahima Diawo",
      role: t('team4Role'),
      bio: t('team4Bio'),
      initials: "ID",
      specialty: t('team4Specialty'),
      image: "/team/ibrahima-diawo.jpg",
    },
    {
      name: "Maty Thiam",
      role: t('team5Role'),
      bio: t('team5Bio'),
      initials: "MT",
      specialty: t('team5Specialty'),
      image: "/team/maty-thiam.jpg",
    },
    {
      name: "Sokhna Gueye",
      role: t('team6Role'),
      bio: t('team6Bio'),
      initials: "SG",
      specialty: t('team6Specialty'),
      image: "/team/sokhna.jpg",
    },
    {
      name: "Fatou Diagne Gueye",
      role: t('team7Role'),
      bio: t('team7Bio'),
      initials: "FDG",
      specialty: t('team7Specialty'),
      image: "/team/fatou.jpg",
    },
    {
      name: "Sète Gueye",
      role: t('team8Role'),
      bio: t('team8Bio'),
      initials: "SEG",
      specialty: t('team8Specialty'),
      image: "/team/set.jpg",
    },
  ]

  const timeline = [
    {
      year: "2021",
      title: t('timeline1Title'),
      description: t('timeline1Desc'),
    },
    {
      year: "2022",
      title: t('timeline2Title'),
      description: t('timeline2Desc'),
    },
    {
      year: "2024",
      title: t('timeline3Title'),
      description: t('timeline3Desc'),
    },
    {
      year: "2025",
      title: t('timeline4Title'),
      description: t('timeline4Desc'),
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-nuit via-nuit to-profond text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-electric)/0.08,_transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-performance)/0.05,_transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-[url('/about.jpg')] bg-cover bg-center opacity-15"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-nuit/90 via-nuit/80 to-transparent" />
        </div>
        <div className="container relative">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 },
              },
            }}
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/10 px-4 py-1.5 text-xs font-medium text-electric backdrop-blur-sm mb-8"
            >
              <Wrench className="h-3.5 w-3.5" />
              {t('atelierPremium')}
            </motion.span>
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]"
            >
              {t('heroTitle')}
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.2 },
                },
              }}
              className="mt-6 text-lg text-argent/60 sm:text-xl max-w-2xl leading-relaxed"
            >
              {t('heroDesc')}
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.4 },
                },
              }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/services"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "bg-electric text-white hover:bg-electric/90 group",
                )}
              >
                {t('voirPrestations')}{" "}
                <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "bg-white/10 text-white hover:bg-white/20 border border-white/25 backdrop-blur-sm",
                )}
              >
                {t('prendreRdv')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30 border-y border-border/40">
        <div className="container">
          <MotionWrapper
            variant="stagger"
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            {stats.map((stat) => (
              <MotionItem key={stat.label} direction="up">
                <div className="text-center group">
                  <motion.div
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-electric/10 text-electric transition-all duration-300 group-hover:bg-electric group-hover:text-white group-hover:shadow-lg group-hover:shadow-electric/25"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="h-7 w-7" />
                  </motion.div>
                  <motion.p
                    className="mt-4 font-heading text-3xl font-bold"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </MotionItem>
            ))}
          </MotionWrapper>
        </div>
      </section>

      {/* Notre Atelier */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--color-electric)/0.04,_transparent_50%)] pointer-events-none" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <MotionWrapper
              variant="fade"
              direction="left"
              className="relative aspect-[4/3] rounded-3xl bg-gradient-to-br from-electric/10 to-nuit/10 overflow-hidden order-2 lg:order-1"
            >
              <motion.div
                className="absolute inset-0 bg-[url('/about.jpg')] bg-cover bg-center opacity-20"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="relative z-10 p-12 flex flex-col items-center justify-center h-full text-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Wrench className="h-20 w-20 text-electric/30 mb-6" />
                </motion.div>
                <p className="text-lg font-heading font-semibold text-foreground/80 italic max-w-xs leading-relaxed">
                  {t('equipeQuote')}
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  {t('equipeQuoteAuthor')}
                </p>
              </div>
            </MotionWrapper>
            <MotionWrapper
              variant="fade"
              direction="right"
              className="order-1 lg:order-2"
            >
              <SectionHeader
                label={t('notreAtelier')}
                title={t('garageModerne')}
                description={t('atelierDesc')}
              />
              <DecorativeLine />
              <div className="mt-8 space-y-5">
                {[
                  // { label: 'Surface atelier', value: '500 m² climatisés' },
                  { label: t('pontsElevateurs'), value: t('pontsValue') },
                  {
                    label: t('diagnostic'),
                    value: t('diagnosticValue'),
                  },
                  {
                    label: t('geometrie'),
                    value: t('geometrieValue'),
                  },
                  {
                    label: t('climatisation'),
                    value: t('climatisationValue'),
                  },
                  { label: t('capacite'), value: t('capaciteValue') },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center justify-between py-3 border-b border-border/20 last:border-0"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "bg-electric text-white hover:bg-electric/90 group",
                  )}
                >
                  {t('visiterAtelier')}{" "}
                  <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Spécialités Mécaniques */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-performance)/0.03,_transparent_50%)] pointer-events-none" />
        <div className="container relative">
          <div className="text-center">
            <SectionHeader
              label={t('expertise')}
              title={t('competencesPointues')}
              description={t('expertiseDesc')}
              className="mx-auto text-center"
            />
          </div>
          <DecorativeLine />
          <MotionWrapper
            variant="stagger"
            className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {specialties.map((spec) => (
              <MotionItem key={spec.title} direction="up">
                <motion.div
                  className="group rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:shadow-xl h-full"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start gap-5">
                    <motion.div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-electric/10 text-electric transition-all duration-300 group-hover:bg-electric group-hover:text-white group-hover:shadow-lg"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <spec.icon className="h-7 w-7" />
                    </motion.div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold">
                        {spec.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {spec.description}
                      </p>
                      <div className="mt-4 flex items-center gap-1.5">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-electric/60" />
                        <span className="text-xs text-electric/70 font-medium">
                          {spec.tools}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </MotionItem>
            ))}
          </MotionWrapper>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-electric)/0.03,_transparent_50%)] pointer-events-none" />
        <div className="container relative">
          <div className="text-center">
            <SectionHeader
              label={t('parcours')}
              title={t('histoireAtelier')}
              description={t('parcoursDesc')}
              className="mx-auto text-center"
            />
          </div>
          <div className="mt-16 relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-electric/40 via-electric/20 to-transparent hidden md:block" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <MotionWrapper
                  key={item.year}
                  variant="fade"
                  direction={index % 2 === 0 ? "left" : "right"}
                >
                  <div className="relative md:pl-20">
                    <div className="hidden md:flex absolute left-5 top-0 -translate-x-1/2 h-7 w-7 rounded-full bg-electric/10 border-2 border-electric items-center justify-center">
                      <motion.div
                        className="h-2 w-2 rounded-full bg-electric"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <motion.div
                      className={cn(
                        "rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5",
                        index % 2 === 0 ? "md:mr-20" : "md:ml-20",
                      )}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <motion.span
                          className="font-heading text-2xl font-black text-electric"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4 }}
                        >
                          {item.year}
                        </motion.span>
                        <span className="h-px flex-1 bg-border/50" />
                      </div>
                      <h3 className="font-heading text-xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_var(--color-electric)/0.03,_transparent_50%)] pointer-events-none" />
        <div className="container relative">
          <MotionWrapper
            variant="stagger"
            className="grid md:grid-cols-2 gap-8"
          >
            <MotionItem direction="up">
              <motion.div
                className="rounded-2xl border border-border/50 bg-card p-10 transition-all duration-300 hover:shadow-xl group"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-electric/10 text-electric mb-8 transition-all duration-300 group-hover:bg-electric group-hover:text-white group-hover:shadow-lg"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Target className="h-8 w-8" />
                </motion.div>
                <h2 className="font-heading text-2xl font-bold">
                  {t('mission')}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {t('missionDesc')}
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    t('mission1'),
                    t('mission2'),
                    t('mission3'),
                    t('mission4'),
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-5 w-5 text-electric shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </MotionItem>
            <MotionItem direction="up" delay={0.1}>
              <motion.div
                className="rounded-2xl border border-border/50 bg-card p-10 transition-all duration-300 hover:shadow-xl group"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-electric/10 text-electric mb-8 transition-all duration-300 group-hover:bg-electric group-hover:text-white group-hover:shadow-lg"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Eye className="h-8 w-8" />
                </motion.div>
                <h2 className="font-heading text-2xl font-bold">
                  {t('vision')}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {t('visionDesc')}
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    t('vision1'),
                    t('vision2'),
                    t('vision3'),
                    t('vision4'),
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-5 w-5 text-electric shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </MotionItem>
          </MotionWrapper>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-electric)/0.03,_transparent_50%)] pointer-events-none" />
        <div className="container relative">
          <div className="text-center">
            <SectionHeader
              label={t('mecaniciens')}
              title={t('equipeTitle')}
              description={t('equipeDesc')}
              className="mx-auto text-center"
            />
          </div>
          <MotionWrapper
            variant="stagger"
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {teamMembers.map((member) => (
              <MotionItem key={member.name} direction="up">
                <motion.div
                  className="group rounded-2xl border border-border/50 bg-card p-8 text-center transition-all duration-300 hover:shadow-xl"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="mx-auto h-24 w-24 rounded-full overflow-hidden ring-2 ring-electric/20 transition-all duration-300 group-hover:ring-electric/50 group-hover:shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-electric/20 to-electric/5 text-2xl font-bold text-electric group-hover:from-electric group-hover:to-electric/80 group-hover:text-white">
                        {member.initials}
                      </div>
                    )}
                  </motion.div>
                  <h3 className="mt-6 font-heading text-lg font-semibold">
                    {member.name}
                  </h3>
                  <p className="text-sm text-electric font-medium mt-1">
                    {member.role}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-electric/5 px-3 py-1">
                    <Wrench className="h-3 w-3 text-electric/70" />
                    <span className="text-xs text-electric/80">
                      {member.specialty}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </motion.div>
              </MotionItem>
            ))}
          </MotionWrapper>
        </div>
      </section>

      {/* Mot du Président */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-nuit/5 via-transparent to-electric/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-electric)/0.04,_transparent_50%)] pointer-events-none" />
        <div className="container relative">
          <MotionWrapper
            variant="fade"
            direction="up"
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-8 h-32 w-32 rounded-full overflow-hidden shadow-2xl shadow-electric/30 ring-4 ring-electric/20">
                <Image
                  src="/team/ousmane-dioum.jpg"
                  alt="Ousmane Dioum"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-electric uppercase mb-4">
                <Quote className="h-3 w-3" />
                {t('motPresident')}
              </span>
              <blockquote className="mt-4">
                <p className="font-sans text-base font-medium leading-relaxed sm:text-lg lg:text-xl text-foreground/90 italic">
                  {t('quote')}
                </p>
              </blockquote>
              <div className="mt-8 flex flex-col items-center gap-1">
                <p className="font-heading text-lg font-semibold text-foreground">
                  Ousmane Dioum
                </p>
                <p className="text-sm text-electric font-medium">
                  {t('fondateur')}
                </p>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Pourquoi Nous Choisir */}
      <section className="py-24 bg-gradient-to-br from-nuit via-nuit to-profond text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--color-electric)/0.06,_transparent_50%)] pointer-events-none" />
        <div className="container relative">
          <div className="text-center">
            <SectionHeader
              label={t('pourquoiNous')}
              title={t('pourquoiTitle')}
              description={t('pourquoiDesc')}
              className="mx-auto text-center text-white"
            />
          </div>
          <MotionWrapper
            variant="stagger"
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                icon: Award,
                title: t('mecaniciensCertifies'),
                description: t('mecaniciensCertifiesDesc'),
              },
              {
                icon: Clock,
                title: t('interventionExpress'),
                description: t('interventionExpressDesc'),
              },
              {
                icon: Shield,
                title: t('garantie6Mois'),
                description: t('garantie6MoisDesc'),
              },
              {
                icon: Gauge,
                title: t('equipementsPremium'),
                description: t('equipementsPremiumDesc'),
              },
              {
                icon: ThumbsUp,
                title: t('transparenceRadicale'),
                description: t('transparenceRadicaleDesc'),
              },
              {
                icon: Car,
                title: t('servicePret'),
                description: t('servicePretDesc'),
              },
            ].map((item) => (
              <MotionItem key={item.title} direction="up">
                <motion.div
                  className="group rounded-2xl border border-white/10 bg-white/5 p-8 text-center transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-electric/10 text-electric transition-all duration-300 group-hover:bg-electric group-hover:text-white group-hover:shadow-lg"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <item.icon className="h-8 w-8" />
                  </motion.div>
                  <h3 className="mt-6 font-heading text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-argent/60 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </MotionItem>
            ))}
          </MotionWrapper>
        </div>
      </section>

      <CTASection />
    </>
  );
}
