import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassCard, SectionHeading, TelemetryTag, Button, PhotoFrame } from "@/components/ui/primitives";
import { Reveal, Accordion } from "@/components/ui/motion";
import type { FAQ } from "@/lib/data/types";
import { ProductVideoCard } from "@/components/media/ProductVideoCard";
import { TelemetryVideoCard } from "@/components/media/TelemetryVideoCard";
import { demoVideoBySlug, type DemoVideoEntry } from "@/lib/data/demoVideos";

/* ---------- Page hero ---------- */
export function PageHero({
  eyebrow,
  title,
  lede,
  primaryCta = { label: "Book a demo", href: "/book-a-demo" },
  image,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  primaryCta?: { label: string; href: string };
  image?: { src: string; alt: string };
}) {
  const copy = (
    <>
      <Reveal>
        <TelemetryTag live className="mb-5 inline-flex">{eyebrow}</TelemetryTag>
      </Reveal>
      <Reveal delay={0.08}>
        <h1 className="font-display text-display font-bold text-body md:text-display-xl md:leading-tight">{title}</h1>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>
      </Reveal>
      <Reveal delay={0.24}>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href={primaryCta.href}>{primaryCta.label}</Button>
          <Button href="/contact" variant="secondary">Talk to an engineer</Button>
        </div>
      </Reveal>
    </>
  );

  if (image) {
    return (
      <section className="signal-lattice relative overflow-hidden pb-20 pt-40">
        <div aria-hidden className="animate-drift pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[48rem] -translate-x-1/2 bg-signal-radial opacity-50 blur-2xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>{copy}</div>
          <Reveal delay={0.2} className="hidden lg:block">
            <PhotoFrame src={image.src} alt={image.alt} priority className="aspect-[4/3]" />
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="signal-lattice relative overflow-hidden pb-20 pt-40">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[48rem] -translate-x-1/2 bg-signal-radial opacity-50 blur-2xl" />
      <div className="relative mx-auto max-w-4xl px-6">{copy}</div>
    </section>
  );
}

/* ---------- Card grid of {title, body} ---------- */
export function CardGrid({
  eyebrow,
  title,
  items,
  columns = 3,
}: {
  eyebrow: string;
  title: string;
  items: { title: string; body: string }[];
  columns?: 2 | 3;
}) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className={`grid gap-6 md:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
          {items.map((it, i) => (
            <Reveal key={it.title} delay={(i % columns) * 0.06}>
              <GlassCard className="h-full">
                <h3 className="font-display font-semibold text-body">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{it.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pill list ---------- */
export function PillList({ eyebrow, title, items }: { eyebrow: string; title: string; items: string[] }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <ul className="flex flex-wrap gap-3">
          {items.map((it, i) => (
            <Reveal key={it} delay={(i % 8) * 0.04}>
              <li className="rounded-full border border-line bg-glass px-4 py-2 text-sm text-body backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-glow">
                {it}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Checklist ---------- */
export function Checklist({ eyebrow, title, items }: { eyebrow: string; title: string; items: string[] }) {
  return (
    <section className="border-y border-line bg-ink-raised/40 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <ul className="grid gap-4 md:grid-cols-2">
          {items.map((b, i) => (
            <Reveal key={b} delay={(i % 6) * 0.05}>
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal animate-pulseDot" />
                <span className="text-muted">{b}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Related links ---------- */
export function RelatedLinks({
  eyebrow,
  title,
  links,
}: {
  eyebrow: string;
  title: string;
  links: { name: string; href: string }[];
}) {
  if (!links.length) return null;
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l, i) => (
            <Reveal key={l.href} delay={(i % 6) * 0.05}>
              <li>
                <Link
                  href={l.href}
                  className="group flex items-center justify-between rounded-xl border border-line bg-glass px-5 py-4 text-body backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-glow"
                >
                  {l.name}
                  <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-teal transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- FAQ section ---------- */
export function FAQSection({ items }: { items: FAQ[] }) {
  if (!items.length) return null;
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="FAQ" title="Questions we hear most" center />
        <Accordion items={items} />
      </div>
    </section>
  );
}

/* ---------- Demo video band ---------- */
/** Renders nothing when `slug` has no matching entry in demoVideoBySlug — safe
 * to drop into every detail page unconditionally rather than gating per page. */
export function DemoVideoBand({ slug }: { slug: string }) {
  const entry = demoVideoBySlug[slug];
  if (!entry) return null;

  return (
    <section className="border-y border-line bg-ink-raised py-20">
      <div className="mx-auto max-w-2xl px-6">
        <SectionHeading eyebrow="See it in action" title="Live on real footage, not a mockup" center />
        {entry.kind === "detection" ? (
          <ProductVideoCard card={entry.card} index={0} />
        ) : (
          <TelemetryVideoCard card={entry.card} index={0} />
        )}
      </div>
    </section>
  );
}

/* ---------- Demo video showcase (hub pages) ---------- */
/** A small "see it in action" grid for hub/index pages — pass the page slugs
 * (solution, product, industry, or aliased service slugs) whose footage you
 * want featured; entries with no match in demoVideoBySlug are skipped. */
export function DemoVideoShowcase({
  slugs,
  title = "See it in action",
  lede,
}: {
  slugs: string[];
  title?: string;
  lede?: string;
}) {
  const entries = slugs.map((slug) => demoVideoBySlug[slug]).filter((e): e is DemoVideoEntry => Boolean(e));
  if (!entries.length) return null;

  return (
    <section className="border-y border-line bg-ink-raised py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Live footage" title={title} lede={lede} />
        <div className="grid gap-6 md:grid-cols-2">
          {entries.map((entry, i) =>
            entry.kind === "detection" ? (
              <ProductVideoCard key={entry.card.slug} card={entry.card} index={i} />
            ) : (
              <TelemetryVideoCard key={entry.card.slug} card={entry.card} index={i} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
