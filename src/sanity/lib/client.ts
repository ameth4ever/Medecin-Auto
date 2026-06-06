import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './api'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: '/studio',
  },
  useCdn: false,
})
