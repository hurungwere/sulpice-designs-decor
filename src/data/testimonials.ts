export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'From the ceremony arch to the last dance, our entire wedding was a dream. Every chair, candle, and chair cover was exactly what we pictured.',
    name: 'Amara & Daniel Moyo',
    role: 'Wedding décor & hiring',
    location: 'Borrowdale, Harare',
    rating: 5,
    initials: 'AM',
  },
  {
    quote:
      'Our end-of-year function looked effortless. Set up on time, styled beautifully, and packed away by morning — the team handled everything.',
    name: 'Lerato Dlamini',
    role: 'Corporate event',
    location: 'Fourways, Johannesburg',
    rating: 5,
    initials: 'LD',
  },
  {
    quote:
      'I wanted something elegant and intimate for our lakeside ceremony. The tents, linen, and florals came together like a film set.',
    name: 'Priya Nair',
    role: 'Wedding styling',
    location: 'Victoria Falls',
    rating: 5,
    initials: 'PN',
  },
  {
    quote:
      'They handled everything — tables, glassware, flowers — so we simply turned up and enjoyed. No stress, no chasing, no surprises.',
    name: 'Sipho Ngwenya',
    role: 'Birthday celebration',
    location: 'Bulawayo',
    rating: 5,
    initials: 'SN',
  },
  {
    quote:
      'Professional, punctual, and genuinely creative. The trucks arrived on time and the setup was flawless from the first table to the last.',
    name: 'Simba Chikore',
    role: 'Product launch',
    location: 'Cape Town',
    rating: 5,
    initials: 'SC',
  },
];
