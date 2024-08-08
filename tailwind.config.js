/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './node_modules/flowbite/**/*.js'],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin'), require('flowbite-typography')],
};
