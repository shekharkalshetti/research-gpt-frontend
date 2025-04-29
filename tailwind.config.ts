import type { Config } from "tailwindcss"
const defaultTheme = require("tailwindcss/defaultTheme")

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
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
        // Custom color palette
        "deep-graphite": "#2D2D34",
        silver: "#D1D1D8",
        "light-graphite": "#8A8A96",
        "off-white": "#F7F7FA",

        // Default shadcn colors mapped to our palette
        // border: "#D1D1D8",
        // input: "#D1D1D8",
        // ring: "#2D2D34",
        // background: "#F7F7FA",
        // foreground: "#2D2D34",
        // primary: {
        //   DEFAULT: "#2D2D34",
        //   foreground: "#F7F7FA",
        // },
        // secondary: {
        //   DEFAULT: "#8A8A96",
        //   foreground: "#F7F7FA",
        // },
        // destructive: {
        //   DEFAULT: "#FF0000",
        //   foreground: "#F7F7FA",
        // },
        // muted: {
        //   DEFAULT: "#D1D1D8",
        //   foreground: "#2D2D34",
        // },
        // accent: {
        //   DEFAULT: "#D1D1D8",
        //   foreground: "#2D2D34",
        // },
        // card: {
        //   DEFAULT: "#F7F7FA",
        //   foreground: "#2D2D34",
        // },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        obviously: ["var(--font-obviously)", ...defaultTheme.fontFamily.sans],
        cabinet: ["var(--font-cabinet-grotesk)", ...defaultTheme.fontFamily.sans],
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
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
