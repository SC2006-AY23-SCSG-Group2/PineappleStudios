import type {Config} from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");
// import {theme} from "tailwindcss/defaultTheme"

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "360px",
      ...defaultTheme.screens,
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
