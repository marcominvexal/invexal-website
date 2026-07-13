import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  phone: z.string().optional(),
  interest: z.string().min(1),
  message: z.string().min(10),
  website: z.string().max(0).optional(), // honeypot — real users never fill this
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation failed" }, { status: 422 });
  }
  const data = parsed.data;

  // Honeypot tripped — pretend success, send nothing.
  if (data.website) return NextResponse.json({ ok: true });

  // --- Delivery ---
  // Option A (recommended): Resend. `npm i resend`, set RESEND_API_KEY in Vercel,
  // and uncomment below. Sender domain must be verified in Resend first.
  //
  // const { Resend } = await import("resend");
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "Website <noreply@invexal.com>",
  //   to: ["marcom@invexal.com"],
  //   replyTo: data.email,
  //   subject: `[invexal.com] ${data.interest} — ${data.name}, ${data.company}`,
  //   text: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nPhone: ${data.phone ?? "—"}\nTopic: ${data.interest}\n\n${data.message}`,
  // });
  //
  // Option B: forward to a CRM webhook (HubSpot, Zoho) with fetch().
  //
  // Until one is wired, log server-side so submissions are at least visible in
  // Vercel logs rather than silently lost:
  console.info("[contact] submission", { ...data, message: data.message.slice(0, 500) });

  return NextResponse.json({ ok: true });
}
