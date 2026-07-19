import Link from "next/link";
import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { products } from "@/lib/data/products";
import { PageHero, DemoVideoShowcase } from "@/components/templates/blocks";
import CTABand from "@/components/layout/CTABand";
import { GlassCard, TelemetryTag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/motion";

export const metadata = buildMetadata({
  title: "AI & IoT Products",
  description:
    "Nine production platforms: VisionWatch, FuelIQ, EcoTrack, Worker Safety, Asset Tracking, Vehicle Tracking, Smart Metering, and more. Book a demo.",
  path: "/products",
  keywords: ["ai products", "iot platforms", "video analytics product"],
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Products", path: "/products" }])} />
      <PageHero
        eyebrow="Products"
        title="Platforms, not one-off projects."
        lede="Nine production platforms you can demo this week — each battle-tested across real deployments and tailored to your estate during rollout."
        image={{ src: "/photos/hub-products.jpg", alt: "IoT device and platform" }}
      />
      <DemoVideoShowcase
        slugs={["visionwatch", "fueliq", "smart-metering", "vehicle-tracking"]}
        lede="Four of the nine platforms, running live — not renders."
      />
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.05}>
              <Link href={`/products/${p.slug}`} className="block h-full">
                <GlassCard className="flex h-full flex-col">
                  <div className="mb-1 flex items-center justify-between">
                    <h2 className="font-display text-xl font-semibold text-body">{p.name}</h2>
                    <TelemetryTag live>Live</TelemetryTag>
                  </div>
                  <p className="text-sm font-medium text-teal">{p.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.lede.split(" — ")[0]}.</p>
                  <TelemetryTag className="mt-4">View product →</TelemetryTag>
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
