import Link from "next/link";
import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { industries } from "@/lib/data/industries";
import { PageHero } from "@/components/templates/blocks";
import CTABand from "@/components/layout/CTABand";
import { GlassCard, TelemetryTag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/motion";

export const metadata = buildMetadata({
  title: "Industries We Serve",
  description:
    "AI and IoT deployed across 13 industries: manufacturing, healthcare, retail, construction, logistics, utilities, oil & gas, smart cities, and more.",
  path: "/industries",
  keywords: ["industry ai solutions", "vertical ai", "iot by industry"],
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Industries", path: "/industries" }])} />
      <PageHero
        eyebrow="Industries"
        title="Deployed where work is physical."
        lede="Thirteen industries where cameras, sensors, and agents change the operating numbers — each with a proven solution stack and reference deployments."
        image={{ src: "/photos/industry-manufacturing.jpg", alt: "AI deployed on the plant floor" }}
      />
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={(i % 3) * 0.05}>
              <Link href={`/industries/${ind.slug}`} className="block h-full">
                <GlassCard className="flex h-full flex-col">
                  <h2 className="font-display text-lg font-semibold text-body">{ind.name}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{ind.lede.split(" — ")[0].split(". ")[0]}.</p>
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
