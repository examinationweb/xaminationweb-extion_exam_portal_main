/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          400: '#f17df8',
          500: '#e85ef3',
          600: '#d43fef',
        },
        blue: {
          400: '#f17df8',
          600: '#f17df8',
        },
      },
    },
  },
  plugins: [],
};