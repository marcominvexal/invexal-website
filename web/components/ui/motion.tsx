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
    <div className="divide-y divide-line rounded-2xl border border-line bg-glass backdrop-blur">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              id={`faq-button-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-medium text-body">{item.q}</span>
              <ChevronDown
                aria-hidden
                className={cn("h-5 w-5 shrink-0 text-teal transition-transform", isOpen && "rotate-180")}
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
                  <p className="px-6 pb-6 leading-relaxed text-muted">{item.a}</p>
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
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Quote aria-hidden className="mx-auto mb-6 h-8 w-8 text-teal/60" />
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={index}
          initial={reduce ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? undefined : { opacity: 0, x: -24 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p className="text-xl leading-relaxed text-body md:text-2xl">“{item.quote}”</p>
          <footer className="mt-6">
            <div className="font-medium text-body">{item.name}</div>
            <div className="mt-1 font-mono text-telemetry uppercase text-muted">{item.role}</div>
          </footer>
        </motion.blockquote>
      </AnimatePresence>
      <div className="mt-8 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Show testimonial ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 rounded-full transition-all",
              i === index ? "w-6 bg-teal" : "w-2 bg-line hover:bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
}
