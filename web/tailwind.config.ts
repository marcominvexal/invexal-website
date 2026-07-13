import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#FFFFFF",
        "ink-raised": "#F3F5F9",
        line: "rgba(15,23,42,0.10)",
        glass: "rgba(15,23,42,0.035)",
        body: "#212529",
        muted: "#475569",
        teal: "#1351D8",
        iris: "#1351D8",
        amber: "#D97706",
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        sans: ["var(--font-instrument)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem,5vw,4.25rem)", { lineHeight: "1.06", letterSpacing: "-0.02em" }],
        display: ["clamp(2rem,3.6vw,3rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        telemetry: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.14em" }],
      },
      backgroundImage: {
        "signal-gradient": "linear-gradient(100deg,#1351D8 0%,#1351D8 100%)",
        "signal-radial":
          "radial-gradient(60% 50% at 50% 0%, rgba(19,81,216,0.10) 0%, rgba(19,81,216,0.06) 45%, transparent 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -12px rgba(19,81,216,0.35)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        pulseDot: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.35" } },
        lattice: { "0%,100%": { opacity: "0.03" }, "50%": { opacity: "0.06" } },
        drift: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        pulseDot: "pulseDot 2s ease-in-out infinite",
        lattice: "lattice 8s ease-in-out infinite",
        drift: "drift 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
