import serviceResidential from '@/assets/service-residential.jpg';
import serviceEvents from '@/assets/service-events.jpg';
import serviceConsultation from '@/assets/service-consultation.jpg';
import serviceCommercial from '@/assets/service-commercial.jpg';

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: ImageMetadata;
  icon: string;
  features: string[];
  price: string;
  duration: string;
}

export const SERVICES: Service[] = [
  {
    slug: 'tents-pergolas',
    title: 'Tents & Pergolas',
    tagline: 'Shelter that sets the scene',
    description:
      'A full range of tents and pergolas to frame your event — from intimate garden ceremonies to grand receptions, styled and installed by our own crew.',
    image: serviceCommercial,
    icon: 'lucide:archive',
    features: [
      'Wedding marquees & outdoor pergolas',
      'Garden, veranda & rooftop setups',
      'Lighting, draping & comfort extras',
      'Installation, styling & breakdown',
    ],
    price: 'Quotation',
    duration: 'Scoped around your date',
  },
  {
    slug: 'tables-chairs',
    title: 'Tables, Chairs & Glassware',
    tagline: 'Sit, set, celebrate',
    description:
      'Trendy tables, plush chairs, and complete glassware from bar sets to toasting flutes — everything your seating plan calls for, under one roof.',
    image: serviceResidential,
    icon: 'lucide:armchair',
    features: [
      'Trendy table ranges for any guest count',
      'Plush, formal & casual seating',
      'Glassware, bar & serving sets',
      'Room sets arranged to your layout',
    ],
    price: 'Quotation',
    duration: 'Scoped around your date',
  },
  {
    slug: 'crockery-linen',
    title: 'Crockery & Linen',
    tagline: 'Luxe foundations',
    description:
      'Luxurious linen and complete crockery collections that bring polish to every table — white-tie formal or relaxed and colourful.',
    image: serviceEvents,
    icon: 'lucide:utensils-crossed',
    features: [
      'Luxurious linens in a trending range',
      'Full crockery: plates, bowls & serving ware',
      'Place settings for formal & casual events',
      'Matching themes across the whole table',
    ],
    price: 'Quotation',
    duration: 'Scoped around your date',
  },
  {
    slug: 'florals-accessories',
    title: 'Florals & Accessories',
    tagline: 'The finishing touches',
    description:
      'Flowers and fancy accessories that make all the difference — ceremony arches, centrepieces, and the details your guests will remember.',
    image: serviceConsultation,
    icon: 'lucide:flower-2',
    features: [
      'Fresh floral styling & arrangements',
      'Ceremony arches & table florals',
      'Fancy accessories & decorative touches',
      'Bespoke packages for any theme',
    ],
    price: 'Quotation',
    duration: 'Scoped around your date',
  },
];

export const PROCESS = [
  {
    step: '01',
    title: 'Consult',
    description:
      'We listen first — your date, venue, guest list, and the look you love. Every quotation is tailored, detailed, and free.',
    icon: 'lucide:search',
  },
  {
    step: '02',
    title: 'Plan',
    description:
      'We design the full picture: tents, tables, linen, florals, and accessories matched to your theme and budget.',
    icon: 'lucide:palette',
  },
  {
    step: '03',
    title: 'Deliver',
    description:
      'Our own trucks and experienced crew handle delivery and setup, so everything arrives right, on time, and stress-free.',
    icon: 'lucide:truck',
  },
  {
    step: '04',
    title: 'Style',
    description:
      'We style every surface to the last detail — and return after your event to pack and clear it all away.',
    icon: 'lucide:sparkles',
  },
] as const;