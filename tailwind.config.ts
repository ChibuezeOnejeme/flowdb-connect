import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
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
        node: {
          database: "hsl(var(--node-database))",
          "database-glow": "hsl(var(--node-database-glow))",
          app: "hsl(var(--node-app))",
          "app-glow": "hsl(var(--node-app-glow))",
          api: "hsl(var(--node-api))",
          "api-glow": "hsl(var(--node-api-glow))",
          storage: "hsl(var(--node-storage))",
          "storage-glow": "hsl(var(--node-storage-glow))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "pulse-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(var(--primary) / 0.3), inset 0 0 20px hsl(var(--primary) / 0.1)" 
          },
          "50%": { 
            boxShadow: "0 0 40px hsl(var(--primary) / 0.5), inset 0 0 30px hsl(var(--primary) / 0.2)" 
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
      },
      boxShadow: {
        "glow-primary": "0 0 30px hsl(var(--primary) / 0.4)",
        "glow-secondary": "0 0 30px hsl(var(--secondary) / 0.4)",
        "glow-accent": "0 0 30px hsl(var(--accent) / 0.4)",
        "glow-database": "0 0 30px hsl(var(--node-database) / 0.4)",
        "glow-app": "0 0 30px hsl(var(--node-app) / 0.4)",
        "glow-api": "0 0 30px hsl(var(--node-api) / 0.4)",
        "glow-storage": "0 0 30px hsl(var(--node-storage) / 0.4)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
