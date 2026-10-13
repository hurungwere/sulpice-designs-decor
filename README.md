# Sulpice Designs Decor

A modern, high-performance marketing website for **Sulpice Designs Decor**, a boutique
interior design and decor studio. Built with **Astro** (static site generation),
**Tailwind CSS v4**, **React** islands, and **Framer Motion**.

- Elegant, warm, minimalist luxury aesthetic
- Fully responsive, accessible, and SEO-ready
- Optimised imagery via Astro's `<Image />` pipeline (WebP/AVIF, responsive `srcset`)
- Animated hero, scroll reveals, filterable portfolio, testimonial slider, and a
  Netlify/Web3Forms-compatible contact form

---

## Tech stack

| Concern      | Choice                                                        |
| ------------ | ------------------------------------------------------------- |
| Framework    | [Astro 5](https://astro.build) (SSG)                          |
| Styling      | [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` |
| Interactivity| React 19 islands (`@astrojs/react`) + [Motion](https://motion.dev) (Framer Motion) |
| Icons        | [`astro-icon`](https://github.com/natemoo-re/astro-icon) + `lucide-react` |
| Images       | `astro:assets` + `sharp`                                      |
| Fonts        | `@fontsource-variable` — Playfair Display + Inter (self-hosted) |
| SEO          | `@astrojs/sitemap`, Open Graph, Twitter cards, JSON-LD        |

---

## Getting started

Requirements: **Node.js 20+** and npm.

```bash
# 1. install dependencies
npm install

# 2. start the dev server (http://localhost:4321)
npm run dev

# 3. build for production (outputs to ./dist)
npm run build

# 4. preview the production build locally
npm run preview

# optional: type-check Astro + TS
npm run check
```

---

## Project structure

```
sulpice-designs-decor/
├── astro.config.mjs          # Astro + integrations + Tailwind Vite plugin
├── netlify.toml              # Netlify build config
├── tsconfig.json
├── public/                   # static, unprocessed files (favicon, robots, _headers, og image)
├── images/                   # source images supplied by the client (originals)
└── src/
    ├── assets/               # optimised-by-Astro project imagery
    │   └── brand/            # extracted brand marks (wordmark, emblem, tile)
    ├── components/
    │   ├── Header.astro           # sticky nav + transparent-over-hero behaviour
    │   ├── MobileMenu.tsx         # React drawer island (Motion)
    │   ├── Footer.astro           # links, newsletter, socials
    │   ├── Hero.astro             # crossfading full-bleed hero
    │   ├── IntroSection.astro     # brand intro + stats
    │   ├── ServicesGrid.astro     # featured services cards
    │   ├── PortfolioGallery.tsx   # filterable gallery + lightbox island
    │   ├── TestimonialsSlider.tsx # autoplay carousel island
    │   ├── ContactForm.tsx        # Netlify / Web3Forms form island
    │   ├── CTABanner.astro        # lead-capture band
    │   ├── PageHero.astro         # inner-page hero
    │   ├── SectionHeading.astro   # eyebrow + title + lead
    │   ├── Button.astro           # variants: primary/gold/outline/light/ghost
    │   └── SEO.astro              # <head> meta, OG, canonical
    ├── content.config.ts      # content collection schema ("projects")
    ├── content/projects/*.md   # one markdown file per portfolio project
    ├── data/                   # site.ts, services.ts, testimonials.ts
    ├── layouts/BaseLayout.astro# <head>, header, footer, scroll-reveal script
    ├── pages/
    │   ├── index.astro         # Home
    │   ├── about.astro         # About
    │   ├── services.astro      # Services + process + FAQ
    │   ├── portfolio.astro     # Filterable portfolio
    │   ├── contact.astro       # Contact form + studio details
    │   └── 404.astro
    ├── styles/global.css       # Tailwind theme tokens + base + utilities
    └── utils/portfolio.ts      # content → serialisable gallery items
```

---

## Editing content

### Site-wide details
Open `src/data/site.ts` to update the studio name, contact details, hours, social
links, navigation, and headline stats.

### Services & process
Edit `src/data/services.ts`. Each service has `slug`, `title`, `tagline`,
`description`, `features`, `price`, `duration`, and `image`. The Services page and
homepage grid derive from this file; anchors use the `slug`.

### Testimonials
Edit `src/data/testimonials.ts`.

### Portfolio projects
Add a Markdown file to `src/content/projects/`. The frontmatter is validated by
`src/content.config.ts`:

```md
---
title: Windsor House
category: Residential        # Residential | Commercial | Events
location: Pacific Heights, San Francisco
year: 2025
cover: ../../assets/project-1.jpg
summary: A light-filled family home…
scope:
  - Space planning
  - Custom millwork
featured: true               # shows on the homepage preview
order: 1
---

Body copy (optional) shown on detail views.
```

---

## Imagery

The client-supplied originals live in `images/`. They were evaluated and mapped
into optimised asset slots in `src/assets/`. To swap an image, replace the file of
the same name — no code changes required.

| Asset slot(s) | Source in `images/` |
| ------------- | ------------------- |
| `hero-1 / hero-2 / hero-3` | `IMG-…WA0013 / 0016 / 0032` |
| `about-studio / about-founder / about-detail` | `IMG-…WA0012 / 0024 / 0015` |
| `service-residential / -events / -consultation / -commercial` | `IMG-…WA0014 / 0019 / 0020 / 0023` |
| `project-1 … project-14` | `IMG-…WA0022,0025,0026,0028,0029,0030,0031,0033,0034,0035,0036,0037,0017,0018` |
| `cta` | `IMG-…WA0021` |

**Brand marks** were extracted from the supplied logo files and stored in
`src/assets/brand/` (wordmark in dark/light/colour, emblem, and a square tile).
Favicons/icons (`public/apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) are
generated from the colour logo. The `SEWA*` files in `images/` belong to a
different brand and are intentionally unused.

To re-generate the brand marks after replacing a logo, see the extraction logic
used during setup (alpha-from-white → recolour) or ask to have it re-run.

---

## Contact form

`src/components/ContactForm.tsx` posts the enquiry in two modes:

1. **Netlify Forms (default)** — the form carries `data-netlify="true"` and a
   `form-name` field. On Netlify, submissions appear under **Forms** with no
   configuration. Works without JavaScript as a normal form post too.
2. **Web3Forms** — set an access key and the island will submit to Web3Forms
   instead:

   ```bash
   # .env
   PUBLIC_WEB3FORMS_KEY=your-web3forms-access-key
   ```

Validation, inline errors, and success/error states are handled client-side.

---

## Deployment

### Netlify
`netlify.toml` is included (`npm run build` → publish `dist`). Connect the repo and
deploy — Netlify auto-detects it. Security headers and immutable asset caching are
in `public/_headers`.

### Cloudflare Pages
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 20 (set `NODE_VERSION=20` in the Pages environment variables)

`public/_headers` is honoured by Cloudflare Pages for the same cache/security
headers. Update `site` in `astro.config.mjs` and the sitemap URL in
`public/robots.txt` to your production domain.

---

## Accessibility & performance notes

- Semantic landmarks (`header`, `main`, `nav`, `footer`), a skip link, visible
  focus styles, and `aria-*` on interactive controls.
- One `<h1>` per page; logical heading order.
- `prefers-reduced-motion` disables the hero crossfade, reveals, and carousel
  transitions.
- Images use Astro's `<Image />` (responsive `srcset`, WebP/AVIF) with explicit
  dimensions to avoid layout shift; the first hero image is eager/high-priority.
- Fonts are self-hosted and swapped (`font-display: swap` via Fontsource).
- All non-critical sections render on the server; only four small React islands
  hydrate on the client.

---

## License

Private project for Sulpice Designs Decor. All imagery © their respective owners.
