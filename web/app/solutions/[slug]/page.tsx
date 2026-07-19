import { notFound } from "next/navigation";
import Link from "next/link";
import { solutions, getSolution } from "@/lib/data/solutions";
import { getService } from "@/lib/data/services";
import { getProduct } from "@/lib/data/products";
import { industries } from "@/lib/data/industries";
import { buildMetadata, JsonLd, breadcrumbJsonLd, serviceJsonLd, faqJsonLd } from "@/lib/seo";
import { PageHero, PillList, Checklist, RelatedLinks, FAQSection, DemoVideoBand } from "@/components/templates/blocks";
import CTABand from "@/components/layout/CTABand";
import { SectionHeading, GlassCard, TelemetryTag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/motion";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

const groupPhotos: Record<string, string> = {
  "Vision AI": "/photos/group-vision-ai.jpg",
  Operations: "/photos/industry-logistics.jpg",
  "Environment & Energy": "/photos/group-environment-energy.jpg",
  "Smart Spaces": "/photos/group-smart-spaces.jpg",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return buildMetadata({ ...s.seo, path: `/solutions/${s.slug}` });
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();

  const parent = getService(s.parentService);
  const product = s.product ? getProduct(s.product) : undefined;
  const industryLinks = s.industries
    .map((slug) => industries.find((i) => i.slug === slug))
    .filter(Boolean)
    .map((i) => ({ name: i!.name, href: `/industries/${i!.slug}` }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Solutions", path: "/solutions" }, { name: s.name, path: `/solutions/${s.slug}` }]),
          serviceJsonLd(s.name, s.seo.description, `/solutions/${s.slug}`),
          ...(s.faqs.length ? [faqJsonLd(s.faqs)] : []),
        ]}
      />
      <PageHero
        eyebrow={`Solutions / ${s.group}`}
        title={s.heroTitle}
        lede={s.lede}
        image={{ src: groupPhotos[s.group], alt: s.group }}
      />

      <DemoVideoBand slug={s.slug} />

      <PillList eyebrow="Capabilities" title="What the solution does" items={s.capabilities} />

      <section className="border-y border-line bg-ink-raised/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="How it works" title="Three steps to live" center />
          <ol className="grid gap-6 md:grid-cols-3">
            {s.howItWorks.map((step, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <li>
                  <GlassCard className="h-full">
                    <div className="mb-3 font-mono text-telemetry uppercase text-amber">Step 0{i + 1}</div>
                    <p className="leading-relaxed text-muted">{step}</p>
                  </GlassCard>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Checklist eyebrow="KPIs" title="Numbers this solution moves" items={s.kpis} />

      {(parent || product) && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading eyebrow="Built on" title="The service and product behind it" />
            <div className="grid gap-6 md:grid-cols-2">
              {parent && (
                <Link href={`/services/${parent.slug}`}>
                  <GlassCard className="h-full">
                    <TelemetryTag className="mb-2">Service</TelemetryTag>
                    <h3 className="font-display text-lg font-semibold text-body">{parent.name}</h3>
                    <p className="mt-2 text-sm text-muted">{parent.lede.split(". ")[0]}.</p>
                  </GlassCard>
                </Link>
              )}
              {product && (
                <Link href={`/products/${product.slug}`}>
                  <GlassCard className="h-full">
                    <TelemetryTag className="mb-2">Product</TelemetryTag>
                    <h3 className="font-display text-lg font-semibold text-body">{product.name}</h3>
                    <p className="mt-2 text-sm text-muted">{product.tagline}</p>
                  </GlassCard>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <RelatedLinks eyebrow="Industries" title="Where it's deployed" links={industryLinks} />
      <FAQSection items={s.faqs} />
      <CTABand title={`See ${s.name.toLowerCase()} on your own footage and data.`} />
    </>
  );
}
