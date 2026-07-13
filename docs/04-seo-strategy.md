# 04 · SEO Strategy

## 1. Positioning keywords

Primary entity: **Invexal — enterprise AI & AIoT solutions company**. Head terms are contested; the win is in solution-intent and industry-intent long tail, where Invexal has genuine proof.

| Cluster | Hub | Example targets |
|---|---|---|
| AI services | /services | ai consulting company, ai agent development services, enterprise ai strategy, ai readiness assessment |
| Computer vision | /services/computer-vision + vision solutions | ppe detection software, anpr solution, fire detection ai camera, people counting system, video analytics platform |
| AIoT / IIoT | /services/aiot-development etc. | aiot development company, industrial iot solutions, predictive maintenance solution |
| Industry | /industries/* | ai in manufacturing, computer vision for construction safety, iot fleet management logistics |
| Product | /products/* | fuel monitoring system (FuelIQ), worker safety monitoring solution, asset tracking platform |

Each page targets one primary keyword + 3–5 secondary; mapped in front-matter of `lib/data/*` (`seo.title`, `seo.description`, `seo.keywords`).

## 2. Metadata rules (implemented in `web/lib/seo.ts`)

- Title ≤ 60 chars: `{Primary Keyword} | Invexal` (home: `Invexal | Enterprise AI, AI Agents, Computer Vision & AIoT`).
- Description 140–160 chars, outcome-led, one CTA verb.
- Canonical on every route; OG image per template (1200×630, generated per-page with title over the signal lattice); `twitter:card summary_large_image`.
- Dynamic via Next `generateMetadata` from the same data objects that render the page — no drift.

## 3. Structured data (JSON-LD builders in `lib/seo.ts`)

- `Organization` (+ `logo`, `sameAs` socials, 3 office `address`es) — sitewide.
- `WebSite` + `SearchAction` — home.
- `BreadcrumbList` — every non-home page.
- `Service` — service & solution pages.
- `Product` (+ `offers` "Contact for pricing") — product pages.
- `FAQPage` — any page with an FAQ section (rendered from the same data as the accordion).
- `Article` — blog posts; `CaseStudy` modeled as `Article` with `about`.

## 4. Internal linking

Hub-and-spoke clusters (see sitemap §internal-linking). Rules: every spoke links up to its hub and across to ≥3 siblings via the "Related" rails; anchor text = target page's primary keyword, varied naturally; breadcrumbs on all pages; footer carries only hubs + top 8 money pages to keep link equity focused.

## 5. Indexing plumbing

`app/sitemap.ts` generates from the data layer (all ~85 routes, lastModified). `app/robots.ts` allows all, points to sitemap, disallows `/api`. 301 redirect map from legacy WordPress URLs in `next.config.mjs` (old `?tab=` URLs → new slugs) — critical, the current site's equity lives on those URLs.

## 6. Content program

Two posts/week minimum in the clusters above; each post links to one service + one solution page. Whitepapers gated behind the assessment funnel. Refresh case studies quarterly with quantified KPIs — Folio3's authority comes from volume of intent-matched pages; Invexal's edge is real deployment proof (photos, device counts, named partners like Deutsche Telekom IoT).

## 7. Performance budget (95+ Lighthouse)

LCP < 2.0s: hero is text + CSS glow (no LCP image); fonts via `next/font` (self-hosted, `display: swap`, subset). CLS < 0.02: fixed aspect boxes for all media. INP: mega menu is CSS/JS-light, marquee uses CSS animation, Framer Motion only on in-view elements. Images: `next/image` AVIF/WebP, lazy below fold. Code-split per route (App Router default) + `next/dynamic` for Calendly, maps, ROI calculator. ISR (`revalidate: 3600`) for CMS-backed routes; static for the rest; deploy on Vercel edge.
