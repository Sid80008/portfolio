import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#131318",
        "surface-bright": "#39383e",
        "inverse-primary": "#4f44e2",
        "outline": "#918fa1",
        "surface-variant": "#35343a",
        "on-primary-fixed-variant": "#3622ca",
        "on-surface": "#e4e1e9",
        "surface-container-highest": "#35343a",
        "surface-container-high": "#2a292f",
        "on-tertiary-fixed": "#301400",
        "surface-container-lowest": "#0e0e13",
        "on-tertiary": "#502500",
        "on-primary-fixed": "#100069",
        "secondary": "#cebdff",
        "on-surface-variant": "#c7c4d8",
        "inverse-surface": "#e4e1e9",
        "secondary-fixed-dim": "#cebdff",
        "primary": "#c4c0ff",
        "surface": "#131318",
        "on-background": "#e4e1e9",
        "on-error": "#690005",
        "on-primary-container": "#1b0091",
        "on-tertiary-fixed-variant": "#713700",
        "tertiary": "#ffb785",
        "surface-dim": "#131318",
        "primary-container": "#8781ff",
        "secondary-container": "#4f319c",
        "tertiary-fixed": "#ffdcc6",
        "error-container": "#93000a",
        "primary-fixed-dim": "#c4c0ff",
        "error": "#ffb4ab",
        "inverse-on-surface": "#303036",
        "on-error-container": "#ffdad6",
        "tertiary-fixed-dim": "#ffb785",
        "secondary-fixed": "#e8ddff",
        "on-secondary-fixed": "#21005e",
        "tertiary-container": "#db761f",
        "on-secondary": "#381385",
        "outline-variant": "#464555",
        "primary-fixed": "#e3dfff",
        "surface-tint": "#c4c0ff",
        "on-secondary-container": "#bea8ff",
        "on-secondary-fixed-variant": "#4f319c",
        "on-primary": "#2000a4",
        "surface-container": "#1f1f25",
        "surface-container-low": "#1b1b20",
        "on-tertiary-container": "#461f00",
        "accent": {
          DEFAULT: "#c4c0ff"
        }
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["var(--font-space-grotesk)", "sans-serif"],
        "body": ["var(--font-inter)", "sans-serif"],
        "label": ["var(--font-inter)", "sans-serif"],
        "mono": ["var(--font-jetbrains-mono)", "monospace"],
        "display": ["var(--font-space-grotesk)", "sans-serif"]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries")
  ],
};

export default config;
