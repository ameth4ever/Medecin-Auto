import { getTranslations } from 'next-intl/server'
import { client } from '@/sanity/lib/client'
import {
  siteSettingsQuery,
  servicesQuery,
  rentalsQuery,
  testimonialsQuery,
  faqQuery,
} from '@/sanity/lib/queries'
import { generatePageMetadata } from '@/lib/seo'
import type {
  SiteSettings,
  Service,
  Rental,
  Testimonial,
  FaqItem,
} from '@/types'
import { Hero } from '@/components/Hero'
import { HomeContent } from '@/components/HomeContent'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const settings = await client
    .fetch<SiteSettings>(siteSettingsQuery)
    .catch(() => null)
  return generatePageMetadata(settings?.seo, locale)
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  const n = await getTranslations({ locale, namespace: 'nav' })
  const [settings, services, rentals, testimonials, faqs] =
    await Promise.all([
      client.fetch<SiteSettings>(siteSettingsQuery).catch(() => null),
      client.fetch<Service[]>(servicesQuery).catch(() => []),
      client.fetch<Rental[]>(rentalsQuery).catch(() => []),
      client.fetch<Testimonial[]>(testimonialsQuery).catch(() => []),
      client.fetch<FaqItem[]>(faqQuery).catch(() => []),
    ])

  const featuredServices = services.filter((s) => s.isFeatured).slice(0, 6)
  const featuredRentals = rentals.filter((r) => r.isFeatured).slice(0, 6)
  const featuredTestimonials = testimonials.filter((t) => t.isFeatured)
  const featuredFaqs = faqs.filter((f) => f.isFeatured).slice(0, 6)

  return (
    <>
      <Hero
        hero={{
          title:
            settings?.title ||
            t('excellenceAutomobile'),
          subtitle:
            settings?.description ||
            t('badge'),
          ctaPrimary: { label: n('bookService'), link: '/contact' },
          ctaSecondary: { label: t('voirTout'), link: '/vehicles' },
          backgroundImage: null!,
          badges: [
            t('diagnosticPrecis'),
            t('interventionRapide'),
            t('serviceCertifie'),
          ],
        }}
      />
      <HomeContent
        settings={settings}
        featuredServices={featuredServices}
        featuredRentals={featuredRentals}
        featuredTestimonials={featuredTestimonials}
        featuredFaqs={featuredFaqs}
      />
    </>
  )
}
