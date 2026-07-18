import { CheckCircle2 } from "lucide-react";
import { TelemetryTag } from "@/components/ui/primitives";
import DemoRequestForm from "@/components/forms/DemoRequestForm";

const checklist = [
  "AI that sees, predicts, and acts — not just a dashboard.",
  "Pilot to fleet rollout in weeks, with a go/no-go you can defend.",
  "Enterprise-grade security, procurement, and support from day one.",
];

export default function CTABand({
  title = "Ready to see what your operation is telling you?",
  lede = "Book a demo, or start with the AI Readiness Assessment — a 30-minute working session that maps your highest-value first deployment.",
}: {
  title?: string;
  lede?: string;
}) {
  return (
    <section className="bg-ink py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <TelemetryTag live className="mb-6 inline-flex">Connect with us</TelemetryTag>
            <h2 className="font-display text-display font-semibold text-body">{title}</h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">{lede}</p>
            <ul className="mt-8 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body">
                  <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-ink p-6 shadow-card-lg sm:p-8">
            <h3 className="font-display text-lg font-semibold text-body">Schedule a demo</h3>
            <p className="mt-1 text-sm text-muted">See Invexal on your own cameras and data.</p>
            <div className="mt-6">
              <DemoRequestForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
