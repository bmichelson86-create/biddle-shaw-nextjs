import type { Config } from "tailwindcss";

// Tailwind v4: design tokens are defined in app/globals.css via @theme.
// This file exists for tooling/IDE compatibility only.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
};

export default config;
