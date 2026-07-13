# 02 · Design System — "Control Room"

## Concept

Invexal's product is intelligence over the physical world: cameras, sensors, fleets, plants. The design language borrows from the environments where that intelligence is consumed — operations control rooms — rather than from generic "AI startup" aesthetics. Dark, calm, instrument-precise, with one light source.

**Signature element — Telemetry Chrome.** Monospaced, uppercase micro-labels styled as live instrument readouts appear throughout: section markers (`SEC 03 · CAPABILITIES`), live-status dots (`● 12,408 DEVICES REPORTING`), KPI deltas, and coordinate-style captions on imagery. This is the one memorable device; everything else stays quiet. It encodes something true: Invexal's systems are live, measuring, always on.

## Color tokens

| Token | Hex | Use |
|---|---|---|
| `ink` | `#070B14` | Page background |
| `ink-raised` | `#0C1322` | Raised sections, cards base |
| `glass` | `rgba(148,163,184,.055)` | Glass panel fill (with `backdrop-blur`) |
| `line` | `rgba(148,163,184,.14)` | Hairline borders |
| `text` | `#E8EDF6` | Primary text |
| `muted` | `#8B97AB` | Secondary text |
| `teal` | `#2DD4BF` | Circuit Teal — primary accent, gradient start |
| `iris` | `#7C6FF0` | Deep Iris — gradient end, links on hover |
| `amber` | `#F4B24A` | Signal Amber — live dots, KPI deltas ONLY (micro-accent) |

**Gradient lighting rule:** the teal→iris gradient is treated as a light source, not a paint bucket. It appears as (1) a slow ambient radial glow behind heroes, (2) 1px gradient borders on interactive glass cards, (3) text gradient on at most one phrase per page. Never as full button fills except the primary CTA.

Light mode exists as an inverted token set (`ink→#F7F9FC`, `text→#0B1220`, glass borders darken); dark is default per the brief.

## Typography

| Role | Face | Notes |
|---|---|---|
| Display | **Sora** 600/700 | Headlines; tracking `-0.02em`; sizes clamp from 2.25rem → 4.5rem |
| Body | **Instrument Sans** 400/500 | 1rem/1.7; max measure 68ch |
| Telemetry | **IBM Plex Mono** 500 | 0.6875–0.75rem, uppercase, tracking `+0.14em`, teal or muted |

Scale (fluid): `display-xl` clamp(2.5rem, 5vw, 4.25rem) · `display` clamp(2rem, 3.6vw, 3rem) · `h3` 1.375rem · `body` 1rem · `small` .875rem · `telemetry` .6875rem.

## Spacing, radius, elevation

4px base grid. Section padding `py-24 md:py-32`. Container `max-w-7xl px-6`. Radius: cards `1rem`, buttons `9999px` (pill), inputs `.75rem`. Elevation is done with light, not shadow: glass fill + hairline border + on-hover gradient border and a faint teal glow (`shadow-[0_0_40px_-12px_rgba(45,212,191,.35)]`).

## Core components (built in `web/components/ui`)

- **Button** — primary (gradient pill, dark text), secondary (glass pill, hairline), ghost (text + arrow). All animate a subtle arrow translate on hover; visible focus ring `ring-teal/60`.
- **GlassCard** — glass fill, hairline border, hover gradient-border via masked pseudo-element, optional glow.
- **TelemetryTag** — the signature mono label, optional live dot (amber, pulsing, respects reduced-motion).
- **SectionHeading** — telemetry eyebrow + display headline + optional lede; consistent rhythm across all pages.
- **Reveal** — Framer Motion in-view wrapper (fade + 24px rise, 0.6s, staggered children), disabled under `prefers-reduced-motion`.
- **StatCounter** — animated count-up on view; amber delta chip.
- **Accordion** — FAQ; height animation, ARIA `button`/`region` pattern.
- Cards: **ServiceCard**, **IndustryTile**, **ProductCard**, **CaseStudyCard**, **InsightCard** — all compose GlassCard.
- **MegaMenu / MobileNav**, **CTABand**, **LogoMarquee** (pausable, reduced-motion-safe), **ProcessTimeline**.

## Accessibility floor (non-negotiable)

WCAG AA contrast verified for all token pairs (muted `#8B97AB` on `ink` = 5.5:1). Full keyboard support for mega menu (Esc closes, arrow keys traverse, focus trapped in mobile drawer). Semantic landmarks (`header/nav/main/footer`), one `h1` per page, `aria-expanded` on disclosure controls, skip link, `prefers-reduced-motion` kills marquees/counters/parallax. Hit targets ≥44px.

## Imagery & illustration

Real deployment photography (Invexal's gallery) treated with an ink duotone overlay so photos sit in the palette; dashboard screenshots framed in a device-agnostic glass browser chrome with telemetry captions; abstract accents are generated as a fine "signal lattice" (SVG dot/line grid, animated at 0.05 opacity) — never stock 3D robots. 3D reserved for one hero accent on Home only.
