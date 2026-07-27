import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";
import { services } from "@/lib/data/services";
import { solutions } from "@/lib/data/solutions";
import { industries } from "@/lib/data/industries";
import { products } from "@/lib/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  // No lastModified here: this repo has no per-page content-modified
  // tracking, and stamping every URL with the build time on every deploy is
  // a fabricated freshness signal that can make Google trust real updates
  // less over time.
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "monthly",
    priority,
  });

  return [
    entry("/", 1),
    entry("/services", 0.9),
    entry("/solutions", 0.9),
    entry("/industries", 0.9),
    entry("/products", 0.9),
    entry("/case-studies", 0.8),
    entry("/company/about", 0.7),
    // /company/leadership intentionally omitted — no real leader content yet
    // (see the page's own [VERIFY] comment); it's noindexed until populated.
    entry("/company/partners", 0.6),
    entry("/company/careers", 0.6),
    entry("/contact", 0.8),
    entry("/book-a-demo", 0.9),
    entry("/resources", 0.7),
    entry("/resources/ai-readiness", 0.8),
    entry("/resources/blog", 0.6),
    entry("/legal/privacy", 0.2),
    entry("/legal/terms", 0.2),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.8)),
    ...solutions.map((s) => entry(`/solutions/${s.slug}`, 0.8)),
    ...industries.map((i) => entry(`/industries/${i.slug}`, 0.7)),
    ...products.map((p) => entry(`/products/${p.slug}`, 0.8)),
  ];
}
