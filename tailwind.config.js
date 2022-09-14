const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
        base: {
          dark: colors.gray[800],
          light: colors.gray[100],
        },
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
