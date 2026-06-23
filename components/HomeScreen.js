'use client';

export default function HomeScreen({ onSelectMode }) {
  const modes = [
    {
      id: 'quick',
      title: 'Быстрый расчёт',
      desc: 'Калорийность, БЖУ и пример меню на день — за минуту.',
      time: '~1 мин',
      icon: '⚡',
      available: true,
    },
    {
      id: 'weekly',
      title: 'План на 7 дней',
      desc: 'Подробное меню на каждый день недели + список покупок.',
      time: '~2 мин',
      icon: '📅',
      available: true,
    },
    {
      id: 'ai',
      title: 'AI Нутрициолог',
      desc: 'Диалог с AI-консультантом для нестандартных запросов и индивидуальных корректировок.',
      time: 'Чат',
      icon: '💬',
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-2">
          <div className="w-8 h-8 bg-sage-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-sm">N</span>
          </div>
          <span className="font-semibold text-gray-900">NutriGuide AI Lite</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 sm:py-16">
        <div className="mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight">
            Персональный рацион
            <br />
            <span className="text-sage-600">под вашу цель</span>
          </h1>
          <p className="text-gray-600 mt-4 text-base sm:text-lg leading-relaxed max-w-xl">
            Выберите режим. Все расчёты происходят локально — ваши данные никуда не отправляются.
          </p>
        </div>

        <div className="space-y-3">
          {modes.map((m) => (
            <ModeCard
              key={m.id}
              mode={m}
              onClick={() => m.available && onSelectMode(m.id)}
            />
          ))}
        </div>

        <p className="text-xs text-gray-500 text-center mt-10 px-2 leading-relaxed">
          NutriGuide AI не является врачом и не заменяет консультацию специалиста.
          Рекомендации носят информационный характер.
        </p>
      </main>
    </div>
  );
}

function ModeCard({ mode, onClick }) {
  const { title, desc, time, icon, available } = mode;
  return (
    <button
      onClick={onClick}
      disabled={!available}
      className={`w-full text-left p-5 sm:p-6 rounded-2xl border-2 transition shadow-sm ${
        available
          ? 'bg-white border-gray-200 hover:border-sage-500 hover:shadow-md cursor-pointer'
          : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-70'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
            available ? 'bg-sage-50' : 'bg-gray-100'
          }`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <span
              className={`text-xs font-medium uppercase tracking-wider ${
                available ? 'text-sage-600' : 'text-gray-400'
              }`}
            >
              {time}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{desc}</p>
        </div>
      </div>
    </button>
  );
}
