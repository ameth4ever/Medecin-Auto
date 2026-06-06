'use client'

import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import type { HomepageHero as HeroType } from '@/types'
import { siteConfig } from '@/config/site'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ShieldCheck, ChevronRight } from 'lucide-react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'

interface HeroProps {
  hero: HeroType
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 20 },
  },
}

const statVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 15,
      delay: 0.6 + i * 0.12,
    },
  }),
}

const floatingShapes = [
  { size: 12, x: '15%', y: '20%', duration: 8, delay: 0 },
  { size: 8, x: '75%', y: '15%', duration: 10, delay: 0.5 },
  { size: 6, x: '85%', y: '70%', duration: 7, delay: 1 },
  { size: 10, x: '10%', y: '75%', duration: 9, delay: 0.3 },
  { size: 5, x: '50%', y: '10%', duration: 11, delay: 0.8 },
  { size: 7, x: '90%', y: '50%', duration: 6, delay: 1.2 },
]

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const num = parseInt(value.replace(/[^0-9]/g, ''))
  const isNumeric = !isNaN(num)

  return (
    <motion.p
      className="font-heading text-3xl font-bold text-white sm:text-4xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {isNumeric ? (
        <>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {num}
          </motion.span>
          {value.replace(/[0-9]/g, '')}
        </>
      ) : (
        value
      )}
      {suffix}
    </motion.p>
  )
}

export function Hero({ hero }: HeroProps) {
  const t = useTranslations('home')
  const h = useTranslations('hero')
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.6])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  function handleMouseMove(e: React.MouseEvent) {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x * 20)
    mouseY.set(y * 20)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] flex items-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-nuit/98 via-nuit/85 to-nuit/70 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ opacity: overlayOpacity }}
      />

      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=2070&auto=format&fit=crop)`,
          y: bgY,
          scale: 1.1,
        }}
        initial={{ scale: 1.3 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 right-0 w-96 h-96 bg-electric/5 rounded-full blur-3xl z-10"
        initial={{ opacity: 0, scale: 0.5, x: 100 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: 0,
          y: [0, -30, 0, 20, 0],
        }}
        transition={{
          duration: 1.5,
          delay: 0.5,
          y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ x: springX, y: useSpring(useTransform(mouseX, [0, 0], [0, 0])) }}
      />
      <motion.div
        className="absolute bottom-20 left-0 w-64 h-64 bg-performance/5 rounded-full blur-3xl z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, 20, 0, -20, 0],
        }}
        transition={{
          duration: 1.5,
          delay: 0.8,
          y: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-48 h-48 bg-electric/3 rounded-full blur-3xl z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: [0, 40, 0, -40, 0],
          y: [0, -20, 0, 20, 0],
        }}
        transition={{
          duration: 2,
          delay: 1,
          x: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Floating geometric shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute z-10 border border-electric/10 rounded-lg"
          style={{
            width: shape.size * 4,
            height: shape.size * 4,
            left: shape.x,
            top: shape.y,
            borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '4px' : '0',
            transform: i % 2 === 0 ? 'rotate(45deg)' : 'none',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.4, 0.2, 0.5, 0.3],
            scale: [0, 1, 0.8, 1.1, 1],
            y: [0, -30, 20, -10, 0],
            x: [0, 15, -10, 5, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="container relative z-20 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="relative inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/10 px-4 py-1.5 text-xs font-medium text-electric backdrop-blur-sm mb-8 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <ShieldCheck className="h-3.5 w-3.5 relative z-10" />
              <span className="relative z-10">{t('badge')}</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]"
            >
              {hero.title.split(' ').map((word, i, arr) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + i * 0.08,
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                  }}
                >
                  {word}{i < arr.length - 1 ? '\u00A0' : ''}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-lg text-argent/60 sm:text-xl leading-relaxed"
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <motion.div
                className="relative overflow-hidden rounded-xl"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 0.5 }}
                />
                <Link
                  href={hero.ctaPrimary.link}
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'lg' }),
                    'bg-electric text-white hover:bg-electric/90 group relative'
                  )}
                >
                  <motion.span
                    className="absolute inset-0 rounded-xl bg-white/5"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {hero.ctaPrimary.label}
                  <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={hero.ctaSecondary.link}
                  className={cn(
                    buttonVariants({ variant: 'secondary', size: 'lg' }),
                    'bg-white/10 text-white hover:bg-white/20 border border-white/25 relative overflow-hidden group backdrop-blur-sm'
                  )}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 1 }}
                  />
                  {hero.ctaSecondary.label}
                </Link>
              </motion.div>
            </motion.div>

            {hero.badges && hero.badges.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="mt-12 flex flex-wrap gap-x-6 gap-y-3"
              >
                {hero.badges.map((badge, index) => (
                  <motion.span
                    key={index}
                    className="inline-flex items-center gap-2 text-sm text-argent/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.15 }}
                  >
                    <motion.span
                      className="flex h-1.5 w-1.5 rounded-full bg-electric"
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [1, 0.5, 1],
                        boxShadow: [
                          '0 0 4px rgba(14,165,233,0.5)',
                          '0 0 12px rgba(14,165,233,0.8)',
                          '0 0 4px rgba(14,165,233,0.5)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                    {badge}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </motion.div>

          <div className="hidden lg:flex justify-center">
            <motion.div
              className="grid grid-cols-2 gap-4 w-full max-w-sm"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {[
                { value: '50+', label: t('statsServices') },
                { value: '500+', label: t('statsClients') },
                { value: '200+', label: t('statsVehicules') },
                { value: '5+', label: t('statsAnnees') },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={statVariants}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center hover:bg-white/10 transition-all relative overflow-hidden group"
                  whileHover={{
                    scale: 1.05,
                    borderColor: 'rgba(14,165,233,0.3)',
                    transition: { type: 'spring', stiffness: 400 },
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <motion.div
                    className="absolute -top-6 -right-6 w-12 h-12 bg-electric/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <AnimatedCounter value={stat.value} />
                  <p className="mt-1 text-xs text-argent/60 relative z-10">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
              <motion.div
                className="col-span-2 rounded-2xl border border-electric/20 bg-electric/5 backdrop-blur-sm p-4 text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 1.4,
                }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(14,165,233,0.5)' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-electric/5 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 1.5 }}
                />
                <p className="text-sm text-argent/80 relative z-10">
                  <span className="text-electric font-semibold">{h('urgence')}</span>{' '}
                  {h('appelezNous')}{' '}
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-white font-semibold hover:text-electric transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </section>
  )
}
