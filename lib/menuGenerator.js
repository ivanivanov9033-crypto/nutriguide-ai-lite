// menuGenerator.js v1.3
// Две функции:
//   generateMenu(userData, nutrition)        — день + недельная корзина (быстрый расчёт)
//   generateWeeklyMenu(userData, nutrition)  — 7 дней + недельная корзина (план на 7 дней)
// Каждый вызов даёт РАЗНЫЕ блюда за счёт случайного сдвига offset.
// v1.3: добавлен фильтр блюд по userData.restrictionFlags
//       (массив идентификаторов: 'no-fish', 'no-meat', 'no-nuts', 'no-dairy', 'no-eggs').

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

// — — — Ингредиенты, исключаемые при каждом ограничении — — —
// Имена должны точно совпадать с полем 'name' в items блюд из menuData.js.
const RESTRICTION_INGREDIENTS = {
  'no-fish': [
    'Минтай',
    'Треска',
    'Лосось',
    'Лосось слабосолёный',
    'Форель',
    'Креветки',
  ],
  'no-meat': [
    'Куриная грудка',
    'Куриные бёдра',
    'Куриный фарш',
    'Филе индейки',
    'Говядина (вырезка)',
  ],
  'no-nuts': ['Грецкие орехи', 'Миндаль'],
  'no-dairy': [
    'Творог 5%',
    'Творог 9%',
    'Кефир 1%',
    'Молоко 2,5%',
    'Йогурт натуральный 2%',
    'Греческий йогурт',
    'Сыр твёрдый',
  ],
  'no-eggs': ['Яйца'],
};

// Превращает массив флагов в Set имён ингредиентов, которые нужно исключить.
function getRestrictedIngredientSet(restrictionFlags) {
  const set = new Set();
  for (const flag of restrictionFlags || []) {
    const ingredients = RESTRICTION_INGREDIENTS[flag] || [];
    for (const ing of ingredients) {
      set.add(ing);
    }
  }
  return set;
}

// Фильтрует список блюд: убирает те, в которых есть запрещённые ингредиенты.
// Если фильтр оставил пустой список — возвращает исходный, чтобы анкета не сломалась.
function filterMealsByRestrictions(mealsList, restrictedSet) {
  if (restrictedSet.size === 0) return mealsList;
  const filtered = mealsList.filter((meal) => {
    for (const item of meal.items) {
      if (restrictedSet.has(item.name)) return false;
    }
    return true;
  });
  return filtered.length > 0 ? filtered : mealsList;
}

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

function pickAt(list, index) {
  if (list.length === 0) return null;
  return list[index % list.length];
}

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

function buildDay(pickIndex, breakfasts, snacks, lunches, dinners, factor) {
  const br = pickAt(breakfasts, pickIndex);
  const ln = pickAt(lunches, pickIndex);
  const dn = pickAt(dinners, pickIndex);
  const sn1 = pickAt(snacks, pickIndex * 2);
  const sn2 = pickAt(snacks, pickIndex * 2 + 1);

  const rawMeals = [br, sn1, ln, sn2, dn].filter(Boolean);
  const labels = ['Завтрак', 'Перекус', 'Обед', 'Перекус', 'Ужин'];

  const dayMeals = [br, sn1, ln, sn2, dn]
    .map((meal, idx) => (meal ? buildMealForDay(meal, factor, labels[idx]) : null))
    .filter(Boolean);

  return {
    meals: dayMeals,
    _rawMeals: rawMeals,
  };
}

function randomOffset() {
  return Math.floor(Math.random() * 10000);
}

// — — — — — БЫСТРЫЙ РАСЧЁТ: один день + недельная корзина — — — — —
export function generateMenu(userData, nutrition) {
  const budget = userData.budget || 'econom';
  const factor = nutrition.target / BASE_TARGET;
  const restrictedSet = getRestrictedIngredientSet(userData.restrictionFlags);

  const breakfasts = filterMealsByRestrictions(getMealsForBudget('breakfasts', budget), restrictedSet);
  const snacks = filterMealsByRestrictions(getMealsForBudget('snacks', budget), restrictedSet);
  const lunches = filterMealsByRestrictions(getMealsForBudget('lunches', budget), restrictedSet);
  const dinners = filterMealsByRestrictions(getMealsForBudget('dinners', budget), restrictedSet);

  const offset = randomOffset();

  const sampleDay = buildDay(offset, breakfasts, snacks, lunches, dinners, factor);
  const dailyMenu = sampleDay.meals;
  const dailyTotals = dayTotals(sampleDay);

  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(buildDay(i + offset, breakfasts, snacks, lunches, dinners, factor));
  }

  const shoppingList = aggregateShoppingList(weekDays, factor);

  return {
    dailyMenu,
    dailyTotals,
    shoppingList,
  };
}

// — — — — — ПЛАН НА 7 ДНЕЙ — — — — —
export function generateWeeklyMenu(userData, nutrition) {
  const budget = userData.budget || 'econom';
  const factor = nutrition.target / BASE_TARGET;
  const restrictedSet = getRestrictedIngredientSet(userData.restrictionFlags);

  const breakfasts = filterMealsByRestrictions(getMealsForBudget('breakfasts', budget), restrictedSet);
  const snacks = filterMealsByRestrictions(getMealsForBudget('snacks', budget), restrictedSet);
  const lunches = filterMealsByRestrictions(getMealsForBudget('lunches', budget), restrictedSet);
  const dinners = filterMealsByRestrictions(getMealsForBudget('dinners', budget), restrictedSet);

  const offset = randomOffset();

  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const day = buildDay(i + offset, breakfasts, snacks, lunches, dinners, factor);
    weekDays.push({
      dayNumber: i + 1,
      dayName: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][i],
      meals: day.meals,
      totals: dayTotals(day),
      _rawMeals: day._rawMeals,
    });
  }

  const shoppingList = aggregateShoppingList(weekDays, factor);

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
 

