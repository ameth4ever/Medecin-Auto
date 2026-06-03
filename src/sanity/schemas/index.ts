import type { SchemaTypeDefinition } from 'sanity'
import { siteSettings } from './siteSettings'
import { homepage } from './homepage'
import { service } from './service'
import { vehicle } from './vehicle'
import { rental } from './rental'
import { blogPost } from './blogPost'
import { blogCategory } from './blogCategory'
import { testimonial } from './testimonial'
import { faq } from './faq'
import { seo } from './seo'
import { blockContent } from './blockContent'

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  homepage,
  service,
  vehicle,
  rental,
  blogPost,
  blogCategory,
  testimonial,
  faq,
  seo,
  blockContent,
]
