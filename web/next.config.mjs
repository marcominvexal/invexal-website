/** @type {import("next").NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // HSTS is safe here because invexal.com already serves HTTPS.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  outputFileTracingRoot: resolve(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "invexal.com" }],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // Legacy WordPress URL equity — extend per docs/01-sitemap.md
    return [
      { source: "/about-us", destination: "/company/about", permanent: true },
      { source: "/blogs", destination: "/resources/blog", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/faqs", destination: "/contact", permanent: true },
    ];
  },
};
export default nextConfig;
