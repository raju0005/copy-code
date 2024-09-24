/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      opacity: {
        '25': '0.25',
        '50': '0.5',
        '75': '0.75',
        '100': '1',
      },
      
      fontFamily:{
        'font1' : ['Jersey 10',  'sans-serif'],
        'font2':['Play', 'sans-serif']

      }
    },
  },
  plugins: [],
}
