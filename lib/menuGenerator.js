// menuGenerator.js v1.1
// Две функции:
//   generateMenu(userData, nutrition)        — день + недельная корзина (быстрый расчёт)
//   generateWeeklyMenu(userData, nutrition)  — 7 дней + недельная корзина (план на 7 дней)

import { meals, BASE_TARGET, getMealsForBudget } from './menuData';

// — — — Категории для группировки списка покупок — — —
const categoryMap = {
  // Белковые продукты
  'Куриная грудка': 'Белковые продукты',
  'Куриные бёдра': 'Белковые продукты',
  'Куриный фарш': 'Белковые продукты',
  'Филе индейки': 'Белковые продукты',
  'Говядина (вырезка)': 'Белковые продукты',
  Минтай: 'Белковые продукты',
  Треска: 'Белковые продукты',
  Лосось: 'Белковые продукты',
  'Лосось слабосолёный': 'Белковые продукты',
  Форель: 'Белковые продукты',
  Креветки: 'Белковые продукты',
  Яйца: 'Белковые продукты',

  // Молочные продукты
  'Творог 5%': 'Молочные продукты',
  'Творог 9%': 'Молочные продукты',
  'Кефир 1%': 'Молочные продукты',
  'Молоко 2,5%': 'Молочные продукты',
  'Йогурт натуральный 2%': 'Молочные продукты',
  'Греческий йогурт': 'Молочные продукты',
  'Сыр твёрдый': 'Молочные продукты',

  // Крупы и гарниры
  'Овсяные хлопья': 'Крупы и гарниры',
  Гречка: 'Крупы и гарниры',
  Рис: 'Крупы и гарниры',
  'Рис басмати': 'Крупы и гарниры',
  'Рис дикий': 'Крупы и гарниры',
  Киноа: 'Крупы и гарниры',
  Булгур: 'Крупы и гарниры',
  'Манная крупа': 'Крупы и гарниры',
  Лапша: 'Крупы и гарниры',
  Горох: 'Крупы и гарниры',
  'Фасоль красная': 'Крупы и гарниры',
  Гранола: 'Крупы и гарниры',
  'Семена чиа': 'Крупы и гарниры',
  'Хлеб ржаной': 'Крупы и гарниры',
  'Хлеб цельнозерновой': 'Крупы и гарниры',
  'Хлебцы ржаные': 'Крупы и гарниры',
  'Мука цельнозерновая': 'Крупы и гарниры',
  Картофель: 'Крупы и гарниры',
  'Сладкий картофель': 'Крупы и гарниры',

  // Овощи
  Огурцы: 'Овощи',
  Помидоры: 'Овощи',
  'Капуста белокочанная': 'Овощи',
  Морковь: 'Овощи',
  'Лук репчатый': 'Овощи',
  Чеснок: 'Овощи',
  Брокколи: 'Овощи',
  Кабачки: 'Овощи',
  Спаржа: 'Овощи',
  'Болгарский перец': 'Овощи',
  Шпинат: 'Овощи',
  Зелень: 'Овощи',
  Тыква: 'Овощи',

  // Фрукты и ягоды
  Яблоки: 'Фрукты и ягоды',
  Банан: 'Фрукты и ягоды',
  'Замороженные ягоды': 'Фрукты и ягоды',
  'Свежие ягоды': 'Фрукты и ягоды',
  Авокадо: 'Фрукты и ягоды',
  Сухофрукты: 'Фрукты и ягоды',

  // Жиры и орехи
  'Масло подсолнечное': 'Жиры и орехи',
  'Масло оливковое': 'Жиры и орехи',
  'Грецкие орехи': 'Жиры и орехи',
  Миндаль: 'Жиры и орехи',

  // Прочее
  Мёд: 'Прочее',
  Хумус: 'Прочее',
};

function getCategory(name) {
  return categoryMap[name] || 'Прочее';
}

// Масштабирование значения с округлением по типу единиц
function scaleAmount(amount, unit, factor) {
  const scaled = amount * factor;
  if (unit === 'шт') return Math.max(1, Math.round(scaled));
  if (unit === 'г' || unit === 'мл') {
    if (scaled < 50) return Math.round(scaled / 5) * 5;
    return Math.round(scaled / 10) * 10;
  }
  return Math.round(scaled);
}

function formatIngredient(item, factor) {
  const amount = scaleAmount(item.amount, item.unit, factor);
  const context = item.context ? ` (${item.context})` : '';
  return `${item.name} — ${amount} ${item.unit}${context}`;
}

// Применить блюдо к дню (с масштабированием)
function buildMealForDay(meal, factor, slotLabel) {
  return {
    slot: slotLabel,
    name: meal.name,
    ingredients: meal.items.map((item) => formatIngredient(item, factor)),
    kcal: Math.round(meal.kcal * factor),
    p: Math.round(meal.p * factor),
    f: Math.round(meal.f * factor),
    c: Math.round(meal.c * factor),
  };
}

// Округлить итоговое количество к удобному виду
function formatShoppingAmount(amount, unit) {
  if (unit === 'г' || unit === 'мл') {
    if (amount >= 1000) {
      const inBig = amount / 1000;
      const rounded = Math.round(inBig * 10) / 10;
      return `${String(rounded).replace('.', ',')} ${unit === 'г' ? 'кг' : 'л'}`;
    }
    return `${Math.round(amount / 10) * 10} ${unit}`;
  }
  return `${amount} ${unit}`;
}

// Сборка списка покупок из массива дней
function aggregateShoppingList(days, factor) {
  const aggregated = new Map();

  for (const day of days) {
    for (const meal of day._rawMeals) {
      for (const item of meal.items) {
        const key = `${item.name}|${item.unit}`;
        const scaled = scaleAmount(item.amount, item.unit, factor);
        if (aggregated.has(key)) {
          aggregated.get(key).amount += scaled;
        } else {
          aggregated.set(key, { name: item.name, amount: scaled, unit: item.unit });
        }
      }
    }
  }

  // Группировка по категориям
  const shoppingList = {};
  for (const item of aggregated.values()) {
    const displayAmount = formatShoppingAmount(item.amount, item.unit);
    const category = getCategory(item.name);
    if (!shoppingList[category]) shoppingList[category] = [];
    shoppingList[category].push({ name: item.name, amount: displayAmount });
  }

  const orderedCategories = [
    'Белковые продукты',
    'Молочные продукты',
    'Крупы и гарниры',
    'Овощи',
    'Фрукты и ягоды',
    'Жиры и орехи',
    'Прочее',
  ];
  const ordered = {};
  for (const cat of orderedCategories) {
    if (shoppingList[cat]) {
      ordered[cat] = shoppingList[cat].sort((a, b) =>
        a.name.localeCompare(b.name, 'ru')
      );
    }
  }
  return ordered;
}

// Выбор блюда из списка с учётом дня (циклически)
function pickAt(list, index) {
  if (list.length === 0) return null;
  return list[index % list.length];
}

// Подсчёт итогов за день
function dayTotals(day) {
  return day.meals.reduce(
    (acc, m) => ({
      kcal: acc.kcal + m.kcal,
      p: acc.p + m.p,
      f: acc.f + m.f,
      c: acc.c + m.c,
    }),
    { kcal: 0, p: 0, f: 0, c: 0 }
  );
}

// Собрать структуру одного дня: 5 приёмов пищи
// Перекусы берутся два разных из общего списка
function buildDay(dayIndex, breakfasts, snacks, lunches, dinners, factor) {
  const br = pickAt(breakfasts, dayIndex);
  const ln = pickAt(lunches, dayIndex);
  const dn = pickAt(dinners, dayIndex);
  // Два перекуса — разные позиции в списке
  const sn1 = pickAt(snacks, dayIndex * 2);
  const sn2 = pickAt(snacks, dayIndex * 2 + 1);

  const rawMeals = [br, sn1, ln, sn2, dn].filter(Boolean);
  const labels = ['Завтрак', 'Перекус', 'Обед', 'Перекус', 'Ужин'];

  const dayMeals = [br, sn1, ln, sn2, dn]
    .map((meal, idx) => (meal ? buildMealForDay(meal, factor, labels[idx]) : null))
    .filter(Boolean);

  return {
    meals: dayMeals,
    _rawMeals: rawMeals, // нужно для агрегации списка покупок
  };
}

// — — — — — БЫСТРЫЙ РАСЧЁТ: один день + недельная корзина — — — — —
export function generateMenu(userData, nutrition) {
  const budget = userData.budget || 'econom';
  const factor = nutrition.target / BASE_TARGET;

  const breakfasts = getMealsForBudget('breakfasts', budget);
  const snacks = getMealsForBudget('snacks', budget);
  const lunches = getMealsForBudget('lunches', budget);
  const dinners = getMealsForBudget('dinners', budget);

  // День 1 для отображения
  const sampleDay = buildDay(0, breakfasts, snacks, lunches, dinners, factor);
  const dailyMenu = sampleDay.meals;
  const dailyTotals = dayTotals(sampleDay);

  // Для недельной корзины — собираем 7 дней с ротацией
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(buildDay(i, breakfasts, snacks, lunches, dinners, factor));
  }

  const shoppingList = aggregateShoppingList(weekDays, factor);

  return {
    dailyMenu,
    dailyTotals,
    shoppingList,
  };
}

// — — — — — ПЛАН НА 7 ДНЕЙ: 7 дней + недельная корзина — — — — —
export function generateWeeklyMenu(userData, nutrition) {
  const budget = userData.budget || 'econom';
  const factor = nutrition.target / BASE_TARGET;

  const breakfasts = getMealsForBudget('breakfasts', budget);
  const snacks = getMealsForBudget('snacks', budget);
  const lunches = getMealsForBudget('lunches', budget);
  const dinners = getMealsForBudget('dinners', budget);

  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const day = buildDay(i, breakfasts, snacks, lunches, dinners, factor);
    weekDays.push({
      dayNumber: i + 1,
      dayName: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][i],
      meals: day.meals,
      totals: dayTotals(day),
      _rawMeals: day._rawMeals,
    });
  }

  const shoppingList = aggregateShoppingList(weekDays, factor);

  // Средние итоги по неделе
  const weeklyTotals = weekDays.reduce(
    (acc, d) => ({
      kcal: acc.kcal + d.totals.kcal,
      p: acc.p + d.totals.p,
      f: acc.f + d.totals.f,
      c: acc.c + d.totals.c,
    }),
    { kcal: 0, p: 0, f: 0, c: 0 }
  );
  const avgTotals = {
    kcal: Math.round(weeklyTotals.kcal / 7),
    p: Math.round(weeklyTotals.p / 7),
    f: Math.round(weeklyTotals.f / 7),
    c: Math.round(weeklyTotals.c / 7),
  };

  return {
    weekDays,
    avgTotals,
    shoppingList,
  };
}
