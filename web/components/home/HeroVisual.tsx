"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ScanEye, Activity, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

/** CV-style detection box overlay, positioned over the feed image. */
function DetectionBox({
  top, left, width, height, label, confidence, delay, labelPosition = "top",
}: { top: string; left: string; width: string; height: string; label: string; confidence: string; delay: number; labelPosition?: "top" | "bottom" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="absolute rounded-md border-2 border-teal/80"
      style={{ top, left, width, height, boxShadow: "0 0 0 3000px rgba(0,0,0,0)" }}
    >
      <span
        className={cn(
          "absolute left-0 flex items-center gap-1 whitespace-nowrap rounded-full bg-teal px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-ink",
          labelPosition === "top" ? "-top-6" : "-bottom-6"
        )}
      >
        {label} <span className="opacity-80">{confidence}</span>
      </span>
      {/* corner brackets */}
      <span aria-hidden className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-teal" />
      <span aria-hidden className="absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-teal" />
      <span aria-hidden className="absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-teal" />
      <span aria-hidden className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-teal" />
    </motion.div>
  );
}

/** Small floating glass KPI tile. */
function KpiCard({
  icon: Icon, label, value, className, delay, driftDelay = 0,
}: { icon: typeof Activity; label: string; value: string; className: string; delay: number; driftDelay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      <div
        className="gradient-border flex items-center gap-3 rounded-xl border border-line bg-ink/90 px-4 py-3 shadow-card-lg backdrop-blur-xl animate-drift"
        style={{ animationDelay: `${driftDelay}s` }}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-signal-gradient text-ink">
          <Icon aria-hidden className="h-4 w-4" />
        </span>
        <span>
          <span className="block font-display text-lg font-bold leading-none text-body">{value}</span>
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-wide text-muted">{label}</span>
        </span>
      </div>
    </motion.div>
  );
}

/** IoT sensor node: pulsing dot with a connecting line into the panel. */
function SensorNode({ className, delay }: { className: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className={className}
      aria-hidden
    >
      <span className="absolute inset-0 rounded-full bg-teal/40 animate-pulseDot" />
      <span className="absolute inset-[3px] rounded-full bg-teal" />
    </motion.span>
  );
}

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
      {/* ambient gradient glow, slow drifting */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-signal-radial opacity-70 blur-2xl"
        animate={{ x: [0, 14, 0], y: [0, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* particles */}
      {[
        "left-2 top-6", "right-6 top-14", "left-10 bottom-8", "right-2 bottom-20", "left-1/2 top-2",
      ].map((pos, i) => (
        <motion.span
          key={pos}
          aria-hidden
          className={`absolute h-1.5 w-1.5 rounded-full bg-teal/60 ${pos}`}
          animate={{ opacity: [0.2, 0.9, 0.2], y: [0, -6, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      {/* main feed panel */}
      <div className="gradient-border relative h-full w-full overflow-hidden rounded-2xl border border-white/10 shadow-card-xl">
        <Image
          src="/photos/hero-factory-inspection.jpg"
          alt="Live computer-vision feed of a production line"
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/10 via-transparent to-transparent" />

        {/* live badge */}
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-ink/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide text-body shadow-sm backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulseDot" /> Live feed
        </div>

        <DetectionBox top="30%" left="53%" width="27%" height="63%" label="Worker" confidence="98%" delay={0.5} />
        <DetectionBox top="8%" left="3%" width="45%" height="75%" label="Equipment" confidence="94%" delay={0.75} labelPosition="bottom" />

        <SensorNode className="absolute right-[12%] top-[62%] h-3 w-3" delay={1.1} />
        <SensorNode className="absolute left-[8%] bottom-[14%] h-3 w-3" delay={1.3} />
      </div>

      {/* floating KPI cards, overhanging the panel edges */}
      <KpiCard
        icon={ScanEye}
        label="Detections / day"
        value="12,408"
        className="absolute -left-6 -top-6 z-10 hidden sm:block"
        delay={1}
      />
      <KpiCard
        icon={Activity}
        label="Uptime"
        value="99.9%"
        className="absolute -bottom-6 -right-6 z-10 hidden sm:block"
        delay={1.2}
        driftDelay={1.5}
      />
      <KpiCard
        icon={Radio}
        label="Devices online"
        value="1,204"
        className="absolute -right-10 top-1/3 z-10 hidden lg:block"
        delay={1.4}
        driftDelay={0.8}
      />
    </div>
  );
}
