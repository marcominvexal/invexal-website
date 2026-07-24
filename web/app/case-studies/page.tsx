import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/templates/blocks";
import CTABand from "@/components/layout/CTABand";
import { GlassCard, TelemetryTag, SectionHeading } from "@/components/ui/primitives";
import { Reveal, TestimonialCarousel } from "@/components/ui/motion";
import { testimonials } from "@/lib/data/site";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Real deployments across logistics, telecom, manufacturing, and smart infrastructure — with the operators' own words on what changed.",
  path: "/case-studies",
  keywords: ["ai case studies", "iot case studies", "computer vision case study"],
});

/**
 * [VERIFY] Placeholder studies derived from Invexal's existing case-study categories
 * and real testimonials. Confirm metrics and client approval with MARCOM before
 * publishing; replace with full write-ups in Sanity (`caseStudy` documents).
 */
const studies = [
  {
    client: "Al Busayra Delivery Services",
    sector: "Logistics",
    title: "Fleet visibility for a regional delivery operator",
    summary:
      "Real-time vehicle tracking and driver analytics across the delivery fleet — improving fleet management and security operations, in the CEO's own words.",
    verified: true,
  },
  {
    client: "Telecom estate operator",
    sector: "Telecommunications",
    title: "Fuel accountability across unmanned tower sites",
    summary:
      "FuelIQ deployment reconciling deliveries against burn across remote generator sites, with theft alerts routed to the NOC. [VERIFY metrics before publishing]",
    verified: false,
  },
  {
    client: "Industrial manufacturer",
    sector: "Manufacturing",
    title: "Camera-based safety compliance on the plant floor",
    summary:
      "VisionWatch PPE and exclusion-zone detection on existing CCTV, feeding the HSE system of record. [VERIFY metrics before publishing]",
    verified: false,
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Case Studies", path: "/case-studies" }])} />
      <PageHero
        eyebrow="Case studies"
        title="Deployments, not decks."
        lede="A selection of real engagements across our core industries — told through outcomes and the operators' own words."
        image={{ src: "/photos/hub-case-studies.jpg", alt: "Team reviewing deployment results" }}
      />
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3">
          {studies.map((s, i) => {
            const inverted = i % 2 === 1;
            return (
              <Reveal key={s.title} delay={i * 0.06}>
                <GlassCard
                  className={cn(
                    "flex h-full flex-col",
                    inverted && "border-transparent bg-signal-gradient shadow-glow hover:border-transparent hover:shadow-card-xl"
                  )}
                >
                  <TelemetryTag className={cn("mb-3", inverted && "text-white")}>{s.sector}</TelemetryTag>
                  <h2 className={cn("font-display text-lg font-semibold", inverted ? "text-white" : "text-body")}>{s.title}</h2>
                  <p className={cn("mt-2 flex-1 text-sm leading-relaxed", inverted ? "text-white/75" : "text-muted")}>{s.summary}</p>
                  <p className={cn("mt-4 text-sm font-medium", inverted ? "text-white" : "text-teal")}>{s.client}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </section>
      <section className="border-t border-line py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Client voices" title="In their words" center />
          <TestimonialCarousel items={testimonials} />
        </div>
      </section>
      <CTABand />
    </>
  );
}
