/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './app/**/*.{js,jsx,tsx}',
    './node_modules/@tremor/**/*.{js,jsx,tsx}',
    './src/**/*.{js,jsx,tsx}',
  ],
  theme : {
    colors: {
      ...colors,
      da: {grey : '#121212'},
    },
    
  },
  plugins: [],
};
