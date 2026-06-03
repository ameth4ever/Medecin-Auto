import type { Metadata } from 'next'
import type { SeoMetadata } from '@/types'
import { siteConfig } from '@/config/site'
import { urlFor } from '@/sanity/lib/image'

const localeMap: Record<string, string> = {
  fr: 'fr_SN',
  en: 'en_US',
}

export function generatePageMetadata(
  seo?: SeoMetadata | null,
  locale?: string,
  overrides?: Partial<Metadata>
): Metadata {
  const title = seo?.title
    ? `${seo.title} | ${siteConfig.name}`
    : siteConfig.defaultSeo.title

  const description = seo?.description || siteConfig.defaultSeo.description

  const ogImage = seo?.ogImage
    ? urlFor(seo.ogImage).width(1200).height(630).url()
    : `${siteConfig.url}/og-image.jpg`

  return {
    title,
    description,
    keywords: seo?.keywords || undefined,
    openGraph: {
      title,
      description,
      url: overrides?.openGraph?.url || siteConfig.url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: locale ? localeMap[locale] || siteConfig.locale : siteConfig.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    ...overrides,
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepairBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    image: `${siteConfig.url}/og-image.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.split(',')[0].trim(),
      addressLocality: siteConfig.contact.address.split(',')[1]?.trim() || 'Dakar',
      addressCountry: 'SN',
    },
    priceRange: '$$',
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Monday', opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
    ],
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.whatsapp,
    ].filter(Boolean),
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
