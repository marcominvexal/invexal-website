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

const to = CONTACT_TO || SMTP_USER;
const forward = [...new Set([FORWARD_EMAIL, (CONTACT_FORWARD || "").trim()].filter(Boolean))].filter(
  (addr) => addr.toLowerCase() !== to.toLowerCase()
);

console.log("\n📧 Testing SMTP");
console.log("   Primary:", to);
console.log("   Forward (separate email):", forward.join(", "));

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT || 587),
  secure: false,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

const mail = {
  from: `"Invexal Test" <${SMTP_FROM || SMTP_USER}>`,
  subject: "[Invexal Website] Test — form email delivery",
  text: "Test email. Website form sends to Gmail, then a separate copy to danish.khan@invexal.com.",
};

try {
  await transporter.verify();

  const primary = await transporter.sendMail({ ...mail, to });
  console.log("✅ Primary sent!", primary.messageId, "→", to);

  for (const addr of forward) {
    const fwd = await transporter.sendMail({ ...mail, to: addr });
    console.log("✅ Forward sent!", fwd.messageId, "→", addr);
  }

  console.log("\n   Check both inboxes + Spam.\n");
} catch (err) {
  console.error("❌ Failed:", err.message);
  console.error("   Use a Gmail App Password (not your normal password).\n");
  process.exit(1);
}
