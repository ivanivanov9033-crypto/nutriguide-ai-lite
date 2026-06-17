// Базовая дневная калорийность, к которой привязаны порции в шаблонах.
// При генерации меню порции масштабируются под целевую калорийность пользователя.
export const BASE_TARGET = 1800;

// Шаблоны блюд по бюджетам. Для каждого приёма пищи — 3 варианта.
// Это даёт разнообразие при ротации по дням недели.
export const mealBank = {
  econom: {
    breakfasts: [
      {
        name: 'Овсянка с яйцами и творогом',
        items: [
          { name: 'Овсяные хлопья', amount: 40, unit: 'г', context: 'сухих' },
          { name: 'Яйца', amount: 2, unit: 'шт' },
          { name: 'Творог 5%', amount: 100, unit: 'г' },
        ],
        kcal: 410, p: 34, f: 17, c: 27,
      },
      {
        name: 'Омлет с сыром и хлебом',
        items: [
          { name: 'Яйца', amount: 3, unit: 'шт' },
          { name: 'Сыр твёрдый', amount: 25, unit: 'г' },
          { name: 'Хлеб ржаной', amount: 40, unit: 'г' },
        ],
        kcal: 420, p: 30, f: 22, c: 25,
      },
      {
        name: 'Творожная запеканка с яблоком',
        items: [
          { name: 'Творог 5%', amount: 200, unit: 'г' },
          { name: 'Яйца', amount: 1, unit: 'шт' },
          { name: 'Овсяные хлопья', amount: 30, unit: 'г' },
          { name: 'Яблоки', amount: 100, unit: 'г' },
        ],
        kcal: 400, p: 36, f: 14, c: 32,
      },
    ],
    snacks1: [
      {
        name: 'Кефир с сыром',
        items: [
          { name: 'Кефир 1%', amount: 250, unit: 'мл' },
          { name: 'Сыр твёрдый', amount: 25, unit: 'г' },
        ],
        kcal: 190, p: 14, f: 9, c: 10,
      },
      {
        name: 'Творог с яблоком',
        items: [
          { name: 'Творог 5%', amount: 100, unit: 'г' },
          { name: 'Яблоки', amount: 150, unit: 'г' },
        ],
        kcal: 195, p: 17, f: 6, c: 20,
      },
      {
        name: 'Кефир с хлебцами',
        items: [
          { name: 'Кефир 1%', amount: 250, unit: 'мл' },
          { name: 'Хлебцы ржаные', amount: 30, unit: 'г' },
        ],
        kcal: 200, p: 11, f: 4, c: 28,
      },
    ],
    lunches: [
      {
        name: 'Курица с гречкой и салатом',
        items: [
          { name: 'Куриная грудка', amount: 180, unit: 'г' },
          { name: 'Гречка', amount: 50, unit: 'г', context: 'сухой' },
          { name: 'Огурцы', amount: 100, unit: 'г' },
          { name: 'Помидоры', amount: 100, unit: 'г' },
          { name: 'Масло подсолнечное', amount: 15, unit: 'мл' },
        ],
        kcal: 540, p: 54, f: 22, c: 39,
      },
      {
        name: 'Курица с рисом и тушёной капустой',
        items: [
          { name: 'Куриная грудка', amount: 180, unit: 'г' },
          { name: 'Рис', amount: 60, unit: 'г', context: 'сухой' },
          { name: 'Капуста белокочанная', amount: 200, unit: 'г' },
          { name: 'Масло подсолнечное', amount: 15, unit: 'мл' },
        ],
        kcal: 560, p: 50, f: 21, c: 45,
      },
      {
        name: 'Минтай с картофелем и морковью',
        items: [
          { name: 'Минтай', amount: 200, unit: 'г' },
          { name: 'Картофель', amount: 200, unit: 'г' },
          { name: 'Морковь', amount: 100, unit: 'г' },
          { name: 'Масло подсолнечное', amount: 15, unit: 'мл' },
        ],
        kcal: 510, p: 45, f: 18, c: 42,
      },
    ],
    snacks2: [
      {
        name: 'Творог с яблоком',
        items: [
          { name: 'Творог 5%', amount: 130, unit: 'г' },
          { name: 'Яблоки', amount: 100, unit: 'г' },
        ],
        kcal: 205, p: 22, f: 7, c: 14,
      },
      {
        name: 'Кефир с сыром',
        items: [
          { name: 'Кефир 1%', amount: 250, unit: 'мл' },
          { name: 'Сыр твёрдый', amount: 30, unit: 'г' },
        ],
        kcal: 210, p: 16, f: 11, c: 10,
      },
      {
        name: 'Варёные яйца с овощами',
        items: [
          { name: 'Яйца', amount: 2, unit: 'шт' },
          { name: 'Огурцы', amount: 100, unit: 'г' },
          { name: 'Помидоры', amount: 100, unit: 'г' },
        ],
        kcal: 200, p: 15, f: 11, c: 8,
      },
    ],
    dinners: [
      {
        name: 'Минтай с картофелем и овощами',
        items: [
          { name: 'Минтай', amount: 200, unit: 'г' },
          { name: 'Картофель', amount: 100, unit: 'г' },
          { name: 'Капуста белокочанная', amount: 150, unit: 'г' },
          { name: 'Морковь', amount: 100, unit: 'г' },
          { name: 'Масло подсолнечное', amount: 15, unit: 'мл' },
        ],
        kcal: 470, p: 42, f: 20, c: 28,
      },
      {
        name: 'Куриная грудка с овощами',
        items: [
          { name: 'Куриная грудка', amount: 170, unit: 'г' },
          { name: 'Капуста белокочанная', amount: 200, unit: 'г' },
          { name: 'Морковь', amount: 100, unit: 'г' },
          { name: 'Лук репчатый', amount: 50, unit: 'г' },
          { name: 'Масло подсолнечное', amount: 15, unit: 'мл' },
        ],
        kcal: 450, p: 40, f: 20, c: 25,
      },
      {
        name: 'Творог с овощным салатом',
        items: [
          { name: 'Творог 5%', amount: 200, unit: 'г' },
          { name: 'Огурцы', amount: 100, unit: 'г' },
          { name: 'Помидоры', amount: 100, unit: 'г' },
          { name: 'Хлеб ржаной', amount: 40, unit: 'г' },
          { name: 'Масло подсолнечное', amount: 10, unit: 'мл' },
        ],
        kcal: 460, p: 38, f: 18, c: 35,
      },
    ],
  },

  standard: {
    breakfasts: [
      {
        name: 'Овсянка с ягодами и грецким орехом',
        items: [
          { name: 'Овсяные хлопья', amount: 50, unit: 'г', context: 'сухих' },
          { name: 'Яйца', amount: 2, unit: 'шт' },
          { name: 'Грецкие орехи', amount: 10, unit: 'г' },
          { name: 'Замороженные ягоды', amount: 80, unit: 'г' },
        ],
        kcal: 440, p: 25, f: 21, c: 38,
      },
      {
        name: 'Омлет с овощами и сыром',
        items: [
          { name: 'Яйца', amount: 3, unit: 'шт' },
          { name: 'Помидоры', amount: 100, unit: 'г' },
          { name: 'Сыр твёрдый', amount: 30, unit: 'г' },
          { name: 'Хлеб цельнозерновой', amount: 40, unit: 'г' },
        ],
        kcal: 450, p: 32, f: 24, c: 25,
      },
      {
        name: 'Греческий йогурт с овсянкой и бананом',
        items: [
          { name: 'Йогурт натуральный 2%', amount: 200, unit: 'г' },
          { name: 'Овсяные хлопья', amount: 40, unit: 'г', context: 'сухих' },
          { name: 'Банан', amount: 1, unit: 'шт' },
          { name: 'Грецкие орехи', amount: 10, unit: 'г' },
        ],
        kcal: 430, p: 22, f: 14, c: 55,
      },
    ],
    snacks1: [
      {
        name: 'Йогурт с орехами',
        items: [
          { name: 'Йогурт натуральный 2%', amount: 200, unit: 'г' },
          { name: 'Грецкие орехи', amount: 15, unit: 'г' },
        ],
        kcal: 230, p: 14, f: 13, c: 14,
      },
      {
        name: 'Творог с медом и орехами',
        items: [
          { name: 'Творог 5%', amount: 150, unit: 'г' },
          { name: 'Мёд', amount: 10, unit: 'г' },
          { name: 'Грецкие орехи', amount: 10, unit: 'г' },
        ],
        kcal: 240, p: 25, f: 12, c: 13,
      },
      {
        name: 'Сыр с фруктами',
        items: [
          { name: 'Сыр твёрдый', amount: 40, unit: 'г' },
          { name: 'Яблоки', amount: 150, unit: 'г' },
        ],
        kcal: 230, p: 12, f: 13, c: 18,
      },
    ],
    lunches: [
      {
        name: 'Индейка с гречкой и салатом',
        items: [
          { name: 'Филе индейки', amount: 180, unit: 'г' },
          { name: 'Гречка', amount: 60, unit: 'г', context: 'сухой' },
          { name: 'Огурцы', amount: 100, unit: 'г' },
          { name: 'Помидоры', amount: 100, unit: 'г' },
          { name: 'Зелень', amount: 20, unit: 'г' },
          { name: 'Масло оливковое', amount: 15, unit: 'мл' },
        ],
        kcal: 580, p: 54, f: 22, c: 48,
      },
      {
        name: 'Куриное филе с рисом и овощами',
        items: [
          { name: 'Куриная грудка', amount: 180, unit: 'г' },
          { name: 'Рис басмати', amount: 70, unit: 'г', context: 'сухой' },
          { name: 'Брокколи', amount: 150, unit: 'г' },
          { name: 'Масло оливковое', amount: 15, unit: 'мл' },
        ],
        kcal: 590, p: 52, f: 22, c: 50,
      },
      {
        name: 'Треска с картофелем и салатом',
        items: [
          { name: 'Треска', amount: 200, unit: 'г' },
          { name: 'Картофель', amount: 200, unit: 'г' },
          { name: 'Огурцы', amount: 100, unit: 'г' },
          { name: 'Помидоры', amount: 100, unit: 'г' },
          { name: 'Масло оливковое', amount: 15, unit: 'мл' },
        ],
        kcal: 560, p: 48, f: 20, c: 48,
      },
    ],
    snacks2: [
      {
        name: 'Творог с фруктами',
        items: [
          { name: 'Творог 5%', amount: 150, unit: 'г' },
          { name: 'Яблоки', amount: 150, unit: 'г' },
        ],
        kcal: 250, p: 26, f: 8, c: 25,
      },
      {
        name: 'Йогурт с орехами',
        items: [
          { name: 'Йогурт натуральный 2%', amount: 200, unit: 'г' },
          { name: 'Грецкие орехи', amount: 15, unit: 'г' },
        ],
        kcal: 230, p: 14, f: 13, c: 14,
      },
      {
        name: 'Варёные яйца с овощами',
        items: [
          { name: 'Яйца', amount: 2, unit: 'шт' },
          { name: 'Огурцы', amount: 150, unit: 'г' },
          { name: 'Зелень', amount: 20, unit: 'г' },
        ],
        kcal: 210, p: 16, f: 12, c: 9,
      },
    ],
    dinners: [
      {
        name: 'Треска с овощами на пару',
        items: [
          { name: 'Треска', amount: 220, unit: 'г' },
          { name: 'Брокколи', amount: 150, unit: 'г' },
          { name: 'Морковь', amount: 100, unit: 'г' },
          { name: 'Картофель', amount: 100, unit: 'г' },
          { name: 'Масло оливковое', amount: 15, unit: 'мл' },
        ],
        kcal: 480, p: 50, f: 18, c: 32,
      },
      {
        name: 'Курица с овощами и булгуром',
        items: [
          { name: 'Куриная грудка', amount: 170, unit: 'г' },
          { name: 'Булгур', amount: 50, unit: 'г', context: 'сухого' },
          { name: 'Кабачки', amount: 200, unit: 'г' },
          { name: 'Масло оливковое', amount: 15, unit: 'мл' },
        ],
        kcal: 490, p: 45, f: 19, c: 38,
      },
      {
        name: 'Индейка с овощным рагу',
        items: [
          { name: 'Филе индейки', amount: 180, unit: 'г' },
          { name: 'Кабачки', amount: 150, unit: 'г' },
          { name: 'Помидоры', amount: 100, unit: 'г' },
          { name: 'Картофель', amount: 100, unit: 'г' },
          { name: 'Масло оливковое', amount: 15, unit: 'мл' },
        ],
        kcal: 500, p: 46, f: 20, c: 32,
      },
    ],
  },

  comfort: {
    breakfasts: [
      {
        name: 'Овсянка с ягодами, миндалём и протеином',
        items: [
          { name: 'Овсяные хлопья', amount: 50, unit: 'г', context: 'сухих' },
          { name: 'Греческий йогурт', amount: 150, unit: 'г' },
          { name: 'Замороженные ягоды', amount: 100, unit: 'г' },
          { name: 'Миндаль', amount: 15, unit: 'г' },
        ],
        kcal: 470, p: 24, f: 18, c: 50,
      },
      {
        name: 'Омлет с лососем и авокадо',
        items: [
          { name: 'Яйца', amount: 3, unit: 'шт' },
          { name: 'Лосось слабосолёный', amount: 50, unit: 'г' },
          { name: 'Авокадо', amount: 50, unit: 'г' },
          { name: 'Хлеб цельнозерновой', amount: 40, unit: 'г' },
        ],
        kcal: 490, p: 32, f: 30, c: 22,
      },
      {
        name: 'Сырники с ягодами',
        items: [
          { name: 'Творог 9%', amount: 200, unit: 'г' },
          { name: 'Яйца', amount: 1, unit: 'шт' },
          { name: 'Мука цельнозерновая', amount: 30, unit: 'г' },
          { name: 'Свежие ягоды', amount: 100, unit: 'г' },
        ],
        kcal: 460, p: 38, f: 18, c: 35,
      },
    ],
    snacks1: [
      {
        name: 'Йогурт с ягодами и миндалём',
        items: [
          { name: 'Греческий йогурт', amount: 200, unit: 'г' },
          { name: 'Свежие ягоды', amount: 80, unit: 'г' },
          { name: 'Миндаль', amount: 10, unit: 'г' },
        ],
        kcal: 250, p: 18, f: 12, c: 20,
      },
      {
        name: 'Хумус с овощами',
        items: [
          { name: 'Хумус', amount: 80, unit: 'г' },
          { name: 'Морковь', amount: 100, unit: 'г' },
          { name: 'Огурцы', amount: 100, unit: 'г' },
        ],
        kcal: 240, p: 8, f: 14, c: 22,
      },
      {
        name: 'Творог с орехами и мёдом',
        items: [
          { name: 'Творог 9%', amount: 150, unit: 'г' },
          { name: 'Миндаль', amount: 15, unit: 'г' },
          { name: 'Мёд', amount: 10, unit: 'г' },
        ],
        kcal: 270, p: 25, f: 16, c: 12,
      },
    ],
    lunches: [
      {
        name: 'Лосось с киноа и зелёным салатом',
        items: [
          { name: 'Лосось', amount: 180, unit: 'г' },
          { name: 'Киноа', amount: 60, unit: 'г', context: 'сухой' },
          { name: 'Шпинат', amount: 100, unit: 'г' },
          { name: 'Авокадо', amount: 50, unit: 'г' },
          { name: 'Масло оливковое', amount: 10, unit: 'мл' },
        ],
        kcal: 640, p: 50, f: 32, c: 40,
      },
      {
        name: 'Говядина с булгуром и овощами',
        items: [
          { name: 'Говядина (вырезка)', amount: 180, unit: 'г' },
          { name: 'Булгур', amount: 60, unit: 'г', context: 'сухого' },
          { name: 'Брокколи', amount: 150, unit: 'г' },
          { name: 'Масло оливковое', amount: 15, unit: 'мл' },
        ],
        kcal: 600, p: 50, f: 24, c: 48,
      },
      {
        name: 'Индейка с диким рисом и спаржей',
        items: [
          { name: 'Филе индейки', amount: 180, unit: 'г' },
          { name: 'Рис дикий', amount: 60, unit: 'г', context: 'сухой' },
          { name: 'Спаржа', amount: 150, unit: 'г' },
          { name: 'Масло оливковое', amount: 15, unit: 'мл' },
        ],
        kcal: 590, p: 52, f: 22, c: 48,
      },
    ],
    snacks2: [
      {
        name: 'Творог с ягодами и орехами',
        items: [
          { name: 'Творог 9%', amount: 150, unit: 'г' },
          { name: 'Свежие ягоды', amount: 80, unit: 'г' },
          { name: 'Миндаль', amount: 10, unit: 'г' },
        ],
        kcal: 280, p: 25, f: 15, c: 18,
      },
      {
        name: 'Сэндвич с курицей и авокадо',
        items: [
          { name: 'Хлеб цельнозерновой', amount: 50, unit: 'г' },
          { name: 'Куриная грудка', amount: 80, unit: 'г' },
          { name: 'Авокадо', amount: 40, unit: 'г' },
          { name: 'Шпинат', amount: 30, unit: 'г' },
        ],
        kcal: 280, p: 28, f: 10, c: 22,
      },
      {
        name: 'Яйца с авокадо',
        items: [
          { name: 'Яйца', amount: 2, unit: 'шт' },
          { name: 'Авокадо', amount: 60, unit: 'г' },
          { name: 'Шпинат', amount: 50, unit: 'г' },
        ],
        kcal: 270, p: 15, f: 22, c: 5,
      },
    ],
    dinners: [
      {
        name: 'Запечённая форель с овощами',
        items: [
          { name: 'Форель', amount: 200, unit: 'г' },
          { name: 'Спаржа', amount: 150, unit: 'г' },
          { name: 'Картофель', amount: 100, unit: 'г' },
          { name: 'Масло оливковое', amount: 15, unit: 'мл' },
        ],
        kcal: 540, p: 48, f: 24, c: 32,
      },
      {
        name: 'Говядина с овощным рагу',
        items: [
          { name: 'Говядина (вырезка)', amount: 170, unit: 'г' },
          { name: 'Кабачки', amount: 150, unit: 'г' },
          { name: 'Помидоры', amount: 100, unit: 'г' },
          { name: 'Болгарский перец', amount: 100, unit: 'г' },
          { name: 'Масло оливковое', amount: 15, unit: 'мл' },
        ],
        kcal: 520, p: 46, f: 22, c: 32,
      },
      {
        name: 'Куриная грудка с киноа и брокколи',
        items: [
          { name: 'Куриная грудка', amount: 180, unit: 'г' },
          { name: 'Киноа', amount: 50, unit: 'г', context: 'сухой' },
          { name: 'Брокколи', amount: 200, unit: 'г' },
          { name: 'Масло оливковое', amount: 15, unit: 'мл' },
        ],
        kcal: 510, p: 50, f: 18, c: 38,
      },
    ],
  },
};
