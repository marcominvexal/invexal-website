"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
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

export default function Header() {
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const NavButton = ({ id, label }: { id: MenuKey; label: string }) => (
    <button
      className={cn(
        "flex items-center gap-1 rounded-full px-3 py-2 text-sm text-muted transition hover:text-body",
        open === id && "text-body"
      )}
      aria-expanded={open === id}
      aria-haspopup="true"
      onClick={() => setOpen(open === id ? null : id)}
    >
      {label}
      <ChevronDown aria-hidden className={cn("h-3.5 w-3.5 transition-transform", open === id && "rotate-180")} />
    </button>
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors",
        scrolled || open ? "border-line bg-ink/85 backdrop-blur-xl" : "border-transparent"
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
            className="h-7 w-auto"
          />
          <span className="ml-3 border-l border-line pl-3 font-display text-lg font-bold text-body">AIoT</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          <NavButton id="services" label="Services" />
          <NavButton id="solutions" label="Solutions" />
          <NavButton id="industries" label="Industries" />
          <NavButton id="products" label="Products" />
          <NavButton id="company" label="Company" />
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:+13025790576" className="flex items-center gap-2 text-sm text-muted hover:text-body">
            <Phone aria-hidden className="h-4 w-4" /> +1 (302) 579-0576
          </a>
          <Link
            href="/book-a-demo"
            className="rounded-full bg-signal-gradient px-5 py-2 text-sm font-medium text-ink shadow-glow hover:brightness-110"
          >
            Book a demo
          </Link>
        </div>

        <button
          className="lg:hidden"
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
            initial={{ opacity: 0, scale: 0.99, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99, y: -4 }}
            transition={{ duration: 0.16 }}
            className="hidden border-t border-line bg-ink/95 backdrop-blur-xl lg:block"
          >
            <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-4">
              {open === "services" &&
                serviceCats.map((cat) => (
                  <div key={cat}>
                    <div className="mb-3 font-mono text-telemetry uppercase text-teal">{cat}</div>
                    <ul className="space-y-1">
                      {services.filter((s) => s.category === cat).map((s) => (
                        <li key={s.slug}>
                          <Link href={`/services/${s.slug}`} onClick={() => setOpen(null)} className="block rounded px-2 py-1.5 text-sm text-muted hover:bg-glass hover:text-body">
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              {open === "solutions" &&
                solutionGroups.map((g) => (
                  <div key={g}>
                    <div className="mb-3 font-mono text-telemetry uppercase text-teal">{g}</div>
                    <ul className="space-y-1">
                      {solutions.filter((s) => s.group === g).map((s) => (
                        <li key={s.slug}>
                          <Link href={`/solutions/${s.slug}`} onClick={() => setOpen(null)} className="block rounded px-2 py-1.5 text-sm text-muted hover:bg-glass hover:text-body">
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              {open === "industries" && (
                <ul className="col-span-4 grid grid-cols-3 gap-1 lg:grid-cols-4">
                  {industries.map((i) => (
                    <li key={i.slug}>
                      <Link href={`/industries/${i.slug}`} onClick={() => setOpen(null)} className="block rounded px-2 py-1.5 text-sm text-muted hover:bg-glass hover:text-body">
                        {i.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {open === "products" && (
                <ul className="col-span-4 grid grid-cols-3 gap-1">
                  {products.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/products/${p.slug}`} onClick={() => setOpen(null)} className="block rounded px-2 py-2 hover:bg-glass">
                        <span className="block text-sm font-medium text-body">{p.name}</span>
                        <span className="block text-xs text-muted">{p.tagline}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {open === "company" && (
                <ul className="col-span-4 grid grid-cols-3 gap-1 lg:grid-cols-4">
                  {companyLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} onClick={() => setOpen(null)} className="block rounded px-2 py-1.5 text-sm text-muted hover:bg-glass hover:text-body">
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
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
