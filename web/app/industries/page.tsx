import Link from "next/link";
import { buildMetadata, JsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { industries } from "@/lib/data/industries";
import { PageHero, DemoVideoShowcase } from "@/components/templates/blocks";
import CTABand from "@/components/layout/CTABand";
import { GlassCard, TelemetryTag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

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
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Industries", path: "/industries" }]),
          itemListJsonLd(industries.map((i) => ({ name: i.name, path: `/industries/${i.slug}` }))),
        ]}
      />
      <PageHero
        eyebrow="Industries"
        title="Deployed where work is physical."
        lede="Thirteen industries where cameras, sensors, and agents change the operating numbers — each with a proven solution stack and reference deployments."
        image={{ src: "/photos/industry-manufacturing.jpg", alt: "AI deployed on the plant floor" }}
      />
      <DemoVideoShowcase
        slugs={["agriculture", "retail", "healthcare", "telecommunications"]}
        lede="The same detection and telemetry stack, deployed across different verticals."
      />
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => {
            const inverted = i % 2 === 1;
            return (
              <Reveal key={ind.slug} delay={(i % 3) * 0.05}>
                <Link href={`/industries/${ind.slug}`} className="block h-full">
                  <GlassCard
                    className={cn(
                      "flex h-full flex-col",
                      inverted && "border-transparent bg-signal-gradient shadow-glow hover:border-transparent hover:shadow-card-xl"
                    )}
                  >
                    <h2 className={cn("font-display text-lg font-semibold", inverted ? "text-white" : "text-body")}>{ind.name}</h2>
                    <p className={cn("mt-2 flex-1 text-sm leading-relaxed", inverted ? "text-white/75" : "text-muted")}>
                      {ind.lede.split(" — ")[0].split(". ")[0]}.
                    </p>
                    <TelemetryTag className={cn("mt-4", inverted && "text-white")}>Explore →</TelemetryTag>
                  </GlassCard>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
      <CTABand />
    </>
  );
}
