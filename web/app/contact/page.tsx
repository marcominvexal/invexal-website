import { buildMetadata, JsonLd, breadcrumbJsonLd, SITE } from "@/lib/seo";
import { PageHero } from "@/components/templates/blocks";
import ContactForm from "@/components/forms/ContactForm";
import { GlassCard, TelemetryTag } from "@/components/ui/primitives";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export const metadata = buildMetadata({
  title: "Contact Invexal",
  description:
    "Talk to Invexal about AI agents, computer vision, AIoT, and automation. Offices in Dover, London, and Dubai. Replies within one business day.",
  path: "/contact",
  keywords: ["contact invexal", "ai company contact"],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      <PageHero
        eyebrow="Contact"
        title="Tell us what your operation should be able to see."
        lede="One message reaches engineers, not a queue. We reply within one business day with a concrete next step."
        primaryCta={{ label: "Book a demo instead", href: "/book-a-demo" }}
        image={{ src: "/photos/hub-contact.jpg", alt: "Support engineer at a workstation" }}
      />
      <section className="pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="space-y-4 lg:col-span-2">
            <GlassCard className="border-transparent bg-signal-gradient shadow-glow hover:border-transparent hover:shadow-card-xl">
              <TelemetryTag className="mb-3 text-white">Direct</TelemetryTag>
              <div className="space-y-3 text-sm">
                <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-3 text-white hover:text-white/80">
                  <Phone aria-hidden className="h-4 w-4 text-white" /> {SITE.phone}
                </a>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-white hover:text-white/80">
                  <Mail aria-hidden className="h-4 w-4 text-white" /> {SITE.email}
                </a>
                <a href="https://wa.me/971586839220" className="flex items-center gap-3 text-white hover:text-white/80">
                  <MessageCircle aria-hidden className="h-4 w-4 text-white" /> WhatsApp +971 58 683 9220
                </a>
              </div>
            </GlassCard>
            {SITE.offices.map((o) => (
              <GlassCard key={o.name}>
                <div className="flex gap-3">
                  <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  <div>
                    <TelemetryTag className="mb-1">{o.name}</TelemetryTag>
                    <p className="text-sm leading-relaxed text-muted">{`${o.street}, ${o.city}, ${[o.region, o.postal].filter(Boolean).join(" ")}, ${o.country}`}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
