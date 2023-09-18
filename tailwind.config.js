const plugin = require("tailwindcss/plugin");

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    ".backface-visible": {
      "backface-visibility": "visible",
    },
    ".backface-hidden": {
      "backface-visibility": "hidden",
    },
  });
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1abc9c",
        secondary: "#facf5a",
        background: "#F0EBE3",
        white: "#EEEEEE",
        text: "#2b2c34",
        surface: "#dce5d3",
      },
    },
  },
  plugins: [backfaceVisibility],
};
