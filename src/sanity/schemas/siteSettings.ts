import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Paramètres du Site',
  type: 'document',
  groups: [
    { name: 'general', title: 'Général' },
    { name: 'contact', title: 'Contact' },
    { name: 'social', title: 'Réseaux Sociaux' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du Site',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'general',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'general',
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone (Mobile)', 
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'phoneSecondary',
      title: 'Téléphone (Fixe)',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'city',
      title: 'Ville',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'country',
      title: 'Pays',
      type: 'string',
      group: 'contact',
      initialValue: 'Sénégal',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Réseaux Sociaux',
      type: 'object',
      group: 'social',
      fields: [
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'whatsapp', title: 'WhatsApp', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
      ],
    }),
    defineField({
      name: 'workingHours',
      title: 'Horaires d\'Ouverture',
      type: 'object',
      group: 'contact',
      fields: [
        { name: 'weekdays', title: 'Lundi - Vendredi', type: 'string' },
        { name: 'saturday', title: 'Samedi', type: 'string' },
        { name: 'sunday', title: 'Dimanche', type: 'string' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
})
