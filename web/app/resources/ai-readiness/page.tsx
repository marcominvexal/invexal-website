import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero, CardGrid, Checklist } from "@/components/templates/blocks";
import ContactForm from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/ui/primitives";

export const metadata = buildMetadata({
  title: "AI Readiness Assessment",
  description:
    "A structured assessment of your data, infrastructure, and use cases — delivering a scored roadmap of where AI pays back first in your operation.",
  path: "/resources/ai-readiness",
  keywords: ["ai readiness assessment", "ai maturity assessment", "enterprise ai roadmap"],
});

const covers = [
  { title: "Data & infrastructure audit", body: "What you capture today, where it lives, and what's missing for the use cases you care about." },
  { title: "Use-case scoring", body: "Candidate deployments ranked by value, feasibility, and time-to-pilot — not by hype." },
  { title: "Architecture recommendation", body: "Edge vs. cloud, integration points, and security posture matched to your environment." },
  { title: "Pilot definition", body: "One site, one KPI, a budget range, and a 4–8 week plan you can take to your board." },
];

export default function AIReadinessPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Resources", path: "/resources" }, { name: "AI Readiness Assessment", path: "/resources/ai-readiness" }])} />
      <PageHero
        eyebrow="AI Readiness Assessment"
        title="Find out where AI pays back first — before you spend on it."
        lede="A structured working session with our engineers that turns 'we should do something with AI' into a scored, sequenced roadmap."
        primaryCta={{ label: "Request the assessment", href: "#request" }}
        image={{ src: "/photos/hub-ai-readiness.jpg", alt: "Team planning a roadmap on a whiteboard" }}
      />
      <CardGrid eyebrow="What it covers" title="Four deliverables, one session" items={covers} columns={2} />
      <Checklist
        eyebrow="Who it's for"
        title="You'll get the most from this if…"
        items={[
          "You operate physical assets — plants, fleets, sites, buildings, or networks",
          "You have cameras, sensors, or systems producing data nobody fully uses",
          "You need a defensible business case before committing budget",
          "You've tried a proof-of-concept that never made it to production",
        ]}
      />
      <section id="request" className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading eyebrow="Request" title="Book your assessment" center />
          <ContactForm />
        </div>
      </section>
    </>
  );
}
