import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import {
  serviceSlugsQuery,
  vehicleSlugsQuery,
  rentalSlugsQuery,
  blogSlugsQuery,
} from '@/sanity/lib/queries'
import { siteConfig } from '@/config/site'

const locales = ['fr', 'en'] as const
const baseUrl = siteConfig.url

function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  lastModified: Date = new Date()
): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let services: { slug: string }[] = []
  let vehicles: { slug: string }[] = []
  let rentals: { slug: string }[] = []
  let blogPosts: { slug: string }[] = []

  try {
    [services, vehicles, rentals, blogPosts] = await Promise.all([
      client.fetch<{ slug: string }[]>(serviceSlugsQuery).catch(() => []),
      client.fetch<{ slug: string }[]>(vehicleSlugsQuery).catch(() => []),
      client.fetch<{ slug: string }[]>(rentalSlugsQuery).catch(() => []),
      client.fetch<{ slug: string }[]>(blogSlugsQuery).catch(() => []),
    ])
  } catch {
    // Sanity not available during build
  }

  return [
    ...entry('', 1, 'yearly'),
    ...entry('/about', 0.8, 'monthly'),
    ...entry('/services', 0.9, 'weekly'),
    ...entry('/vehicles', 0.9, 'weekly'),
    ...entry('/rentals', 0.8, 'weekly'),
    ...entry('/blog', 0.7, 'weekly'),
    ...entry('/contact', 0.6, 'monthly'),
    ...entry('/faq', 0.6, 'monthly'),
    ...services.flatMap((s) => entry(`/services/${s.slug}`, 0.7, 'monthly')),
    ...vehicles.flatMap((v) => entry(`/vehicles/${v.slug}`, 0.8, 'weekly')),
    ...rentals.flatMap((r) => entry(`/rentals/${r.slug}`, 0.7, 'weekly')),
    ...blogPosts.flatMap((b) => entry(`/blog/${b.slug}`, 0.6, 'monthly')),
  ]
}
