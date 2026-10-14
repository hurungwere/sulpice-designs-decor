import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import type { GalleryItem } from '@/utils/portfolio';

const CATEGORY_LABELS: Record<string, string> = {
  All: 'All',
  Residential: 'Interiors',
  Commercial: 'Commercial',
  Events: 'Events',
};

interface Props {
  items: GalleryItem[];
  showFilter?: boolean;
  filters?: string[];
  idPrefix?: string;
}

export default function PortfolioGallery({
  items,
  showFilter = true,
  filters = ['All', 'Residential', 'Commercial', 'Events'],
  idPrefix = 'gallery',
}: Props) {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const visible = useMemo(
    () => (active === 'All' ? items : items.filter((i) => i.category === active)),
    [active, items]
  );

  return (
    <div>
      {showFilter && (
        <div
          role="tablist"
          aria-label="Filter events by category"
          className="mb-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-b border-cream/10"
        >
          {filters.map((filter) => {
            const isActive = active === filter;
            const count =
              filter === 'All' ? items.length : items.filter((i) => i.category === filter).length;
            if (filter !== 'All' && count === 0) return null;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(filter)}
                className={[
                  'relative -mb-px pb-5 text-[0.66rem] font-[450] uppercase tracking-[0.3em] transition-colors duration-500',
                  isActive ? 'text-cream' : 'text-cream/50 hover:text-cream',
                ].join(' ')}
              >
                {CATEGORY_LABELS[filter] ?? filter}
                <sup className="ml-1.5 font-display text-xs normal-case italic tracking-normal text-gold-300">
                  {count}
                </sup>
                {isActive && (
                  <motion.span
                    layoutId={`${idPrefix}-underline`}
                    className="absolute inset-x-0 bottom-0 h-px bg-gold"
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      <motion.div
        layout
        className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((item, i) => (
            <motion.figure
              layout
              key={item.id}
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <button
                type="button"
                onClick={() => setSelected(item)}
                aria-label={`View ${item.title}`}
                className="block w-full cursor-zoom-in text-left"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-cream-50">
                  <img
                    src={item.src}
                    srcSet={item.srcSet}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                    width={item.width}
                    height={item.height}
                    alt={`${item.title} — ${item.category} event in ${item.location}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                </div>
                <figcaption className="mt-6 flex items-baseline gap-5 border-b border-cream/15 pb-5">
                  <span className="font-display text-lg italic text-gold-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-[1.75rem] leading-tight text-cream transition-colors duration-500 group-hover:text-gold-300">
                      {item.title}
                    </span>
                    <span className="mt-2 block text-[0.6rem] uppercase tracking-[0.3em] text-muted-400">
                      {CATEGORY_LABELS[item.category] ?? item.category} · {item.location}
                    </span>
                  </span>
                </figcaption>
              </button>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setSelected(null)}
              className="absolute inset-0 h-full w-full cursor-zoom-out bg-teal-900/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid w-full max-w-6xl overflow-hidden bg-ink md:grid-cols-[1.5fr_1fr]"
            >
              <img
                src={selected.src}
                srcSet={selected.srcSet}
                sizes="(min-width: 768px) 60vw, 92vw"
                width={selected.width}
                height={selected.height}
                alt={`${selected.title} — ${selected.category} event`}
                className="max-h-[50vh] w-full object-cover md:h-full md:max-h-[80vh]"
              />
              <div className="flex flex-col p-8 md:p-12">
                <p className="text-[0.6rem] uppercase tracking-[0.32em] text-gold-300">
                  {CATEGORY_LABELS[selected.category] ?? selected.category} · {selected.year}
                </p>
                <h3 className="mt-5 font-display text-4xl leading-tight text-cream md:text-5xl">
                  {selected.title}
                </h3>
                <p className="mt-3 text-sm text-muted">{selected.location}</p>
                {selected.scope.length > 0 && (
                  <ul className="mt-10 border-t border-cream/10">
                    {selected.scope.map((tag) => (
                      <li
                        key={tag}
                        className="flex items-center gap-4 border-b border-cream/10 py-3 text-sm text-cream/80"
                      >
                        <span className="diamond" aria-hidden="true" />
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
                <a
                  href="/contact"
                  className="link-hairline mt-auto self-start pt-10 text-cream hover:text-gold-300"
                >
                  Enquire about a similar event
                </a>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center bg-ink/70 text-cream backdrop-blur-sm transition-colors hover:text-gold-300"
              >
                <X className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
