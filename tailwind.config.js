/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          red: "rgb(255,96,54)",
          purple: "rgb(144,123,228)",
        },
        secondary: "#ff5e37",
      },
    },
  },
  plugins: [],
};
