import { Button, TelemetryTag } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="signal-lattice flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <TelemetryTag live className="mb-6">Signal lost · 404</TelemetryTag>
      <h1 className="font-display text-display font-bold text-body">This page isn&apos;t on the map.</h1>
      <p className="mt-4 max-w-md text-muted">
        The route moved during the redesign, or never existed. Everything worth seeing is one click away.
      </p>
      <div className="mt-8 flex gap-4">
        <Button href="/">Back to home</Button>
        <Button href="/contact" variant="secondary">Contact us</Button>
      </div>
    </section>
  );
}
