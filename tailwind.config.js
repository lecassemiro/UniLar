/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#534AB7",
          dark: "#26215C",
          light: "#7B74D4",
        },
        accent: {
          DEFAULT: "#62acf1",
          light: "#60A5FA",
        },
        surface: "#F7F6FF",
      },
      fontFamily: {
        syne: ["'Syne'", "sans-serif"],
        dm: ["'DM Sans'", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        "card": "0 2px 12px rgba(83,74,183,0.08)",
        "card-hover": "0 12px 32px rgba(83,74,183,0.18)",
        "hero": "0 24px 64px rgba(38,33,92,0.35)",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(60px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "slide-up": "slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "fade-in": "fadeIn 0.3s ease both",
      },
    },
  },
  plugins: [],
}
