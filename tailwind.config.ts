import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        // Warm brand palette — gold/amber from the Empati logo
        gold: {
          50: "#FDF8EC",
          100: "#FAEFCE",
          200: "#F4DD96",
          300: "#EFC95E",
          400: "#E9B534",
          500: "#E5A823", // primary brand gold
          600: "#C8881A",
          700: "#A0681A",
          800: "#82531C",
          900: "#6E461C",
        },
        ember: {
          400: "#F0905A",
          500: "#E07B39", // warm orange accent (logo interlock)
          600: "#C8612A",
        },
        ink: {
          DEFAULT: "#1C1B19",
          soft: "#3A3833",
          muted: "#6B665C",
          faint: "#9A948A",
        },
        cream: "#FBF9F4",
        sand: "#F4F1E9",
        line: "#E9E4D8",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      spacing: {
        "4.5": "1.125rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(28,27,25,0.04), 0 8px 24px -12px rgba(28,27,25,0.12)",
        lift: "0 2px 4px rgba(28,27,25,0.04), 0 18px 40px -16px rgba(28,27,25,0.18)",
        glow: "0 10px 40px -12px rgba(229,168,35,0.45)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #F5C544 0%, #E5A823 45%, #C8881A 100%)",
        "warm-radial":
          "radial-gradient(120% 120% at 50% 0%, #FDF8EC 0%, #FBF9F4 55%, #F4F1E9 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(24px, -32px) scale(1.08)" },
          "66%": { transform: "translate(-20px, 18px) scale(0.94)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 32s linear infinite",
        blob: "blob 14s ease-in-out infinite",
        "blob-slow": "blob 20s ease-in-out infinite reverse",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
