import { notFound } from "next/navigation";
import { industries, getIndustry } from "@/lib/data/industries";
import { solutions } from "@/lib/data/solutions";
import { products } from "@/lib/data/products";
import { buildMetadata, JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PageHero, CardGrid, Checklist, RelatedLinks, FAQSection, DemoVideoBand } from "@/components/templates/blocks";
import CTABand from "@/components/layout/CTABand";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

const industryPhotos: Record<string, string> = {
  manufacturing: "/photos/industry-manufacturing.jpg",
  healthcare: "/photos/industry-healthcare.jpg",
  retail: "/photos/industry-retail.jpg",
  logistics: "/photos/industry-logistics.jpg",
  hospitality: "/photos/industry-hospitality.jpg",
  "oil-and-gas": "/photos/industry-oil-and-gas.jpg",
  utilities: "/photos/industry-utilities.jpg",
  construction: "/photos/industry-construction.jpg",
  mining: "/photos/industry-mining.jpg",
  agriculture: "/photos/industry-agriculture.jpg",
  telecommunications: "/photos/industry-telecommunications.jpg",
  "smart-cities": "/photos/industry-smart-cities.jpg",
  education: "/photos/industry-education.jpg",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return buildMetadata({ ...ind.seo, path: `/industries/${ind.slug}` });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  const solutionLinks = ind.solutionStack
    .map((s) => solutions.find((x) => x.slug === s))
    .filter(Boolean)
    .map((s) => ({ name: s!.name, href: `/solutions/${s!.slug}` }));
  const productLinks = ind.products
    .map((p) => products.find((x) => x.slug === p))
    .filter(Boolean)
    .map((p) => ({ name: p!.name, href: `/products/${p!.slug}` }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Industries", path: "/industries" }, { name: ind.name, path: `/industries/${ind.slug}` }]),
          ...(ind.faqs.length ? [faqJsonLd(ind.faqs)] : []),
        ]}
      />
      <PageHero
        eyebrow={`Industries / ${ind.name}`}
        title={ind.heroTitle}
        lede={ind.lede}
        image={industryPhotos[ind.slug] ? { src: industryPhotos[ind.slug], alt: `${ind.name} deployment` } : undefined}
      />
      <DemoVideoBand slug={ind.slug} />
      <CardGrid eyebrow="The problems" title={`What holds ${ind.name.toLowerCase()} back`} items={ind.painPoints} columns={2} />
      <RelatedLinks eyebrow="Solution stack" title="What we deploy here" links={solutionLinks} />
      <RelatedLinks eyebrow="Products" title="Platforms behind the stack" links={productLinks} />
      <Checklist eyebrow="Outcomes" title="What changes" items={ind.benefits} />
      <FAQSection items={ind.faqs} />
      <CTABand title={`Talk to the team that deploys in ${ind.name.toLowerCase()}.`} />
    </>
  );
}
