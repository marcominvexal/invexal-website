"use client";

import { useEffect, useState } from "react";

export type Reading =
  | { kind: "counter"; label: string; start: number; step: [number, number]; intervalMs: number }
  | { kind: "cycle"; label: string; values: string[]; intervalMs: number }
  | { kind: "wave"; label: string; base: number; amplitude: number; unit: string; periodMs: number };

const formatCounter = (n: number) => Math.round(n).toLocaleString("en-US");

/** A raw oscillating value (e.g. a gauge percentage) driven by a sine wave —
 * starts at `base` on the server and only begins moving after mount, so
 * SSR/hydration output always matches. */
export function useWaveValue(base: number, amplitude: number, periodMs: number) {
  const [value, setValue] = useState(base);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const t = (Date.now() - start) / periodMs;
      setValue(base + Math.sin(t * Math.PI * 2) * amplitude);
    }, 400);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, amplitude, periodMs]);

  return value;
}

/** Live-updating HUD readout — a count that climbs, a classification label
 * that cycles, or a sensor value that oscillates — depending on `reading`'s
 * kind. Starts from its static display value on the server and only begins
 * updating client-side after mount, so SSR/hydration output always matches. */
export function useReading(reading: Reading) {
  const [display, setDisplay] = useState(() => {
    if (reading.kind === "counter") return formatCounter(reading.start);
    if (reading.kind === "cycle") return reading.values[0];
    return `${reading.base.toFixed(1)}${reading.unit}`;
  });

  useEffect(() => {
    if (reading.kind === "counter") {
      let value = reading.start;
      const id = setInterval(() => {
        value += reading.step[0] + Math.random() * (reading.step[1] - reading.step[0]);
        setDisplay(formatCounter(value));
      }, reading.intervalMs);
      return () => clearInterval(id);
    }
    if (reading.kind === "cycle") {
      let i = 0;
      const id = setInterval(() => {
        i = (i + 1) % reading.values.length;
        setDisplay(reading.values[i]);
      }, reading.intervalMs);
      return () => clearInterval(id);
    }
    const start = Date.now();
    const id = setInterval(() => {
      const t = (Date.now() - start) / reading.periodMs;
      const value = reading.base + Math.sin(t * Math.PI * 2) * reading.amplitude;
      setDisplay(`${value.toFixed(1)}${reading.unit}`);
    }, 800);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reading]);

  return display;
}
