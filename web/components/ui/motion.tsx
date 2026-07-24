"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { ChevronDown, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/lib/data/types";
import type { ReactNode } from "react";

/* ---------- Reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- TimelineLine (scroll-triggered progress fill) ---------- */
export function TimelineLine({
  orientation,
  className,
}: {
  orientation: "horizontal" | "vertical";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const isHorizontal = orientation === "horizontal";
  return (
    <motion.div
      aria-hidden
      className={cn("absolute bg-signal-gradient", className)}
      style={{ transformOrigin: isHorizontal ? "left" : "top" }}
      initial={reduce ? false : isHorizontal ? { scaleX: 0 } : { scaleY: 0 }}
      whileInView={{ scaleX: 1, scaleY: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
    />
  );
}

/* ---------- StatCounter ---------- */
export function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) {
      if (inView) setDisplay(value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  const formatted = display >= 10000 ? display.toLocaleString("en-US") : String(display);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-bold text-body md:text-5xl">
        {formatted}
        <span className="text-gradient">{suffix}</span>
      </div>
      <div className="mt-2 font-mono text-telemetry uppercase text-muted">{label}</div>
    </div>
  );
}

/* ---------- Accordion (FAQ) ---------- */
export function Accordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={cn(
              "overflow-hidden rounded-2xl bg-signal-gradient shadow-card transition-shadow duration-500",
              isOpen && "shadow-glow"
            )}
          >
            <button
              className={cn(
                "flex w-full items-center justify-between gap-4 border-l-2 px-6 py-5 text-left transition-[border-color] duration-500",
                isOpen ? "border-white" : "border-transparent"
              )}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              id={`faq-button-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-medium text-white">{item.q}</span>
              <ChevronDown
                aria-hidden
                className={cn("h-5 w-5 shrink-0 text-white transition-transform", isOpen && "rotate-180")}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 leading-relaxed text-white/80">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Testimonials carousel ---------- */
export function TestimonialCarousel({
  items,
}: {
  items: { quote: string; name: string; role: string }[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [paused, reduce, items.length]);

  const item = items[index];

  return (
    <div
      className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-navy-gradient px-8 py-14 shadow-card-xl md:px-16 md:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-teal/15 blur-[90px]" />
      <Quote aria-hidden className="pointer-events-none absolute -top-4 left-6 h-24 w-24 text-white/[0.06] md:left-10" />
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -24 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <p className="text-xl leading-relaxed text-white md:text-2xl">“{item.quote}”</p>
            <footer className="mt-6 flex flex-col items-center gap-1">
              <span className="mb-2 h-px w-10 bg-teal/50" aria-hidden />
              <div className="font-medium text-white">{item.name}</div>
              <div className="font-mono text-telemetry uppercase text-teal">{item.role}</div>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
        <div className="mt-10 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-teal" : "w-2 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
