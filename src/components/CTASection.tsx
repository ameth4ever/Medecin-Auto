'use client'

import { motion } from 'framer-motion'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CTASectionProps {
  title?: string
  description?: string
  ctaLabel?: string
  ctaLink?: string
}

export function CTASection({
  title,
  description,
  ctaLabel,
  ctaLink = '/contact',
}: CTASectionProps) {
  const t = useTranslations('cta')
  const resolvedTitle = title ?? t('title')
  const resolvedDescription = description ?? t('description')
  const resolvedCtaLabel = ctaLabel ?? t('button')
  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-nuit px-8 py-16 text-center sm:px-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-electric/10 to-transparent" />
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-electric/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative z-10">
            <motion.h2
              className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {resolvedTitle}
            </motion.h2>
            <motion.p
              className="mt-4 text-argent/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {resolvedDescription}
            </motion.p>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href={ctaLink}
                className={cn(
                  buttonVariants({ variant: 'default', size: 'lg' }),
                  'bg-electric text-white hover:bg-electric/90'
                )}
              >
                {resolvedCtaLabel}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
