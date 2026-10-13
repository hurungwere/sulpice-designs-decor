import { useState, type SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';

interface Props {
  projectTypes: readonly string[];
  budgets: readonly string[];
}

type Status = 'idle' | 'submitting' | 'success' | 'error';
interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const field =
  'w-full rounded-2xl border border-charcoal/15 bg-cream-50 px-4 py-3 text-sm text-charcoal placeholder:text-muted-400 transition-[border-color,background-color] hover:border-charcoal/30 focus:border-gold focus:bg-cream focus:outline-none';
const labelCls = 'mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-clay';

export default function ContactForm({ projectTypes, budgets }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});

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
    const data = new FormData(form);
    const key = import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined;

    try {
      if (key) {
        data.append('access_key', key);
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error('Request failed');
      } else {
        const body = new URLSearchParams(
          Array.from(data.entries()).map(([k, v]) => [k, String(v)])
        ).toString();
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        });
        if (!res.ok) throw new Error('Request failed');
      }
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form
      name="contact"
      method="POST"
      action="/contact?success=true"
      onSubmit={handleSubmit}
      className="space-y-6"
      aria-label="Event enquiry form"
      {...{ 'data-netlify': 'true', 'netlify-honeypot': 'bot-field' }}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Do not fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
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
            <p id="name-error" className="mt-2 text-xs text-red-600">
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
            <p id="email-error" className="mt-2 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
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
          <p id="message-error" className="mt-2 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-gold-gradient group inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium text-ink shadow-[0_14px_32px_-20px_rgba(184,134,11,0.9)] transition-all duration-300 hover:brightness-[1.06] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send enquiry
            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
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
              className="flex items-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-800"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
              Thank you — your enquiry is on its way. We'll reply within one business day.
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
              Something went wrong. Please email us directly at hello@sulpicedesigns.com.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <p className="text-xs text-muted-400">
        By submitting, you agree to be contacted about your enquiry. We never share
        your details.
      </p>
    </form>
  );
}
