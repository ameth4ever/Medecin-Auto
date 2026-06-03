import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { client } from '@/sanity/lib/client'
import { blogPostsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { generatePageMetadata } from '@/lib/seo'
import type { BlogPost } from '@/types'
import { CTASection } from '@/components/CTASection'
import { ArrowRight, Clock, User, Calendar, BookOpen, Tag, TrendingUp } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  return generatePageMetadata({
    title: t('metaTitle'),
    description: t('metaDesc'),
  }, locale)
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  const c = await getTranslations({ locale, namespace: 'cta' })
  const posts = await client.fetch<BlogPost[]>(blogPostsQuery).catch(() => [])
  const featured = posts.filter((p) => p.isFeatured)
  const regular = posts.filter((p) => !p.isFeatured)
  const categories = [...new Set(posts.map((p) => p.category?.title).filter(Boolean))] as string[]
  const totalReadingTime = posts.reduce((acc, p) => acc + (p.readingTime || 0), 0)
  const uniqueAuthors = [...new Set(posts.map((p) => p.author))]

  const categoryKeys: Record<string, string> = {
    'Entretien & Réparation': 'categorieEntretien',
    "Conseils d'Achat": 'categorieAchat',
    'Location Auto': 'categorieLocation',
    'Sécurité Routière': 'categorieSecurite',
  }

  const categoryColors: Record<string, string> = {
    'Entretien & Réparation': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    "Conseils d'Achat": 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Location Auto': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'Sécurité Routière': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nuit via-nuit to-profond text-white">
        <div className="absolute inset-0">
          <Image
            src="/about.jpg"
            alt={t('heroAlt')}
            fill
            className="object-cover opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-nuit/95 via-nuit/80 to-nuit/60" />
        </div>
        <div className="container relative py-32">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-electric/20 bg-electric/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-electric uppercase mb-5">
              {t('badge')}
            </span>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
              {t('title')}
            </h1>
            <p className="mt-5 text-lg text-argent/80 max-w-2xl leading-relaxed">
              {t('heroDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: BookOpen, value: posts.length.toString(), label: t('statArticles') },
              { icon: Tag, value: categories.length.toString(), label: t('statCategories') },
              { icon: User, value: uniqueAuthors.length.toString(), label: t('statAuteurs') },
              { icon: Clock, value: `${totalReadingTime} min`, label: t('statTempsTotal') },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/50 bg-card p-5 text-center transition-all hover:shadow-md hover:border-electric/20"
              >
                <div className="flex justify-center mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric/10 text-electric">
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="font-heading text-2xl font-bold tracking-tight">{stat.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featured.length > 0 && (
        <section className="py-8">
          <div className="container">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="h-5 w-5 text-electric" />
              <h2 className="font-heading text-xl font-bold tracking-tight">{t('aLaUne')}</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {featured.slice(0, 2).map((post) => {
                const imageUrl = post.coverImage
                  ? urlFor(post.coverImage).width(800).height(500).url()
                  : null
                const catColor = categoryColors[post.category?.title || ''] || 'bg-electric/10 text-electric border-electric/20'
                return (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-electric/5 to-nuit/10">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl text-muted-foreground/20">📝</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className={`inline-block rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm ${catColor}`}>
                          {post.category?.title || t('automobile')}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-lg font-bold leading-snug line-clamp-2 group-hover:text-electric transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-2.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString(locale, {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })
                              : ''}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readingTime} {t('minLecture')}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-electric group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Category Pills + Articles Grid */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="h-5 w-5 text-electric" />
            <h2 className="font-heading text-xl font-bold tracking-tight">
              {t('tousNosArticles')}
            </h2>
            <span className="ml-auto text-sm text-muted-foreground">{posts.length} {t('articles')}</span>
          </div>

          {/* Category Pills */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-border/30">
              <span className="rounded-full border border-electric/30 bg-electric/10 px-4 py-1.5 text-xs font-semibold text-electric">
                {t('tout')}
              </span>
              {categories.map((cat) => {
                const catKey = categoryKeys[cat]
                const displayCat = catKey ? t(catKey) : cat
                return (
                  <span
                    key={cat}
                    className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all hover:scale-105 cursor-default ${
                      categoryColors[cat] || 'bg-muted text-muted-foreground border-border/50'
                    }`}
                  >
                    {displayCat}
                  </span>
                )
              })}
            </div>
          )}

          {/* Articles Grid */}
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const imageUrl = post.coverImage
                  ? urlFor(post.coverImage).width(600).height(380).url()
                  : null
                const catColor = categoryColors[post.category?.title || ''] || 'bg-electric/10 text-electric border-electric/20'
                return (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-electric/5 to-nuit/10">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl text-muted-foreground/20">📝</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm ${catColor}`}>
                          {post.category?.title || t('automobile')}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-base font-bold leading-snug line-clamp-2 group-hover:text-electric transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readingTime} {t('minLecture')}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-electric group-hover:gap-2 transition-all">
                        {t('lireArticle')} <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto" />
              <h3 className="mt-6 font-heading text-xl font-semibold text-muted-foreground">
                {t('emptyTitle')}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                {t('emptyDesc')}
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection
        title={c('questionAuto')}
        description={c('questionAutoDesc')}
        ctaLabel={c('contactezNous')}
        ctaLink="/contact"
      />
    </>
  )
}
