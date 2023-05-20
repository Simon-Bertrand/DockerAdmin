/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode : 'class', 
  content: [
    './app/**/*.{js,jsx,tsx,svg}',
    './node_modules/@tremor/**/*.{js,jsx,tsx}',
    './globals/**/*.{js,jsx,tsx,svg}',
    './components/**/*.{js,jsx,tsx,svg}',
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
