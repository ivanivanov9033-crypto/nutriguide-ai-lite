/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Палитра Mint — в духе Apple Health и iOS systemGreen.
        // Имя токена осталось 'sage' для совместимости с уже написанным кодом —
        // не нужно править каждый компонент, классы вроде bg-sage-500 автоматически
        // подхватят новые цвета.
        sage: {
          50:  '#ECFDF3',
          100: '#D1FADF',
          200: '#A6F4C5',
          300: '#6CE9A6',
          400: '#4ADE80',
          500: '#34C759', // iOS systemGreen — основной акцент
          600: '#16A34A', // hover для кнопок
          700: '#15803D', // тёмный текст и бейджи
          800: '#166534',
          900: '#14532D',
        },
        // Бледно-серый фон в духе apple.com — холоднее тёплого cream.
        cream: '#F5F5F7',
      },
      fontFamily: {
        // На Mac/iOS подхватится SF Pro (системный шрифт Apple).
        // На Windows/Android — Inter, потом system-ui.
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro Display"',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
