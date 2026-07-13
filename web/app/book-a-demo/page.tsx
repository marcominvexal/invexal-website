import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/templates/blocks";
import ContactForm from "@/components/forms/ContactForm";
import { GlassCard, TelemetryTag } from "@/components/ui/primitives";

export const metadata = buildMetadata({
  title: "Book a Demo",
  description:
    "Book a 30-minute demo: VisionWatch on your footage, FuelIQ on your estate, or agents on your workflow. Working session, not a slideshow.",
  path: "/book-a-demo",
  keywords: ["book ai demo", "video analytics demo", "iot platform demo"],
});

const expectations = [
  { title: "30 minutes, working session", body: "An engineer on the call, your use case on screen. No slideware." },
  { title: "Your data where possible", body: "Send sample footage or telemetry in advance and the demo runs on it." },
  { title: "A concrete next step", body: "You leave with a pilot scope, a budget range, and a timeline — or a clear 'not yet'." },
];

export default function BookDemoPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Book a demo", path: "/book-a-demo" }])} />
      <PageHero
        eyebrow="Book a demo"
        title="See it running before you commit to anything."
        lede="Pick a product or describe a problem — we'll bring the demo to it."
        primaryCta={{ label: "Prefer to call? +1 (302) 579-0576", href: "tel:+13025790576" }}
        image={{ src: "/photos/hub-book-a-demo.jpg", alt: "Working session over video call" }}
      />
      <section className="pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {/* Swap for your Calendly/HubSpot Meetings embed when the scheduling stack is chosen. */}
            <ContactForm />
          </div>
          <div className="space-y-4 lg:col-span-2">
            {expectations.map((e) => (
              <GlassCard key={e.title}>
                <TelemetryTag className="mb-2">What to expect</TelemetryTag>
                <h2 className="font-display font-semibold text-body">{e.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">{e.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
