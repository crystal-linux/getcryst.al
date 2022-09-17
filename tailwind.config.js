const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", ".ctp-mocha"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "90rem",
      },
      animation: {
        blink: "blink 1.5s steps(2) infinite;",
      },
      keyframes: {
        blink: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
      },
      fontFamily: {
        "fira-code": ["Fira Code", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@catppuccin/tailwindcss")({
      prefix: "ctp",
      defaultFlavour: "",
    }),
  ],
};
