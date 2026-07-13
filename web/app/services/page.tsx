import Link from "next/link";
import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { services } from "@/lib/data/services";
import { PageHero } from "@/components/templates/blocks";
import CTABand from "@/components/layout/CTABand";
import { GlassCard, TelemetryTag, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/motion";

export const metadata = buildMetadata({
  title: "AI & Technology Services",
  description:
    "Eighteen services from AI strategy to production systems: AI agents, computer vision, generative AI, AIoT, automation, and enterprise integration.",
  path: "/services",
  keywords: ["enterprise ai services", "ai development company", "aiot services"],
});

const cats = ["AI & Data", "Intelligent Systems", "Connected Operations"] as const;

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services" }])} />
      <PageHero
        eyebrow="Services"
        title="From AI strategy to systems in production."
        lede="Eighteen disciplines organized around one promise: measurable outcomes on your infrastructure, delivered through the same assess-pilot-deploy-scale spine every time."
        image={{ src: "/photos/category-ai-data.jpg", alt: "AI and data engineering" }}
      />
      {cats.map((cat) => (
        <section key={cat} className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading eyebrow={cat} title={cat} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.filter((s) => s.category === cat).map((s, i) => (
                <Reveal key={s.slug} delay={(i % 3) * 0.05}>
                  <Link href={`/services/${s.slug}`} className="block h-full">
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
