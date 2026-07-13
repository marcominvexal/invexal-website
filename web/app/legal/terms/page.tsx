import { buildMetadata, JsonLd, breadcrumbJsonLd, SITE } from "@/lib/seo";
import { PageHero } from "@/components/templates/blocks";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: "Terms governing the use of invexal.com.",
  path: "/legal/terms",
  keywords: [],
});

/**
 * [VERIFY — LEGAL REVIEW REQUIRED]
 * Structural draft only. Counsel must review governing law, liability language,
 * and jurisdiction-specific requirements before launch.
 */

const sections: { h: string; p: string[] }[] = [
  {
    h: "Acceptance",
    p: ["By accessing invexal.com you agree to these terms. If you don't agree, please don't use the site."],
  },
  {
    h: "Use of the site",
    p: [
      "The site and its content are provided for information about Invexal's services and products. You may not use the site unlawfully, attempt to gain unauthorized access to it, or interfere with its operation.",
    ],
  },
  {
    h: "Intellectual property",
    p: [
      "All content on this site — text, design, graphics, product names, and logos — belongs to Invexal or its licensors. You may not reproduce it without written permission, except for personal, non-commercial reference.",
    ],
  },
  {
    h: "No warranties",
    p: [
      "The site is provided \"as is\". While we work to keep information accurate and current, we make no warranties about its completeness or fitness for any purpose. Content on this site is not professional advice; engagements are governed by their own contracts.",
    ],
  },
  {
    h: "Limitation of liability",
    p: [
      "To the maximum extent permitted by law, Invexal is not liable for indirect or consequential losses arising from use of this site.",
    ],
  },
  {
    h: "Third-party links",
    p: ["Links to third-party sites are provided for convenience; we're not responsible for their content or practices."],
  },
  {
    h: "Changes",
    p: ["We may update these terms; continued use after changes means you accept them."],
  },
  {
    h: "Contact",
    p: [`Questions about these terms: ${SITE.email}.`],
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Terms of Use", path: "/legal/terms" }])} />
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        lede="The terms governing use of invexal.com."
        primaryCta={{ label: "Questions? Contact us", href: "/contact" }}
      />
      <section className="pb-24">
        <div className="mx-auto max-w-3xl space-y-10 px-6">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-xl font-semibold text-body">{s.h}</h2>
              {s.p.map((para, i) => (
                <p key={i} className="mt-3 leading-relaxed text-muted">{para}</p>
              ))}
            </div>
          ))}
          <p className="border-t border-line pt-6 font-mono text-telemetry uppercase text-muted">
            Effective date: [VERIFY — set at launch after legal review]
          </p>
        </div>
      </section>
    </>
  );
}
