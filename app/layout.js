import './globals.css';

export const metadata = {
  title: 'NutriGuide AI Lite — рацион под вашу цель',
  description:
    'Быстрый расчёт калорийности и БЖУ + меню на день и список покупок на неделю под вашу цель и бюджет.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
