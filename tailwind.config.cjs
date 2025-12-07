/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4ECDC4",
        secondary: "#FF6B6B",
        accent: "#A8DADC",
        neutral: "#F1F3F5",
        success: "#51CF66",
        warning: "#FFD93D",
      }
    },
  },
  plugins: [],
}
