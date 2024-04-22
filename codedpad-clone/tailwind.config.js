/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg': "url('/src/assets/bg.jpg')", // Background image URL
      },
      opacity: {
        '25': '0.25',
        '50': '0.5',
        '75': '0.75',
        '100': '1',
      },
      backgroundSize: {
        'cover': 'cover', // Adjust background size to cover
        'contain': 'contain', // Adjust background size to contain
      },
      fontFamily:{
        'font1' : ['Jersey 10',  'sans-serif'],
        'font2':['Play', 'sans-serif']

      }
    },
  },
  plugins: [],
}
