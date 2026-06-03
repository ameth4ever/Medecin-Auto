import { defineType, defineField } from 'sanity'

export const rental = defineType({
  name: 'rental',
  title: 'Locations',
  type: 'document',
  groups: [
    { name: 'details', title: 'Détails' },
    { name: 'pricing', title: 'Tarifs' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      group: 'details',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vehicle',
      title: 'Véhicule',
      type: 'reference',
      group: 'details',
      to: [{ type: 'vehicle' }],
    }),
    defineField({
      name: 'dailyRate',
      title: 'Tarif Journalier',
      type: 'number',
      group: 'pricing',
    }),
    defineField({
      name: 'weeklyRate',
      title: 'Tarif Hebdomadaire',
      type: 'number',
      group: 'pricing',
    }),
    defineField({
      name: 'monthlyRate',
      title: 'Tarif Mensuel',
      type: 'number',
      group: 'pricing',
    }),
    defineField({
      name: 'deposit',
      title: 'Caution',
      type: 'number',
      group: 'pricing',
    }),
    defineField({
      name: 'mileageLimit',
      title: 'Limite Kilométrique',
      type: 'number',
      group: 'details',
    }),
    defineField({
      name: 'insurance',
      title: 'Assurance',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'availability',
      title: 'Disponibilité',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Disponible', value: 'disponible' },
          { title: 'Loué', value: 'loue' },
          { title: 'En Maintenance', value: 'maintenance' },
        ],
      },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      group: 'details',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'features',
      title: 'Équipements Inclus',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'conditions',
      title: 'Conditions de Location',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isFeatured',
      title: 'Mis en Avant',
      type: 'boolean',
      group: 'details',
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
