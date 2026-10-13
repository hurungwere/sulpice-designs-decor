# Modernize Sulpice — working plan

**Goal:** shed the generic "AI template" feel and read like a crafted, modern design
studio: grid-driven, editorial, motion-rich, systematic — as if a real team built it.

**Direction:** Editorial / systematic studio. Mono micro-labels + index numbers,
hairline rules, generous whitespace, asymmetric grids, purposeful motion, varied
section structures. Keep the deep-teal + metallic-gold + charcoal brand palette.

> Each task is intentionally small. We do them bit by bit, build-check, review, repeat.

---

## 0. Safety net
- [x] Snapshot pre-branding (`.backup/pre-branding-*`) + `./restore-pre-branding.sh`

## 1. Foundation — type & system
- [x] Brand palette remap (deep teal / metallic gold / crisp charcoal)
- [x] Body font → Quicksand
- [x] Install `@fontsource-variable/jetbrains-mono`
- [x] Register `--font-mono` token
- [x] System utilities: `.mono-label`, `.index-num`, marquee keyframes, grain overlay
- [x] Import mono font in `BaseLayout`

## 2. Motion layer
- [x] Astro `ClientRouter` (page transitions)
- [x] Scroll progress bar
- [x] Reveal upgrade: clip/mask + stagger, init on `astro:page-load`
- [x] Respect `prefers-reduced-motion`

## 3. Global chrome
- [x] Header: mono nav labels, animated active underline, refined mark
- [x] Footer: align to system (mono column labels, index)
- [x] Button: refine hover (less bouncy, calmer easing)

## 4. Signature components
- [x] `Ticker` / `Marquee` component
- [x] `ServicesShowcase` — interactive list ↔ image swap
- [x] `WorkGrid` — asymmetric editorial featured grid
- [x] `StatsCounters` — animated numbers
- [x] Manifesto band (full-bleed teal, big statement)
- [x] `Testimonials` redesign — editorial, not centered card

## 5. Pages
- [x] Rebuild homepage as an editorial flow
- [x] Refine About / Services / Portfolio / Contact for consistency
- [x] 404 polish

## 6. Real copy (WEBSITE CONTENT.docx)
- [x] Pivot copy to events décor & hiring: Harare, Bulawayo & Fourways; est. 2008
- [x] Services → product lines (tents, tables/chairs/glassware, crockery & linen, florals)
- [x] About → story, vision & mission, why-choose-us, products
- [x] Portfolio/testimonials/contact aligned to events + southern Africa
- [x] Homepage, hero, manifesto, CTA, footer copy updated

## 6. Verify
- [x] `astro check` clean
- [x] `npm run build` green (6 pages)
- [x] Refresh portable `preview/` + reopen

## 7. Widget-by-widget modernization pass
- [x] Button, Header, MobileMenu — tactile press, metallic gold CTA, indexed drawer nav
- [x] Hero (scroll cue + reduced-motion) & Marquee (display/outline support, glow separators)
- [x] IntroSection, StatsCounters (tabular), SectionHeading
- [x] HireCatalogue — hover lift, gradient arrow chip, image scrim
- [x] Manifesto & CTABanner — gold hairline + watermark monogram
- [x] Testimonials — quote panel card, rating chip, restructured footer
- [x] WorkSection/WorkGrid — gradient arrow chip, scrim, ring framing
- [x] Footer — showroom list, watermark, mobile menu telephone pill
- [x] PageHero — radial glows + bottom gold hairline; about/services cards lift
- [x] ContactForm + contact page — gradient submit, WhatsApp row, real social icons
- [x] PortfolioGallery — gold filter pill, gradient chips; 404 outline watermark
- [x] Preview fix — quote-preserving relative-path rewrite (root `_astro/…`, nested `../_astro/…`); verified clean

---

### Notes
- Roll back anytime: `./restore-pre-branding.sh` (restores warm palette snapshot).
- Builds are ~70s; we batch a small group of related edits per build.
- `file://` preview: styles/images/SSR content render; React islands hydrate only under `npm run dev`.
