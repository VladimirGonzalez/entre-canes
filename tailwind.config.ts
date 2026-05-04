import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Brand — Modern Startup palette
        brand: {
          ink: "#0F172A",      // primary deep navy (slate-900)
          ink2: "#1E293B",     // slate-800
          slate: "#475569",    // slate-600
          mist: "#94A3B8",     // slate-400
          line: "#E2E8F0",     // slate-200
          paper: "#F8FAFC",    // slate-50
          white: "#FFFFFF",
          amber: "#F59E0B",    // accent
          amberDark: "#D97706",
          amberLight: "#FCD34D",
          success: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // tighter, modern scale
        "display-2xl": ["clamp(2.5rem, 6vw, 4.75rem)", { lineHeight: "1.02", letterSpacing: "-0.04em", fontWeight: "600" }],
        "display-xl": ["clamp(2.25rem, 5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.035em", fontWeight: "600" }],
        "display-lg": ["clamp(1.875rem, 4vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "600" }],
        "display-md": ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "600" }],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.04)",
        card: "0 1px 2px rgba(15,23,42,0.06), 0 12px 32px -8px rgba(15,23,42,0.08)",
        glow: "0 10px 40px -10px rgba(245,158,11,0.45)",
        ring: "0 0 0 1px rgba(15,23,42,0.06), 0 8px 24px -4px rgba(15,23,42,0.08)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(248,250,252,0) 0%, rgba(248,250,252,1) 90%), radial-gradient(circle at center, rgba(15,23,42,0.06) 1px, transparent 1px)",
        "radial-spot":
          "radial-gradient(80% 60% at 50% 0%, rgba(245,158,11,0.18), transparent 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "soft-pulse": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "soft-pulse": "soft-pulse 2.4s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
