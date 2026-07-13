import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero, CardGrid } from "@/components/templates/blocks";
import CTABand from "@/components/layout/CTABand";
import { SectionHeading, GlassCard, TelemetryTag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/motion";

export const metadata = buildMetadata({
  title: "Partners",
  description:
    "Invexal delivers alongside a network of connectivity, hardware, and cloud partners — including Deutsche Telekom IoT — across the US, UK, and UAE.",
  path: "/company/partners",
  keywords: ["invexal partners", "iot partner network", "ai delivery partners"],
});

const partnerTypes = [
  { title: "Connectivity", body: "Global cellular, NB-IoT, and LoRaWAN coverage through carrier partners — including Deutsche Telekom IoT — so devices ship with connectivity solved." },
  { title: "Hardware", body: "Cameras, sensors, trackers, and edge compute from manufacturers we've deployed at scale, including industrial RFID specialists like IDTRONIC." },
  { title: "Cloud & platform", body: "Deployments on the hyperscaler your organization already trusts, with edge and on-premises options where data can't leave site." },
  { title: "Systems integration", body: "Regional SI partners who carry installation, cabling, and local support across our deployment geographies." },
];

const whyPartner = [
  { title: "For technology vendors", body: "Your hardware or connectivity inside our repeatable solution decks — qualified into real enterprise deployments, not a logo page." },
  { title: "For integrators & resellers", body: "White-label products (tracking, monitoring, vision analytics) with engineering support behind you on every bid." },
  { title: "For consultancies", body: "A delivery partner for the AI and IoT work your clients ask for — we build, you own the relationship." },
];

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Company", path: "/company/about" }, { name: "Partners", path: "/company/partners" }])} />
      <PageHero
        eyebrow="Company / Partners"
        title="Nobody deploys in the physical world alone."
        lede="Every Invexal deployment stands on a network of connectivity, hardware, cloud, and integration partners — assembled per project, accountable as one team."
        primaryCta={{ label: "Become a partner", href: "/contact" }}
      />
      <CardGrid eyebrow="The network" title="Four kinds of partners behind every deployment" items={partnerTypes} columns={2} />
      <section className="border-y border-line bg-ink-raised/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Partner with us" title="Where you might fit" />
          <div className="grid gap-6 md:grid-cols-3">
            {whyPartner.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06}>
                <GlassCard className="h-full">
                  <TelemetryTag className="mb-3">Partnership</TelemetryTag>
                  <h2 className="font-display font-semibold text-body">{w.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{w.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABand title="Interested in partnering with Invexal?" lede="Tell us what you build or where you deliver — partnership conversations start with a 30-minute call." />
    </>
  );
}
