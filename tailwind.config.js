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
      typography: {
        DEFAULT: {
          css: {
            // I HATE THIS
            // I have to pass these manualyl because tailwind was not
            // working with theme() & `ctp`
            "--tw-prose-body": "#4c4f69",
            "--tw-prose-headings": "#4c4f69",
            // "--tw-prose-lead": "",
            "--tw-prose-links": "#4c4f69",
            // "--tw-prose-bold": "",
            "--tw-prose-counters": "#7c7f93",
            "--tw-prose-bullets": "#7c7f93",
            "--tw-prose-hr": "#4c4f69",
            "--tw-prose-quotes": "#4c4f69",
            "--tw-prose-quote-borders": "#9ca0b0",
            // "--tw-prose-captions": "",
            "--tw-prose-code": "#4c4f69",
            // "--tw-prose-pre-code": "",
            // "--tw-prose-pre-bg": "",
            "--tw-prose-th-borders": "#9ca0b0",
            "--tw-prose-td-borders": "#9ca0b0",

            '--tw-prose-invert-body': "#cdd6f4",
            '--tw-prose-invert-headings': "#cdd6f4",
            // '--tw-prose-invert-lead': "",
            '--tw-prose-invert-links': "#cdd6f4",
            // '--tw-prose-invert-bold': "",
            '--tw-prose-invert-counters': "#7c7f93",
            '--tw-prose-invert-bullets': "#7c7f93",
            '--tw-prose-invert-hr': "#cdd6f4",
            '--tw-prose-invert-quotes': "#cdd6f4",
            '--tw-prose-invert-quote-borders': "#6c7086",
            // '--tw-prose-invert-captions': "",
            '--tw-prose-invert-code': "#cdd6f4",
            // '--tw-prose-invert-pre-code': "",
            // '--tw-prose-invert-pre-bg': "",
            '--tw-prose-invert-th-borders': "#6c7086",
            '--tw-prose-invert-td-borders': "#6c7086",
          },
        },
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
