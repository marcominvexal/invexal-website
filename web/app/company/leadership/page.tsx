import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/templates/blocks";
import CTABand from "@/components/layout/CTABand";
import { SectionHeading, GlassCard, TelemetryTag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/motion";

export const metadata = buildMetadata({
  title: "Leadership",
  description:
    "The team behind Invexal's engineering and delivery — a decade of connected-systems experience across the US, UK, and UAE.",
  path: "/company/leadership",
  keywords: ["invexal leadership", "invexal team"],
});

/**
 * [VERIFY] — POPULATE BEFORE LAUNCH.
 * Real names, titles, photos, and bios must come from MARCOM; do not publish
 * this page with placeholders. Until populated, consider removing the route
 * from Footer/sitemap or redirecting to /company/about.
 */
const leaders: { name: string; title: string; bio: string }[] = [
  // { name: "…", title: "Chief Executive Officer", bio: "…" },
];

const principles = [
  { title: "Engineers in the room", body: "Leadership here still reviews architectures and walks deployment sites. Decisions are made close to the work." },
  { title: "Accountable to outcomes", body: "Every engagement is baselined against named KPIs — and leadership reviews those numbers quarterly with clients." },
  { title: "Three regions, one standard", body: "US, UK, and UAE operations run the same delivery spine, so a client in Dubai gets the same rigor as one in Dover." },
];

export default function LeadershipPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Company", path: "/company/about" }, { name: "Leadership", path: "/company/leadership" }])} />
      <PageHero
        eyebrow="Company / Leadership"
        title="Led by people who've shipped to the field."
        lede="Invexal's leadership grew up in connected-systems delivery — hardware, networks, and now AI — and still measures itself the way clients do: by what's running in production."
        primaryCta={{ label: "Meet us on a call", href: "/contact" }}
      />

      {leaders.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading eyebrow="The team" title="Leadership" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {leaders.map((l, i) => (
                <Reveal key={l.name} delay={(i % 3) * 0.06}>
                  <GlassCard className="h-full">
                    <h2 className="font-display text-lg font-semibold text-body">{l.name}</h2>
                    <TelemetryTag className="mt-1">{l.title}</TelemetryTag>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{l.bio}</p>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-y border-line bg-ink-raised/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="How we lead" title="Three operating principles" />
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="border-l-2 border-teal/40 pl-5">
                  <h2 className="font-display font-semibold text-body">{p.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
