"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Menu, X, Phone, ArrowRight,
  TrendingUp, Bot, Workflow, Eye, Leaf, Building2,
  Factory, HeartPulse, ShoppingBag, GraduationCap, Hotel, Fuel, Zap, HardHat, Truck, Mountain, Wheat, Radio,
  Camera, Wind, MapPin, Gauge, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/lib/data/services";
import { solutions, solutionGroups } from "@/lib/data/solutions";
import { industries } from "@/lib/data/industries";
import { products } from "@/lib/data/products";

type MenuKey = "services" | "solutions" | "industries" | "products" | "company" | null;

const companyLinks = [
  { name: "About", href: "/company/about" },
  { name: "Leadership", href: "/company/leadership" },
  { name: "Partners", href: "/company/partners" },
  { name: "Careers", href: "/company/careers" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Blog", href: "/resources/blog" },
  { name: "Resources", href: "/resources" },
];

const serviceCatIcons: Record<string, typeof TrendingUp> = {
  "AI & Data": TrendingUp,
  "Intelligent Systems": Bot,
  "Connected Operations": Workflow,
};

const solutionGroupIcons: Record<string, typeof Eye> = {
  "Vision AI": Eye,
  Operations: Workflow,
  "Environment & Energy": Leaf,
  "Smart Spaces": Building2,
};

const industryIcons: Record<string, typeof Factory> = {
  manufacturing: Factory,
  healthcare: HeartPulse,
  retail: ShoppingBag,
  education: GraduationCap,
  hospitality: Hotel,
  "oil-and-gas": Fuel,
  utilities: Zap,
  construction: HardHat,
  logistics: Truck,
  mining: Mountain,
  agriculture: Wheat,
  telecommunications: Radio,
  "smart-cities": Building2,
};

const productIcons: Record<string, typeof Camera> = {
  visionwatch: Camera,
  fueliq: Fuel,
  ecotrack: Leaf,
  "worker-safety": HardHat,
  "smart-air-purification": Wind,
  "vehicle-tracking": Truck,
  "asset-tracking": MapPin,
  "smart-metering": Gauge,
  "environmental-monitoring": Leaf,
};

const oneLine = (text: string, max = 46) => {
  const first = text.split(". ")[0];
  return first.length > max ? `${first.slice(0, max - 1).trimEnd()}…` : `${first}.`;
};

/** Featured promo panel shown on the right of each mega menu. */
function Featured({
  image, eyebrow, title, href, cta,
}: { image: string; eyebrow: string; title: string; href: string; cta: string }) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl border border-line"
    >
      <Image src={image} alt="" fill sizes="280px" className="object-cover transition duration-500 group-hover:scale-105" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-navy/10" />
      <div className="relative p-4">
        <div className="font-mono text-telemetry uppercase text-teal">{eyebrow}</div>
        <div className="mt-1 font-display text-sm font-semibold text-white">{title}</div>
        <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-teal">
          {cta} <ArrowRight aria-hidden className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

function MenuLink({
  href, icon: Icon, name, desc, onClick,
}: { href: string; icon?: typeof Factory; name: string; desc?: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-start gap-3 rounded-lg px-2 py-2 transition hover:bg-glass"
    >
      {Icon && (
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-glass text-muted transition group-hover:border-teal/40 group-hover:text-teal">
          <Icon aria-hidden className="h-4 w-4" />
        </span>
      )}
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-body">{name}</span>
        {desc && <span className="block truncate text-xs text-muted">{desc}</span>}
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<MenuKey>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const serviceCats = ["AI & Data", "Intelligent Systems", "Connected Operations"] as const;

  const sectionPrefix: Record<Exclude<MenuKey, null>, string> = {
    services: "/services",
    solutions: "/solutions",
    industries: "/industries",
    products: "/products",
    company: "/company",
  };
  const isActiveSection = (id: MenuKey) =>
    !!id && (pathname === sectionPrefix[id] || pathname.startsWith(`${sectionPrefix[id]}/`));

  // Only the homepage has a dark hero at the very top, which is what makes a
  // transparent/white-text header legible pre-scroll. Every other page has a
  // light background there, so the header must default to solid (dark text,
  // opaque background) or it renders invisible until the user scrolls.
  const solid = pathname !== "/" || scrolled || open !== null || mobile;

  const NavButton = ({ id, label }: { id: MenuKey; label: string }) => {
    const active = isActiveSection(id);
    return (
      <button
        className={cn(
          "relative flex items-center gap-1 rounded-full px-3 py-2 text-sm transition-colors duration-300",
          open === id || active
            ? solid ? "text-body" : "text-white"
            : solid ? "text-muted hover:text-teal" : "text-white/75 hover:text-white"
        )}
        aria-expanded={open === id}
        aria-haspopup="true"
        aria-current={active ? "page" : undefined}
        onClick={() => setOpen(open === id ? null : id)}
        onMouseEnter={() => setHovered(id)}
        onMouseLeave={() => setHovered(null)}
      >
        {label}
        <ChevronDown aria-hidden className={cn("h-3.5 w-3.5 transition-transform", open === id && "rotate-180")} />
        {active && <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-teal" />}
        {hovered === id && !active && (
          <motion.span
            aria-hidden
            layoutId="nav-hover-underline"
            className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-teal/60"
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          />
        )}
      </button>
    );
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        solid
          ? "border-line bg-ink/95 shadow-card backdrop-blur-xl"
          : "border-transparent bg-transparent shadow-none"
      )}
      onMouseLeave={() => setOpen(null)}
    >
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center" aria-label="Invexal — home">
          <Image
            src="/brand/invexal-logo.png"
            alt="Invexal"
            width={914}
            height={250}
            priority
            className={cn("h-7 w-auto transition duration-300", !solid && "brightness-0 invert")}
          />
          <span
            className={cn(
              "ml-3 border-l pl-3 font-display text-lg font-bold transition-colors duration-300",
              solid ? "border-line text-body" : "border-white/20 text-white"
            )}
          >
            AIoT
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          <NavButton id="services" label="Services" />
          <NavButton id="solutions" label="Solutions" />
          <NavButton id="industries" label="Industries" />
          <NavButton id="products" label="Products" />
          <NavButton id="company" label="Company" />
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+13025790576"
            className={cn(
              "flex items-center gap-2 text-sm transition-colors duration-300",
              solid ? "text-muted hover:text-teal" : "text-white/70 hover:text-white"
            )}
          >
            <Phone aria-hidden className="h-4 w-4" /> +1 (302) 579-0576
          </a>
          <Link
            href="/book-a-demo"
            className="rounded-full bg-signal-gradient px-5 py-2 text-sm font-medium text-ink shadow-glow transition hover:scale-[1.03] active:scale-[0.98]"
          >
            Book a demo
          </Link>
        </div>

        <button
          className={cn("-m-2 p-2 transition-colors duration-300 lg:hidden", solid ? "text-body" : "text-white")}
          aria-label={mobile ? "Close menu" : "Open menu"}
          aria-expanded={mobile}
          onClick={() => setMobile(!mobile)}
        >
          {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mega menus */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="hidden border-t border-line bg-ink/98 shadow-card-lg backdrop-blur-xl lg:block"
          >
            <div className="mx-auto max-w-7xl px-6 py-8">
              {open === "services" && (
                <div className="grid gap-8 lg:grid-cols-[repeat(3,1fr)_280px]">
                  {serviceCats.map((cat, i) => {
                    const CatIcon = serviceCatIcons[cat];
                    return (
                      <motion.div key={cat} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                        <div className="mb-3 flex items-center gap-2 font-mono text-telemetry uppercase text-teal">
                          <CatIcon aria-hidden className="h-3.5 w-3.5" /> {cat}
                        </div>
                        <div className="space-y-0.5">
                          {services.filter((s) => s.category === cat).map((s) => (
                            <MenuLink key={s.slug} href={`/services/${s.slug}`} name={s.name} desc={oneLine(s.lede)} onClick={() => setOpen(null)} />
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                  <Featured
                    image="/photos/category-ai-data.jpg"
                    eyebrow="Services"
                    title="Eighteen disciplines, one delivery spine"
                    href="/services"
                    cta="Explore all services"
                  />
                </div>
              )}

              {open === "solutions" && (
                <div className="grid gap-8 lg:grid-cols-[repeat(4,1fr)_280px]">
                  {solutionGroups.map((g, i) => {
                    const GIcon = solutionGroupIcons[g];
                    return (
                      <motion.div key={g} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                        <div className="mb-3 flex items-center gap-2 font-mono text-telemetry uppercase text-teal">
                          <GIcon aria-hidden className="h-3.5 w-3.5" /> {g}
                        </div>
                        <div className="space-y-0.5">
                          {solutions.filter((s) => s.group === g).map((s) => (
                            <MenuLink key={s.slug} href={`/solutions/${s.slug}`} name={s.name} onClick={() => setOpen(null)} />
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                  <Featured
                    image="/photos/group-vision-ai.jpg"
                    eyebrow="Solutions"
                    title="Nineteen ready-to-deploy solutions"
                    href="/solutions"
                    cta="Explore all solutions"
                  />
                </div>
              )}

              {open === "industries" && (
                <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-0.5 lg:grid-cols-3">
                    {industries.map((ind) => (
                      <MenuLink
                        key={ind.slug}
                        href={`/industries/${ind.slug}`}
                        icon={industryIcons[ind.slug]}
                        name={ind.name}
                        onClick={() => setOpen(null)}
                      />
                    ))}
                  </div>
                  <Featured
                    image="/photos/industry-manufacturing.jpg"
                    eyebrow="Industries"
                    title="Thirteen industries, one operating model"
                    href="/industries"
                    cta="Explore all industries"
                  />
                </div>
              )}

              {open === "products" && (
                <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-0.5 lg:grid-cols-3">
                    {products.map((p) => (
                      <MenuLink
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        icon={productIcons[p.slug]}
                        name={p.name}
                        desc={p.tagline}
                        onClick={() => setOpen(null)}
                      />
                    ))}
                  </div>
                  <Featured
                    image="/photos/hub-products.jpg"
                    eyebrow="Products"
                    title="Nine platforms you can demo this week"
                    href="/products"
                    cta="Explore all products"
                  />
                </div>
              )}

              {open === "company" && (
                <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-0.5 lg:grid-cols-3">
                    {companyLinks.map((l) => (
                      <MenuLink key={l.href} href={l.href} icon={Sparkles} name={l.name} onClick={() => setOpen(null)} />
                    ))}
                  </div>
                  <Featured
                    image="/photos/about-team.jpg"
                    eyebrow="Company"
                    title="Ten years wiring the physical world"
                    href="/company/about"
                    cta="About Invexal"
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-16 z-40 overflow-y-auto bg-ink/98 px-6 py-8 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="space-y-6">
              {[
                { label: "Services", items: services.map((s) => ({ name: s.name, href: `/services/${s.slug}` })) },
                { label: "Solutions", items: solutions.map((s) => ({ name: s.name, href: `/solutions/${s.slug}` })) },
                { label: "Industries", items: industries.map((i) => ({ name: i.name, href: `/industries/${i.slug}` })) },
                { label: "Products", items: products.map((p) => ({ name: p.name, href: `/products/${p.slug}` })) },
                { label: "Company", items: companyLinks.map((c) => ({ name: c.name, href: c.href })) },
              ].map((group) => (
                <details key={group.label} className="border-b border-line pb-4">
                  <summary className="cursor-pointer list-none py-2 font-display text-lg font-semibold text-body">
                    {group.label}
                  </summary>
                  <ul className="mt-2 space-y-1 pl-2">
                    {group.items.map((it) => (
                      <li key={it.href}>
                        <Link href={it.href} onClick={() => setMobile(false)} className="block py-1.5 text-sm text-muted">
                          {it.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/book-a-demo" onClick={() => setMobile(false)} className="rounded-full bg-signal-gradient px-6 py-3 text-center font-medium text-ink">
                Book a demo
              </Link>
              <Link href="/resources/ai-readiness" onClick={() => setMobile(false)} className="rounded-full border border-line px-6 py-3 text-center text-body">
                AI Readiness Assessment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
