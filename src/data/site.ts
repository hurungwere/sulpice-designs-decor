export const SITE = {
  name: 'Sulpice Designs Decor',
  shortName: 'Sulpice',
  tagline: 'Events décor & hiring services',
  description:
    'Sulpice Designs Decor is a premium events décor and hiring services company, styling weddings, corporate events, and celebrations of every kind across Zimbabwe and South Africa.',
  url: 'https://www.sulpicedesigns.com',
  locale: 'en_US',
  ogImage: '/og-default.jpg',
  email: 'hello@sulpicedesigns.com',
  phone: '+263 244 334 455',
  phoneHref: '+263244334455',
  whatsapp: '+263 244 334 455',
  address: {
    street: '24 Atelier Row, Showroom 3',
    city: 'Harare',
    region: 'Zimbabwe',
    postal: '',
    country: 'Zimbabwe',
  },
  showrooms: [
    'Harare, Zimbabwe',
    'Bulawayo, Zimbabwe',
    'Fourways, Johannesburg, South Africa',
  ],
  hours: [
    { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
    { day: 'Saturday', time: '10:00 AM – 4:00 PM' },
    { day: 'Sunday', time: 'By appointment' },
  ],
  socials: [
    { name: 'Instagram', href: 'https://instagram.com', icon: 'lucide:instagram' },
    { name: 'Facebook', href: 'https://facebook.com', icon: 'lucide:facebook' },
    { name: 'WhatsApp', href: 'https://wa.me/263244334455', icon: 'lucide:message-circle' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'lucide:linkedin' },
  ],
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
  ],
  stats: [
    { value: '2008', label: 'Established' },
    { value: '18+', label: 'Years of experience' },
    { value: '3', label: 'Showrooms in ZW & ZA' },
    { value: '100%', label: 'Delivered by our own fleet' },
  ],
} as const;

export const PROJECT_TYPES = [
  'Wedding décor',
  'Corporate event',
  'Birthday party',
  'Full event hire',
  'Other',
] as const;

export const BUDGET_RANGES = [
  'Under $10k',
  '$10k – $25k',
  '$25k – $50k',
  '$50k – $100k',
  '$100k+',
] as const;
