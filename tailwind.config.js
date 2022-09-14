/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@catppuccin/tailwindcss")({
      prefix: "ctp",
    }),
  ],
};
