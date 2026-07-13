import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/templates/blocks";
import { SectionHeading, GlassCard, TelemetryTag, Button } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/motion";

export const metadata = buildMetadata({
  title: "Blog — Field Notes",
  description:
    "Engineering write-ups from Invexal on computer vision, AI agents, AIoT, and keeping AI running in production environments.",
  path: "/resources/blog",
  keywords: ["ai engineering blog", "computer vision blog", "aiot blog"],
});

/**
 * Post loading is Sanity-ready: once the studio is provisioned (sanity/schema.ts
 * defines `post`), replace `posts` with a GROQ fetch and this page needs no
 * other change. Planned launch series below — titles only, no fake articles.
 */
const posts: { slug: string; title: string; excerpt: string; date: string }[] = [];

const plannedSeries = [
  { tag: "Computer vision", title: "What your CCTV estate can already do — and what it can't" },
  { tag: "AI agents", title: "Agents in operations: where autonomy earns trust" },
  { tag: "AIoT", title: "Edge vs. cloud: the decision tree we use on every deployment" },
  { tag: "Delivery", title: "Why AI pilots die — and the 4–8 week structure that survives" },
];

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Resources", path: "/resources" }, { name: "Blog", path: "/resources/blog" }])} />
      <PageHero
        eyebrow="Resources / Blog"
        title="Field Notes."
        lede="Writing from our engineers about deploying AI in the physical world — the constraints, the failures, and the patterns that survive contact with production."
        primaryCta={{ label: "Get notified — contact us", href: "/contact" }}
      />

      {posts.length > 0 ? (
        <section className="py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.05}>
                <GlassCard className="h-full">
                  <TelemetryTag className="mb-2">{p.date}</TelemetryTag>
                  <h2 className="font-display text-lg font-semibold text-body">{p.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>
      ) : (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading
              eyebrow="Coming soon"
              title="First articles are in editing"
              lede="Here's what the launch series covers. Until then, the case studies are the best reading on how we work."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {plannedSeries.map((p, i) => (
                <Reveal key={p.title} delay={(i % 2) * 0.05}>
                  <div className="rounded-xl border border-dashed border-line bg-glass px-5 py-4 backdrop-blur">
                    <TelemetryTag className="mb-1">{p.tag}</TelemetryTag>
                    <p className="font-medium text-body">{p.title}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-10">
              <Button href="/case-studies" variant="secondary">Read the case studies instead</Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
