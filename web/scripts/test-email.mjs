/**
 * Test Gmail SMTP from web/.env.local
 * Run: npm run email:test
 */
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const FORWARD_EMAIL = "danish.khan@invexal.com";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env.local");

if (!existsSync(envPath)) {
  console.error("\n❌ Missing web/.env.local");
  console.error("   Run: npm run env:write\n");
  process.exit(1);
}

for (const raw of readFileSync(envPath, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/)) {
  const line = raw.trim();
  if (!line || line.startsWith("#")) continue;
  const m = line.match(/^([^=]+)=(.*)$/);
  if (m) process.env[m[1].trim()] = m[2].trim();
}

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FORWARD, SMTP_FROM } = process.env;

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  console.error("\n❌ .env.local is missing SMTP_HOST, SMTP_USER, or SMTP_PASS\n");
  process.exit(1);
}

const primary = CONTACT_TO || SMTP_USER;
const recipients = [
  ...new Set([primary, FORWARD_EMAIL, (CONTACT_FORWARD || "").trim()].filter(Boolean)),
];

console.log("\n📧 Testing SMTP");
console.log("   Sending to:", recipients.join(", "));

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT || 587),
  secure: false,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

try {
  await transporter.verify();

  const info = await transporter.sendMail({
    from: `"Invexal Test" <${SMTP_FROM || SMTP_USER}>`,
    to: recipients.join(", "),
    subject: "[Invexal Website] Test — forward to danish.khan@invexal.com",
    text: "Test email. Form sends to marcominvexal@gmail.com AND danish.khan@invexal.com.",
  });
  console.log("✅ Sent!", info.messageId);
  console.log("   To:", recipients.join(", "));
  console.log("   Check both inboxes + Spam.\n");
} catch (err) {
  console.error("❌ Failed:", err.message);
  console.error("   Use a Gmail App Password (not your normal password).\n");
  process.exit(1);
}
