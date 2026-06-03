export const siteConfig = {
  name: 'MÉDECIN AUTO',
  tagline: 'We take care of your vehicle like a doctor cares for their patients.',
  description:
    'Premium Platform for Automotive Services and Mobility in Senegal. Repair, rental, and vehicle sales.',
  url: 'https://medecinauto.sn',
  locale: 'fr_SN',
  defaultSeo: {
    title: 'MÉDECIN AUTO — Premium Platform for Automotive Services and Mobility',
    description:
      'Diagnostics, maintenance, engine repair, rental and vehicle sales in Senegal. Professional and fast automotive service.',
  },
  contact: {
    phone: '+221 78 505 47 10',
    phoneSecondary: '+221 33 805 78 87',
    email: 'contact@medecinauto.com',
    address: 'Cité Apix, Dakar, Sénégal',
  },
  social: {
    facebook: 'https://facebook.com/medecinauto',
    instagram: 'https://instagram.com/medecinauto',
    whatsapp: 'https://wa.me/221785054710',
  },
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Vehicles', href: '/vehicles' },
    { label: 'Rentals', href: '/rentals' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ] as const,
}

export type SiteConfig = typeof siteConfig
