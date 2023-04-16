/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  dark : "class", 
  content: [
    './app/**/*.{js,jsx,tsx}',
    './node_modules/@tremor/**/*.{js,jsx,tsx}',
    './src/**/*.{js,jsx,tsx}',
  ],
  theme : {
    colors: {
      ...colors,
      dockeradmin: {grey : '#121212'},
    },
    
  },
  plugins: [],
};
