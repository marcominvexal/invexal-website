import { buildMetadata, JsonLd, breadcrumbJsonLd, SITE } from "@/lib/seo";
import { PageHero, CardGrid, Checklist } from "@/components/templates/blocks";
import { SectionHeading } from "@/components/ui/primitives";
import { Button } from "@/components/ui/primitives";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Build AI that ships to plants, fleets, and cities. Invexal hires engineers and delivery leads across US, UK, and UAE — remote-friendly, deployment-real.",
  path: "/company/careers",
  keywords: ["invexal careers", "ai engineering jobs", "iot jobs"],
});

const values = [
  { title: "Ship to the physical world", body: "Your work ends up on a plant floor or a tower site, not in a demo folder. That standard shapes everything about how we engineer." },
  { title: "Small teams, whole problems", body: "You own a deployment end to end — model, hardware constraints, customer conversation — instead of a slice of a backlog." },
  { title: "Three offices, one team", body: "Dover, London, and Dubai, with remote collaboration as the default and travel to deployments when the work needs eyes on site." },
  { title: "Learn on real constraints", body: "Edge compute budgets, OT networks, ATEX zones, twenty-year-old machines — constraints that make engineers better, fast." },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Company", path: "/company/about" }, { name: "Careers", path: "/company/careers" }])} />
      <PageHero
        eyebrow="Company / Careers"
        title="Build AI that has to work on a Tuesday night shift."
        lede="We hire people who want their models, firmware, and pipelines running in real operations — with all the messy, satisfying constraints that come with it."
        primaryCta={{ label: "Introduce yourself", href: `mailto:${SITE.email}?subject=Careers%20at%20Invexal` }}
      />
      <CardGrid eyebrow="How we work" title="What it's like here" items={values} columns={2} />
      <Checklist
        eyebrow="Who we look for"
        title="Backgrounds that thrive at Invexal"
        items={[
          "ML / computer-vision engineers who care whether inference fits on a Jetson",
          "Full-stack engineers comfortable owning features from schema to pixel",
          "Firmware and embedded engineers who've debugged in the field",
          "Delivery and project leads who can walk a plant and talk to a board",
        ]}
      />
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionHeading eyebrow="Open roles" title="No public listings right now — write anyway" center />
          <p className="mx-auto -mt-6 mb-8 max-w-xl text-muted">
            Roles open as deployments land, and strong introductions get read first. Send a short
            note about what you've shipped to{" "}
            <a href={`mailto:${SITE.email}`} className="text-teal hover:underline">{SITE.email}</a>.
          </p>
          <Button href={`mailto:${SITE.email}?subject=Careers%20at%20Invexal`}>Email us your work</Button>
        </div>
      </section>
    </>
  );
}
