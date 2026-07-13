import Link from "next/link";
import Image from "next/image";
import {
  Eye, Bot, Sparkles, TrendingUp, MessageSquareText, Cpu, Boxes, Workflow,
  ArrowUpRight,
} from "lucide-react";
import { Button, PhotoFrame, GlassCard, SectionHeading, TelemetryTag } from "@/components/ui/primitives";
import { Reveal, StatCounter, Accordion, TestimonialCarousel } from "@/components/ui/motion";
import { stats, testimonials, homeFaqs, whyInvexal, processSteps, capabilities } from "@/lib/data/site";
import { services } from "@/lib/data/services";
import { industries } from "@/lib/data/industries";
import { products } from "@/lib/data/products";

/* ---------- Hero ---------- */
export function Hero() {
  return (
    <section className="signal-lattice relative overflow-hidden pb-24 pt-40">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[56rem] -translate-x-1/2 bg-signal-radial opacity-60 blur-2xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <Reveal>
            <TelemetryTag live className="mb-6 inline-flex">
              Enterprise AI · Computer Vision · AIoT · Automation
            </TelemetryTag>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-display-xl font-bold tracking-tight text-body">
              Intelligence for the <span className="text-gradient">physical world.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl lg:mx-0">
              Invexal builds AI that sees, predicts, and acts — AI agents, computer vision, and
              connected operations deployed where your business actually runs: plants, fleets,
              sites, and cities.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button href="/book-a-demo">Book a demo</Button>
              <Button href="/resources/ai-readiness" variant="secondary">
                Take the AI Readiness Assessment
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="hidden lg:block">
          <PhotoFrame
            src="/photos/hero-factory-inspection.jpg"
            alt="Engineer inspecting connected equipment on a production line"
            priority
            sizes="50vw"
            className="aspect-[4/3] animate-drift"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Trusted by ---------- */
const clientLogos = [
  { name: "Deutsche Telekom IoT", src: "/brand/clients/deutsche-telekom.svg", w: 140 },
  { name: "Mazik Global", src: "/brand/clients/mazik-global.png", w: 130 },
  { name: "IDTRONIC", src: "/brand/clients/idtronic.webp", w: 120 },
  { name: "Al Busayra", src: "/brand/clients/al-busayra.png", w: 120 },
  { name: "Exponentia Global", src: "/brand/clients/exponentia-global.png", w: 130 },
  { name: "Infinitee Xclusives", src: "/brand/clients/infinitee-xclusives.png", w: 150 },
  { name: "Maliban", src: "/brand/clients/maliban.webp", w: 110 },
  { name: "Silvermill", src: "/brand/clients/silvermill.svg", w: 120 },
];

export function TrustedBy() {
  return (
    <section aria-label="Trusted by" className="border-y border-line bg-ink-raised/60 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <TelemetryTag className="mb-6 flex justify-center">Trusted across 5+ countries</TelemetryTag>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-6 hover:[animation-play-state:paused]">
            {[...clientLogos, ...clientLogos].map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="flex h-16 w-40 shrink-0 items-center justify-center rounded-xl border border-line bg-glass px-6"
              >
                <Image src={c.src} alt={c.name} width={c.w} height={40} className="h-8 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
export function Stats() {
  const shown = stats.filter((s) => s.verified);
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
        {shown.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
export function ServicesGrid() {
  const featured = [
    "ai-agent-development", "computer-vision", "generative-ai", "predictive-analytics",
    "aiot-development", "ai-automation", "digital-twins", "ai-consulting",
  ];
  const items = featured.map((slug) => services.find((s) => s.slug === slug)!).filter(Boolean);
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Services"
          title="From AI strategy to systems in production"
          lede="Eighteen disciplines, one delivery model: assess, pilot, deploy, scale — with your data, on your infrastructure."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 0.06}>
              <Link href={`/services/${s.slug}`} className="block h-full">
                <GlassCard className="flex h-full flex-col">
                  <TelemetryTag className="mb-3">{s.category}</TelemetryTag>
                  <h3 className="font-display text-lg font-semibold text-body">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.lede.split(". ")[0]}.</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-teal">
                    Explore <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                  </span>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/services" variant="ghost">All 18 services</Button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Capabilities ---------- */
const capIcons = [Sparkles, Bot, Eye, TrendingUp, MessageSquareText, Cpu, Boxes, Workflow];
export function Capabilities() {
  return (
    <section className="border-y border-line bg-ink-raised/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="AI capabilities"
          title="The stack behind every deployment"
          lede="Eight core capabilities, combined per use case — never a model looking for a problem."
          center
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => {
            const Icon = capIcons[i % capIcons.length];
            return (
              <Reveal key={c.name} delay={(i % 4) * 0.05}>
                <GlassCard className="h-full">
                  <Icon aria-hidden className="mb-4 h-6 w-6 text-teal" />
                  <h3 className="font-display font-semibold text-body">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.blurb}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Industries ---------- */
export function IndustriesGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Industries"
          title="Deployed where work is physical"
          lede="Thirteen industries where cameras, sensors, and agents change the operating numbers."
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={(i % 3) * 0.04}>
              <li>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-line bg-glass px-5 py-4 backdrop-blur transition hover:border-teal/40"
                >
                  <span className="font-medium text-body">{ind.name}</span>
                  <ArrowUpRight aria-hidden className="h-4 w-4 text-muted transition group-hover:text-teal" />
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Products ---------- */
export function ProductsShowcase() {
  const featured = ["visionwatch", "fueliq", "worker-safety", "asset-tracking", "ecotrack", "smart-metering"];
  const items = featured.map((slug) => products.find((p) => p.slug === slug)!).filter(Boolean);
  return (
    <section className="border-y border-line bg-ink-raised/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Products"
          title="Platforms, not one-off projects"
          lede="Nine production platforms you can demo this week — then tailor to your estate."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <Link href={`/products/${p.slug}`} className="block h-full">
                <GlassCard className="flex h-full flex-col">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-display text-xl font-semibold text-body">{p.name}</h3>
                    <TelemetryTag live>Live</TelemetryTag>
                  </div>
                  <p className="text-sm font-medium text-teal">{p.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.lede.split(" — ")[0]}.</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-teal">
                    View product <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                  </span>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/products" variant="ghost">All 9 products</Button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Invexal ---------- */
export function WhyInvexal() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Why Invexal"
          title="A decade of hardware-grade delivery, now with an AI core"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyInvexal.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 0.06}>
              <div className="border-l-2 border-teal/40 pl-5">
                <h3 className="font-display font-semibold text-body">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
export function Process() {
  return (
    <section className="border-y border-line bg-ink-raised/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="How we work"
          title="Assess → Pilot → Deploy → Scale → Operate"
          lede="Every engagement runs the same spine, so you always know what happens next and what it proves."
          center
        />
        <ol className="grid gap-6 md:grid-cols-5">
          {processSteps.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <li className="relative">
                <div className="mb-3 font-mono text-telemetry uppercase text-amber">0{i + 1}</div>
                <h3 className="font-display font-semibold text-body">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
export function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Client voices" title="What operators say after go-live" center />
        <TestimonialCarousel items={testimonials} />
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function HomeFAQ() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="FAQ" title="Common questions, straight answers" center />
        <Accordion items={homeFaqs} />
      </div>
    </section>
  );
}
