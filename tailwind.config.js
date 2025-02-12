/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // blue-500 for the active nav
        secondary: '#40c4aa', // custom green for the search button
      }
    },
  },
  plugins: [],
} 