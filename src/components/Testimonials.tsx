'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { Testimonial } from '@/types'
import { MotionWrapper, MotionItem } from '@/components/MotionWrapper'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const t = useTranslations('testimonials')
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-electric)/0.03,_transparent_50%)] pointer-events-none" />
      <div className="container relative">
        <MotionWrapper variant="fade" direction="up" className="text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
        </MotionWrapper>

        <MotionWrapper variant="stagger" className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <MotionItem key={testimonial._id} direction="up">
              <motion.div
                className="relative rounded-2xl border border-border/50 bg-card p-8"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div
                  className="flex gap-1 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-electric/10 text-sm font-bold text-electric uppercase"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                  >
                    {testimonial.name.charAt(0)}
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    {testimonial.role && (
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </MotionItem>
          ))}
        </MotionWrapper>
      </div>
    </section>
  )
}
