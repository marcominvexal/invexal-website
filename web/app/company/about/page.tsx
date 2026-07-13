import { buildMetadata, JsonLd, breadcrumbJsonLd, SITE } from "@/lib/seo";
import { PageHero, Checklist } from "@/components/templates/blocks";
import CTABand from "@/components/layout/CTABand";
import { SectionHeading, GlassCard, TelemetryTag, PhotoFrame } from "@/components/ui/primitives";
import { Reveal, StatCounter } from "@/components/ui/motion";
import { stats, whyInvexal } from "@/lib/data/site";
import { MapPin } from "lucide-react";

export const metadata = buildMetadata({
  title: "About Invexal",
  description:
    "A decade of connected-systems engineering, rebuilt around an AI core. Offices in Dover, London, and Dubai; deployments across 5+ countries.",
  path: "/company/about",
  keywords: ["about invexal", "enterprise ai company", "aiot company"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Company", path: "/company/about" }, { name: "About", path: "/company/about" }])} />
      <PageHero
        eyebrow="Company"
        title="Ten years wiring the physical world. Now teaching it to think."
        lede="Invexal began as connected-systems engineers — sensors, devices, and the unglamorous work of making hardware report the truth. That decade is why our AI ships: we already know the plants, fleets, and sites it has to live in."
      />

      <section className="border-y border-line bg-ink-raised/40 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our story" title="From IoT experts to enterprise AI partner" />
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              <p>
                Most AI companies start with models and go looking for problems. We started with
                problems — fuel disappearing from tower sites, fleets invisible between check-ins,
                safety officers watching sixty cameras with two eyes — and built the connected
                infrastructure to see them.
              </p>
              <p>
                AI changed what that infrastructure can do. Cameras became inspectors. Sensor
                histories became forecasts. Dashboards became agents that act. We rebuilt the company
                around that shift: the same hardware-grade delivery discipline, now with AI as the
                core of every deployment.
              </p>
              <p>
                Today we work from {SITE.offices.length} offices across the US, UK, and UAE, alongside
                partners including Deutsche Telekom IoT — deploying AI agents, computer vision, AIoT,
                and intelligent automation for enterprises that operate in the physical world.
              </p>
            </div>
          </div>
          <PhotoFrame
            src="/photos/about-team.jpg"
            alt="Invexal engineers reviewing a deployment"
            className="aspect-[4/3]"
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
          {stats.filter((s) => s.verified).map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
            </Reveal>
          ))}
        </div>
      </section>

      <Checklist eyebrow="How we operate" title="What working with us feels like" items={whyInvexal.map((w) => `${w.title} — ${w.body}`)} />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Offices" title="Where to find us" />
          <div className="grid gap-6 md:grid-cols-3">
            {SITE.offices.map((o, i) => (
              <Reveal key={o.name} delay={i * 0.06}>
                <GlassCard className="h-full">
                  <MapPin aria-hidden className="mb-3 h-5 w-5 text-teal" />
                  <TelemetryTag className="mb-2">{o.name}</TelemetryTag>
                  <p className="text-sm leading-relaxed text-muted">{`${o.street}, ${o.city}, ${[o.region, o.postal].filter(Boolean).join(" ")}, ${o.country}`}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
