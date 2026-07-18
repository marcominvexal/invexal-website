"use client";

import { useState } from "react";
import {
  Sparkles, Bot, Eye, TrendingUp, MessageSquareText, Cpu, Boxes, Workflow,
} from "lucide-react";
import { Reveal } from "@/components/ui/motion";

type VisualType = "chat" | "workflow" | "detection" | "chart" | "tokens" | "chip" | "layers" | "automation";

const capVisuals: Record<string, VisualType> = {
  "Generative AI": "chat",
  "AI Agents": "workflow",
  "Computer Vision": "detection",
  "Predictive Analytics": "chart",
  LLMs: "tokens",
  "Edge AI": "chip",
  "Digital Twins": "layers",
  Automation: "automation",
};

const capIcons = [Sparkles, Bot, Eye, TrendingUp, MessageSquareText, Cpu, Boxes, Workflow];

/** Small representative mini-visual per capability, shown in the hub on hover/focus. */
function CapabilityPreview({ type }: { type: VisualType }) {
  switch (type) {
    case "chat":
      return (
        <div className="flex flex-col gap-1.5">
          <div className="h-2 w-16 rounded-full bg-white/70" />
          <div className="h-2 w-10 rounded-full bg-teal" />
        </div>
      );
    case "workflow":
      return (
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="h-4 w-4 rounded border border-white/50 bg-white/10" />
              {i < 2 && <div className="h-px w-3 bg-teal" />}
            </div>
          ))}
        </div>
      );
    case "detection":
      return (
        <div className="relative h-10 w-14 rounded border border-white/30 bg-white/10">
          <div className="absolute left-2 top-2 h-5 w-6 rounded-sm border-2 border-teal" />
        </div>
      );
    case "chart":
      return (
        <div className="flex h-8 items-end gap-1">
          {[40, 70, 50, 90, 65].map((h, i) => (
            <div key={i} className="w-1.5 rounded-sm bg-teal" style={{ height: `${h}%`, opacity: 0.5 + i * 0.1 }} />
          ))}
        </div>
      );
    case "tokens":
      return (
        <div className="flex flex-wrap gap-1 w-20">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <span key={i} className="h-2 w-4 rounded-full bg-white/50" style={{ opacity: 0.4 + (i % 3) * 0.2 }} />
          ))}
        </div>
      );
    case "chip":
      return (
        <div className="relative flex h-9 w-9 items-center justify-center rounded-md border border-white/40">
          <span className="h-3 w-3 rounded-sm bg-teal" />
          <span className="absolute inset-0 animate-pulseDot rounded-md ring-2 ring-teal/40" />
        </div>
      );
    case "layers":
      return (
        <div className="relative h-9 w-12">
          <div className="absolute inset-x-2 top-0 h-6 rounded border border-white/30 bg-white/10" />
          <div className="absolute inset-x-1 top-1.5 h-6 rounded border border-white/40 bg-white/10" />
          <div className="absolute inset-x-0 top-3 h-6 rounded border border-teal bg-white/10" />
        </div>
      );
    case "automation":
      return (
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-teal animate-pulseDot" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      );
  }
}

export function CapabilityOrbit({ capabilities }: { capabilities: { name: string; blurb: string }[] }) {
  const [active, setActive] = useState<number | null>(null);
  const nodes = capabilities.map((c, i) => {
    const angle = (i * (360 / capabilities.length) - 90) * (Math.PI / 180);
    const radius = 42;
    return { ...c, icon: capIcons[i % capIcons.length], visual: capVisuals[c.name] ?? "chip", top: 50 + radius * Math.sin(angle), left: 50 + radius * Math.cos(angle) };
  });
  const shown = active !== null ? nodes[active] : null;

  return (
    <div className="relative mx-auto aspect-square max-w-2xl">
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        {nodes.map((n, i) => (
          <line
            key={n.name}
            x1="50%" y1="50%" x2={`${n.left}%`} y2={`${n.top}%`}
            stroke="currentColor" className={i === active ? "text-teal" : "text-white/15"} strokeWidth={1}
          />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 text-center backdrop-blur">
        {shown ? (
          <>
            <CapabilityPreview type={shown.visual} />
            <span className="px-2 text-[11px] font-semibold leading-tight text-white">{shown.name}</span>
          </>
        ) : (
          <>
            <span className="font-display text-sm font-bold text-white">AI Core</span>
            <span className="font-mono text-[10px] uppercase text-teal">8 capabilities</span>
          </>
        )}
      </div>

      {nodes.map((n, i) => (
        <div
          key={n.name}
          className="absolute w-32 -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ top: `${n.top}%`, left: `${n.left}%` }}
        >
          <Reveal delay={i * 0.06}>
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group w-full text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition group-hover:border-teal/60 group-hover:bg-white/20">
                <n.icon aria-hidden className="h-5 w-5 text-teal" />
              </div>
              <div className="mt-2 font-display text-sm font-semibold text-white">{n.name}</div>
            </button>
          </Reveal>
        </div>
      ))}
    </div>
  );
}
