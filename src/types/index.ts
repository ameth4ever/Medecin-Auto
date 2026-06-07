import type { TypedObject } from '@portabletext/types'

export interface SeoMetadata {
  title?: string
  description?: string
  keywords?: string
  ogImage?: SanityImage
  noIndex?: boolean
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  title: string
  description: string
  logo: SanityImage
  favicon?: SanityImage
  phone: string
  phoneSecondary?: string
  email: string
  address: string
  city: string
  country: string
  socialLinks: {
    facebook?: string
    instagram?: string
    whatsapp?: string
    youtube?: string
    linkedin?: string
  }
  workingHours: {
    weekdays: string
    saturday: string
    sunday: string
  }
  seo: SeoMetadata
}

export interface ServiceFeature {
  icon: string
  label: string
}

export interface Service {
  _id: string
  _type: 'service'
  title: string
  slug: string
  image: SanityImage
  description: TypedObject[]
  shortDescription: string
  features: ServiceFeature[]
  isFeatured: boolean
  order: number
  seo: SeoMetadata
}

export type Transmission = 'automatic' | 'manual'
export type FuelType = 'essence' | 'diesel' | 'electrique' | 'hybride'
export type VehicleCondition = 'neuf' | 'occasion' | 'certifie'
export type VehicleStatus = 'disponible' | 'vendu' | 'reserve'

export interface Vehicle {
  _id: string
  _type: 'vehicle'
  title: string
  slug: string
  brand?: string
  model?: string
  year?: number
  price: number
  currency?: string
  mileage?: number
  transmission?: Transmission
  fuelType?: FuelType
  condition?: VehicleCondition
  status?: VehicleStatus
  description?: string
  shortDescription?: string
  images?: SanityImage[]
  features?: string[]
  isFeatured?: boolean
  isForSale?: boolean
  isForRent?: boolean
  dailyRate?: number
  weeklyRate?: number
  monthlyRate?: number
  seo?: SeoMetadata
}

export type RentalDuration = 'daily' | 'weekly' | 'monthly' | 'longterm'
export type RentalStatus = 'disponible' | 'loue' | 'maintenance'

export interface Rental {
  _id: string
  _type: 'rental'
  title: string
  slug: string
  vehicle?: Vehicle
  dailyRate?: number
  weeklyRate?: number
  monthlyRate?: number
  deposit?: number
  mileageLimit?: number
  insurance?: string
  availability?: RentalStatus
  isFeatured?: boolean
  images?: SanityImage[]
  features?: string[]
  conditions?: string[]
  seo?: SeoMetadata
}

export interface BlogCategory {
  _id: string
  title: string
  slug: string
}

export interface BlogPost {
  _id: string
  _type: 'blogPost'
  title: string
  slug: string
  excerpt: string
  content: TypedObject[]
  coverImage: SanityImage
  author: string
  category: BlogCategory
  publishedAt: string
  readingTime: number
  tags: string[]
  isFeatured: boolean
  seo: SeoMetadata
}

export interface Testimonial {
  _id: string
  _type: 'testimonial'
  name: string
  role: string
  avatar?: SanityImage
  content: string
  rating: number
  isFeatured: boolean
  order: number
}

export interface FaqItem {
  _id: string
  _type: 'faq'
  question: string
  answer: string
  category: string
  order: number
  isFeatured: boolean
}

export interface HomepageHero {
  title: string
  subtitle: string
  ctaPrimary: { label: string; link: string }
  ctaSecondary: { label: string; link: string }
  backgroundImage: SanityImage
  badges: string[]
}

export interface HomepageContent {
  _id: string
  _type: 'homepage'
  hero: HomepageHero
  featuredServices: Service[]
  featuredVehicles: Vehicle[]
  featuredRentals: Rental[]
  testimonials: Testimonial[]
  faq: FaqItem[]
}
