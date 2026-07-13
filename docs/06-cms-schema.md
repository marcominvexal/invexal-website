# 06 · CMS Schema (Sanity)

The site launches from typed data files (`web/lib/data/*`) so nothing blocks on CMS setup; the Sanity schema in `web/sanity/schema.ts` mirrors those types 1:1, so migration is a copy job, not a remodel. Templated routes switch from `import` to GROQ + ISR (`revalidate: 3600`).

## Documents

| Document | Key fields | Renders |
|---|---|---|
| `service` | slug, category (ai/data/systems/connected), hero{eyebrow,title,lede}, challenge{narrative, stats[]}, pillars[]{title,body}, benefits[]{title,body,metric?}, stack[] (refs → `technology`), industries[] (refs), useCases[]{title,body}, faqs[]{q,a}, seo{} | Template A |
| `solution` | slug, group (vision/operations/environment/spaces), hero, capabilities[], howItWorks[3], kpis[], parentService (ref), product (ref), industries[], faqs[], seo | Template D |
| `industry` | slug, hero{title,lede,image}, painPoints[]{title,body}, solutionStack[] (refs → solution), products[] (refs), caseStudy (ref), benefits[], faqs[], seo | Template B |
| `product` | slug, name, tagline, logo, heroShot, features[]{icon,title,body}, architecture{image,steps[]}, benefits[]{title,metric?}, deployment[] (cloud/on-prem/edge), integrations[], faqs[], seo | Template C |
| `caseStudy` | slug, client, industry (ref), services[] (refs), challenge, solution, architectureImage, implementation, technologies[], kpis[]{label,value,verified}, gallery[], testimonial (ref), seo | Case study |
| `post` | slug, title, excerpt, cover, body (portable text), category, author (ref), related[] , seo | Blog |
| `testimonial` | quote, name, role, company, avatar | Carousels |
| `teamMember`, `partner`, `technology`, `office`, `faqGroup` | as expected | shared |
| `siteSettings` | nav, footer, stats[]{label,value,suffix,verified}, ctaBand, socials, contact | global singleton |

## Objects

`seo` {title, description, keywords[], ogImage, canonical} · `stat` {label, value, suffix, verified:boolean} · `faq` {q, a} — the `verified` flag is enforced in the UI: unverified stats render with a muted style in preview and are excluded from production builds unless overridden, which keeps placeholder numbers from shipping.

## Editorial workflow

Drafts → review → publish; scheduled publishing for blog; image pipeline enforces alt text (required field) and focal points. Slug changes trigger a redirect entry (`redirect` document consumed by `next.config.mjs`).
