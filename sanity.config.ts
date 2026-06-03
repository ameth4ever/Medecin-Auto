import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  basePath: '/studio',
  projectId: 'm6avb0d8',
  dataset: 'production',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: '2025-01-01' }),
  ],
})
