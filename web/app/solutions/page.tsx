import Link from "next/link";
import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { solutions, solutionGroups } from "@/lib/data/solutions";
import { PageHero, DemoVideoShowcase } from "@/components/templates/blocks";
import CTABand from "@/components/layout/CTABand";
import { GlassCard, TelemetryTag, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/motion";

export const metadata = buildMetadata({
  title: "AI Solutions",
  description:
    "Nineteen ready-to-deploy AI solutions: vision analytics, worker safety, predictive maintenance, environmental monitoring, smart spaces, and more.",
  path: "/solutions",
  keywords: ["ai solutions", "video analytics solutions", "iot solutions"],
});

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Solutions", path: "/solutions" }])} />
      <PageHero
        eyebrow="Solutions"
        title="Ready-to-deploy intelligence for specific problems."
        lede="Each solution is a proven deck — models, hardware options, integrations, and KPIs — deployable as a pilot in weeks."
        image={{ src: "/photos/group-vision-ai.jpg", alt: "Vision AI monitoring" }}
      />
      <DemoVideoShowcase
        slugs={["people-counting", "environmental-monitoring", "energy-monitoring"]}
        lede="A sample of these solutions running on real footage and live sensor telemetry — not mockups."
      />
      {solutionGroups.map((group) => (
        <section key={group} className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading eyebrow={group} title={group} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {solutions.filter((s) => s.group === group).map((s, i) => (
                <Reveal key={s.slug} delay={(i % 3) * 0.05}>
                  <Link href={`/solutions/${s.slug}`} className="block h-full">
                    <GlassCard className="flex h-full flex-col">
                      <h2 className="font-display text-lg font-semibold text-body">{s.name}</h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.lede.split(". ")[0]}.</p>
                      <TelemetryTag className="mt-4">Explore →</TelemetryTag>
                    </GlassCard>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
      <CTABand />
    </>
  );
}
