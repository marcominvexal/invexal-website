"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Please use a valid work email"),
  company: z.string().min(2, "Company name required"),
  phone: z.string().optional(),
  website: z.string().max(0).optional(), // honeypot
});

type FormData = z.infer<typeof schema>;

const field =
  "w-full rounded-xl border border-line bg-glass px-4 py-3 text-body placeholder:text-muted/60 backdrop-blur focus:border-teal/60 focus:outline-none";
const label = "mb-2 block font-mono text-telemetry uppercase text-teal";
const error = "mt-1 text-sm text-amber";

export default function DemoRequestForm() {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setFailed(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          company: data.company,
          phone: data.phone,
          interest: "Demo request",
          message: "Requested a demo via the homepage CTA.",
          website: data.website,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSent(true);
    } catch {
      setFailed(true);
    }
  };

  if (sent) {
    return (
      <div className="text-center">
        <p className="font-display text-xl font-semibold text-body">Request received.</p>
        <p className="mt-2 text-muted">We&apos;ll be in touch to schedule your demo — usually within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — hidden from humans, bots fill it and get silently dropped */}
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register("website")} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="demo-first-name" className={label}>First name</label>
          <input id="demo-first-name" autoComplete="given-name" className={field} {...register("firstName")} />
          {errors.firstName && <p role="alert" className={error}>{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="demo-last-name" className={label}>Last name</label>
          <input id="demo-last-name" autoComplete="family-name" className={field} {...register("lastName")} />
          {errors.lastName && <p role="alert" className={error}>{errors.lastName.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="demo-email" className={label}>Work email</label>
        <input id="demo-email" type="email" autoComplete="email" className={field} {...register("email")} />
        {errors.email && <p role="alert" className={error}>{errors.email.message}</p>}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="demo-company" className={label}>Company</label>
          <input id="demo-company" autoComplete="organization" className={field} {...register("company")} />
          {errors.company && <p role="alert" className={error}>{errors.company.message}</p>}
        </div>
        <div>
          <label htmlFor="demo-phone" className={label}>Phone (optional)</label>
          <input id="demo-phone" type="tel" autoComplete="tel" className={field} {...register("phone")} />
        </div>
      </div>
      {failed && (
        <p role="alert" className="rounded-xl border border-amber/40 bg-glass px-4 py-3 text-sm text-amber">
          Something went wrong sending your request. Please try again, or email us directly at marcominvexal@gmail.com.
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="relative isolate w-full overflow-hidden rounded-full bg-signal-gradient px-6 py-3.5 font-medium text-ink shadow-glow transition duration-200 before:absolute before:inset-y-0 before:left-0 before:-z-10 before:h-0 before:w-1/2 before:rounded-l-full before:bg-body before:transition-[height] before:duration-300 before:content-[''] after:absolute after:inset-y-0 after:right-0 after:-z-10 after:h-0 after:w-1/2 after:rounded-r-full after:bg-body after:transition-[height] after:duration-300 after:content-[''] hover:before:h-full hover:after:h-full disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Request a demo"}
      </button>
    </form>
  );
}
