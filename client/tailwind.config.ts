const { fontFamily } = require("tailwindcss/defaultTheme");
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        transparent: "transparent",
        nobbleBlack: {
          100: "#E8E9E9",
          700: "#131619",
          300: "#9B9C9E",
          200: "#CDCECF",
          400: "#686B6E",
          500: "#363A3D",
          600: "#1A1D21",
          800: "#0D0F10",
        },
        stemGreen: {
          500: "#B6F09C",
        },
        dayBlue: {
          900: "#0C1132",
        },
        glassStroke: "hsl(0,0,100,8%)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        24: "1.5rem",
        20: "1.25rem",
        16: "1rem",
        8: "0.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      padding: {
        24: "1.5rem",
        48: "3rem",
        12: "0.75rem",
        16: "1rem",
        14: "0.875rem",
        36: "2.25rem",
      },
      fontSize: {
        36: "2.25rem",
        34: "2.125rem",
        32: "2rem",
        30: "1.875rem",
        28: "1.75rem",
        24: "1.5rem",
        22: "1.375rem",
        20: "1.25rem",
        18: "1.125rem",
        14: "0.875rem",
        16: "1rem",
        12: "0.75rem",
      },
      gap: {
        24: "1.5rem",
        12: "0.75rem",
        16: "1rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
