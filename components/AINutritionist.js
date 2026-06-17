'use client';

export default function AINutritionist({ onBack }) {
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
        <button
          onClick={onBack}
          className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-flex items-center gap-1"
        >
          ← На главную
        </button>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-sm">
          <div className="w-16 h-16 bg-sage-50 rounded-2xl flex items-center justify-center text-3xl mb-6">
            💬
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
            AI Нутрициолог
          </h1>
          <p className="text-gray-600 mt-3 text-base leading-relaxed">
            Скоро будет доступно
          </p>

          <div className="mt-8 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Этот режим позволит вести живой диалог с AI-консультантом и решать задачи, которые не покрывает быстрый расчёт:
            </p>

            <ul className="space-y-3 text-gray-700">
              <FeatureItem>
                Адаптация рациона под медицинские ограничения (гастрит, преддиабет, повышенное давление и т.&nbsp;п.).
              </FeatureItem>
              <FeatureItem>
                Замена конкретных блюд на альтернативы с учётом ваших предпочтений.
              </FeatureItem>
              <FeatureItem>
                Корректировка плана при изменении бюджета, активности или цели.
              </FeatureItem>
              <FeatureItem>
                Объяснение, почему именно такая калорийность и БЖУ выбраны для вас.
              </FeatureItem>
              <FeatureItem>
                Подсказки по приготовлению блюд и замены продуктов.
              </FeatureItem>
            </ul>
          </div>

          <div className="mt-8 bg-sage-50 border border-sage-100 rounded-xl p-5 text-sm text-gray-700 leading-relaxed">
            Пока режим в разработке — для индивидуальных консультаций используйте «Быстрый расчёт» или «План на 7 дней» и вносите изменения вручную.
          </div>

          <button
            onClick={onBack}
            className="w-full mt-8 px-6 py-3 rounded-xl bg-sage-500 hover:bg-sage-600 text-white font-medium transition shadow-sm"
          >
            Выбрать другой режим
          </button>
        </div>
      </main>
    </div>
  );
}

function FeatureItem({ children }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-sage-500 mt-1 shrink-0">•</span>
      <span>{children}</span>
    </li>
  );
}
