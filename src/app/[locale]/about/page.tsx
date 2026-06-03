import { getTranslations } from 'next-intl/server'
import { generatePageMetadata } from '@/lib/seo'
import { AboutContent } from '@/components/AboutContent'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return generatePageMetadata({
    title: t('metaTitle'),
    description: t('metaDesc'),
  }, locale)
}

export default function AboutPage() {
  return <AboutContent />
}
