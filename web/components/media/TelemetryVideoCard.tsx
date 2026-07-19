"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GlassCard, TelemetryTag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/motion";
import { useReading, useWaveValue, type Reading } from "./useReading";
import { useAutoplayInView } from "./useAutoplayInView";

export type TelemetryProductCard = {
  slug: string;
  href: string;
  badge: string;
  name: string;
  tagline: string;
  description: string;
  video: string;
  gaugeLabel: string;
  gaugeBase: number;
  gaugeAmplitude: number;
  gaugePeriodMs: number;
  reading: Reading;
};

/** Radial gauge — the sensor/telemetry equivalent of the CV cards' bounding
 * box: no object is being "detected" here, so the HUD language is a live dial
 * and readout instead of a tracked frame. */
function RadialGauge({ label, value }: { label: string; value: number }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="flex flex-col items-center gap-1 rounded-md bg-navy/85 px-3 py-2">
      <svg width="60" height="60" viewBox="0 0 60 60" className="-rotate-90">
        <circle cx="30" cy="30" r={radius} fill="none" stroke="currentColor" strokeWidth="5" className="text-white/15" />
        <circle
          cx="30" cy="30" r={radius} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"
          className="text-teal transition-[stroke-dashoffset] duration-500 ease-out"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (clamped / 100) * circumference}
        />
        <text x="30" y="34" textAnchor="middle" className="rotate-90 fill-white font-mono text-[11px]" style={{ transformOrigin: "30px 30px" }}>
          {Math.round(clamped)}%
        </text>
      </svg>
      <span className="font-mono text-[8px] uppercase tracking-wide text-white/60">{label}</span>
    </div>
  );
}

function TelemetryOverlay({ card }: { card: TelemetryProductCard }) {
  const gaugeValue = useWaveValue(card.gaugeBase, card.gaugeAmplitude, card.gaugePeriodMs);
  const reading = useReading(card.reading);

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3">
      <div className="flex items-start justify-between">
        <span className="flex items-center gap-1.5 rounded-full bg-navy/85 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wide text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulseDot" /> {card.badge}
        </span>
        <RadialGauge label={card.gaugeLabel} value={gaugeValue} />
      </div>

      <span className="self-end rounded-md bg-navy/85 px-2.5 py-1.5 text-right font-mono text-[10px] uppercase tracking-wide text-white">
        <span className="block text-[8px] text-white/60">{card.reading.label}</span>
        <span className="text-teal">{reading}</span>
      </span>
    </div>
  );
}

export function TelemetryVideoCard({ card, index }: { card: TelemetryProductCard; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useAutoplayInView(videoRef);

  return (
    <Reveal delay={(index % 2) * 0.08}>
      <Link href={card.href} className="block h-full">
        <GlassCard className="flex h-full flex-col overflow-hidden !p-0">
          <div className="flex items-center gap-1.5 border-b border-line bg-ink-raised px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-line" />
            <span className="h-2 w-2 rounded-full bg-line" />
            <span className="h-2 w-2 rounded-full bg-line" />
            <span className="ml-2 font-mono text-[10px] uppercase tracking-wide text-muted">{card.name} console</span>
          </div>

          <div className="relative aspect-video overflow-hidden bg-ink">
            <video
              ref={videoRef}
              src={card.video}
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
            <TelemetryOverlay card={card} />
          </div>

          <div className="p-6">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold text-body">{card.name}</h3>
              <TelemetryTag live>Live</TelemetryTag>
            </div>
            <p className="text-sm font-medium text-teal">{card.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{card.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal">
              View solution <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
            </span>
          </div>
        </GlassCard>
      </Link>
    </Reveal>
  );
}
