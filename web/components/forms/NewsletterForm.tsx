"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid work email");
      return;
    }
    // Newsletter delivery not yet wired to an ESP — stub so the UI ships without a vendor decision.
    setError("");
    setSent(true);
  };

  if (sent) {
    return <p className="text-sm text-teal">You&apos;re on the list — we&apos;ll be in touch.</p>;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">Work email</label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-teal/60 focus:outline-none sm:w-64"
        />
        {error && <p role="alert" className="mt-1.5 text-xs text-amber">{error}</p>}
      </div>
      <button
        type="submit"
        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-signal-gradient px-5 py-2.5 text-sm font-medium text-white shadow-glow transition hover:scale-[1.03] active:scale-[0.98]"
      >
        Subscribe <ArrowRight aria-hidden className="h-3.5 w-3.5" />
      </button>
    </form>
  );
}
