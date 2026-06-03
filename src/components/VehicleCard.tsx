'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import {
  Gauge,
  Fuel,
  Settings,
  Calendar,
  ArrowRight,
} from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import type { Vehicle } from '@/types'

interface VehicleCardProps {
  vehicle: Vehicle
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const t = useTranslations('vehicles')
  const transmissionLabel =
    vehicle.transmission === 'automatic' ? t('automatique') : t('manuelle')

  const statusStyles: Record<string, string> = {
    disponible: 'bg-green-500/15 text-green-500 border-green-500/20',
    vendu: 'bg-red-500/15 text-red-500 border-red-500/20',
    reserve: 'bg-amber-500/15 text-amber-500 border-amber-500/20',
  }

  const firstImage = vehicle.images?.[0]
    ? urlFor(vehicle.images[0]).width(600).height(380).url()
    : null

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link
        href={`/vehicles/${vehicle.slug}`}
        className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:shadow-xl block"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-electric/5 to-nuit/10">
          {firstImage ? (
            <Image
              src={firstImage}
              alt={vehicle.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-electric/10 text-electric">
                <CarIcon className="h-8 w-8" />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />

          {/* Status badge */}
          {vehicle.status && (
            <span
              className={`absolute top-4 right-4 z-10 rounded-full border px-3 py-1 text-xs font-medium capitalize backdrop-blur-sm ${
                statusStyles[vehicle.status] || 'bg-white/10 text-white'
              }`}
            >
              {vehicle.status}
            </span>
          )}

          {/* Condition badge */}
          {vehicle.condition && (
            <span className="absolute top-4 left-4 z-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-medium text-white capitalize">
              {vehicle.condition === 'neuf' ? t('neuf') : vehicle.condition === 'occasion' ? t('occasion') : t('certifie')}
            </span>
          )}
        </div>

        <div className="p-5">
          {/* Title & Year */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-lg font-semibold line-clamp-1 group-hover:text-electric transition-colors">
              {vehicle.title}
            </h3>
            <span className="shrink-0 rounded-lg bg-electric/10 px-2.5 py-1 text-xs font-semibold text-electric">
              {vehicle.year}
            </span>
          </div>

          {/* Specs */}
          <div className="mt-4 grid grid-cols-3 gap-3 rounded-xl bg-muted/50 p-3">
            {vehicle.mileage !== undefined && (
              <div className="flex flex-col items-center gap-1">
                <Gauge className="h-3.5 w-3.5 text-electric" />
                <span className="text-[11px] text-muted-foreground font-medium">
                  {vehicle.mileage.toLocaleString()} {t('km')}
                </span>
              </div>
            )}
            <div className="flex flex-col items-center gap-1">
              <Fuel className="h-3.5 w-3.5 text-electric" />
              <span className="text-[11px] text-muted-foreground font-medium capitalize">
                {vehicle.fuelType}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Settings className="h-3.5 w-3.5 text-electric" />
              <span className="text-[11px] text-muted-foreground font-medium">
                {transmissionLabel}
              </span>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="mt-5 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider">{t('prix')}</span>
              <p className="font-heading text-xl font-bold text-foreground">
                {vehicle.price.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">{t('fcfa')}</span>
              </p>
            </div>
            <motion.span
              className="flex items-center gap-1.5 text-sm font-medium text-electric"
              whileHover={{ x: 3 }}
            >
              {t('details')}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function CarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-3-4H9L6 10l-2.5.1C2.7 10.3 2 11.1 2 12v3c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  )
}
