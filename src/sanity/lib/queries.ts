import { groq } from 'next-sanity'

const imageProjection = `{
  _type,
  asset->,
  alt
}`

const seoProjection = `{
  title,
  description,
  keywords,
  ogImage ${imageProjection},
  noIndex
}`

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  _id,
  title,
  description,
  logo ${imageProjection},
  phone,
  email,
  address,
  city,
  socialLinks,
  workingHours,
  seo ${seoProjection}
}`

export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  image ${imageProjection},
  description,
  shortDescription,
  features,
  isFeatured,
  order,
  seo ${seoProjection}
}`

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  image ${imageProjection},
  description,
  shortDescription,
  features,
  isFeatured,
  order,
  seo ${seoProjection}
}`

export const vehiclesQuery = groq`*[_type == "vehicle"] | order(year desc){
  _id,
  title,
  "slug": slug.current,
  brand,
  model,
  year,
  price,
  currency,
  mileage,
  transmission,
  fuelType,
  condition,
  status,
  description,
  shortDescription,
  images[] ${imageProjection},
  features,
  isFeatured,
  isForSale,
  isForRent,
  dailyRate,
  weeklyRate,
  monthlyRate,
  seo ${seoProjection}
}`

export const vehicleBySlugQuery = groq`*[_type == "vehicle" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  brand,
  model,
  year,
  price,
  currency,
  mileage,
  transmission,
  fuelType,
  condition,
  status,
  description,
  shortDescription,
  images[] ${imageProjection},
  features,
  isFeatured,
  isForSale,
  isForRent,
  dailyRate,
  weeklyRate,
  monthlyRate,
  seo ${seoProjection}
}`

export const rentalsQuery = groq`*[_type == "rental"] | order(title asc){
  _id,
  title,
  "slug": slug.current,
  vehicle->,
  dailyRate,
  weeklyRate,
  monthlyRate,
  deposit,
  mileageLimit,
  insurance,
  availability,
  isFeatured,
  images[] ${imageProjection},
  features,
  conditions,
  seo ${seoProjection}
}`

export const rentalBySlugQuery = groq`*[_type == "rental" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  vehicle->,
  dailyRate,
  weeklyRate,
  monthlyRate,
  deposit,
  mileageLimit,
  insurance,
  availability,
  isFeatured,
  images[] ${imageProjection},
  features,
  conditions,
  seo ${seoProjection}
}`

export const blogPostsQuery = groq`*[_type == "blogPost"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage ${imageProjection},
  author,
  category->,
  publishedAt,
  readingTime,
  tags,
  isFeatured,
  seo ${seoProjection}
}`

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  coverImage ${imageProjection},
  author,
  category->,
  publishedAt,
  readingTime,
  tags,
  isFeatured,
  seo ${seoProjection}
}`

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id,
  name,
  role,
  avatar ${imageProjection},
  content,
  rating,
  isFeatured,
  order
}`

export const faqQuery = groq`*[_type == "faq"] | order(order asc){
  _id,
  question,
  answer,
  category,
  order,
  isFeatured
}`

export const serviceSlugsQuery = groq`*[_type == "service" && defined(slug.current)]{"slug": slug.current}`

export const vehicleSlugsQuery = groq`*[_type == "vehicle" && defined(slug.current)]{"slug": slug.current}`

export const rentalSlugsQuery = groq`*[_type == "rental" && defined(slug.current)]{"slug": slug.current}`

export const blogSlugsQuery = groq`*[_type == "blogPost" && defined(slug.current)]{"slug": slug.current}`
