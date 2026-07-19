import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/* ---------- Button ---------- */
export function Button({
  href,
  variant = "primary",
  children,
  className,
}: {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  children: ReactNode;
  className?: string;
}) {
  const base =
    "group relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition duration-200 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none " +
    "before:absolute before:inset-y-0 before:left-0 before:-z-10 before:h-0 before:w-1/2 before:rounded-l-full before:transition-[height] before:duration-300 before:content-[''] " +
    "after:absolute after:inset-y-0 after:right-0 after:-z-10 after:h-0 after:w-1/2 after:rounded-r-full after:transition-[height] after:duration-300 after:content-[''] " +
    "hover:before:h-full hover:after:h-full";
  const variants = {
    primary: "bg-signal-gradient text-ink shadow-glow before:bg-body after:bg-body",
    secondary: "border border-line bg-glass text-body backdrop-blur before:bg-teal after:bg-teal hover:text-ink hover:border-teal/60",
    ghost: "px-0 text-teal hover:text-body before:hidden after:hidden",
    /** For use on colored/navy backgrounds — solid white pill, ink-blue text. */
    inverse: "bg-ink text-teal shadow-card before:bg-white/90 after:bg-white/90",
  };
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      <ArrowRight
        aria-hidden
        className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45"
      />
    </Link>
  );
}

/* ---------- TelemetryTag (signature element) ---------- */
export function TelemetryTag({
  children,
  live = false,
  className,
}: {
  children: ReactNode;
  live?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-telemetry uppercase text-teal",
        className
      )}
    >
      {live && (
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber animate-pulseDot" />
      )}
      {children}
    </span>
  );
}

/* ---------- GlassCard ---------- */
export function GlassCard({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-line bg-ink p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:border-teal/40 hover:shadow-glow",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/* ---------- PhotoFrame ---------- */
export function PhotoFrame({
  src,
  alt,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("gradient-border relative overflow-hidden rounded-2xl border border-line", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="animate-kenburns object-cover"
      />
    </div>
  );
}

/* ---------- SectionHeading ---------- */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  center = false,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  center?: boolean;
  /** Use on dark/navy section backgrounds — swaps text colors for contrast. */
  dark?: boolean;
}) {
  return (
    <div className={cn("mb-12 max-w-3xl", center && "mx-auto text-center")}>
      <TelemetryTag className={cn("mb-4 block", dark && "text-teal")}>{eyebrow}</TelemetryTag>
      <h2 className={cn("font-display text-display font-semibold", dark ? "text-white" : "text-body")}>{title}</h2>
      {lede && <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-white/65" : "text-muted")}>{lede}</p>}
    </div>
  );
}
