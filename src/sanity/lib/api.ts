export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET
