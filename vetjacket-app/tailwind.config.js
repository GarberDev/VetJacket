/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          700: '#00008B', // Dark Blue
          500: '#0000FF', // Medium Blue
          200: '#9F9FFF', // Light Blue
        },
        secondary: {
          700: '#F3F4F6', // Light Gray replacing green
          500: '#E5E7EB', // Cooler Gray
        },
        tertiary: '#FFFFFF', // Pure White for contrast
        fontColor: '#1E293B', // Dark Blue-Gray, good for modern typography
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  mode: 'jit',
  plugins: [require('@tailwindcss/forms')],
};