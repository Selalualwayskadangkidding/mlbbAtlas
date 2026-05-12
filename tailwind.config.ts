import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        atlas: {
          background: "#05080f",
          surface: "#0b111c",
          muted: "#111827",
          border: "#1f2937",
          primary: "#f9fafb",
          secondary: "#9ca3af",
          accent: "#3b82f6",
          accentMuted: "#2563eb"
        }
      },
      boxShadow: {
        soft: "0 24px 80px rgba(0, 0, 0, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
