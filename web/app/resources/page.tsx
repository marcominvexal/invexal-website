import Link from "next/link";
import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/templates/blocks";
import CTABand from "@/components/layout/CTABand";
import { GlassCard, TelemetryTag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/motion";

export const metadata = buildMetadata({
  title: "Resources",
  description:
    "Guides, assessments, and writing from Invexal's engineers on deploying AI in the physical world — starting with the AI Readiness Assessment.",
  path: "/resources",
  keywords: ["ai resources", "ai readiness", "enterprise ai guides"],
});

const items = [
  {
    href: "/resources/ai-readiness",
    tag: "Assessment",
    title: "AI Readiness Assessment",
    body: "A structured working session that turns 'we should do something with AI' into a scored, sequenced roadmap — data audit, use-case scoring, pilot definition.",
  },
  {
    href: "/resources/blog",
    tag: "Blog",
    title: "Field Notes",
    body: "Writing from our engineers on computer vision, AIoT, and what it actually takes to keep AI running in production environments.",
  },
  {
    href: "/case-studies",
    tag: "Case studies",
    title: "Deployments, not decks",
    body: "Real engagements across logistics, telecom, and manufacturing — told through outcomes and the operators' own words.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Resources", path: "/resources" }])} />
      <PageHero
        eyebrow="Resources"
        title="Learn how AI actually gets deployed."
        lede="Assessments, case studies, and engineering write-ups — everything we can share about making AI work outside the lab."
        primaryCta={{ label: "Start with the assessment", href: "/resources/ai-readiness" }}
      />
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.href} delay={i * 0.06}>
              <Link href={it.href} className="block h-full">
                <GlassCard className="flex h-full flex-col">
                  <TelemetryTag className="mb-3">{it.tag}</TelemetryTag>
                  <h2 className="font-display text-lg font-semibold text-body">{it.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{it.body}</p>
                  <TelemetryTag className="mt-4">Explore →</TelemetryTag>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
