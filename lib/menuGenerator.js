import { mealBank, BASE_TARGET } from './menuData';

// Категории для группировки списка покупок
const categoryMap = {
  // Белковые продукты
  'Куриная грудка': 'Белковые продукты',
  'Куриные бёдра': 'Белковые продукты',
  'Филе индейки': 'Белковые продукты',
  'Говядина (вырезка)': 'Белковые продукты',
  Минтай: 'Белковые продукты',
  Треска: 'Белковые продукты',
  Лосось: 'Белковые продукты',
  'Лосось слабосолёный': 'Белковые продукты',
  Форель: 'Белковые продукты',
  Яйца: 'Белковые продукты',

  // Молочные продукты
  'Творог 5%': 'Молочные продукты',
  'Творог 9%': 'Молочные продукты',
  'Кефир 1%': 'Молочные продукты',
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
  'Хлеб ржаной': 'Крупы и гарниры',
  'Хлеб цельнозерновой': 'Крупы и гарниры',
  'Хлебцы ржаные': 'Крупы и гарниры',
  'Мука цельнозерновая': 'Крупы и гарниры',
  Картофель: 'Крупы и гарниры',

  // Овощи
  Огурцы: 'Овощи',
  Помидоры: 'Овощи',
  'Капуста белокочанная': 'Овощи',
  Морковь: 'Овощи',
  'Лук репчатый': 'Овощи',
  Брокколи: 'Овощи',
  Кабачки: 'Овощи',
  Спаржа: 'Овощи',
  'Болгарский перец': 'Овощи',
  Шпинат: 'Овощи',
  Зелень: 'Овощи',

  // Фрукты и ягоды
  Яблоки: 'Фрукты и ягоды',
  Банан: 'Фрукты и ягоды',
  'Замороженные ягоды': 'Фрукты и ягоды',
  'Свежие ягоды': 'Фрукты и ягоды',
  Авокадо: 'Фрукты и ягоды',

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
    // Округление до 5 г/мл для маленьких порций, до 10 для больших
    if (scaled < 50) return Math.round(scaled / 5) * 5;
    return Math.round(scaled / 10) * 10;
  }
  return Math.round(scaled);
}

// Форматирование одной строки ингредиента для отображения
function formatIngredient(item, factor) {
  const amount = scaleAmount(item.amount, item.unit, factor);
  const context = item.context ? ` (${item.context})` : '';
  return `${item.name} — ${amount} ${item.unit}${context}`;
}

// Выбор блюд для одного дня с учётом ротации
function pickMeal(variations, dayIndex) {
  return variations[dayIndex % variations.length];
}

// Генерация дневного меню под пользователя
export function generateMenu(userData, nutrition) {
  const budget = userData.budget || 'econom';
  const bank = mealBank[budget] || mealBank.econom;
  const factor = nutrition.target / BASE_TARGET;

  // Для отображения берём первый день (день 1 ротации)
  const dayIndex = 0;

  const slots = [
    { key: 'breakfast', label: 'Завтрак', variations: bank.breakfasts },
    { key: 'snack1', label: 'Перекус', variations: bank.snacks1 },
    { key: 'lunch', label: 'Обед', variations: bank.lunches },
    { key: 'snack2', label: 'Перекус', variations: bank.snacks2 },
    { key: 'dinner', label: 'Ужин', variations: bank.dinners },
  ];

  const dailyMenu = slots.map((slot) => {
    const meal = pickMeal(slot.variations, dayIndex);
    return {
      slot: slot.label,
      name: meal.name,
      ingredients: meal.items.map((item) => formatIngredient(item, factor)),
      kcal: Math.round(meal.kcal * factor),
      p: Math.round(meal.p * factor),
      f: Math.round(meal.f * factor),
      c: Math.round(meal.c * factor),
    };
  });

  const dailyTotals = dailyMenu.reduce(
    (acc, m) => ({
      kcal: acc.kcal + m.kcal,
      p: acc.p + m.p,
      f: acc.f + m.f,
      c: acc.c + m.c,
    }),
    { kcal: 0, p: 0, f: 0, c: 0 }
  );

  // Генерация недельной корзины:
  // прокручиваем все 3 варианта каждого слота по 7 дням, агрегируем ингредиенты
  const aggregated = new Map();

  for (let day = 0; day < 7; day++) {
    for (const slot of slots) {
      const meal = pickMeal(slot.variations, day);
      for (const item of meal.items) {
        const key = `${item.name}|${item.unit}`;
        const scaled = scaleAmount(item.amount, item.unit, factor);
        if (aggregated.has(key)) {
          const existing = aggregated.get(key);
          existing.amount += scaled;
        } else {
          aggregated.set(key, {
            name: item.name,
            amount: scaled,
            unit: item.unit,
          });
        }
      }
    }
  }

  // Финальное округление и группировка
  const shoppingList = {};
  for (const item of aggregated.values()) {
    // Округление итоговых количеств
    let displayAmount;
    if (item.unit === 'г' || item.unit === 'мл') {
      if (item.amount >= 1000) {
        displayAmount = `${(item.amount / 1000).toFixed(1).replace('.', ',')} ${
          item.unit === 'г' ? 'кг' : 'л'
        }`;
      } else {
        displayAmount = `${Math.round(item.amount / 10) * 10} ${item.unit}`;
      }
    } else {
      displayAmount = `${item.amount} ${item.unit}`;
    }

    const category = getCategory(item.name);
    if (!shoppingList[category]) shoppingList[category] = [];
    shoppingList[category].push({ name: item.name, amount: displayAmount });
  }

  // Сортировка категорий в нужном порядке
  const orderedCategories = [
    'Белковые продукты',
    'Молочные продукты',
    'Крупы и гарниры',
    'Овощи',
    'Фрукты и ягоды',
    'Жиры и орехи',
    'Прочее',
  ];
  const orderedShoppingList = {};
  for (const cat of orderedCategories) {
    if (shoppingList[cat]) {
      // Сортировка внутри категории по алфавиту
      orderedShoppingList[cat] = shoppingList[cat].sort((a, b) =>
        a.name.localeCompare(b.name, 'ru')
      );
    }
  }

  return {
    dailyMenu,
    dailyTotals,
    shoppingList: orderedShoppingList,
  };
}
