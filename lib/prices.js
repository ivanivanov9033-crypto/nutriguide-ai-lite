// Ориентировочные цены в основных валютах СНГ (середина 2026 года).
// Это приближение для оценки порядка стоимости — реальные цены меняются по регионам, сезонам и магазинам.

// Все цены приведены за 1 г / 1 мл / 1 шт.
const pricesKZ = {
  // Белковые
  'Куриная грудка': 2.0,
  'Куриные бёдра': 1.5,
  'Филе индейки': 3.0,
  'Говядина (вырезка)': 4.5,
  Минтай: 1.7,
  Треска: 2.5,
  Лосось: 5.5,
  'Лосось слабосолёный': 8.0,
  Форель: 4.0,
  Яйца: 60, // за штуку
  // Молочные
  'Творог 5%': 1.7,
  'Творог 9%': 2.0,
  'Кефир 1%': 0.4,
  'Йогурт натуральный 2%': 1.5,
  'Греческий йогурт': 2.5,
  'Сыр твёрдый': 4.0,
  // Крупы
  'Овсяные хлопья': 0.5,
  Гречка: 0.7,
  Рис: 0.5,
  'Рис басмати': 1.5,
  'Рис дикий': 2.5,
  Киноа: 3.0,
  Булгур: 0.7,
  'Хлеб ржаной': 0.7,
  'Хлеб цельнозерновой': 1.0,
  'Хлебцы ржаные': 2.5,
  'Мука цельнозерновая': 0.6,
  Картофель: 0.2,
  // Овощи
  Огурцы: 0.8,
  Помидоры: 0.8,
  'Капуста белокочанная': 0.2,
  Морковь: 0.2,
  'Лук репчатый': 0.25,
  Брокколи: 1.5,
  Кабачки: 0.5,
  Спаржа: 3.0,
  'Болгарский перец': 1.2,
  Шпинат: 2.0,
  Зелень: 3.0,
  // Фрукты
  Яблоки: 0.5,
  Банан: 0.5,
  'Замороженные ягоды': 2.5,
  'Свежие ягоды': 4.0,
  Авокадо: 4.0,
  // Жиры и орехи
  'Масло подсолнечное': 0.75,
  'Масло оливковое': 4.0,
  'Грецкие орехи': 4.0,
  Миндаль: 5.0,
  // Прочее
  Мёд: 2.5,
  Хумус: 3.0,
};

// Россия — рубли (примерное соотношение 1 ₽ ≈ 5 ₸)
const pricesRU = {};
for (const key of Object.keys(pricesKZ)) {
  pricesRU[key] = pricesKZ[key] / 5;
}

const priceTables = {
  kz: pricesKZ,
  ru: pricesRU,
};

const currencyInfo = {
  kz: { symbol: '₸', code: 'тенге', divider: 1000 },
  ru: { symbol: '₽', code: 'рубли', divider: 100 },
  other: { symbol: 'у.е.', code: 'условных единиц', divider: 1 },
};

// Парсинг человекочитаемого количества обратно в число грамм/мл/шт
function parseAmount(amountStr) {
  // примеры: "1,5 кг", "200 г", "2 л", "16 шт"
  const normalized = amountStr.replace(',', '.').trim();
  const match = normalized.match(/^([\d.]+)\s*(кг|г|л|мл|шт)$/);
  if (!match) return { value: 0, baseUnit: null };
  const value = parseFloat(match[1]);
  const unit = match[2];

  if (unit === 'кг') return { value: value * 1000, baseUnit: 'г' };
  if (unit === 'л') return { value: value * 1000, baseUnit: 'мл' };
  return { value, baseUnit: unit };
}

export function calculateBudget(shoppingList, country) {
  const info = currencyInfo[country] || currencyInfo.other;

  // Для "другой" страны не считаем — только подсказываем
  if (country === 'other' || !priceTables[country]) {
    return {
      total: null,
      formatted: 'оценка недоступна для выбранной страны',
      currency: info.code,
      symbol: info.symbol,
      hasEstimate: false,
    };
  }

  const prices = priceTables[country];
  let total = 0;

  for (const items of Object.values(shoppingList)) {
    for (const item of items) {
      const price = prices[item.name];
      if (price == null) continue;
      const parsed = parseAmount(item.amount);
      total += price * parsed.value;
    }
  }

  // Округление до приятного шага
  const rounded = Math.round(total / info.divider) * info.divider;
  const min = Math.round((rounded * 0.85) / info.divider) * info.divider;
  const max = Math.round((rounded * 1.15) / info.divider) * info.divider;

  const formatted = `${formatNum(min)}–${formatNum(max)} ${info.symbol}`;

  return {
    total: rounded,
    min,
    max,
    formatted,
    currency: info.code,
    symbol: info.symbol,
    hasEstimate: true,
  };
}

function formatNum(n) {
  return n.toLocaleString('ru-RU');
}
