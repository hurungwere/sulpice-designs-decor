import { useState, type SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface Props {
  projectTypes: readonly string[];
  budgets: readonly string[];
  /** Digits only, e.g. 263772335903 — used for the WhatsApp fallback. */
  whatsapp: string;
  email: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const SUMMARY_FIELDS: [string, string][] = [
  ['name', 'Name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['projectType', 'Event type'],
  ['eventDate', 'Date'],
  ['guests', 'Guests'],
  ['city', 'Location'],
  ['venueNeed', 'Venue'],
  ['budget', 'Budget'],
  ['message', 'Details'],
];

/** Plain-text version of the enquiry, so nothing typed is lost if sending fails. */
function summarise(form: HTMLFormElement) {
  const data = new FormData(form);
  const lines = SUMMARY_FIELDS.map(([key, label]) => {
    const value = String(data.get(key) ?? '').trim();
    return value ? `${label}: ${value}` : '';
  }).filter(Boolean);
  return `Hello Sulpice Designs, I'd like a quotation.\n\n${lines.join('\n')}`;
}
interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const field =
  'w-full rounded-none border-0 border-b border-cream/25 bg-transparent px-0 py-3 text-[0.98rem] text-cream placeholder:text-muted-400 transition-colors duration-500 hover:border-cream/50 focus:border-gold focus:outline-none [&>option]:bg-ink';
const labelCls = 'block text-[0.68rem] font-[450] uppercase tracking-[0.3em] text-gold-300';

export default function ContactForm({ projectTypes, budgets, whatsapp, email }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState('');

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const next: Errors = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (name.length < 2) next.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Please enter a valid email address.';
    if (message.length < 10) next.message = 'A few more details would help (10+ characters).';
    return next;
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }

    setStatus('submitting');
    setSummary(summarise(form));
    const data = new FormData(form);
    const key = import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined;

    // Without a Web3Forms key there is nowhere to deliver the form (static hosting would
    // answer 200 and silently drop it), so go straight to the WhatsApp / email fallback.
    if (!key) {
      setStatus('error');
      return;
    }

    try {
      data.append('access_key', key);
      data.append('subject', `New enquiry — ${String(data.get('projectType') || 'event')}`);
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const waHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(summary)}`;
  const mailHref = `mailto:${email}?subject=${encodeURIComponent('Quotation request')}&body=${encodeURIComponent(summary)}`;

  return (
    <form
      name="contact"
      noValidate
      onSubmit={handleSubmit}
      className="space-y-10"
      aria-label="Event enquiry form"
    >
      {/* Web3Forms honeypot */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={field}
            placeholder="Your full name"
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-xs text-red-300">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelCls}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={field}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-xs text-red-300">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={field}
            placeholder="Optional"
          />
        </div>

        <div>
          <label htmlFor="projectType" className={labelCls}>
            Event type
          </label>
          <select id="projectType" name="projectType" className={field} defaultValue="">
            <option value="" disabled>
              Choose a service
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
        <div>
          <label htmlFor="eventDate" className={labelCls}>
            Event date
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className={field}
          />
        </div>

        <div>
          <label htmlFor="guests" className={labelCls}>
            Number of guests
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            className={field}
            placeholder="Approximate guest count"
          />
        </div>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
        <div>
          <label htmlFor="city" className={labelCls}>
            City / location
          </label>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            className={field}
            placeholder="Harare, Bulawayo, Johannesburg..."
          />
        </div>

        <div>
          <label htmlFor="venueNeed" className={labelCls}>
            Do you need a venue?
          </label>
          <select id="venueNeed" name="venueNeed" className={field} defaultValue="">
            <option value="" disabled>
              Select an option
            </option>
            <option>Yes — please suggest venues</option>
            <option>No — I have a venue</option>
            <option>Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="budget" className={labelCls}>
          Budget range
        </label>
        <select id="budget" name="budget" className={field} defaultValue="">
          <option value="" disabled>
            Select a range
          </option>
          {budgets.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          Tell us about your event *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${field} resize-none`}
          placeholder="Your date, venue, guest count, and the look you love..."
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-xs text-red-300">
            {errors.message}
          </p>
        )}
      </div>

      <label className="flex cursor-pointer items-start gap-4 text-sm leading-relaxed text-muted">
        <input
          type="checkbox"
          name="marketingOptIn"
          value="yes"
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none border border-cream/40 bg-transparent transition-colors checked:border-gold checked:bg-gold"
        />
        <span>Keep me informed about new collections and SEWA masterclass intakes. Optional — unsubscribe any time.</span>
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group inline-flex h-14 w-full items-center justify-center gap-3 bg-gold-gradient px-12 text-[0.68rem] font-[450] uppercase tracking-[0.28em] text-ink transition-colors duration-500 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send enquiry
          </>
        )}
      </button>

      <div aria-live="polite" aria-atomic="true">
        <AnimatePresence>
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 border-l border-gold py-2 pl-4 text-sm text-cream"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-300" strokeWidth={1.25} aria-hidden="true" />
              Thank you — your enquiry is on its way. We'll reply within one business day.
            </motion.p>
          )}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border-l border-gold py-2 pl-5"
            >
              <p className="flex items-center gap-3 text-sm text-cream">
                <AlertCircle className="h-5 w-5 shrink-0 text-gold-300" strokeWidth={1.25} aria-hidden="true" />
                We couldn&rsquo;t send this online just now — but your details are saved below.
              </p>
              <p className="mt-2 text-sm text-muted">
                Send it to us in one tap; everything you typed is already filled in.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center bg-gold-gradient px-7 text-[0.66rem] uppercase tracking-[0.26em] text-ink transition-[filter] hover:brightness-110"
                >
                  Send via WhatsApp
                </a>
                <a
                  href={mailHref}
                  className="inline-flex h-12 items-center border border-cream/35 px-7 text-[0.66rem] uppercase tracking-[0.26em] text-cream transition-colors hover:border-cream hover:bg-cream hover:text-paper"
                >
                  Send by email
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="max-w-xl text-xs leading-relaxed text-muted-400">
        Quotations and bookings are confirmed in writing. Your details are used only to respond
        to this enquiry and are processed in line with South Africa&rsquo;s POPI Act and
        Zimbabwe&rsquo;s Cyber and Data Protection Act — we never sell or share them.
      </p>
    </form>
  );
}
