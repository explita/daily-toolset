/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--explita-background))",
        foreground: "hsl(var(--explita-foreground))",
        card: {
          DEFAULT: "hsl(var(--explita-card))",
          foreground: "hsl(var(--explita-card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--explita-popover))",
          foreground: "hsl(var(--explita-popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--explita-primary))",
          foreground: "hsl(var(--explita-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--explita-secondary))",
          foreground: "hsl(var(--explita-secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--explita-muted))",
          foreground: "hsl(var(--explita-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--explita-accent))",
          foreground: "hsl(var(--explita-accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--explita-destructive))",
          foreground: "hsl(var(--explita-destructive-foreground))",
        },
        border: "hsl(var(--explita-border))",
        input: "hsl(var(--explita-input))",
        ring: "hsl(var(--explita-ring))",
        chart: {
          1: "hsl(var(--explita-chart-1))",
          2: "hsl(var(--explita-chart-2))",
          3: "hsl(var(--explita-chart-3))",
          4: "hsl(var(--explita-chart-4))",
          5: "hsl(var(--explita-chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--explita-radius)",
        md: "calc(var(--explita-radius) - 2px)",
        sm: "calc(var(--explita-radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--explita-radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--explita-radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
