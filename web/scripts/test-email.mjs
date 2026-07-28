/**
 * Test Gmail SMTP from web/.env.local
 * Run: npm run email:test
 */
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env.local");

if (!existsSync(envPath)) {
  console.error("\n❌ Missing web/.env.local");
  console.error("   Run: setup-email.bat   OR   copy .env.example .env.local and edit SMTP_PASS\n");
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

console.log("\n📧 Testing SMTP");
console.log("   To:", CONTACT_TO || SMTP_USER);
console.log("   Forward (CC):", CONTACT_FORWARD || "danish.khan@invexal.com");

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT || 587),
  secure: false,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

try {
  await transporter.verify();

  const primary = await transporter.sendMail({
    from: `"Invexal Test" <${SMTP_FROM || SMTP_USER}>`,
    to: CONTACT_TO || SMTP_USER,
    subject: "[Invexal Website] Test — Website form to Gmail",
    text: "Gmail inbox test. Real form emails use the same format as live submissions.",
  });
  console.log("✅ Gmail:", primary.messageId);

  const forwardTo = (CONTACT_FORWARD || "danish.khan@invexal.com").trim();
  const fwd = await transporter.sendMail({
    from: `"Invexal Test" <${SMTP_FROM || SMTP_USER}>`,
    to: forwardTo,
    subject: "[Invexal Website] Test — Forward to Invexal",
    text: "Invexal.com inbox test. Real enquiries are forwarded here automatically.",
  });
  console.log("✅ Forward:", forwardTo, fwd.messageId);
  console.log("   Check both inboxes + Spam.\n");
} catch (err) {
  console.error("❌ Failed:", err.message);
  console.error("   Use a Gmail App Password (not your normal password).\n");
  process.exit(1);
}
