import { notFound } from "next/navigation";
import { services, getService } from "@/lib/data/services";
import { industries } from "@/lib/data/industries";
import { buildMetadata, JsonLd, breadcrumbJsonLd, serviceJsonLd, faqJsonLd } from "@/lib/seo";
import { PageHero, CardGrid, PillList, Checklist, RelatedLinks, FAQSection, DemoVideoBand } from "@/components/templates/blocks";
import CTABand from "@/components/layout/CTABand";
import { SectionHeading } from "@/components/ui/primitives";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

const categoryPhotos: Record<string, string> = {
  "AI & Data": "/photos/category-ai-data.jpg",
  "Intelligent Systems": "/photos/category-intelligent-systems.jpg",
  "Connected Operations": "/photos/category-connected-operations.jpg",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({ ...s.seo, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const industryLinks = s.industries
    .map((slug) => industries.find((i) => i.slug === slug))
    .filter(Boolean)
    .map((i) => ({ name: i!.name, href: `/industries/${i!.slug}` }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Services", path: "/services" }, { name: s.name, path: `/services/${s.slug}` }]),
          serviceJsonLd(s.name, s.seo.description, `/services/${s.slug}`),
          ...(s.faqs.length ? [faqJsonLd(s.faqs)] : []),
        ]}
      />
      <PageHero
        eyebrow={`Services / ${s.category}`}
        title={s.heroTitle}
        lede={s.lede}
        image={{ src: categoryPhotos[s.category], alt: s.category }}
      />

      <DemoVideoBand slug={s.slug} />

      <section className="border-y border-line bg-ink-raised/40 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading eyebrow="The challenge" title="Why this matters now" />
          <p className="text-lg leading-relaxed text-muted">{s.challenge}</p>
        </div>
      </section>

      <CardGrid eyebrow="What we deliver" title="Service pillars" items={s.pillars} />
      <Checklist eyebrow="Outcomes" title="What changes for your operation" items={s.benefits.map((b) => `${b.title} — ${b.body}`)} />
      <PillList eyebrow="Technology" title="Stack we deploy with" items={s.stack} />
      <PillList eyebrow="Use cases" title="Where this service earns its keep" items={s.useCases} />
      <RelatedLinks eyebrow="Industries" title="Where we deploy it" links={industryLinks} />
      <FAQSection items={s.faqs} />
      <CTABand title={`Ready to put ${s.name.toLowerCase()} to work?`} />
    </>
  );
}
