import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { blogPostBySlugQuery, blogSlugsQuery } from '@/sanity/lib/queries'
import { generatePageMetadata } from '@/lib/seo'
import type { BlogPost } from '@/types'
import { CTASection } from '@/components/CTASection'

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(blogSlugsQuery)
    return slugs.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await props.params
  const post = await client.fetch<BlogPost>(blogPostBySlugQuery, { slug }).catch(() => null)
  if (!post) return {}
  return generatePageMetadata(post.seo, locale)
}

export default async function BlogPostPage(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await props.params
  const t = await getTranslations({ locale, namespace: 'blog' })
  const post = await client.fetch<BlogPost>(blogPostBySlugQuery, { slug }).catch(() => null)

  if (!post) notFound()

  return (
    <>
      <section className="py-12">
        <div className="container max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('retour')}
          </Link>
        </div>
      </section>

      <article className="pb-24">
        <div className="container max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-medium text-electric uppercase tracking-wider">
              {post.category?.title || t('automobile')}
            </p>
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString(locale, {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : ''}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readingTime} {t('minLecture')}
              </span>
            </div>
          </div>

          <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
            <PortableText value={post.content} />
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      <CTASection />
    </>
  )
}
