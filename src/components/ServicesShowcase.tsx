import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export interface ShowcaseImage {
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

export interface ShowcaseItem {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image: ShowcaseImage;
}

interface Props {
  items: ShowcaseItem[];
}

export default function ServicesShowcase({ items }: Props) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <ul className="order-2 lg:order-1">
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <li key={item.slug}>
              <a
                href={`/services#${item.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group flex items-baseline gap-5 border-b border-cream/12 py-6"
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="index-num pt-1">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1">
                  <span
                    className={[
                      'block font-display text-2xl leading-tight transition-colors duration-400 md:text-3xl',
                      isActive ? 'text-gold-600' : 'text-cream group-hover:text-gold-600',
                    ].join(' ')}
                  >
                    {item.title}
                  </span>
                  <span className="mt-1.5 block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                    {item.tagline}
                  </span>
                </span>
                <ArrowUpRight
                  className={[
                    'h-5 w-5 shrink-0 text-gold-600 transition-all duration-400',
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60',
                  ].join(' ')}
                  aria-hidden="true"
                />
              </a>
            </li>
          );
        })}
      </ul>

      <div className="order-1 lg:order-2">
        <div className="lg:sticky lg:top-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-100 ring-1 ring-cream/5">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.slug}
                src={current.image.src}
                srcSet={current.image.srcSet}
                sizes="(min-width: 1024px) 46vw, 92vw"
                width={current.image.width}
                height={current.image.height}
                alt={`${current.title} by Sulpice Designs Decor`}
                loading="lazy"
                decoding="async"
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-gold-300">
                {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/90">
                {current.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
