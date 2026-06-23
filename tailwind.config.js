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
        // Имя токена осталось 'sage' для совместимости с существующим кодом.
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
        // Бледно-серый фон в духе apple.com.
        cream: '#F5F5F7',
      },
      fontFamily: {
        // На Mac/iOS подхватится SF Pro. На Windows/Android — Inter и системные.
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
      // Кастомные «эппловские» тени — прозрачность 3–4% вместо стандартных 10%.
      // Имена классов те же (shadow-sm, shadow-md, shadow-lg), чтобы код не править.
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        md: '0 2px 4px -1px rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        lg: '0 4px 8px -2px rgba(0, 0, 0, 0.04), 0 2px 4px -2px rgba(0, 0, 0, 0.02)',
        xl: '0 8px 16px -4px rgba(0, 0, 0, 0.05), 0 4px 8px -4px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
};
