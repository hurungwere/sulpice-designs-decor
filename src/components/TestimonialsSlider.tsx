import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  initials: string;
}

interface Props {
  items: Testimonial[];
  autoplayMs?: number;
}

export default function TestimonialsSlider({ items, autoplayMs = 7000 }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex((next + items.length) % items.length);
    },
    [items.length]
  );

  const paginate = useCallback((dir: number) => go(index + dir, dir), [go, index]);

  useEffect(() => {
    if (paused || autoplayMs <= 0) return;
    const timer = window.setInterval(() => paginate(1), autoplayMs);
    return () => window.clearInterval(timer);
  }, [paused, autoplayMs, paginate]);

  const active = items[index];
  const pct = ((index + 1) / items.length) * 100;

  return (
    <div
      className="relative"
      role="group"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') paginate(-1);
        if (e.key === 'ArrowRight') paginate(1);
      }}
      tabIndex={0}
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
        <div className="relative min-h-[18rem] sm:min-h-[15rem]">
          <span
            aria-hidden="true"
            className="text-gold-gradient font-display text-6xl leading-none"
          >
            &ldquo;
          </span>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={index}
              custom={direction}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction * -24 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              aria-live="polite"
            >
              <div className="rounded-3xl bg-cream-50 p-7 shadow-card ring-1 ring-charcoal/5 md:p-10">
                <div className="flex items-start justify-between gap-4">
                  <span
                    aria-hidden="true"
                    className="-mb-6 text-gold-gradient font-display text-6xl leading-none"
                  >
                    &ldquo;
                  </span>
                  <span
                    className="mt-1 flex gap-0.5"
                    aria-label={`${active.rating} out of 5 stars`}
                  >
                    {Array.from({ length: active.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-gold-600 text-gold-600"
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                </div>

                <p className="mt-7 max-w-4xl text-balance font-display text-2xl leading-[1.35] text-charcoal md:text-[2rem] md:leading-[1.3]">
                  {active.quote}
                </p>

                <footer className="mt-9 flex flex-wrap items-center gap-4">
                  <span className="bg-gold-gradient flex h-12 w-12 items-center justify-center rounded-full font-mono text-xs font-medium text-ink">
                    {active.initials}
                  </span>
                  <span>
                    <span className="block font-mono text-xs uppercase tracking-[0.16em] text-charcoal">
                      {active.name}
                    </span>
                    <span className="mt-1 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-400">
                      {active.role} · {active.location}
                    </span>
                  </span>
                </footer>
              </div>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-6 lg:items-end">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-colors hover:border-gold-600 hover:text-gold-600"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-colors hover:border-gold-600 hover:text-gold-600"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-charcoal">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="relative h-px w-28 bg-charcoal/15">
              <span
                className="absolute inset-y-0 left-0 bg-gold-gradient transition-[width] duration-500"
                style={{ width: `${pct}%` }}
              />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-400">
              {String(items.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Testimonial {index + 1} of {items.length}
      </p>
    </div>
  );
}
