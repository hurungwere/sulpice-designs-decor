import { getImage } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Events';
  location: string;
  year: number;
  scope: string[];
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

/**
 * Turns content-collection entries into plain, serialisable objects with
 * Astro-optimised image sources, safe to pass into a hydrated React island.
 */
export async function toGalleryItems(
  entries: CollectionEntry<'projects'>[]
): Promise<GalleryItem[]> {
  return Promise.all(
    entries.map(async (entry) => {
      const cover = entry.data.cover;
      const img = await getImage({
        src: cover,
        widths: [480, 800, 1200, 1600],
        format: 'webp',
        quality: 82,
      });

      return {
        id: entry.id,
        title: entry.data.title,
        category: entry.data.category,
        location: entry.data.location,
        year: entry.data.year,
        scope: entry.data.scope,
        src: img.src,
        srcSet: img.srcSet.attribute,
        width: cover.width,
        height: cover.height,
      } satisfies GalleryItem;
    })
  );
}
