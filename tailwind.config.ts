import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#F2F6F4",
          100: "#E2ECE7",
          200: "#C6D8CF",
          300: "#9FBDAE",
          400: "#739C8A",
          500: "#4D7C69",
          600: "#2D5A4C", // Primary Clinical Sage
          700: "#23473C",
          800: "#1B372F",
          900: "#132721",
        },
        terracotta: {
          50: "#FDF8F5",
          100: "#FAF0E8",
          200: "#F4DDCF",
          300: "#E9BFAB",
          400: "#DA9B80",
          500: "#C48B5E", // Secondary Warm Accent
          600: "#A86E43",
          700: "#865330",
          800: "#6C4227",
          900: "#573620",
        },
        ivory: {
          50: "#FCFCF9",
          100: "#FAF9F4", // Main App Background
          200: "#F3F1E8",
          300: "#E7E4D8",
          400: "#D6D2C2",
          500: "#BAB5A3",
        },
        charcoal: {
          50: "#F6F7F7",
          100: "#E2E4E4",
          200: "#C4C8C9",
          300: "#9DA3A5",
          400: "#6C7477",
          500: "#4B5356",
          600: "#363C3E",
          700: "#2B3032",
          800: "#1C2120", // Main Deep Text
          900: "#121615",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "Inter", "-apple-system", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        clinical: "0 4px 20px -2px rgba(28, 33, 32, 0.05)",
        card: "0 10px 30px -5px rgba(28, 33, 32, 0.04), 0 2px 6px -2px rgba(28, 33, 32, 0.02)",
        elevation: "0 20px 40px -10px rgba(45, 90, 76, 0.08)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
