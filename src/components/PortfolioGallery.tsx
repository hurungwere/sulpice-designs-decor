import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ArrowUpRight, MapPin, Calendar } from 'lucide-react';
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
          aria-label="Filter projects by category"
          className="mb-10 flex flex-wrap items-center gap-2"
        >
          {filters.map((filter) => {
            const isActive = active === filter;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(filter)}
                className={[
                  'relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300',
                  isActive ? 'text-ink' : 'text-cream/75 hover:text-gold-600',
                ].join(' ')}
              >
                {isActive && (
                  <motion.span
                    layoutId={`${idPrefix}-pill`}
                    className="bg-gold-gradient absolute inset-0 -z-10 rounded-full shadow-[0_10px_24px_-14px_rgba(184,134,11,0.9)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {CATEGORY_LABELS[filter] ?? filter}
              </button>
            );
          })}
        </div>
      )}

      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((item) => (
            <motion.figure
              layout
              key={item.id}
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl bg-cream-100 ring-1 ring-cream/5"
            >
              <button
                type="button"
                onClick={() => setSelected(item)}
                aria-label={`View ${item.title}`}
                className="block w-full text-left"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={item.src}
                    srcSet={item.srcSet}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    width={item.width}
                    height={item.height}
                    alt={`${item.title} — ${item.category} project in ${item.location}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                    aria-hidden="true"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-clay backdrop-blur-sm">
{CATEGORY_LABELS[item.category] ?? item.category}
                  </span>
                  <span className="bg-gold-gradient absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full text-ink opacity-0 shadow-[0_10px_24px_-12px_rgba(184,134,11,0.9)] transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 text-cream">
                    <h3 className="font-display text-xl leading-snug">{item.title}</h3>
                    <p className="mt-1 flex items-center gap-2 text-xs text-cream/75">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.location}
                    </p>
                  </figcaption>
                </div>
              </button>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
          >
            <button
              type="button"
              aria-label="Close project"
              onClick={() => setSelected(null)}
              className="absolute inset-0 h-full w-full cursor-zoom-out bg-ink/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-ink shadow-2xl"
            >
              <img
                src={selected.src}
                srcSet={selected.srcSet}
                sizes="(min-width: 768px) 720px, 92vw"
                width={selected.width}
                height={selected.height}
                alt={`${selected.title} — ${selected.category} project`}
                className="max-h-[52vh] w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close project"
                className="bg-gold-gradient absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink shadow-[0_10px_24px_-12px_rgba(184,134,11,0.9)] transition-transform hover:scale-105"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium uppercase tracking-[0.16em] text-cream/60">
                  <span>{CATEGORY_LABELS[selected.category] ?? selected.category}</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {selected.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    {selected.year}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-3xl text-cream">{selected.title}</h3>
                {selected.scope.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {selected.scope.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-cream/15 px-3 py-1 text-xs text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
