/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ], theme: {
    extend: {
      colors:{
        primary:"#871cf8",
        "backgraund-100":"#1A1A1A",
        "backgraund-200":"#292929",
        "backgraund-300":"#404040",
        "backgraund-400":"#5B5B5B",
      }
    },
  },
  plugins: [],
}

