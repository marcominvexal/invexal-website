import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Eye, Bot, Sparkles, TrendingUp, MessageSquareText, Cpu, Boxes, Workflow,
  ArrowUpRight,
} from "lucide-react";
import { Button, GlassCard, PhotoFrame, SectionHeading, TelemetryTag } from "@/components/ui/primitives";
import { Reveal, StatCounter, Accordion, TestimonialCarousel, TimelineLine } from "@/components/ui/motion";
import { stats, testimonials, homeFaqs, whyInvexal, processSteps, capabilities } from "@/lib/data/site";
import { services } from "@/lib/data/services";
import { solutions } from "@/lib/data/solutions";
import { industries } from "@/lib/data/industries";
import { HeroVisual } from "./HeroVisual";
import { CapabilityOrbit } from "./CapabilityOrbit";
import { ProductVideoCard } from "@/components/media/ProductVideoCard";
import { TelemetryVideoCard } from "@/components/media/TelemetryVideoCard";
import { videoProducts, telemetryProducts } from "@/lib/data/demoVideos";

/** width/height mirror each logo file's real intrinsic aspect ratio so next/image
 * (and object-contain) render every mark at a consistent height without squishing
 * or clipping wide logos inside a fixed-width card. */
const clientLogos = [
  { name: "Deutsche Telekom IoT", src: "/brand/clients/deutsche-telekom.svg", w: 84, h: 100 },
  { name: "Mazik Global", src: "/brand/clients/mazik-global.png", w: 413, h: 100 },
  { name: "IDTRONIC", src: "/brand/clients/idtronic.webp", w: 392, h: 100 },
  { name: "Al Busayra", src: "/brand/clients/al-busayra.png", w: 290, h: 100 },
  { name: "Exponentia Global", src: "/brand/clients/exponentia-global.png", w: 198, h: 100 },
  { name: "Infinitee Xclusives", src: "/brand/clients/infinitee-xclusives.png", w: 452, h: 100 },
  { name: "Maliban", src: "/brand/clients/maliban.png", w: 221, h: 100 },
  { name: "Silvermill", src: "/brand/clients/silvermill.svg", w: 133, h: 100 },
];

/* ---------- Hero ---------- */
export function Hero() {
  return (
    <section className="signal-lattice-dark relative overflow-hidden bg-navy pb-24 pt-40">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[56rem] -translate-x-1/2 bg-signal-radial opacity-40 blur-2xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <Reveal>
            <TelemetryTag live className="mb-6 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur">
              Enterprise AI Platform
            </TelemetryTag>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-display-xl font-bold tracking-tight text-white">
              Intelligence for the <span className="text-gradient">physical world.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl lg:mx-0">
              AI agents, computer vision, and connected operations — deployed where your business actually runs.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button href="/book-a-demo">Book a demo</Button>
              <Button
                href="/solutions"
                variant="secondary"
                className="border-white/25 !bg-white/5 !text-white before:!bg-white/15 after:!bg-white/15 hover:border-white/50"
              >
                Explore solutions
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="hidden lg:block">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Trusted by ---------- */

export function TrustedBy() {
  return (
    <section aria-label="Trusted by" className="border-y border-line bg-ink-raised/60 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <TelemetryTag className="mb-8 flex justify-center">Trusted across 5+ countries</TelemetryTag>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max items-center gap-8 [animation-duration:60s] animate-marquee hover:[animation-play-state:paused]">
            {[...clientLogos, ...clientLogos].map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="flex h-32 w-56 shrink-0 items-center justify-center rounded-2xl border border-line bg-glass px-8 shadow-card transition duration-200 hover:-translate-y-1 hover:border-teal/40 hover:shadow-glow"
              >
                <Image src={c.src} alt={c.name} width={c.w} height={c.h} className="h-20 w-auto max-w-full object-contain" />
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

/* ---------- Services (image left, cards right) ---------- */
const serviceCatIcons: Record<string, typeof TrendingUp> = {
  "AI & Data": TrendingUp,
  "Intelligent Systems": Bot,
  "Connected Operations": Workflow,
};

export function ServicesGrid() {
  const featured = [
    "ai-agent-development", "computer-vision", "generative-ai", "predictive-analytics",
    "aiot-development", "ai-automation",
  ];
  const items = featured.map((slug) => services.find((s) => s.slug === slug)!).filter(Boolean);
  return (
    <section className="bg-ink-raised py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Services"
          title="From AI strategy to systems in production"
          lede="Eighteen disciplines, one delivery model: assess, pilot, deploy, scale — with your data, on your infrastructure."
        />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <PhotoFrame
              src="/photos/category-ai-data.jpg"
              alt="AI and data engineering at work"
              sizes="(min-width: 1024px) 340px, 100vw"
              className="aspect-[3/4]"
            />
            <div className="mt-6 flex items-center justify-between rounded-xl border border-line bg-glass px-5 py-4 backdrop-blur">
              <div>
                <div className="font-display text-2xl font-bold text-body">18</div>
                <div className="font-mono text-telemetry uppercase text-muted">Disciplines, one spine</div>
              </div>
              <Button href="/services" variant="ghost">All services</Button>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 2) * 0.08}>
                <Link href={`/services/${s.slug}`} className="group block h-full">
                  <GlassCard className="flex h-full flex-col">
                    {(() => {
                      const Icon = serviceCatIcons[s.category] ?? Sparkles;
                      return (
                        <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-signal-gradient text-ink">
                          <Icon aria-hidden className="h-5 w-5" />
                        </span>
                      );
                    })()}
                    <TelemetryTag className="mb-2">{s.category}</TelemetryTag>
                    <h3 className="font-display text-lg font-semibold text-body">{s.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.lede.split(". ")[0]}.</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {s.stack.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-full border border-line bg-ink-raised px-2.5 py-1 text-xs text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal">
                      Explore <ArrowUpRight aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </GlassCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Capabilities (circular ecosystem, navy anchor section) ---------- */
const capIcons = [Sparkles, Bot, Eye, TrendingUp, MessageSquareText, Cpu, Boxes, Workflow];

export function Capabilities() {
  return (
    <section className="relative overflow-hidden bg-navy py-24">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-teal/10 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="AI capabilities"
          title="The stack behind every deployment"
          lede="Eight core capabilities, combined per use case — never a model looking for a problem."
          center
          dark
        />

        <div className="hidden lg:block">
          <CapabilityOrbit capabilities={capabilities} />
        </div>

        {/* Grid fallback — mobile/tablet */}
        <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
          {capabilities.map((c, i) => {
            const Icon = capIcons[i % capIcons.length];
            return (
              <Reveal key={c.name} delay={(i % 4) * 0.05}>
                <div className="h-full rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
                  <Icon aria-hidden className="mb-4 h-6 w-6 text-teal" />
                  <h3 className="font-display font-semibold text-white">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{c.blurb}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Industries (large image cards) ---------- */
const industryPhotoSlugs = ["manufacturing", "healthcare", "retail", "logistics", "construction", "smart-cities"];

export function IndustriesGrid() {
  const featured = industryPhotoSlugs.map((slug) => industries.find((i) => i.slug === slug)!).filter(Boolean);
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Industries"
          title="Deployed where work is physical"
          lede="Thirteen industries where cameras, sensors, and agents change the operating numbers."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((ind, i) => {
            const tags = ind.solutionStack.slice(0, 2).map((slug) => solutions.find((s) => s.slug === slug)?.name).filter(Boolean) as string[];
            return (
              <Reveal key={ind.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-line"
                >
                  <Image
                    src={`/photos/industry-${ind.slug}.jpg`}
                    alt={ind.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/55 to-navy/10 transition-opacity duration-300 group-hover:from-teal/90 group-hover:via-navy/60" />
                  <div className="relative p-6">
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {tags.map((t) => (
                        <span key={t} className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[11px] text-white/90 backdrop-blur">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white">{ind.name}</h3>
                    <p className="mt-1 text-sm text-white/75">{ind.benefits[0]}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white">
                      Explore <ArrowUpRight aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Button href="/industries" variant="ghost">All 13 industries</Button>
        </div>
      </div>
    </section>
  );
}

export function ProductsShowcase() {
  return (
    <section className="border-y border-line bg-ink-raised py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Products"
          title="Platforms, not one-off projects"
          lede="Nine production platforms you can demo this week — then tailor to your estate."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {videoProducts.map((card, i) => (
            <ProductVideoCard key={card.slug} card={card} index={i} />
          ))}
          {telemetryProducts.map((card, i) => (
            <TelemetryVideoCard key={card.slug} card={card} index={videoProducts.length + i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/products" variant="ghost">All 9 products</Button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Invexal (expertise cards) ---------- */
const whyIcons = [Sparkles, Bot, Eye, Cpu, Boxes, Workflow];
export function WhyInvexal() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Why Invexal"
          title="A decade of hardware-grade delivery, now with an AI core"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyInvexal.map((w, i) => {
            const Icon = whyIcons[i % whyIcons.length];
            const inverted = i % 2 === 1;
            return (
              <Reveal key={w.title} delay={(i % 3) * 0.06}>
                <GlassCard
                  className={cn(
                    "h-full",
                    inverted && "border-transparent bg-signal-gradient shadow-glow hover:border-transparent hover:shadow-card-xl"
                  )}
                >
                  <span
                    className={cn(
                      "mb-4 flex h-11 w-11 items-center justify-center rounded-lg",
                      inverted ? "bg-ink text-teal" : "bg-signal-gradient text-ink"
                    )}
                  >
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <h3 className={cn("font-display font-semibold", inverted ? "text-white" : "text-body")}>{w.title}</h3>
                  <p className={cn("mt-2 text-sm leading-relaxed", inverted ? "text-white/75" : "text-muted")}>
                    {w.body.split(". ")[0]}.
                  </p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process (timeline, royal-blue anchor section) ---------- */
export function Process() {
  return (
    <section className="relative overflow-hidden bg-navy-gradient py-24">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-teal/10 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="How we work"
          title="Assess → Pilot → Deploy → Scale → Operate"
          lede="Every engagement runs the same spine, so you always know what happens next and what it proves. Hover a step for the detail."
          center
          dark
        />
        <ol className="relative">
          <div aria-hidden className="absolute bottom-5 left-5 top-5 w-px bg-white/15 md:hidden" />
          <TimelineLine orientation="vertical" className="bottom-5 left-5 top-5 w-px md:hidden" />
          <div aria-hidden className="absolute left-0 right-0 top-5 hidden h-px bg-white/15 md:block" />
          <TimelineLine orientation="horizontal" className="left-0 right-0 top-5 hidden h-px md:block" />
          <div className="grid gap-8 md:grid-cols-5">
            {processSteps.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                {/* group-hover "pops" the whole step forward and reveals the body detail, which is
                    collapsed by default on desktop (md:) — always visible on mobile/no-hover. */}
                <li className="group relative flex gap-4 rounded-2xl transition-all duration-300 hover:z-10 hover:-translate-y-2 md:flex-col md:items-center md:gap-0 md:p-4 md:text-center md:hover:scale-105 md:hover:bg-white/5 md:hover:shadow-card-xl">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-teal bg-ink font-mono text-sm font-semibold text-teal transition-transform duration-300 group-hover:scale-110 md:mb-4">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70 md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-500 md:group-hover:max-h-40 md:group-hover:opacity-100">
                      {p.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </div>
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
    <section className="bg-ink-raised py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="FAQ" title="Common questions, straight answers" center />
        <Accordion items={homeFaqs} />
      </div>
    </section>
  );
}
