import { defineType, defineField } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Articles de Blog',
  type: 'document',
  groups: [
    { name: 'content', title: 'Contenu' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait',
      type: 'text',
      group: 'content',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de Couverture',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'reference',
      group: 'content',
      to: [{ type: 'blogCategory' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de Publication',
      type: 'datetime',
      group: 'content',
    }),
    defineField({
      name: 'readingTime',
      title: 'Temps de Lecture (minutes)',
      type: 'number',
      group: 'content',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isFeatured',
      title: 'Mis en Avant',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
})
