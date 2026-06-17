/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F4F8F4',
          100: '#E8F0E9',
          200: '#C9DCCB',
          300: '#9DBFA1',
          400: '#6F9B75',
          500: '#4A7C59',
          600: '#3A6447',
          700: '#2F5037',
          800: '#243D29',
          900: '#1B2D1F',
        },
        cream: '#FAFBF9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
