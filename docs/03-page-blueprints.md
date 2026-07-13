# 03 · Page Blueprints (UX wireframes)

Every page is assembled from the section library; templates below define order, intent, and conversion logic. ASCII frames are desktop; mobile stacks in the same order with the nav drawer pattern.

## Home

```
┌──────────────────────────────────────────────────────────────┐
│ STICKY GLASS HEADER  [logo] [mega-nav]     [☎] [Assess] [Demo]│
├──────────────────────────────────────────────────────────────┤
│ HERO  ● ENTERPRISE AI · AIOT · AUTOMATION (telemetry eyebrow) │
│  H1: Intelligence for the physical world.                     │
│  Sub + [Book a demo] [Take the AI Readiness Assessment]       │
│  BG: ambient teal→iris glow + signal lattice                  │
│  Right: floating glass cards (live detections, device count,  │
│  prediction feed) orbiting a subtle 3D sensor-node accent     │
├──────────────────────────────────────────────────────────────┤
│ TRUSTED BY — logo marquee (Deutsche Telekom IoT, Mazik, …)    │
│ STATS — 7 counters w/ telemetry deltas                        │
│ ENTERPRISE SERVICES — 6 featured cards → /services            │
│ AI CAPABILITIES — 8-tile matrix (GenAI…Automation)            │
│ INDUSTRIES — 13-tile duotone photo grid                       │
│ PRODUCTS — horizontal showcase w/ dashboard frames            │
│ WHY INVEXAL — 6 proof points + partner network note           │
│ PROCESS — 5-step timeline (Assess→Pilot→Deploy→Scale→Operate) │
│ TECH PARTNERS — badge row                                     │
│ CASE STUDIES — 3 featured cards                               │
│ TESTIMONIALS — carousel (real quotes)                         │
│ LATEST INSIGHTS — 3 blog cards                                │
│ FAQ — accordion (6)                                           │
│ CTA BAND — assessment + demo                                  │
│ FOOTER — 5 columns + offices + social + legal                 │
└──────────────────────────────────────────────────────────────┘
```

Conversion logic: two CTAs at hero, mid-page (after Why Invexal), and close. The assessment is the low-friction path; demo is the direct path. Nothing else competes.

## Template A — Service page (18 pages)

Hero (eyebrow = service category · H1 = outcome-phrased title · lede · dual CTA) → **Business challenge** (2-col: narrative + 3 pain stats) → **Our approach / solution** (3–4 pillars) → **Benefits** (4 glass cards w/ telemetry deltas) → **Reference architecture** (diagram frame: Edge → Connectivity → Platform → Intelligence → Apps) → **Technology stack** (badge grid) → **Industries served** (linked tiles) → **Use cases** (4–6) → **Process** (timeline) → **FAQ** (schema'd) → **Related case study** → CTA band.

## Template B — Industry page (13 pages)

Hero (industry photo duotone + H1 "AI for {Industry}") → **Pain points** (3–4, stated in operator language) → **Solution stack** (linked solution cards mapped to pains) → **Products deployed** → **Featured case study** → **Deployment architecture** → **Outcomes/benefits** → FAQ → CTA.

## Template C — Product page (9 pages, SaaS-style)

Hero (product wordmark + one-line value prop + [Book a demo] + dashboard hero frame) → **Feature grid** (6) → **How it works / architecture** → **Benefits with metrics** → **Deployment options** (cloud / on-prem / edge) → **Integrations** → **FAQ** → **Demo CTA with Calendly**.

## Template D — Solution page (19 pages)

Compressed service template: Hero → What it detects/does → How it works (3 steps) → Where it's used (industries) → KPIs it moves → Related product/service → FAQ → CTA.

## Case study

Client · Industry · at-a-glance KPI band → Challenge → Solution → Architecture → Implementation notes → Technologies → Business impact (quantified, `[VERIFY]`-gated) → Gallery → Testimonial → CTA.

## Hubs (/services, /solutions, /industries, /products, /case-studies, /resources)

Hero (short) → filter/group rail → full card grid → cross-links → CTA. Case-study hub filters by industry + service.

## Contact / Book-a-demo

Split layout: left = value recap + offices + phone/WhatsApp (existing numbers) + response-time telemetry tag; right = RHF+Zod form (name, work email, company, phone, interest select, message) with inline validation, honeypot, and Calendly embed below. Success state confirms next step ("An architect replies within one business day").
