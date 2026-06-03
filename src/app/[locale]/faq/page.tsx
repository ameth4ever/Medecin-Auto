import { getTranslations } from 'next-intl/server'
import Script from 'next/script'
import { client } from '@/sanity/lib/client'
import { faqQuery } from '@/sanity/lib/queries'
import { generatePageMetadata } from '@/lib/seo'
import type { FaqItem } from '@/types'
import { FAQ } from '@/components/FAQ'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq' })
  return generatePageMetadata({
    title: t('metaTitle'),
    description: t('metaDesc'),
  }, locale)
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq' })
  const faqs = await client.fetch<FaqItem[]>(faqQuery).catch(() => [])

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  return (
    <section className="py-24">
      <div className="container max-w-3xl">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
        <FAQ faqs={faqs} />
      </div>
      <Script
        id="json-ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  )
}
