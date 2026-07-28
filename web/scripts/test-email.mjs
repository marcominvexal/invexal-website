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

for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^([^#=]+)=(.*)$/);
  if (m) process.env[m[1].trim()] = m[2].trim();
}

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, SMTP_FROM } = process.env;

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  console.error("\n❌ .env.local is missing SMTP_HOST, SMTP_USER, or SMTP_PASS\n");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT || 587),
  secure: false,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

console.log("\n📧 Testing SMTP →", CONTACT_TO || SMTP_USER);

try {
  await transporter.verify();
  const info = await transporter.sendMail({
    from: `"Invexal Test" <${SMTP_FROM || SMTP_USER}>`,
    to: CONTACT_TO || SMTP_USER,
    subject: "[Invexal] Local email test OK",
    text: "If you received this, the website contact form will work on localhost.",
  });
  console.log("✅ Email sent!", info.messageId);
  console.log("   Check inbox + Spam folder.\n");
} catch (err) {
  console.error("❌ Failed:", err.message);
  console.error("   Use a Gmail App Password (not your normal password).\n");
  process.exit(1);
}
