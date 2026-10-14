export const SITE = {
  name: 'Sulpice Designs Decor',
  legalName: 'Sulpice Designs (Pvt) Ltd',
  motto: 'Where every wish is catered for, and dreams are made real.',
  shortName: 'Sulpice',
  tagline: 'Events décor & hiring services',
  description:
    'Sulpice Designs Decor is a premium events décor and hiring services company, styling weddings, corporate events, and celebrations of every kind across Zimbabwe and South Africa.',
  url: 'https://www.sulpicedesigns.com',
  locale: 'en_US',
  ogImage: '/og-default.jpg',
  email: 'hello@sulpicedesigns.com',
  phone: '+263 772 335 903',
  phoneHref: '+263772335903',
  landline: '+263 242 218 028',
  landlineHref: '+263242218028',
  whatsapp: '+263 772 335 903',
  branchContacts: [
    { region: 'Harare, Zimbabwe', phone: '+263 772 335 903', phoneHref: '+263772335903' },
    { region: 'Bulawayo, Zimbabwe', phone: '+263 719 335 903', phoneHref: '+263719335903' },
    { region: 'South Africa', phone: '+27 61 830 6514', phoneHref: '+27618306514' },
  ],
  address: {
    street: '28 Midlothian Ave, Eastlea',
    city: 'Harare',
    region: 'Zimbabwe',
    postal: '',
    country: 'Zimbabwe',
  },
  showrooms: [
    '28 Midlothian Ave, Eastlea, Harare, Zimbabwe',
    'Bulawayo, Zimbabwe',
    '23 Richard Road, Broadacres, Fourways, Johannesburg',
  ],
  /** Regional network, in the same order as showrooms / branchContacts. */
  hubs: [
    {
      name: 'Harare Headquarters',
      role: 'Regional operations & training hub',
      mapQuery: '28 Midlothian Ave, Eastlea, Harare, Zimbabwe',
    },
    {
      name: 'Bulawayo Branch',
      role: 'Operations centre — décor, events & hire',
      mapQuery: 'Bulawayo, Zimbabwe',
    },
    {
      name: 'Johannesburg Studio',
      role: 'Creative & concept design hub',
      mapQuery: '23 Richard Road, Broadacres, Fourways, Johannesburg, South Africa',
    },
  ],
  hours: [
    { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
    { day: 'Saturday', time: '10:00 AM – 4:00 PM' },
    { day: 'Sunday', time: 'By appointment' },
  ],
  socials: [
    { name: 'Instagram', href: 'https://instagram.com', icon: 'lucide:instagram' },
    { name: 'Facebook', href: 'https://facebook.com', icon: 'lucide:facebook' },
    { name: 'WhatsApp', href: 'https://wa.me/263772335903', icon: 'lucide:message-circle' },
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
    { value: '3', label: 'Regional hubs' },
    { value: '2', label: 'Countries served' },
  ],
} as const;

/** Highlighted client engagements, from the client's corporate profile. */
export const CLIENTS = [
  { name: 'National Defence College', short: 'NDC', scope: 'Army graduations' },
  { name: 'Reserve Bank of Zimbabwe', short: 'RBZ', scope: 'Exhibition stands' },
  { name: 'Toyota CFAO', short: 'Toyota CFAO', scope: 'Showroom Christmas décor' },
  { name: 'Colcom', short: 'Colcom', scope: 'Showroom Christmas décor' },
  { name: 'AFC Insurance', short: 'AFC Insurance', scope: 'Sports day & VIP lounge' },
  { name: 'National Bakeries Association of Zimbabwe', short: 'National Bakeries Assoc.', scope: 'Industry conferences' },
] as const;

export const TEAM = [
  {
    name: 'Mrs. Linah Mapondera',
    role: 'Managing Director & Lead Consultant',
    note: 'Event management & wedding planning — 18 years. Interior design; business administration.',
  },
  {
    name: 'Mr. Tatenda Mapondera',
    role: 'Technical Director',
    note: 'Electrical engineer with 25 years’ experience — technical set-up, power and structural safety.',
  },
  {
    name: 'Miss Tanya Drums',
    role: 'Head of Floristry & Creative',
    note: 'Floral aesthetics, bespoke arrangement concepts and spatial creative direction.',
  },
  {
    name: 'Mrs. Washaya',
    role: 'Head of Sales & Commercial Marketing',
    note: 'Client engagement, corporate partnerships and brand expansion.',
  },
  {
    name: 'Mrs. Brenda Drums',
    role: 'Executive Secretary & Operations Administrator',
    note: 'Executive secretarial qualifications, University of Zambia.',
  },
] as const;

/** Equipment inventory, from the corporate profile. */
export const INVENTORY = [
  { category: 'Premium seating', items: 'Ghost, Phoenix and Louis chairs; velvet accent seating' },
  { category: 'Tables & bar stations', items: 'High-gloss white round and rectangular tables, mirror tables, cocktail bars' },
  { category: 'Structures & tents', items: 'Transparent and clear-span tents, stretch tents, high-peak gazebos, cabana tents' },
  { category: 'Tablescapes & dining', items: 'Fine linen, glass vases, crystal glassware, charger plates, luxury crockery' },
  { category: 'Lighting & installations', items: 'Chandeliers, fairy-light ceilings, architectural wall and ceiling draping' },
  { category: 'Flooring & walkways', items: 'Mirror walkways, custom vinyl dance floors, carpeted aisles' },
  { category: 'Logistics & fleet', items: 'Dedicated commercial trucks for regional delivery' },
] as const;

export const PROJECT_TYPES = [
  'Wedding décor',
  'Corporate event or VIP lounge',
  'Conference or exhibition stand',
  'Birthday or private celebration',
  'Church or community event',
  'Event printing & branding',
  'SEWA masterclass enquiry',
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
