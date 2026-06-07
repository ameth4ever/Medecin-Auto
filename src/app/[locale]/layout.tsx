import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import Script from 'next/script'

export const dynamic = 'force-dynamic'
import { generatePageMetadata, generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo'
import { siteConfig } from '@/config/site'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'

const organizationSchema = generateOrganizationSchema()
const websiteSchema = generateWebSiteSchema()

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'common' })
  const path = ''
  const baseUrl = siteConfig.url

  return generatePageMetadata(
    { title: t('siteName'), description: t('siteDesc') },
    locale,
    {
      alternates: {
        canonical: `${baseUrl}/${locale}${path}`,
        languages: {
          fr: `${baseUrl}/fr${path}`,
          en: `${baseUrl}/en${path}`,
          'x-default': `${baseUrl}/fr${path}`,
        },
      },
    }
  )
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <Script
        id="json-ld-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="json-ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </NextIntlClientProvider>
  )
}
