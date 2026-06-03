import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default async function NotFound() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'notFound' })

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <h1 className="font-heading text-6xl font-bold text-electric">404</h1>
      <h2 className="mt-4 font-heading text-2xl font-semibold">
        {t('title')}
      </h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        {t('description')}
      </p>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: 'default' }), 'mt-8')}
      >
        {t('backHome')}
      </Link>
    </div>
  )
}
