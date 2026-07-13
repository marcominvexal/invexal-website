import { Button, TelemetryTag } from "@/components/ui/primitives";

export default function CTABand({
  title = "Ready to see what your operation is telling you?",
  lede = "Book a demo, or start with the AI Readiness Assessment — a 30-minute working session that maps your highest-value first deployment.",
}: {
  title?: string;
  lede?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-signal-radial opacity-40" />
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
        <TelemetryTag live className="mb-6 inline-flex">Next step</TelemetryTag>
        <h2 className="font-display text-display font-semibold text-body">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">{lede}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/book-a-demo">Book a demo</Button>
          <Button href="/resources/ai-readiness" variant="secondary">Take the AI Readiness Assessment</Button>
        </div>
      </div>
    </section>
  );
}
