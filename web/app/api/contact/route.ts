import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  phone: z.string().optional(),
  interest: z.string().min(1),
  message: z.string().min(10),
  website: z.string().max(0).optional(), // honeypot — real users never fill this
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function smtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO || "marcominvexal@gmail.com";
  const from = process.env.SMTP_FROM || user || "marcominvexal@gmail.com";

  const secure =
    process.env.SMTP_SECURE === "true" ||
    process.env.SMTP_SECURE === "1" ||
    port === 465;

  return { host, port, user, pass, to, from, secure };
}

async function sendContactEmail(data: z.infer<typeof schema>) {
  const { host, port, user, pass, to, from, secure } = smtpConfig();

  if (!host || !user || !pass) {
    throw new Error(
      "Email is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.local (or your host env vars)."
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure && port === 587,
    auth: { user, pass },
    tls: { minVersion: "TLSv1.2" },
  });

  const subject = `[Invexal Website] ${data.interest} — ${data.name}, ${data.company}`;
  const text = [
    "New website enquiry",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company}`,
    `Phone: ${data.phone?.trim() || "—"}`,
    `Topic: ${data.interest}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px">New website enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone?.trim() || "—")}</p>
      <p><strong>Topic:</strong> ${escapeHtml(data.interest)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Invexal Website" <${from}>`,
    to,
    replyTo: data.email,
    subject,
    text,
    html,
  });
}

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

  try {
    await sendContactEmail(data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[contact] email delivery failed", message);

    const lockedBySecurity =
      /security defaults|user is locked|5\.7\.139/i.test(message);
    const badAuth = /Invalid login|Incorrect authentication|EAUTH/i.test(message);

    let error =
      "We could not send your message right now. Please email marcominvexal@gmail.com directly, or try again.";
    if (lockedBySecurity) {
      error =
        "Mailbox SMTP is blocked by provider security settings. For Gmail, enable 2-Step Verification and create an App Password, then try again.";
    } else if (badAuth) {
      error =
        "Email login failed. Check SMTP_USER / SMTP_PASS (use a Gmail App Password, not your normal password).";
    }

    return NextResponse.json({ ok: false, error }, { status: 502 });
  }
}
