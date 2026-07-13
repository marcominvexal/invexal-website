import type { FAQ, Stat } from "./types";

/**
 * HONESTY GATE: values with verified:false are PLACEHOLDERS.
 * The Stats component renders only verified stats in production.
 * Replace with real figures, flip the flag, ship.
 * Verified values come from invexal.com (July 2026).
 */
export const stats: Stat[] = [
  { label: "Projects delivered", value: 50, suffix: "+", verified: true },
  { label: "Countries served", value: 5, suffix: "+", verified: true },
  { label: "Enterprise clients", value: 15, suffix: "+", verified: true },
  { label: "Years of experience", value: 10, suffix: "+", verified: true },
  { label: "AI models in production", value: 40, suffix: "+", verified: false },
  { label: "Connected devices", value: 25000, suffix: "+", verified: false },
  { label: "AI predictions daily", value: 1000000, suffix: "+", verified: false },
];

/** Real testimonials already published on invexal.com — truncated to strongest lines. */
export const testimonials = [
  {
    quote:
      "Real-time tracking and data analytics have significantly improved our fleet management and security measures. INVEXAL truly understands the needs of our industry.",
    name: "Zaheer Abbas",
    role: "CEO, Al Busayra Delivery Services",
  },
  {
    quote:
      "Their expert guidance and seamless implementation have elevated our customers' projects globally, showcasing a deep understanding of the interconnected world.",
    name: "Philipp Heinzl",
    role: "Global Account Director, Deutsche Telekom IoT",
  },
  {
    quote:
      "Our collaboration has met and exceeded technological expectations, showcasing the seamless integration of creativity and professionalism.",
    name: "Shahzad Ahmed Hafeezi",
    role: "CEO, Mazik Global",
  },
  {
    quote:
      "Invexal isn't just a service provider; they're an integral part of our team. Their dedication and innovative solutions have propelled our business forward.",
    name: "Christian Hendriksen",
    role: "CEO",
  },
];

export const homeFaqs: FAQ[] = [
  {
    q: "Is Invexal an AI company or an IoT company?",
    a: "Both, deliberately. Invexal builds AI that operates in the physical world — computer vision, AI agents, and predictive models running on top of the sensors, cameras, and connectivity we also deploy. Software-only AI firms stop at the dashboard; we own the loop from device to decision.",
  },
  {
    q: "How quickly can a first deployment go live?",
    a: "Repeatable solutions (vision analytics, asset tracking, energy monitoring) typically pilot in 4–6 weeks. Custom AI programs start with a readiness assessment and a scoped pilot, usually reaching production within a quarter.",
  },
  {
    q: "Can you deploy on-premises or at the edge?",
    a: "Yes. Every product supports cloud, on-premises, and edge deployment. Vision workloads often run entirely at the edge so video never leaves your site — a common requirement in healthcare, oil & gas, and government work.",
  },
  {
    q: "How do you handle data security and compliance?",
    a: "Security is a service line, not an afterthought: encrypted transport and storage, role-based access, network segmentation for OT environments, and compliance mapping (GDPR, HIPAA where applicable) built into every architecture review.",
  },
  {
    q: "What does engagement look like commercially?",
    a: "Three models: fixed-scope pilots, product subscriptions with deployment services, and managed AI operations. Every proposal includes the KPI baseline we will be measured against.",
  },
  {
    q: "Do you work with our existing systems?",
    a: "Integration is the default. We connect to ERPs, CMMS, WMS, SCADA/historians, video management systems, and messaging platforms through documented APIs — the value of AI shows up inside the tools your teams already use.",
  },
];

export const whyInvexal = [
  { title: "Enterprise-first delivery", body: "Security reviews, procurement, change management — we run the process large organizations actually require." },
  { title: "Fast deployment", body: "Repeatable solution decks and pre-trained models take pilots live in weeks, not quarters." },
  { title: "Scales from pilot to fleet", body: "Architectures designed for the tenth site on day one: fleet device management, model monitoring, rollout playbooks." },
  { title: "Secure by design", body: "Edge processing options, encrypted pipelines, OT-aware network design, least-privilege access." },
  { title: "Global partner network", body: "Delivery alongside partners including Deutsche Telekom IoT and leading hardware manufacturers, across US, UK, and UAE offices." },
  { title: "ROI you can audit", body: "Every engagement is baselined against named KPIs — downtime, shrinkage, energy spend, incident rate — and reported against them." },
];

export const processSteps = [
  { title: "Assess", body: "AI readiness assessment: data, infrastructure, use-case scoring, and a prioritized roadmap." },
  { title: "Pilot", body: "One site, one KPI, 4–8 weeks. Real hardware, real data, a go/no-go you can defend." },
  { title: "Deploy", body: "Production hardening: integrations, security review, training, and acceptance against the baseline." },
  { title: "Scale", body: "Rollout playbooks take the solution from one site to the fleet with device and model management." },
  { title: "Operate", body: "Managed operations: model monitoring, retraining, SLAs, and quarterly value reviews." },
];

export const capabilities = [
  { name: "Generative AI", blurb: "Assistants, content, and copilots grounded in your data." },
  { name: "AI Agents", blurb: "Autonomous workflows that carry real operational workloads." },
  { name: "Computer Vision", blurb: "Cameras become sensors: detection, safety, counting, ANPR." },
  { name: "Predictive Analytics", blurb: "Forecast demand, failures, and risk before they cost you." },
  { name: "LLMs", blurb: "Fine-tuned and retrieval-grounded language models, private by default." },
  { name: "Edge AI", blurb: "Inference where the data is born — low latency, data stays on site." },
  { name: "Digital Twins", blurb: "Live virtual replicas of assets, lines, and buildings." },
  { name: "Automation", blurb: "Close the loop: from insight to action without a human queue." },
];
