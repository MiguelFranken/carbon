const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        "spin-slow": "spin-reverse 2s linear infinite",
      },
      colors: {
        violet: {
          light: "#d639ed",
          DEFAULT: "#991dd7",
          dark: "#4f2270",
        },
        blueish: {
          light: "#b296cd",
          DEFAULT: "#701fe8",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
