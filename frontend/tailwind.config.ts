import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        successBg: "#4caf50",
        errorBg: "#f44336",
        warningBg: "#ff9800",
        infoBg: "#2196f3",
      },
    },
  },
  plugins: [],
};
export default config;
