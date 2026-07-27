import type { Metadata, Viewport } from "next";
import { Sora, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE, buildMetadata, organizationJsonLd, websiteJsonLd, JsonLd } from "@/lib/seo";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  ...buildMetadata({
    title: "Invexal — Enterprise AI, Computer Vision & AIoT",
    description:
      "Invexal builds AI that sees, predicts, and acts in the physical world: AI agents, computer vision, AIoT, and intelligent automation for enterprises.",
    path: "/",
  }),
  title: {
    default: "Invexal — Enterprise AI, Computer Vision & AIoT",
    template: "%s | Invexal",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071C38",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${instrument.variable} ${plexMono.variable}`}>
      <body className="bg-ink font-sans text-body antialiased">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
