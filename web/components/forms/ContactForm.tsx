"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please tell us your name"),
  email: z.string().email("Please use a valid email"),
  company: z.string().min(2, "Company name required"),
  phone: z.string().optional(),
  interest: z.string().min(1, "Pick a topic"),
  message: z.string().min(10, "A sentence or two helps us route you"),
  website: z.string().max(0).optional(), // honeypot
});

type FormData = z.infer<typeof schema>;

const CONTACT_EMAIL = "marcominvexal@gmail.com";

const interests = [
  "AI Agents", "Computer Vision", "AIoT / Connected Operations", "Intelligent Automation",
  "A specific product", "AI Readiness Assessment", "Partnership", "Something else",
];

const field =
  "w-full rounded-xl border border-line bg-glass px-4 py-3 text-body placeholder:text-muted/60 backdrop-blur focus:border-teal/60 focus:outline-none";
const label = "mb-2 block font-mono text-telemetry uppercase text-teal";
const error = "mt-1 text-sm text-amber";

/** Server SMTP via /api/contact (uses .env.local or Vercel env vars). */
async function sendViaApi(data: FormData) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const payload = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!res.ok || !payload?.ok) {
    throw new Error(payload?.error || `Server error (${res.status})`);
  }
}

/**
 * Browser fallback when SMTP is not configured on the host (e.g. Vercel without env vars).
 * FormSubmit delivers to Gmail without server credentials.
 */
async function sendViaFormSubmit(data: FormData) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone?.trim() || "—",
      interest: data.interest,
      message: data.message,
      _subject: `[Invexal Website] ${data.interest} — ${data.name}, ${data.company}`,
      _captcha: "false",
      _template: "table",
    }),
  });

  const payload = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
  const ok = payload?.success === true || payload?.success === "true";
  if (!res.ok || !ok) {
    throw new Error("Could not deliver your message. Please email us directly.");
  }
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    `Something went wrong. Please email us directly at ${CONTACT_EMAIL}.`
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setFailed(false);
    setErrorMessage(`Something went wrong. Please email us directly at ${CONTACT_EMAIL}.`);

    try {
      try {
        await sendViaApi(data);
      } catch (apiErr) {
        // Vercel / localhost without .env.local — fall back to browser delivery
        console.warn("[contact] SMTP API unavailable, using FormSubmit fallback", apiErr);
        await sendViaFormSubmit(data);
      }
      setSent(true);
    } catch (err) {
      if (err instanceof Error && err.message) setErrorMessage(err.message);
      setFailed(true);
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-teal/40 bg-glass p-8 text-center backdrop-blur">
        <p className="font-display text-xl font-semibold text-body">Message received.</p>
        <p className="mt-2 text-muted">We reply within one business day — usually faster.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register("website")} />
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Name</label>
          <input id="name" autoComplete="name" className={field} {...register("name")} />
          {errors.name && <p role="alert" className={error}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={label}>Work email</label>
          <input id="email" type="email" autoComplete="email" className={field} {...register("email")} />
          {errors.email && <p role="alert" className={error}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="company" className={label}>Company</label>
          <input id="company" autoComplete="organization" className={field} {...register("company")} />
          {errors.company && <p role="alert" className={error}>{errors.company.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone (optional)</label>
          <input id="phone" type="tel" autoComplete="tel" className={field} {...register("phone")} />
        </div>
      </div>
      <div>
        <label htmlFor="interest" className={label}>What brings you here?</label>
        <select id="interest" className={cn(field, "appearance-none")} defaultValue="" {...register("interest")}>
          <option value="" disabled>Select a topic</option>
          {interests.map((i) => (
            <option key={i} value={i} className="bg-ink">{i}</option>
          ))}
        </select>
        {errors.interest && <p role="alert" className={error}>{errors.interest.message}</p>}
      </div>
      <div>
        <label htmlFor="message" className={label}>Message</label>
        <textarea id="message" rows={5} className={field} {...register("message")} />
        {errors.message && <p role="alert" className={error}>{errors.message.message}</p>}
      </div>
      {failed && (
        <p role="alert" className="rounded-xl border border-amber/40 bg-glass px-4 py-3 text-sm text-amber">
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="relative isolate w-full overflow-hidden rounded-full bg-signal-gradient px-6 py-3.5 font-medium text-ink shadow-glow transition duration-200 before:absolute before:inset-y-0 before:left-0 before:-z-10 before:h-0 before:w-1/2 before:rounded-l-full before:bg-body before:transition-[height] before:duration-300 before:content-[''] after:absolute after:inset-y-0 after:right-0 after:-z-10 after:h-0 after:w-1/2 after:rounded-r-full after:bg-body after:transition-[height] after:duration-300 after:content-[''] hover:before:h-full hover:after:h-full disabled:opacity-60 md:w-auto"
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
