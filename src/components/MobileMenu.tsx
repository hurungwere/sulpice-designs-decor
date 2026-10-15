import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

interface Props {
  nav: NavItem[];
  phone: string;
  phoneHref: string;
  logoSrc?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function MobileMenu({ nav, phone, phoneHref, logoSrc }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        className="nav-link group flex h-10 w-10 flex-col items-end justify-center gap-[7px] lg:hidden"
      >
        <span className="h-px w-7 bg-current transition-all duration-500 group-hover:w-5" />
        <span className="h-px w-5 bg-current transition-all duration-500 group-hover:w-7" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[60] flex flex-col bg-teal-900 px-6 pb-10 pt-5 text-cream lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="flex items-center justify-between">
              <a href="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                {logoSrc && <img src={logoSrc} alt="" className="h-10 w-auto" />}
                <span className="flex flex-col leading-none">
                  <span className="font-display text-xl font-medium uppercase tracking-[0.2em]">
                    Sulpice
                  </span>
                  <span className="mt-1 text-[0.56rem] uppercase tracking-[0.42em] text-gold-300">
                    Designs &amp; Decor
                  </span>
                </span>
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center text-cream/80 transition-colors hover:text-gold-300"
              >
                <X className="h-6 w-6" strokeWidth={1} aria-hidden="true" />
              </button>
            </div>

            <nav className="mt-16 flex flex-col" aria-label="Mobile primary">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.8, ease }}
                  className="group flex items-baseline gap-5 border-b border-cream/10 py-5"
                >
                  <span className="font-display text-sm italic text-silver-400">
                    {['I', 'II', 'III', 'IV', 'V', 'VI'][i] ?? i + 1}
                  </span>
                  <span className="font-display text-[2.6rem] leading-none text-cream transition-colors duration-500 group-hover:text-gold-300">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="mt-auto space-y-6 pt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-cream/50">
                Harare · Bulawayo · Fourways
              </p>
              <a
                href={`tel:${phoneHref}`}
                className="block font-display text-2xl text-cream transition-colors hover:text-gold-300"
              >
                {phone}
              </a>
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex h-14 w-full items-center justify-center bg-gold-gradient text-[0.68rem] uppercase tracking-[0.28em] text-ink"
              >
                Request a quote
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
