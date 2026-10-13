import { getImage } from 'astro:assets';
import { SERVICES } from '@/data/services';
import type { ShowcaseItem } from '@/components/ServicesShowcase';

/**
 * Turns the service definitions into plain, serialisable objects with
 * Astro-optimised image sources, safe to pass into a hydrated React island.
 */
export async function toShowcaseItems(): Promise<ShowcaseItem[]> {
  return Promise.all(
    SERVICES.map(async (service) => {
      const img = await getImage({
        src: service.image,
        widths: [480, 720, 960],
        format: 'webp',
        quality: 82,
      });

      return {
        slug: service.slug,
        title: service.title,
        tagline: service.tagline,
        description: service.description,
        features: service.features,
        image: {
          src: img.src,
          srcSet: img.srcSet.attribute,
          width: service.image.width,
          height: service.image.height,
        },
      } satisfies ShowcaseItem;
    })
  );
}
