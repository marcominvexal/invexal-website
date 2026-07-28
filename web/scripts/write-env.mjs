/**
 * Write web/.env.local with UTF-8 (fixes Windows batch encoding issues).
 * Run: npm run env:write
 */
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env.local");

const content = `# Invexal local email — do not commit
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=marcominvexal@gmail.com
SMTP_PASS=cmjbaqeofxveibwt
SMTP_FROM=marcominvexal@gmail.com
CONTACT_TO=marcominvexal@gmail.com
`;

writeFileSync(envPath, content, { encoding: "utf8" });
console.log("Wrote", envPath);
