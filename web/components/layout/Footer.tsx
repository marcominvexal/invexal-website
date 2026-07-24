import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { TelemetryTag } from "@/components/ui/primitives";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { SITE } from "@/lib/seo";
import { services } from "@/lib/data/services";
import { solutions } from "@/lib/data/solutions";
import { industries } from "@/lib/data/industries";
import { products } from "@/lib/data/products";

const col = (title: string, links: { name: string; href: string }[]) => ({ title, links });

export default function Footer() {
  const columns = [
    col("Services", services.slice(0, 8).map((s) => ({ name: s.name, href: `/services/${s.slug}` }))),
    col("Solutions", solutions.slice(0, 8).map((s) => ({ name: s.name, href: `/solutions/${s.slug}` }))),
    col("Industries", industries.slice(0, 8).map((i) => ({ name: i.name, href: `/industries/${i.slug}` }))),
    col("Products", products.map((p) => ({ name: p.name, href: `/products/${p.slug}` }))),
    col("Company", [
      { name: "About", href: "/company/about" },
      { name: "Partners", href: "/company/partners" },
      { name: "Careers", href: "/company/careers" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Blog", href: "/resources/blog" },
      { name: "Resources", href: "/resources" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/legal/privacy" },
      { name: "Terms", href: "/legal/terms" },
    ]),
  ];

  return (
    <footer className="bg-navy">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 flex flex-col justify-between gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center">
              <Image
                src="/brand/invexal-logo.png"
                alt="Invexal"
                width={914}
                height={250}
                className="h-8 w-auto brightness-0 invert"
              />
              <span className="ml-3 border-l border-white/20 pl-3 font-display text-xl font-bold text-white">AIoT</span>
            </div>
            <p className="mt-3 max-w-sm text-white/60">Intelligence for the physical world. AI that sees, predicts, and acts.</p>
          </div>
          <div className="lg:text-right">
            <div className="mb-3 font-mono text-telemetry uppercase text-teal">Field notes, occasionally</div>
            <NewsletterForm />
          </div>
        </div>

        <div className="grid gap-8 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-5">
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <TelemetryTag className="mb-4 block text-teal">{c.title}</TelemetryTag>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/60 transition hover:text-white">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="grid gap-4 border-b border-white/10 py-12 md:grid-cols-3">
          {SITE.offices.map((o) => (
            <div key={o.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start gap-3">
                <MapPin aria-hidden className="mt-1 h-4 w-4 shrink-0 text-teal" />
                <div>
                  <div className="font-mono text-telemetry uppercase text-teal">{o.name}</div>
                  <p className="mt-1 text-sm text-white/60">{`${o.street}, ${o.city}, ${[o.region, o.postal].filter(Boolean).join(" ")}, ${o.country}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col justify-between gap-6 text-sm text-white/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Invexal. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 hover:text-white">
              <Phone aria-hidden className="h-3.5 w-3.5" /> {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white">
              <Mail aria-hidden className="h-3.5 w-3.5" /> {SITE.email}
            </a>
          </div>
          <div className="flex gap-3">
            {[
              { Icon: Linkedin, href: SITE.socials[0], label: "LinkedIn" },
              { Icon: Twitter, href: SITE.socials[1], label: "Twitter / X" },
              { Icon: Facebook, href: SITE.socials[2], label: "Facebook" },
              { Icon: Instagram, href: SITE.socials[3], label: "Instagram" },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} className="rounded-full border border-white/15 p-2.5 text-white/60 transition hover:border-teal/50 hover:text-teal">
                <Icon aria-hidden className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
