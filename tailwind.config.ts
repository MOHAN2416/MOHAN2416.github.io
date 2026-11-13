import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#07090E",
        surface: {
          50: "#1A2333",
          100: "#141C2B",
          200: "#0F1624",
          300: "#0D1117",
          400: "#090D13",
          DEFAULT: "#0D1117",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          glow: "rgba(59, 130, 246, 0.25)",
          DEFAULT: "#161F30",
        },
        cyber: {
          emerald: "#10B981",
          emeraldLight: "#34D399",
          emeraldGlow: "rgba(16, 185, 129, 0.15)",
          indigo: "#3B82F6",
          indigoLight: "#60A5FA",
          indigoGlow: "rgba(59, 130, 246, 0.15)",
          cyan: "#06B6D4",
          amber: "#F59E0B",
          purple: "#8B5CF6",
          rose: "#F43F5E",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "glow-indigo": "0 0 25px -5px rgba(59, 130, 246, 0.3)",
        "glow-emerald": "0 0 25px -5px rgba(16, 185, 129, 0.3)",
        "glow-amber": "0 0 25px -5px rgba(245, 158, 11, 0.3)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan": "scan 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        scan: {
          "0%, 100%": { transform: "translateY(0%)", opacity: "0.2" },
          "50%": { transform: "translateY(100%)", opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
