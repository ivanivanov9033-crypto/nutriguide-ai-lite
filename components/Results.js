'use client';

import { useState } from 'react';

export default function Results({ data, mode, onReset, onGoHome }) {
  const [copied, setCopied] = useState(false);
  const { data: input, nutrition, budget } = data;

  // Единственный источник истины — props.mode.
  const isWeekly = mode === 'weekly';

  const handleCopy = async () => {
    const text = formatResultsAsText(data, mode);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      window.prompt('Скопируйте текст:', text);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Шапка — кнопка «На главную». На печати скрывается. */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10 print:hidden">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <button
            onClick={onGoHome}
            className="flex items-center gap-2 text-gray-700 hover:text-sage-700 transition"
          >
            <span className="text-lg leading-none">←</span>
            <div className="w-8 h-8 bg-sage-500 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-semibold text-sm">N</span>
            </div>
            <span className="font-semibold text-gray-900 hidden sm:inline">
              На главную
            </span>
          </button>
          <span className="text-xs text-sage-700 bg-sage-50 px-2.5 py-1 rounded-full font-medium">
            {isWeekly ? 'План на 7 дней' : 'Быстрый расчёт'}
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-5 pb-32 print:pb-4 print:py-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            {isWeekly ? 'Ваш план на неделю' : 'Ваш рацион'}
          </h1>
          <p className="text-gray-500 mt-2">
            Персональный расчёт под вашу цель и бюджет
          </p>
        </div>

        {/* Профиль */}
        <Card>
          <CardTitle>Ваши данные</CardTitle>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            <Stat label="Пол" value={input.gender === 'male' ? 'мужской' : 'женский'} />
            <Stat label="Возраст" value={`${input.age} лет`} />
            <Stat label="Рост" value={`${input.height} см`} />
            <Stat label="Вес" value={`${input.weight} кг`} />
            <Stat label="Цель" value={goalLabel(input.goal)} />
            <Stat label="Активность" value={activityLabel(input.activity)} />
          </dl>
        </Card>

        {/* Расчёты */}
        <Card>
          <CardTitle>Расчёты</CardTitle>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <BigStat label="BMR" value={nutrition.bmr} unit="ккал" />
            <BigStat label="TDEE" value={nutrition.tdee} unit="ккал" />
            <BigStat label="Цель" value={nutrition.target} unit="ккал/день" highlight />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-3">
            <Macro label="Белки" value={`${nutrition.protein} г`} />
            <Macro label="Жиры" value={`${nutrition.fat} г`} />
            <Macro label="Углеводы" value={`${nutrition.carbs} г`} />
          </div>

          <p className="text-sm text-gray-600 mt-5 leading-relaxed">
            <strong className="text-gray-900">BMR</strong> — энергия в покое.{' '}
            <strong className="text-gray-900">TDEE</strong> — суточный расход с учётом активности.{' '}
            Целевая калорийность учитывает вашу цель:{' '}
            <strong className="text-gray-900">{goalDescription(input.goal)}</strong>.
          </p>
        </Card>

        {/* Меню — разное для quick и weekly. Решение строго по props.mode. */}
        {isWeekly ? (
          <WeeklyMenuSection data={data} />
        ) : (
          <DailyMenuSection data={data} />
        )}

        {/* Список покупок */}
        <Card>
          <CardTitle>Список покупок на неделю</CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            С учётом ротации блюд по дням недели.
          </p>
          <div className="space-y-5 mt-5">
            {Object.entries(data.shoppingList || {}).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-xs font-semibold text-sage-700 uppercase tracking-wider mb-2">
                  {category}
                </h3>
                <ul className="space-y-1.5">
                  {items.map((item, i) => (
                    <li
                      key={i}
                      className="flex justify-between text-gray-700 text-sm py-1 border-b border-gray-50 last:border-0"
                    >
                      <span>{item.name}</span>
                      <span className="text-gray-500 font-medium">{item.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        {/* Стоимость */}
        <Card>
          <CardTitle>Примерная стоимость</CardTitle>
          {budget && budget.hasEstimate ? (
            <>
              <div className="text-3xl font-semibold text-sage-700 mt-4">
                {budget.formatted}
              </div>
              <p className="text-sm text-gray-500 mt-1">в неделю</p>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                Это оценочная стоимость для супермаркетов. На рынке или при покупке по акциям может быть дешевле, в премиум-магазинах — дороже. Цены зависят от региона и сезона.
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Для выбранной страны автоматическая оценка стоимости недоступна. Сориентируйтесь по местным ценам на продукты из списка покупок.
            </p>
          )}
        </Card>

        {/* Прогноз */}
        <Card>
          <CardTitle>Прогноз на месяц</CardTitle>
          <p className="text-gray-700 mt-3 leading-relaxed">{monthForecast(input.goal)}</p>
        </Card>

        {/* Ограничения */}
        {input.restrictions && input.restrictions.trim() && (
          <Card>
            <CardTitle>Ваши ограничения</CardTitle>
            <p className="text-gray-700 mt-3 leading-relaxed">{input.restrictions}</p>
            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
              В этой версии приложения ограничения сохраняются для вашего удобства, но автоматическая замена продуктов пока не реализована. При необходимости заменяйте блюда вручную.
            </p>
          </Card>
        )}

        {/* Дисклеймер */}
        <div className="bg-sage-50 border border-sage-100 rounded-2xl p-5 text-sm text-gray-700 leading-relaxed">
          <strong className="text-sage-700">Важно.</strong>{' '}
          NutriGuide AI не является врачом и не заменяет консультацию специалиста.
          Рекомендации носят информационный характер. При наличии заболеваний согласуйте изменения питания со специалистом.
        </div>
      </main>

      {/* Sticky кнопки внизу. На печати скрываются. */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg print:hidden">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-sage-500 text-sage-700 font-medium hover:bg-sage-50 transition text-sm sm:text-base"
          >
            {copied ? 'Скопировано' : 'Скопировать'}
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-sage-500 text-sage-700 font-medium hover:bg-sage-50 transition text-sm sm:text-base"
          >
            Скачать PDF
          </button>
          <button
            onClick={onReset}
            className="flex-1 px-4 py-3 rounded-xl bg-sage-500 hover:bg-sage-600 text-white font-medium transition shadow-sm text-sm sm:text-base"
          >
            Сменить рацион
          </button>
        </div>
      </div>
    </div>
  );
}

// — — — — — Quick mode: меню на один день — — — — —

function DailyMenuSection({ data }) {
  const dailyMenu = data.dailyMenu || [];
  const dailyTotals = data.dailyTotals || { kcal: 0, p: 0, f: 0, c: 0 };

  return (
    <Card>
      <CardTitle>Меню на день</CardTitle>
      <p className="text-sm text-gray-500 mt-1">
        Пример сбалансированного дня. В течение недели блюда чередуются.
      </p>
      <div className="space-y-3 mt-5">
        {dailyMenu.map((meal, i) => (
          <MealCard key={i} meal={meal} />
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-4 gap-2 text-center">
        <TotalCell label="Калории" value={`${dailyTotals.kcal}`} />
        <TotalCell label="Белки" value={`${dailyTotals.p} г`} />
        <TotalCell label="Жиры" value={`${dailyTotals.f} г`} />
        <TotalCell label="Углеводы" value={`${dailyTotals.c} г`} />
      </div>
    </Card>
  );
}

// — — — — — Weekly mode: 7 дней с раскрытием — — — — —

function WeeklyMenuSection({ data }) {
  const [openDay, setOpenDay] = useState(0);
  const weekDays = data.weekDays || [];
  const avgTotals = data.avgTotals || { kcal: 0, p: 0, f: 0, c: 0 };

  return (
    <>
      <Card>
        <CardTitle>Среднее по неделе</CardTitle>
        <div className="grid grid-cols-4 gap-2 mt-4 text-center">
          <TotalCell label="Калории" value={`${avgTotals.kcal}`} />
          <TotalCell label="Белки" value={`${avgTotals.p} г`} />
          <TotalCell label="Жиры" value={`${avgTotals.f} г`} />
          <TotalCell label="Углеводы" value={`${avgTotals.c} г`} />
        </div>
      </Card>

      <Card>
        <CardTitle>Меню на 7 дней</CardTitle>
        <p className="text-sm text-gray-500 mt-1 print:hidden">
          Нажмите на день, чтобы раскрыть его меню.
        </p>
        <div className="space-y-2 mt-5">
          {weekDays.length === 0 && (
            <p className="text-sm text-gray-500 py-4">Дни не сгенерированы.</p>
          )}
          {weekDays.map((day, idx) => (
            <DayAccordion
              key={day.dayNumber || idx}
              day={day}
              isOpen={openDay === idx}
              onToggle={() => setOpenDay(openDay === idx ? -1 : idx)}
            />
          ))}
        </div>
      </Card>
    </>
  );
}

function DayAccordion({ day, isOpen, onToggle }) {
  const totals = day.totals || { kcal: 0, p: 0, f: 0, c: 0 };
  const meals = day.meals || [];

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden print:break-inside-avoid">
      <button
        onClick={onToggle}
        className={`w-full text-left px-4 py-3 flex items-center justify-between gap-3 transition ${
          isOpen ? 'bg-sage-50' : 'bg-white hover:bg-gray-50'
        } print:bg-white`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-sage-500 text-white font-semibold text-sm flex items-center justify-center shrink-0">
            {day.dayName}
          </div>
          <div className="min-w-0">
            <div className="font-medium text-gray-900">День {day.dayNumber}</div>
            <div className="text-xs text-gray-500 truncate">
              {totals.kcal} ккал · Б {totals.p} / Ж {totals.f} / У {totals.c}
            </div>
          </div>
        </div>
        <span
          className={`text-gray-400 transition-transform shrink-0 print:hidden ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ▾
        </span>
      </button>
      {/* На экране — показываем только когда раскрыто. На печати — всегда. */}
      <div
        className={`p-4 space-y-3 bg-white border-t border-gray-100 ${
          isOpen ? '' : 'hidden'
        } print:block`}
      >
        {meals.map((meal, i) => (
          <MealCard key={i} meal={meal} />
        ))}
      </div>
    </div>
  );
}

// — — — — — Общие компоненты — — — — —

function Card({ children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm print:break-inside-avoid print:shadow-none print:border-gray-300">
      {children}
    </div>
  );
}

function CardTitle({ children }) {
  return <h2 className="text-xl font-semibold text-gray-900">{children}</h2>;
}

function Stat({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-gray-500 uppercase tracking-wider">{label}</dt>
      <dd className="text-base text-gray-900 mt-1">{value}</dd>
    </div>
  );
}

function BigStat({ label, value, unit, highlight }) {
  return (
    <div
      className={`rounded-xl p-3 sm:p-4 ${
        highlight ? 'bg-sage-50 border border-sage-200' : 'bg-gray-50'
      }`}
    >
      <div className="text-xs uppercase tracking-wider text-gray-500">{label}</div>
      <div
        className={`text-xl sm:text-2xl font-semibold mt-1 ${
          highlight ? 'text-sage-700' : 'text-gray-900'
        }`}
      >
        {value}
      </div>
      {unit && <div className="text-xs text-gray-500 mt-0.5">{unit}</div>}
    </div>
  );
}

function Macro({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center">
      <div className="text-xs uppercase tracking-wider text-gray-500">{label}</div>
      <div className="text-lg font-semibold text-gray-900 mt-1">{value}</div>
    </div>
  );
}

function MealCard({ meal }) {
  const ingredients = meal.ingredients || [];
  return (
    <div className="border border-gray-100 rounded-xl p-4 print:break-inside-avoid">
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <div className="text-xs text-sage-700 font-semibold uppercase tracking-wider">
          {meal.slot}
        </div>
        <span className="text-sm text-gray-700 font-medium">{meal.kcal} ккал</span>
      </div>
      <h3 className="font-medium text-gray-900 mb-3">{meal.name}</h3>
      <ul className="text-sm text-gray-700 space-y-1">
        {ingredients.map((ing, i) => (
          <li key={i}>— {ing}</li>
        ))}
      </ul>
      <div className="text-xs text-gray-500 mt-3 flex gap-3">
        <span>Б: {meal.p} г</span>
        <span>Ж: {meal.f} г</span>
        <span>У: {meal.c} г</span>
      </div>
    </div>
  );
}

function TotalCell({ label, value }) {
  return (
    <div>
      <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
      <div className="text-base font-semibold text-gray-900 mt-1">{value}</div>
    </div>
  );
}

// — — — — — Хелперы — — — — —

function goalLabel(goal) {
  return goal === 'lose' ? 'похудение' : goal === 'gain' ? 'набор массы' : 'удержание веса';
}

function activityLabel(act) {
  return (
    {
      sedentary: 'сидячая',
      light: 'лёгкая',
      moderate: 'умеренная',
      high: 'высокая',
    }[act] || act
  );
}

function goalDescription(goal) {
  if (goal === 'lose') return 'дефицит 18% для устойчивого снижения веса';
  if (goal === 'gain') return 'профицит 12% для набора мышц без лишнего жира';
  return 'поддерживающая калорийность для удержания веса';
}

function monthForecast(goal) {
  if (goal === 'lose') {
    return 'При соблюдении плана ожидаемое снижение веса — 1,5–2 кг за месяц (около 0,4 кг в неделю). В первую неделю может быть больше за счёт выхода лишней воды — это нормально. Это устойчивый и безопасный темп.';
  }
  if (goal === 'gain') {
    return 'При соблюдении плана и регулярных силовых тренировках ожидаемый прирост — 0,8–1,2 кг за месяц. Большая часть прибавки должна приходиться на мышечную массу, минимум — на жировую.';
  }
  return 'Вес должен стабилизироваться на текущем уровне. Возможны естественные колебания ±0,5 кг за счёт воды, состояния ЖКТ и циклов организма — это нормально.';
}

function formatResultsAsText(data, mode) {
  const { data: input, nutrition, budget } = data;
  const isWeekly = mode === 'weekly';

  let text = `NutriGuide AI Lite — ${isWeekly ? 'план на 7 дней' : 'ваш рацион'}\n\n`;
  text += `Пол: ${input.gender === 'male' ? 'мужской' : 'женский'}\n`;
  text += `Возраст: ${input.age} лет\n`;
  text += `Рост: ${input.height} см\n`;
  text += `Вес: ${input.weight} кг\n`;
  text += `Цель: ${goalLabel(input.goal)}\n`;
  text += `Активность: ${activityLabel(input.activity)}\n\n`;

  text += `Расчёты:\n`;
  text += `BMR: ${nutrition.bmr} ккал\n`;
  text += `TDEE: ${nutrition.tdee} ккал\n`;
  text += `Целевая калорийность: ${nutrition.target} ккал/день\n`;
  text += `Белки: ${nutrition.protein} г\n`;
  text += `Жиры: ${nutrition.fat} г\n`;
  text += `Углеводы: ${nutrition.carbs} г\n\n`;

  if (isWeekly && data.weekDays) {
    text += `Меню на 7 дней:\n`;
    data.weekDays.forEach((day) => {
      text += `\n— День ${day.dayNumber} (${day.dayName}) — ${day.totals.kcal} ккал —\n`;
      day.meals.forEach((m) => {
        text += `\n${m.slot}: ${m.name} (${m.kcal} ккал)\n`;
        m.ingredients.forEach((ing) => (text += `  — ${ing}\n`));
      });
    });
    if (data.avgTotals) {
      text += `\nСреднее за день: ${data.avgTotals.kcal} ккал | Б:${data.avgTotals.p}/Ж:${data.avgTotals.f}/У:${data.avgTotals.c}\n\n`;
    }
  } else if (data.dailyMenu) {
    text += `Меню на день:\n`;
    data.dailyMenu.forEach((m) => {
      text += `\n${m.slot} — ${m.name} (${m.kcal} ккал | Б:${m.p}/Ж:${m.f}/У:${m.c})\n`;
      m.ingredients.forEach((ing) => (text += `  — ${ing}\n`));
    });
    if (data.dailyTotals) {
      text += `\nИтог за день: ${data.dailyTotals.kcal} ккал | Б:${data.dailyTotals.p}/Ж:${data.dailyTotals.f}/У:${data.dailyTotals.c}\n\n`;
    }
  }

  if (data.shoppingList) {
    text += `Список покупок на неделю:\n`;
    Object.entries(data.shoppingList).forEach(([cat, items]) => {
      text += `\n${cat}:\n`;
      items.forEach((i) => (text += `  — ${i.name}: ${i.amount}\n`));
    });
  }

  if (budget && budget.hasEstimate) {
    text += `\nПримерная стоимость: ${budget.formatted} в неделю\n`;
  }
  text += `\nПрогноз на месяц: ${monthForecast(input.goal)}\n`;
  text += `\n— — —\nNutriGuide AI не является врачом и не заменяет консультацию специалиста.`;

  return text;
}
