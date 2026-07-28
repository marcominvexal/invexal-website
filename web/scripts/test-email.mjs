/**
 * Test Gmail SMTP from web/.env.local
 * Run: npm run email:test
 */
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const FORWARD_EMAIL = "danish.khan@invexal.com";
const CC_EMAIL = "waqi.anwer@invexal.com";

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

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FORWARD, CONTACT_CC, SMTP_FROM } =
  process.env;

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  console.error("\n❌ .env.local is missing SMTP_HOST, SMTP_USER, or SMTP_PASS\n");
  process.exit(1);
}

const sender = (SMTP_FROM || SMTP_USER).toLowerCase();
const isSender = (addr) => addr.toLowerCase() === sender;

const to = [
  ...new Set(
    [(CONTACT_TO || FORWARD_EMAIL).trim(), FORWARD_EMAIL, (CONTACT_FORWARD || "").trim()].filter(
      (addr) => addr && !isSender(addr)
    )
  ),
];
const cc = [
  ...new Set([CC_EMAIL, (CONTACT_CC || "").trim()].filter((addr) => addr && !isSender(addr) && !to.includes(addr))),
];

console.log("\n📧 Testing SMTP (Gmail = send only, not inbox)");
console.log("   From:", SMTP_FROM || SMTP_USER);
console.log("   To:", to.join(", "));
console.log("   CC:", cc.join(", "));

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
    to: to.join(", "),
    cc: cc.length ? cc.join(", ") : undefined,
    subject: "[Invexal Website] Test — send-only Gmail",
    text: "Test email. Gmail is used only to send. Recipients: danish.khan@invexal.com (To) + waqi.anwer@invexal.com (CC).",
  });
  console.log("✅ Sent!", info.messageId);
  console.log("   Gmail inbox should NOT receive this — check danish + waqi inboxes.\n");
} catch (err) {
  console.error("❌ Failed:", err.message);
  console.error("   Use a Gmail App Password (not your normal password).\n");
  process.exit(1);
}
