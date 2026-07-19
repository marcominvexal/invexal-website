"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GlassCard, TelemetryTag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/motion";
import { useReading, type Reading } from "./useReading";
import { useAutoplayInView } from "./useAutoplayInView";

export type VideoProductCard = {
  slug: string;
  href: string;
  badge: string;
  name: string;
  tagline: string;
  description: string;
  video: string;
  boxLabel: string;
  boxConfidence: string;
  reading: Reading;
};

/** Stylized "live detection" HUD over the video — corner viewfinder brackets, a
 * slowly drifting bounding box with a confidence tag, and a scanning sweep —
 * the same illustrative overlay language used across the CV product line, not
 * a frame-accurate tracker of the underlying stock footage. */
function DetectionOverlay({ card, driftDelay }: { card: VideoProductCard; driftDelay: number }) {
  const reading = useReading(card.reading);

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Viewfinder corner brackets */}
      {[
        "left-3 top-3 border-l-2 border-t-2",
        "right-3 top-3 border-r-2 border-t-2",
        "left-3 bottom-3 border-l-2 border-b-2",
        "right-3 bottom-3 border-r-2 border-b-2",
      ].map((pos) => (
        <span key={pos} className={`absolute h-4 w-4 border-teal/50 ${pos}`} />
      ))}

      {/* Scanning sweep */}
      <div className="absolute inset-x-0 top-0 h-1/3 animate-scanSweep bg-gradient-to-b from-teal/25 via-teal/5 to-transparent" />

      {/* Drifting bounding box — top/left/w/h below are also the animation's 0%
          keyframe, so a reduced-motion viewer still sees a sensibly placed box. */}
      <div
        className="animate-detectionDrift absolute left-[30%] top-[38%] h-[30%] w-[22%] rounded-sm border-2 border-teal/80 shadow-[0_0_16px_rgba(76,201,240,0.35)]"
        style={{ animationDelay: `${driftDelay}s` }}
      >
        <span className="absolute -top-5 left-0 whitespace-nowrap rounded-sm bg-navy/90 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-teal">
          {card.boxLabel} {card.boxConfidence}
        </span>
      </div>

      {/* Category badge — sits below the top-left viewfinder bracket */}
      <span className="absolute left-3 top-9 flex items-center gap-1.5 rounded-full bg-navy/85 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wide text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulseDot" /> {card.badge}
      </span>

      {/* Live reading */}
      <span className="absolute bottom-3 right-3 rounded-md bg-navy/85 px-2.5 py-1.5 text-right font-mono text-[10px] uppercase tracking-wide text-white">
        <span className="block text-[8px] text-white/60">{card.reading.label}</span>
        <span className="text-teal">{reading}</span>
      </span>
    </div>
  );
}

export function ProductVideoCard({ card, index }: { card: VideoProductCard; index: number }) {
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
            <DetectionOverlay card={card} driftDelay={index * 1.7} />
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
