import type { VideoProductCard } from "@/components/media/ProductVideoCard";
import type { TelemetryProductCard } from "@/components/media/TelemetryVideoCard";
import { solutions } from "./solutions";
import { products } from "./products";

/** Computer-vision demo cards — bounding-box HUD. Shared between the homepage
 * Products section and any solution/product/industry detail page whose slug
 * matches one of these entries (see demoVideoBySlug below). */
export const videoProducts: VideoProductCard[] = [
  {
    slug: "people-counting",
    href: "/solutions/people-counting",
    badge: "PEOPLE COUNTING",
    name: "Footfall Analytics",
    tagline: "Footfall you can plan against.",
    description: "Anonymous, camera-based people counting — occupancy, conversion, and flow analytics from cameras you already own.",
    video: "/videos/footfall-analytics.mp4",
    boxLabel: "PERSON",
    boxConfidence: "0.97",
    reading: { kind: "counter", label: "FOOTFALL TODAY", start: 1842, step: [1, 4], intervalMs: 2200 },
  },
  {
    slug: "visionwatch",
    href: "/products/visionwatch",
    badge: "GESTURE AI",
    name: "Gesture Detection",
    tagline: "The AI layer for every camera you own.",
    description: "Hand and gesture recognition running at the edge — from safety signals to touchless controls — on the same VisionWatch console as every other stream.",
    video: "/videos/gesture-detection.mp4",
    boxLabel: "HAND",
    boxConfidence: "0.94",
    reading: { kind: "cycle", label: "GESTURE", values: ["OPEN PALM", "SWIPE LEFT", "THUMBS UP", "POINT"], intervalMs: 2600 },
  },
  {
    slug: "agriculture",
    href: "/industries/agriculture",
    badge: "LIVESTOCK AI",
    name: "Livestock Monitoring",
    tagline: "Precision decisions across every hectare and herd.",
    description: "Vision and sensor-based livestock monitoring that catches stress and welfare issues in the data days before they show up in the barn.",
    video: "/videos/poultry-monitoring.mp4",
    boxLabel: "BIRD",
    boxConfidence: "0.91",
    reading: { kind: "counter", label: "BIRDS TRACKED", start: 12408, step: [2, 6], intervalMs: 1800 },
  },
  {
    slug: "environmental-monitoring",
    href: "/solutions/environmental-monitoring",
    badge: "ENVIRONMENTAL AI",
    name: "Cold Chain Monitoring",
    tagline: "Air, water, noise, and climate — measured continuously.",
    description: "Cold-chain and storage climate compliance monitoring — breaches trigger alerts and automated response before product value is lost.",
    video: "/videos/cold-chain-warehouse.mp4",
    boxLabel: "PALLET",
    boxConfidence: "0.96",
    reading: { kind: "wave", label: "COLD STORAGE", base: -18.4, amplitude: 0.6, unit: "°C", periodMs: 9000 },
  },
];

/** Sensor/telemetry demo cards — radial-gauge HUD (no bounding boxes, since
 * there's no object detection involved). Shared the same way as videoProducts. */
export const telemetryProducts: TelemetryProductCard[] = [
  {
    slug: "fueliq",
    href: "/products/fueliq",
    badge: "FUEL AI",
    name: "Fuel Monitoring",
    tagline: "Every liter accounted for.",
    description: "Fuel levels, consumption, and theft monitored across generators, tanks, and fleets — deliveries reconciled against burn in real time.",
    video: "/videos/fuel-monitoring.mp4",
    gaugeLabel: "TANK LEVEL",
    gaugeBase: 64,
    gaugeAmplitude: 6,
    gaugePeriodMs: 8000,
    reading: { kind: "wave", label: "FLOW RATE", base: 142, amplitude: 14, unit: " L/HR", periodMs: 6000 },
  },
  {
    slug: "smart-metering",
    href: "/products/smart-metering",
    badge: "GRID AI",
    name: "Smart Metering",
    tagline: "Metering intelligence from grid to socket.",
    description: "Consumption, quality, and loss analytics from AMI or retrofit metering — losses located and billing disputes ended with data.",
    video: "/videos/smart-metering.mp4",
    gaugeLabel: "GRID LOAD",
    gaugeBase: 71,
    gaugeAmplitude: 8,
    gaugePeriodMs: 7000,
    reading: { kind: "counter", label: "kWh TODAY", start: 48210, step: [3, 9], intervalMs: 2000 },
  },
  {
    slug: "vehicle-tracking",
    href: "/products/vehicle-tracking",
    badge: "FLEET AI",
    name: "Vehicle Tracking",
    tagline: "Your fleet, live on one map.",
    description: "Live location, driver behavior, fuel analytics, and theft protection for cars, trucks, and bike fleets.",
    video: "/videos/vehicle-tracking.mp4",
    gaugeLabel: "ROUTE EFFICIENCY",
    gaugeBase: 88,
    gaugeAmplitude: 5,
    gaugePeriodMs: 9000,
    reading: { kind: "wave", label: "SPEED", base: 62, amplitude: 10, unit: " km/h", periodMs: 5000 },
  },
  {
    slug: "energy-monitoring",
    href: "/solutions/energy-monitoring",
    badge: "ENERGY AI",
    name: "Energy Monitoring",
    tagline: "Find the kilowatts you're wasting.",
    description: "Circuit-level energy monitoring and analytics across buildings and plants — baselines, anomaly detection, and verified savings.",
    video: "/videos/energy-monitoring.mp4",
    gaugeLabel: "PANEL OUTPUT",
    gaugeBase: 77,
    gaugeAmplitude: 9,
    gaugePeriodMs: 8500,
    reading: { kind: "wave", label: "OUTPUT", base: 94.2, amplitude: 6, unit: " kW", periodMs: 7000 },
  },
];

export type DemoVideoEntry =
  | { kind: "detection"; card: VideoProductCard }
  | { kind: "telemetry"; card: TelemetryProductCard };

/** Keyed by the *page* slug that should show the demo (a solution, product,
 * or industry slug — not necessarily the card's own `slug` field, though
 * today they match 1:1). Detail pages look themselves up here to decide
 * whether to render a "See it in action" section. */
export const demoVideoBySlug: Record<string, DemoVideoEntry> = {
  ...Object.fromEntries(videoProducts.map((card) => [card.slug, { kind: "detection", card } as const])),
  ...Object.fromEntries(telemetryProducts.map((card) => [card.slug, { kind: "telemetry", card } as const])),
  // Service-page aliases — these slugs are the parentService of a solution
  // above, so the same footage doubles as that service's demo.
  "computer-vision": { kind: "detection", card: videoProducts.find((c) => c.slug === "visionwatch")! },
  "industrial-iot": { kind: "telemetry", card: telemetryProducts.find((c) => c.slug === "smart-metering")! },
  "aiot-development": { kind: "detection", card: videoProducts.find((c) => c.slug === "environmental-monitoring")! },
};

function industriesFor(slug: string): string[] {
  return solutions.find((s) => s.slug === slug)?.industries ?? products.find((p) => p.slug === slug)?.industries ?? [];
}

// First-match-wins fan-out onto every industry any of the cards above lists,
// so an industry page without its own dedicated shoot (e.g. retail, utilities)
// still gets a topically relevant demo instead of no video at all.
const allEntries: DemoVideoEntry[] = [
  ...videoProducts.map((card) => ({ kind: "detection", card }) as const),
  ...telemetryProducts.map((card) => ({ kind: "telemetry", card }) as const),
];
for (const entry of allEntries) {
  for (const industrySlug of industriesFor(entry.card.slug)) {
    if (!demoVideoBySlug[industrySlug]) demoVideoBySlug[industrySlug] = entry;
  }
}
