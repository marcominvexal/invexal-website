# Invexal — Enterprise AI Redesign

A complete redesign package that repositions Invexal from "IoT experts" to an **Enterprise AI transformation partner** (AI Agents · Computer Vision · AIoT · Intelligent Automation), benchmarked against Folio3 AI's structure and enterprise positioning — with entirely original design and content.

## What's in this package

```
invexal-redesign/
├── docs/
│   ├── 01-sitemap.md              Full IA: every route, nav model, internal-link map
│   ├── 02-design-system.md        Tokens, palette, type, spacing, components, signature
│   ├── 03-page-blueprints.md      Section-by-section wireframes for every page template
│   ├── 04-seo-strategy.md         Keyword map, metadata rules, schema plan, sitemap/robots
│   ├── 05-content-guide.md        Voice & tone, homepage copy, page copy patterns
│   ├── 06-cms-schema.md           Sanity content model (documents, objects, references)
│   ├── 07-animation-plan.md       Framer Motion / GSAP choreography, per section
│   └── 08-asset-inventory.md      Reusable brand assets extracted from invexal.com
└── web/                           Next.js 15 (App Router, TypeScript, Tailwind)
    ├── app/                       Home + templated Services / Industries / Products /
    │                              Solutions / Case Studies / Company / Contact routes,
    │                              sitemap.ts, robots.ts
    ├── components/                Header (mega menu), Footer, and the full section library
    ├── lib/                       SEO + JSON-LD builders, and all page content as typed data
    └── sanity/                    CMS schema (mirrors lib/data types)
```

## Running the site

```bash
cd web
npm install
npm run dev        # http://localhost:3000
```

Dependencies are declared in `web/package.json` (Next 15, React 19, Tailwind 3.4, Framer Motion, Lucide, RHF + Zod). This environment had no network access, so `npm install`/build was not run here — expect only minor lint-level fixes, if any.

## Design direction in one paragraph

Dark, quiet, precise. A deep-ink canvas (`#070B14`) with glass panels, a single duotone light source (Circuit Teal → Deep Iris) used as gradient lighting rather than decoration, and a **telemetry signature**: monospaced status labels, live-device tickers, and coordinate-style section markers that make the UI feel like the control room for the physical world Invexal instruments. Display type is Sora; body is Instrument Sans; telemetry chrome is IBM Plex Mono. One bold element per screen; everything else disciplined.

## Honesty flags (do not skip)

- Statistics in `lib/data/stats.ts` marked `verified: false` (connected devices, AI predictions, model count) are **placeholders**. Replace with real figures before launch — publishing invented numbers on an enterprise site is a trust risk.
- Testimonials reuse Invexal's real published testimonials only. No fabricated clients or case-study results were written; case-study entries are structured from Invexal's existing case-study categories with `[VERIFY]` markers where metrics are needed.
- Folio3 was used strictly as a structural benchmark. All copy here is original.

## Suggested build-out order

1. Drop real assets in (see `docs/08-asset-inventory.md`), replace placeholder stats.
2. Wire Sanity using `sanity/schema.ts`; migrate `lib/data/*` into it (types match 1:1).
3. Flesh out remaining case studies and blog in the CMS.
4. Lighthouse pass (targets and tactics in `docs/04-seo-strategy.md` §7).

## Build status (final)

Complete and consistent (all cross-references between services/solutions/industries/products validated by script):
- Data layer: 18 services, 19 solutions, 13 industries, 9 products, site-wide content — all original copy
- Components: ui/primitives, ui/motion (Reveal, StatCounter, Accordion, TestimonialCarousel), layout (Header mega-menu, Footer, CTABand), home/sections, templates/blocks, forms/ContactForm (RHF+Zod)
- Routes: home, 4 hubs + 4 dynamic [slug] templates (SSG via generateStaticParams), case-studies, company/about, contact, book-a-demo, resources/ai-readiness, not-found, sitemap.ts, robots.ts
- SEO: per-page metadata, canonical, OG; JSON-LD (Organization, Breadcrumb, Service, Product, FAQ)
- Sanity: sanity/schema.ts mirrors lib/data types (migration notes in docs/06)

Before launch (flagged in code with [VERIFY] / comments):
1. `npm install && npm run build` — code was written without network access, so run the compiler once
2. Replace text logo in Header with the real SVG/PNG (docs/08)
3. Confirm case-study metrics + client approval (app/case-studies/page.tsx)
4. Wire ContactForm onSubmit to your API/CRM; swap book-a-demo for Calendly embed if preferred
5. Confirm product name VisionWatch vs VisionWear against current brand decision
