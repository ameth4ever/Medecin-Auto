import { defineType, defineField } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre SEO',
      type: 'string',
      description: 'Titre pour les moteurs de recherche (60 caractères max)',
    }),
    defineField({
      name: 'description',
      title: 'Description SEO',
      type: 'text',
      description: 'Meta description (160 caractères max)',
      rows: 3,
    }),
    defineField({
      name: 'keywords',
      title: 'Mots-clés',
      type: 'string',
      description: 'Mots-clés séparés par des virgules',
    }),
    defineField({
      name: 'ogImage',
      title: 'Image Open Graph',
      type: 'image',
      description: 'Image pour le partage sur les réseaux sociaux (1200x630px)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Empêcher l\'indexation de cette page',
      initialValue: false,
    }),
  ],
})
