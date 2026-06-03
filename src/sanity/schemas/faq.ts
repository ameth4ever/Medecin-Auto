import { defineType, defineField } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Réponse',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Général', value: 'general' },
          { title: 'Réparation', value: 'reparation' },
          { title: 'Location', value: 'location' },
          { title: 'Vente', value: 'vente' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'Affichage',
      type: 'number',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Mis en Avant',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
