import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

interface Props {
  nav: NavItem[];
  phone: string;
  phoneHref: string;
}

export default function MobileMenu({ nav, phone, phoneHref }: Props) {
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
        className="nav-link inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/25 transition-colors hover:border-gold hover:text-gold-600 lg:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-ink/50 backdrop-blur-sm"
            />

            <motion.aside
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-ink px-7 pb-8 pt-6 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient font-display text-base text-ink">
                    S
                  </span>
                  <span className="flex flex-col leading-none">
                    <span className="font-display text-base tracking-tight text-cream">
                      Sulpice
                    </span>
                    <span className="mt-0.5 text-[0.55rem] font-medium uppercase tracking-[0.24em] text-gold-600">
                      Designs &amp; Decor
                    </span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold-600"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav className="mt-12 flex flex-col" aria-label="Mobile primary">
                {nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.4 }}
                    className="group flex items-center gap-5 border-b border-cream/10 py-4"
                  >
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-gold-600">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-2xl text-cream transition-colors group-hover:text-gold-600">
                      {item.label}
                    </span>
                    <ArrowRight className="ml-auto h-5 w-5 -translate-x-1 text-cream/40 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto space-y-5 pt-8">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-400">
                  Showrooms — Harare · Bulawayo · Fourways
                </p>
                <a
                  href={`tel:${phoneHref}`}
                  className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-gold-600"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {phone}
                </a>
                <a
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="bg-gold-gradient flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-ink shadow-[0_14px_32px_-20px_rgba(184,134,11,0.9)]"
                >
                  Get a quotation
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
