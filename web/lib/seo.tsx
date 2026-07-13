import type { Metadata } from "next";

export const SITE = {
  name: "Invexal",
  url: "https://invexal.com",
  tagline: "Enterprise AI, AI Agents, Computer Vision & AIoT",
  phone: "+1 (302) 579-0576",
  email: "marcom@invexal.com",
  socials: [
    "https://www.linkedin.com/company/invexal/",
    "https://twitter.com/Invexal2",
    "https://www.facebook.com/invexal.iotexperts",
    "https://www.instagram.com/invexal.iotexperts",
  ],
  offices: [
    { name: "Headquarters", street: "8 The Green Suite #11142", city: "Dover", region: "DE", postal: "19901", country: "US" },
    { name: "UK Office", street: "20-22 Wenlock Road", city: "London", region: "England", postal: "N1 7GU", country: "GB" },
    { name: "UAE Office", street: "Building DMC5, 3rd Floor, Dubai Media City", city: "Dubai", region: "Dubai", postal: "", country: "AE" },
  ],
};

export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE.url}${opts.path}`;
  const title = opts.title.replace(new RegExp(`\\s*\\|\\s*${SITE.name}$`), "");
  return {
    title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE.name,
      type: "website",
      // images intentionally omitted — app/opengraph-image.tsx supplies a
      // generated brand card for every route automatically.
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description },
  };
}

/* ---------- JSON-LD builders ---------- */

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/brand/invexal-logo.png`,
  sameAs: SITE.socials,
  contactPoint: [{ "@type": "ContactPoint", telephone: SITE.phone, contactType: "sales", email: SITE.email }],
  address: SITE.offices.map((o) => ({
    "@type": "PostalAddress",
    streetAddress: o.street,
    addressLocality: o.city,
    addressRegion: o.region,
    postalCode: o.postal,
    addressCountry: o.country,
  })),
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE.url}${it.path}`,
  })),
});

export const serviceJsonLd = (name: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  url: `${SITE.url}${path}`,
});

export const productJsonLd = (name: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name,
  description,
  brand: { "@type": "Brand", name: SITE.name },
  url: `${SITE.url}${path}`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Contact for enterprise pricing", availability: "https://schema.org/InStock" },
});

export const faqJsonLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
