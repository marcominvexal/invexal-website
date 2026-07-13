# 05 · Content Guide & Master Copy

## Voice

Enterprise, consultative, technically literate, confident without hype. Rules: outcome first, mechanism second; concrete nouns (cameras, fleets, plants) over abstractions ("digital journeys"); no exclamation points; numbers only when real (placeholders carry `[VERIFY]`); second person for the reader, first person plural for Invexal. Sentences short. Every section heading answers "why should an operations or technology leader keep reading?"

Positioning sentence (used everywhere): **"Invexal builds AI that sees, predicts, and acts in the physical world."** This is the differentiator vs. software-only AI firms — Invexal owns the full loop from sensor to decision.

## Homepage copy (canonical)

- Eyebrow: `● ENTERPRISE AI · AI AGENTS · COMPUTER VISION · AIOT`
- H1: **Intelligence for the physical world.**
- Lede: *Invexal unifies AI agents, computer vision, and industrial IoT into production systems that see, predict, and act — across factories, fleets, cities, and sites in 5+ countries.*
- CTAs: **Book a demo** · **Take the AI Readiness Assessment**
- Trusted-by intro: *Trusted by enterprises and global partners*
- Stats heading: **Deployed, measured, and running.** (stats list in `lib/data/stats.ts`, placeholders flagged)
- Services heading: **Enterprise services, end to end.** Lede: *From your first AI readiness assessment to agents and vision systems running in production — one accountable partner across strategy, engineering, and operations.*
- Capabilities heading: **The full AI stack, on your terms.**
- Industries heading: **Built for the industries that run on the physical world.**
- Products heading: **Products that deploy in weeks, not quarters.**
- Why heading: **Why enterprises choose Invexal.** (Enterprise-first delivery · Fast deployment · Scales from pilot to fleet · Secure by design · Global partner network · ROI you can audit)
- Process heading: **From assessment to always-on.** Steps: Assess → Pilot → Deploy → Scale → Operate.
- FAQ heading: **Questions leaders ask us.**
- CTA band: **See your operation the way AI does.** *Book a 30-minute demo, or take the readiness assessment and get a scored roadmap in minutes.*

Full section copy ships in `web/lib/data/*` — the data files are the copy deck for every service, solution, industry, and product page (hero, challenge, solution pillars, benefits, use cases, FAQs each).

## Page copy patterns

- **Service H1s** are outcome-phrased: "AI agents that carry real workloads," not "AI Agent Development Services" (that phrase lives in the SEO title instead).
- **Industry pain points** are written in the operator's own vocabulary (e.g., manufacturing: unplanned downtime, scrap rate, OEE — not "digital transformation challenges").
- **Product pages** read like SaaS: one-line value prop ≤ 12 words, feature verbs ("Detects…", "Flags…", "Reconciles…"), deployment options stated plainly.
- **FAQs** answer commercial objections (timeline, data security, on-prem, integration, pricing model) — these double as `FAQPage` schema.

## What was deliberately NOT written

No invented client names, revenue figures, or benchmark claims. Real testimonial quotes from invexal.com are reused verbatim with attribution; everything else marked `[VERIFY]` awaits real inputs.
