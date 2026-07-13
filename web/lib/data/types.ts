export type FAQ = { q: string; a: string };
export type Stat = { label: string; value: number; suffix: string; verified: boolean };

export type Service = {
  slug: string;
  category: "AI & Data" | "Intelligent Systems" | "Connected Operations";
  name: string; // nav label
  heroTitle: string; // outcome-phrased H1
  lede: string;
  challenge: string;
  pillars: { title: string; body: string }[];
  benefits: { title: string; body: string }[];
  stack: string[];
  industries: string[]; // industry slugs
  useCases: string[];
  faqs: FAQ[];
  seo: { title: string; description: string; keywords: string[] };
};

export type Solution = {
  slug: string;
  group: "Vision AI" | "Operations" | "Environment & Energy" | "Smart Spaces";
  name: string;
  heroTitle: string;
  lede: string;
  capabilities: string[];
  howItWorks: string[]; // 3 steps
  kpis: string[];
  parentService: string; // service slug
  product?: string; // product slug
  industries: string[];
  faqs: FAQ[];
  seo: { title: string; description: string; keywords: string[] };
};

export type Industry = {
  slug: string;
  name: string;
  heroTitle: string;
  lede: string;
  painPoints: { title: string; body: string }[];
  solutionStack: string[]; // solution slugs
  products: string[]; // product slugs
  benefits: string[];
  faqs: FAQ[];
  seo: { title: string; description: string; keywords: string[] };
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  lede: string;
  features: { title: string; body: string }[];
  deployment: string[];
  integrations: string[];
  benefits: string[];
  industries: string[];
  faqs: FAQ[];
  seo: { title: string; description: string; keywords: string[] };
};
