"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <span className="mb-6 inline-flex items-center gap-2 font-mono text-telemetry uppercase text-teal">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber animate-pulseDot" />
        Fault detected · 500
      </span>
      <h1 className="font-display text-display font-bold text-body">Something tripped on our side.</h1>
      <p className="mt-4 max-w-md text-muted">
        The error has been logged. Try again — if it persists, email{" "}
        <a href="mailto:marcom@invexal.com" className="text-teal hover:underline">marcom@invexal.com</a>.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-signal-gradient px-6 py-3 text-sm font-medium text-ink shadow-glow hover:brightness-110"
      >
        Try again
      </button>
    </section>
  );
}
