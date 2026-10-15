import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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

  return (
    <div
      className="relative mx-auto max-w-5xl text-center outline-none"
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
      <div className="relative grid min-h-[22rem] place-items-center sm:min-h-[19rem] md:min-h-[17rem]">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.blockquote
            key={index}
            custom={direction}
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            aria-live="polite"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) paginate(1);
              else if (info.offset.x > 60) paginate(-1);
            }}
            className="cursor-grab touch-pan-y select-none active:cursor-grabbing"
          >
            <p className="text-balance font-display text-[1.9rem] font-light italic leading-[1.3] text-cream sm:text-[2.4rem] md:text-[3rem] md:leading-[1.22]">
              &ldquo;{active.quote}&rdquo;
            </p>
            <footer className="mt-10">
              <span className="block text-[0.7rem] font-[450] uppercase tracking-[0.32em] text-cream">
                {active.name}
              </span>
              <span className="mt-2 block text-sm text-muted">
                {active.role} · {active.location}
              </span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-14 flex items-center justify-center gap-8">
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Previous testimonial"
          className="inline-flex h-11 w-11 items-center justify-center text-cream/70 transition-colors hover:text-gold-300"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1} aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2" aria-hidden="true">
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-px transition-all duration-700 ${
                i === index ? 'w-12 bg-gold' : 'w-5 bg-cream/25'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Next testimonial"
          className="inline-flex h-11 w-11 items-center justify-center text-cream/70 transition-colors hover:text-gold-300"
        >
          <ArrowRight className="h-5 w-5" strokeWidth={1} aria-hidden="true" />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        Testimonial {index + 1} of {items.length}
      </p>
    </div>
  );
}
