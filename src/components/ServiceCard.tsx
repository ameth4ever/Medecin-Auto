'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ArrowRight, Wrench } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import type { Service } from '@/types'

interface ServiceCardProps {
  service: Service
}

const serviceKeys: Record<string, string> = {
  'diagnostic-general': 'serviceDiagnosticGeneral',
  'vidange': 'serviceVidange',
  'entretien-general': 'serviceEntretienGeneral',
  'pneumatique': 'servicePneumatique',
  'climatisation': 'serviceClimatisation',
  'assurance-et-suivi': 'serviceAssuranceEtSuivi',
  'reparation-moteur': 'serviceReparationMoteur',
  'vente-location-vehicules': 'serviceVenteLocationVehicules',
  'conseils-accompagnement': 'serviceConseilsAccompagnement',
}

export function ServiceCard({ service }: ServiceCardProps) {
  const t = useTranslations('services')
  const imageUrl = service.image ? urlFor(service.image).width(600).height(400).url() : null

  const key = serviceKeys[service.slug]
  const displayTitle = key ? t(key) : service.title
  const displayDesc = key ? t(`${key}Desc`) : service.shortDescription

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:shadow-xl block"
      >
        {imageUrl ? (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={imageUrl}
              alt={service.image?.alt || displayTitle}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          </div>
        ) : (
          <div className="relative h-48 bg-gradient-to-br from-electric/5 to-nuit/10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-electric)/0.08,_transparent_50%)]" />
            <div className="flex h-full items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-electric/10 text-electric">
                <Wrench className="h-8 w-8" />
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          <h3 className="font-heading text-lg font-semibold group-hover:text-electric transition-colors">{displayTitle}</h3>

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {displayDesc}
          </p>

          {service.features && service.features.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {service.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-electric shrink-0" />
                  {feature.icon} {feature.label}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-electric group-hover:gap-3 transition-all">
            <span>{t('enSavoirPlus')}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
