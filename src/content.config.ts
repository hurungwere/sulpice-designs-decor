import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(['Residential', 'Commercial', 'Events']),
      location: z.string(),
      year: z.number(),
      cover: image(),
      summary: z.string(),
      scope: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      order: z.number().default(99),
    }),
});

export const collections = { projects };
