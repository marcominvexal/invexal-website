import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Invexal — Intelligence for the physical world";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        {/* Telemetry eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: "#D97706" }} />
          <div style={{ color: "#1351D8", fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>
            Enterprise AI · Computer Vision · AIoT · Automation
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#212529", fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>
            Intelligence for the
          </div>
          <div style={{ color: "#1351D8", fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>
            physical world.
          </div>
        </div>

        {/* Footer row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#212529", fontSize: 34, fontWeight: 700, letterSpacing: 2 }}>INVEXAL</div>
          <div style={{ color: "#475569", fontSize: 24 }}>invexal.com</div>
        </div>
      </div>
    ),
    size
  );
}
