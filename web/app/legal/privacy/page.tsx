import { buildMetadata, JsonLd, breadcrumbJsonLd, SITE } from "@/lib/seo";
import { PageHero } from "@/components/templates/blocks";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Invexal collects, uses, and protects personal data across invexal.com and its services.",
  path: "/legal/privacy",
  keywords: [],
});

/**
 * [VERIFY — LEGAL REVIEW REQUIRED]
 * This is a structural draft, not legal advice. Have counsel review and adapt it
 * for the jurisdictions Invexal operates in (US, UK/GDPR, UAE) before launch,
 * and confirm the actual analytics/cookie stack once chosen.
 */

const sections: { h: string; p: string[] }[] = [
  {
    h: "Who we are",
    p: [
      `Invexal ("we", "us") operates invexal.com from offices in the United States, United Kingdom, and United Arab Emirates. For privacy matters, contact ${SITE.email}.`,
    ],
  },
  {
    h: "What we collect",
    p: [
      "Information you submit through our forms: name, work email, company, phone number, and the content of your message.",
      "Technical data collected automatically when you visit: IP address, browser type, pages viewed, and referring URL, used for security and to understand how the site is used.",
    ],
  },
  {
    h: "How we use it",
    p: [
      "To respond to your inquiries, schedule demos, and provide the services you request.",
      "To operate, secure, and improve the website.",
      "To send communications you've requested. We do not sell personal data.",
    ],
  },
  {
    h: "Legal bases (UK/EU visitors)",
    p: [
      "We process form submissions on the basis of legitimate interest in responding to business inquiries, or consent where required. You may withdraw consent at any time.",
    ],
  },
  {
    h: "Retention",
    p: [
      "Inquiry data is retained for as long as needed to handle your request and for a reasonable period afterward for business records, then deleted.",
    ],
  },
  {
    h: "Sharing",
    p: [
      "We share data only with service providers who help us operate the site and respond to inquiries (hosting, email delivery, CRM), under contracts that restrict their use of it. We may disclose data where required by law.",
    ],
  },
  {
    h: "International transfers",
    p: [
      "Because we operate across the US, UK, and UAE, your data may be processed in these regions with appropriate safeguards in place.",
    ],
  },
  {
    h: "Your rights",
    p: [
      `Depending on your location, you may have rights to access, correct, delete, or restrict processing of your personal data, and to complain to a supervisory authority. To exercise them, email ${SITE.email}.`,
    ],
  },
  {
    h: "Changes",
    p: ["We'll post any changes to this policy on this page with an updated effective date."],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Privacy Policy", path: "/legal/privacy" }])} />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lede="How we collect, use, and protect personal data on invexal.com."
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
