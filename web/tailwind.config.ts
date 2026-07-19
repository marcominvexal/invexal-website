import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Enterprise 5-color system
        ink: "#FFFFFF",           // page background (White)
        "ink-raised": "#EEF6FF",  // alternate section background (Light Blue)
        navy: "#071C38",          // anchor dark-section background (Deep Navy)
        line: "rgba(7,28,56,0.10)",
        glass: "rgba(0,102,255,0.035)",
        body: "#071C38",          // primary text (Deep Navy)
        muted: "#4B6079",
        teal: "#0066FF",          // Primary Blue
        iris: "#00A8FF",          // Electric Blue (gradient end)
        amber: "#4CC9F0",         // Cyan Accent (live/signal micro-accent)
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
        "signal-gradient": "linear-gradient(100deg,#0066FF 0%,#00A8FF 100%)",
        "signal-radial":
          "radial-gradient(60% 50% at 50% 0%, rgba(0,102,255,0.10) 0%, rgba(0,168,255,0.06) 45%, transparent 100%)",
        "navy-gradient": "linear-gradient(135deg,#071C38 0%,#0A2A54 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -12px rgba(0,102,255,0.35)",
        card: "0 8px 24px -8px rgba(7,28,56,0.12)",
        "card-lg": "0 16px 40px -12px rgba(7,28,56,0.16)",
        "card-xl": "0 24px 60px -20px rgba(7,28,56,0.22)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        pulseDot: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.35" } },
        lattice: { "0%,100%": { opacity: "0.03" }, "50%": { opacity: "0.06" } },
        drift: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        orbitSpin: { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        orbitSpinReverse: { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(-360deg)" } },
        detectionDrift: {
          "0%,100%": { top: "38%", left: "30%", width: "22%", height: "30%" },
          "25%": { top: "30%", left: "45%", width: "20%", height: "26%" },
          "50%": { top: "42%", left: "52%", width: "24%", height: "32%" },
          "75%": { top: "35%", left: "36%", width: "21%", height: "28%" },
        },
        scanSweep: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(220%)", opacity: "0" },
        },
        kenburns: { "0%": { transform: "scale(1)" }, "100%": { transform: "scale(1.08)" } },
        fadeInUp: { "0%": { opacity: "0", transform: "translateY(14px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        pulseDot: "pulseDot 2s ease-in-out infinite",
        lattice: "lattice 8s ease-in-out infinite",
        drift: "drift 6s ease-in-out infinite",
        orbitSpin: "orbitSpin 48s linear infinite",
        orbitSpinReverse: "orbitSpinReverse 48s linear infinite",
        kenburns: "kenburns 20s ease-in-out infinite alternate",
        fadeInUp: "fadeInUp 0.6s ease-out both",
        detectionDrift: "detectionDrift 14s ease-in-out infinite",
        scanSweep: "scanSweep 4s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
