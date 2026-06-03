import { defineType, defineField } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Page d\'Accueil',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'content', title: 'Contenu' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Section Hero',
      type: 'object',
      group: 'hero',
      fields: [
        { name: 'title', title: 'Titre', type: 'string' },
        { name: 'subtitle', title: 'Sous-titre', type: 'string' },
        {
          name: 'ctaPrimary',
          title: 'CTA Principal',
          type: 'object',
          fields: [
            { name: 'label', title: 'Libellé', type: 'string' },
            { name: 'link', title: 'Lien', type: 'string' },
          ],
        },
        {
          name: 'ctaSecondary',
          title: 'CTA Secondaire',
          type: 'object',
          fields: [
            { name: 'label', title: 'Libellé', type: 'string' },
            { name: 'link', title: 'Lien', type: 'string' },
          ],
        },
        {
          name: 'backgroundImage',
          title: 'Image de Fond',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'badges',
          title: 'Badges de Confiance',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'featuredServices',
      title: 'Services à la Une',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      group: 'content',
    }),
    defineField({
      name: 'featuredVehicles',
      title: 'Véhicules à la Une',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'vehicle' }] }],
      group: 'content',
    }),
    defineField({
      name: 'featuredRentals',
      title: 'Locations à la Une',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'rental' }] }],
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
})
