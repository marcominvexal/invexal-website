import {
  Hero, TrustedBy, Stats, ServicesGrid, Capabilities, IndustriesGrid,
  ProductsShowcase, WhyInvexal, Process, Testimonials, HomeFAQ,
} from "@/components/home/sections";
import CTABand from "@/components/layout/CTABand";
import { JsonLd, faqJsonLd } from "@/lib/seo";
import { homeFaqs } from "@/lib/data/site";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <Hero />
      <TrustedBy />
      <Stats />
      <ServicesGrid />
      <Capabilities />
      <IndustriesGrid />
      <ProductsShowcase />
      <WhyInvexal />
      <Process />
      <Testimonials />
      <HomeFAQ />
      <CTABand />
    </>
  );
}
