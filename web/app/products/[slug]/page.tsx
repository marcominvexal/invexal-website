import { notFound } from "next/navigation";
import { products, getProduct } from "@/lib/data/products";
import { industries } from "@/lib/data/industries";
import { buildMetadata, JsonLd, breadcrumbJsonLd, productJsonLd, faqJsonLd } from "@/lib/seo";
import { PageHero, CardGrid, PillList, Checklist, RelatedLinks, FAQSection } from "@/components/templates/blocks";
import CTABand from "@/components/layout/CTABand";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

const productPhotos: Record<string, string> = {
  visionwatch: "/photos/group-vision-ai.jpg",
  fueliq: "/photos/product-fueliq.jpg",
  ecotrack: "/photos/group-environment-energy.jpg",
  "worker-safety": "/photos/industry-construction.jpg",
  "smart-air-purification": "/photos/product-smart-air-purification.jpg",
  "vehicle-tracking": "/photos/product-vehicle-tracking.jpg",
  "asset-tracking": "/photos/industry-logistics.jpg",
  "smart-metering": "/photos/product-smart-metering.jpg",
  "environmental-monitoring": "/photos/group-environment-energy.jpg",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return buildMetadata({ ...p.seo, path: `/products/${p.slug}` });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const industryLinks = p.industries
    .map((s) => industries.find((i) => i.slug === s))
    .filter(Boolean)
    .map((i) => ({ name: i!.name, href: `/industries/${i!.slug}` }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Products", path: "/products" }, { name: p.name, path: `/products/${p.slug}` }]),
          productJsonLd(p.name, p.seo.description, `/products/${p.slug}`),
          ...(p.faqs.length ? [faqJsonLd(p.faqs)] : []),
        ]}
      />
      <PageHero
        eyebrow={`Products / ${p.name}`}
        title={p.tagline}
        lede={p.lede}
        primaryCta={{ label: `Book a ${p.name} demo`, href: "/book-a-demo" }}
        image={{ src: productPhotos[p.slug], alt: p.name }}
      />
      <CardGrid eyebrow="Features" title="What's in the platform" items={p.features} />
      <PillList eyebrow="Deployment" title="How it runs" items={p.deployment} />
      <PillList eyebrow="Integrations" title="What it connects to" items={p.integrations} />
      <Checklist eyebrow="Outcomes" title="Why teams keep it" items={p.benefits} />
      <RelatedLinks eyebrow="Industries" title="Where it's deployed" links={industryLinks} />
      <FAQSection items={p.faqs} />
      <CTABand title={`See ${p.name} running on your own operation.`} />
    </>
  );
}
