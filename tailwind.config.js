/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode : 'class', 
  content: [
    './app/**/*.{js,jsx,tsx}',
    './node_modules/@tremor/**/*.{js,jsx,tsx}',
    './src/**/*.{js,jsx,tsx}',
  ],
  theme : {
    colors: {
      ...colors,
      dockeradmin: {
        darkgrey : '#121212',
        darkgrey_secondary : '#1e1e1e',
        darkgrey_tertiary : '#363636',
        lightgrey : '#f3f3f3',
        lightgrey_secondary : "#ececec"
      },
    },

  },
  
  plugins: [],
};
