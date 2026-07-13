# 01 · Sitemap & Information Architecture

## Why this structure (the Folio3 lesson, applied)

Folio3 AI works because every revenue motion has its own indexable landing page (service, industry, solution), the mega menu exposes depth without forcing clicks, and every page funnels to two conversion paths: a low-commitment diagnostic ("AI Readiness Assessment") and a direct one ("Contact / Book a demo"). Invexal's current site collapses everything into tabbed pages (`/services/?tab=…`, `/case-studies/?tab=…`), which is invisible to search engines and flattens the story to "IoT vendor."

The redesign gives Invexal the same page-per-intent architecture, but leads with **AI** and treats IoT as the physical-world substrate that differentiates Invexal from software-only AI shops. Positioning line used across the IA: *"AI that sees, predicts, and acts in the physical world."*

## Route map

```
/                                        Home
/services                                Services hub
/services/ai-consulting                  ┐
/services/ai-strategy                    │
/services/ai-readiness-assessment        │
/services/ai-agent-development           │
/services/computer-vision                │
/services/generative-ai                  │
/services/llm-integration                │  18 service landing pages
/services/predictive-analytics           │  (template A — see blueprints)
/services/machine-learning               │
/services/data-engineering               │
/services/ai-automation                  │
/services/digital-twins                  │
/services/iot-consulting                 │
/services/aiot-development               │
/services/cloud-integration              │
/services/industrial-iot                 │
/services/enterprise-integration         │
/services/cybersecurity                  ┘
/solutions                               Solutions hub
/solutions/[slug]                        19 solution pages (video-analytics, ppe-detection,
                                         fire-detection, smoke-detection, anpr, people-counting,
                                         queue-analytics, crowd-monitoring, vehicle-analytics,
                                         worker-safety, predictive-maintenance, asset-tracking,
                                         fleet-management, environmental-monitoring,
                                         energy-monitoring, waste-management, smart-parking,
                                         warehouse-automation, smart-buildings)
/industries                              Industries hub
/industries/[slug]                       13 industry pages (manufacturing, healthcare, retail,
                                         education, hospitality, oil-and-gas, utilities,
                                         construction, logistics, mining, agriculture,
                                         telecommunications, smart-cities)
/products                                Products hub
/products/[slug]                         9 SaaS-style product pages (visionwatch, fueliq,
                                         ecotrack, worker-safety, smart-air-purification,
                                         vehicle-tracking, asset-tracking, smart-metering,
                                         environmental-monitoring)
/case-studies                            Case-study index (filterable by industry/service)
/case-studies/[slug]                     Individual case studies
/resources                               Resources hub
/resources/blog · /resources/blog/[slug]
/resources/whitepapers
/resources/roi-calculator                Interactive ROI calculator (lead magnet)
/resources/ai-readiness                  Interactive assessment (lead magnet — mirrors Folio3's
                                         strongest conversion asset)
/resources/videos · /resources/brochures · /resources/documentation
/company/about · /company/leadership · /company/partners
/company/careers · /company/csr · /company/news
/contact                                 Contact + Calendly embed
/book-a-demo                             Preserved from current site (existing inbound links)
/privacy-policy · /terms
```

**Redirects from the old site** (preserve equity): `/services/?tab=*` → matching `/services/*`; `/case-studies/?tab=*` → matching `/solutions/*` or `/case-studies/*`; `/about-us` → `/company/about`; `/blogs` → `/resources/blog`; `/faqs` → merged into per-page FAQs + `/contact`.

## Navigation model

Sticky glass header. Five top-level items with mega menus, plus persistent CTAs:

| Item | Mega menu contents |
|---|---|
| **Services** | 3 columns: AI & Data (consulting → cybersecurity, AI-first ordering), Intelligent Systems (agents, CV, gen-AI, digital twins), Connected Operations (IoT/AIoT, industrial, cloud, integration). Right rail: featured — AI Readiness Assessment. |
| **Solutions** | Grouped: Vision AI (9 CV solutions) · Operations (predictive maintenance, asset/fleet, warehouse) · Environment & Energy (5) · Smart Spaces (parking, buildings). |
| **Industries** | 13-item grid with icons; right rail: featured case study. |
| **Products** | Product cards with mini-logos; right rail: "Book a demo." |
| **Company & Resources** | Two columns: Company (about, leadership, partners, careers, CSR, news) · Resources (blog, whitepapers, ROI calculator, assessment, videos, docs). |

Header right: phone (kept from current site) · **AI Readiness Assessment** (ghost) · **Book a demo** (primary). Mobile: full-screen drawer with accordion groups, CTAs pinned to the bottom.

## Internal-linking spine (SEO + journey)

- Every **service** page links to: 3 related solutions, 3 industries where it's deployed, 1 product, 1 case study.
- Every **solution** page links to: its parent service, applicable industries, the product that ships it.
- Every **industry** page links to: relevant solutions (its "solution stack"), products, one case study.
- Every **product** page links to: solutions it enables, industries, docs, and Book a demo.
- Every page ends with the shared CTA band (assessment + demo) and breadcrumb schema.

This creates the hub-and-spoke topical clusters described in `04-seo-strategy.md`.
