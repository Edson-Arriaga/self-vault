/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}" 
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        'primary-regular': 'edu-auvicwant-hand-regular',
        'primary-medium': 'edu-auvicwant-hand-medium',
        'primary-semibold': 'edu-auvicwant-hand-semibold',
        'primary-bold': 'edu-auvicwant-hand-bold'
      },
      colors: {
        'lightCream': '#FFFEF5',
        'cream': '#FEFAE0',
        'coral': '#FEA29D',
        'pink': '#FE90AB',
        'aqua': '#8CAFB1',
        'yellow': '#FFEA91',
        'gray': '#363636',
        'red': '#FF4C4C'
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')]
}