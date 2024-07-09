// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"], // Adjust the paths as necessary
  theme: {
    extend: {
      colors: {
        header: "rgb(45, 194, 117)",
        btnHover: "rgb(35, 168, 100)",
      },
    },
  },
  plugins: [],
};
