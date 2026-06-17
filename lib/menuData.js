// menuData.js v1.1 — база блюд для NutriGuide AI Lite
// Структура: один массив на каждый тип приёма пищи.
// Каждое блюдо помечено бюджетом (econom / standard / comfort).
// Калорийность рассчитана для базы 1800 ккал/день; при генерации порции
// масштабируются под целевую калорийность пользователя.

export const BASE_TARGET = 1800;

export const meals = {
  // — — — — — — — — — ЗАВТРАКИ (20) — — — — — — — — —
  breakfasts: [
    // — Эконом (8) —
    {
      id: 'br_econom_oats_eggs_curd',
      name: 'Овсянка с яйцами и творогом',
      budget: 'econom',
      items: [
        { name: 'Овсяные хлопья', amount: 40, unit: 'г', context: 'сухих' },
        { name: 'Яйца', amount: 2, unit: 'шт' },
        { name: 'Творог 5%', amount: 100, unit: 'г' },
      ],
      kcal: 410, p: 34, f: 17, c: 27,
    },
    {
      id: 'br_econom_omelette_cheese',
      name: 'Омлет с сыром и хлебом',
      budget: 'econom',
      items: [
        { name: 'Яйца', amount: 3, unit: 'шт' },
        { name: 'Сыр твёрдый', amount: 25, unit: 'г' },
        { name: 'Хлеб ржаной', amount: 40, unit: 'г' },
      ],
      kcal: 420, p: 30, f: 22, c: 25,
    },
    {
      id: 'br_econom_curd_casserole',
      name: 'Творожная запеканка с яблоком',
      budget: 'econom',
      items: [
        { name: 'Творог 5%', amount: 200, unit: 'г' },
        { name: 'Яйца', amount: 1, unit: 'шт' },
        { name: 'Овсяные хлопья', amount: 30, unit: 'г' },
        { name: 'Яблоки', amount: 100, unit: 'г' },
      ],
      kcal: 400, p: 36, f: 14, c: 32,
    },
    {
      id: 'br_econom_fried_eggs_veg',
      name: 'Яичница с овощами и хлебом',
      budget: 'econom',
      items: [
        { name: 'Яйца', amount: 3, unit: 'шт' },
        { name: 'Помидоры', amount: 100, unit: 'г' },
        { name: 'Лук репчатый', amount: 30, unit: 'г' },
        { name: 'Хлеб ржаной', amount: 30, unit: 'г' },
      ],
      kcal: 380, p: 24, f: 19, c: 24,
    },
    {
      id: 'br_econom_kefir_oats_banana',
      name: 'Овсянка на кефире с бананом',
      budget: 'econom',
      items: [
        { name: 'Овсяные хлопья', amount: 50, unit: 'г', context: 'сухих' },
        { name: 'Кефир 1%', amount: 200, unit: 'мл' },
        { name: 'Банан', amount: 1, unit: 'шт' },
      ],
      kcal: 420, p: 17, f: 7, c: 73,
    },
    {
      id: 'br_econom_egg_cheese_sandwich',
      name: 'Бутерброды с яйцом и сыром',
      budget: 'econom',
      items: [
        { name: 'Хлеб ржаной', amount: 60, unit: 'г' },
        { name: 'Яйца', amount: 2, unit: 'шт' },
        { name: 'Сыр твёрдый', amount: 30, unit: 'г' },
      ],
      kcal: 430, p: 25, f: 20, c: 38,
    },
    {
      id: 'br_econom_semolina_curd',
      name: 'Манная каша с творогом',
      budget: 'econom',
      items: [
        { name: 'Манная крупа', amount: 50, unit: 'г', context: 'сухой' },
        { name: 'Молоко 2,5%', amount: 200, unit: 'мл' },
        { name: 'Творог 5%', amount: 100, unit: 'г' },
      ],
      kcal: 430, p: 26, f: 11, c: 56,
    },
    {
      id: 'br_econom_buckwheat_milk_egg',
      name: 'Гречка на молоке с яйцом',
      budget: 'econom',
      items: [
        { name: 'Гречка', amount: 50, unit: 'г', context: 'сухой' },
        { name: 'Молоко 2,5%', amount: 150, unit: 'мл' },
        { name: 'Яйца', amount: 1, unit: 'шт' },
      ],
      kcal: 380, p: 18, f: 11, c: 53,
    },

    // — Стандарт (7) —
    {
      id: 'br_std_oats_berries_walnuts',
      name: 'Овсянка с ягодами и грецким орехом',
      budget: 'standard',
      items: [
        { name: 'Овсяные хлопья', amount: 50, unit: 'г', context: 'сухих' },
        { name: 'Яйца', amount: 2, unit: 'шт' },
        { name: 'Грецкие орехи', amount: 10, unit: 'г' },
        { name: 'Замороженные ягоды', amount: 80, unit: 'г' },
      ],
      kcal: 440, p: 25, f: 21, c: 38,
    },
    {
      id: 'br_std_omelette_veg_cheese',
      name: 'Омлет с овощами и сыром',
      budget: 'standard',
      items: [
        { name: 'Яйца', amount: 3, unit: 'шт' },
        { name: 'Помидоры', amount: 100, unit: 'г' },
        { name: 'Сыр твёрдый', amount: 30, unit: 'г' },
        { name: 'Хлеб цельнозерновой', amount: 40, unit: 'г' },
      ],
      kcal: 450, p: 32, f: 24, c: 25,
    },
    {
      id: 'br_std_yogurt_oats_banana',
      name: 'Йогурт с овсянкой и бананом',
      budget: 'standard',
      items: [
        { name: 'Йогурт натуральный 2%', amount: 200, unit: 'г' },
        { name: 'Овсяные хлопья', amount: 40, unit: 'г', context: 'сухих' },
        { name: 'Банан', amount: 1, unit: 'шт' },
        { name: 'Грецкие орехи', amount: 10, unit: 'г' },
      ],
      kcal: 430, p: 22, f: 14, c: 55,
    },
    {
      id: 'br_std_syrniki_honey',
      name: 'Сырники с мёдом',
      budget: 'standard',
      items: [
        { name: 'Творог 5%', amount: 200, unit: 'г' },
        { name: 'Яйца', amount: 1, unit: 'шт' },
        { name: 'Мука цельнозерновая', amount: 30, unit: 'г' },
        { name: 'Мёд', amount: 10, unit: 'г' },
      ],
      kcal: 440, p: 38, f: 14, c: 38,
    },
    {
      id: 'br_std_chicken_sandwich',
      name: 'Сэндвич с курицей и сыром',
      budget: 'standard',
      items: [
        { name: 'Хлеб цельнозерновой', amount: 60, unit: 'г' },
        { name: 'Куриная грудка', amount: 80, unit: 'г' },
        { name: 'Сыр твёрдый', amount: 25, unit: 'г' },
        { name: 'Помидоры', amount: 50, unit: 'г' },
      ],
      kcal: 410, p: 35, f: 14, c: 35,
    },
    {
      id: 'br_std_rice_milk_almonds',
      name: 'Рисовая каша на молоке с миндалём',
      budget: 'standard',
      items: [
        { name: 'Рис', amount: 50, unit: 'г', context: 'сухой' },
        { name: 'Молоко 2,5%', amount: 200, unit: 'мл' },
        { name: 'Миндаль', amount: 15, unit: 'г' },
        { name: 'Мёд', amount: 10, unit: 'г' },
      ],
      kcal: 460, p: 14, f: 13, c: 71,
    },
    {
      id: 'br_std_curd_casserole_berries',
      name: 'Творожная запеканка с ягодами',
      budget: 'standard',
      items: [
        { name: 'Творог 5%', amount: 200, unit: 'г' },
        { name: 'Яйца', amount: 2, unit: 'шт' },
        { name: 'Мука цельнозерновая', amount: 30, unit: 'г' },
        { name: 'Замороженные ягоды', amount: 100, unit: 'г' },
      ],
      kcal: 460, p: 40, f: 17, c: 38,
    },

    // — Комфорт (5) —
    {
      id: 'br_cmf_oats_berries_almonds_yogurt',
      name: 'Овсянка с ягодами, миндалём и греческим йогуртом',
      budget: 'comfort',
      items: [
        { name: 'Овсяные хлопья', amount: 50, unit: 'г', context: 'сухих' },
        { name: 'Греческий йогурт', amount: 150, unit: 'г' },
        { name: 'Замороженные ягоды', amount: 100, unit: 'г' },
        { name: 'Миндаль', amount: 15, unit: 'г' },
      ],
      kcal: 470, p: 24, f: 18, c: 50,
    },
    {
      id: 'br_cmf_omelette_salmon_avocado',
      name: 'Омлет с лососем и авокадо',
      budget: 'comfort',
      items: [
        { name: 'Яйца', amount: 3, unit: 'шт' },
        { name: 'Лосось слабосолёный', amount: 50, unit: 'г' },
        { name: 'Авокадо', amount: 50, unit: 'г' },
        { name: 'Хлеб цельнозерновой', amount: 40, unit: 'г' },
      ],
      kcal: 490, p: 32, f: 30, c: 22,
    },
    {
      id: 'br_cmf_syrniki_berries',
      name: 'Сырники с ягодами и греческим йогуртом',
      budget: 'comfort',
      items: [
        { name: 'Творог 9%', amount: 200, unit: 'г' },
        { name: 'Яйца', amount: 1, unit: 'шт' },
        { name: 'Мука цельнозерновая', amount: 30, unit: 'г' },
        { name: 'Свежие ягоды', amount: 100, unit: 'г' },
        { name: 'Греческий йогурт', amount: 50, unit: 'г' },
      ],
      kcal: 490, p: 41, f: 19, c: 38,
    },
    {
      id: 'br_cmf_avocado_toast_egg',
      name: 'Авокадо-тост с яйцом пашот',
      budget: 'comfort',
      items: [
        { name: 'Хлеб цельнозерновой', amount: 60, unit: 'г' },
        { name: 'Авокадо', amount: 80, unit: 'г' },
        { name: 'Яйца', amount: 2, unit: 'шт' },
        { name: 'Помидоры', amount: 80, unit: 'г' },
      ],
      kcal: 470, p: 22, f: 25, c: 38,
    },
    {
      id: 'br_cmf_chia_pudding_berries',
      name: 'Чиа-пудинг с ягодами и миндалём',
      budget: 'comfort',
      items: [
        { name: 'Семена чиа', amount: 30, unit: 'г' },
        { name: 'Молоко 2,5%', amount: 200, unit: 'мл' },
        { name: 'Свежие ягоды', amount: 100, unit: 'г' },
        { name: 'Миндаль', amount: 15, unit: 'г' },
      ],
      kcal: 450, p: 18, f: 27, c: 35,
    },
  ],

  // — — — — — — — — — ПЕРЕКУСЫ (20) — — — — — — — — —
  snacks: [
    // — Эконом (8) —
    {
      id: 'sn_econom_kefir_cheese',
      name: 'Кефир с сыром',
      budget: 'econom',
      items: [
        { name: 'Кефир 1%', amount: 250, unit: 'мл' },
        { name: 'Сыр твёрдый', amount: 25, unit: 'г' },
      ],
      kcal: 190, p: 14, f: 9, c: 10,
    },
    {
      id: 'sn_econom_curd_apple',
      name: 'Творог с яблоком',
      budget: 'econom',
      items: [
        { name: 'Творог 5%', amount: 100, unit: 'г' },
        { name: 'Яблоки', amount: 150, unit: 'г' },
      ],
      kcal: 195, p: 17, f: 6, c: 20,
    },
    {
      id: 'sn_econom_kefir_crispbread',
      name: 'Кефир с хлебцами',
      budget: 'econom',
      items: [
        { name: 'Кефир 1%', amount: 250, unit: 'мл' },
        { name: 'Хлебцы ржаные', amount: 30, unit: 'г' },
      ],
      kcal: 200, p: 11, f: 4, c: 28,
    },
    {
      id: 'sn_econom_boiled_eggs_veg',
      name: 'Варёные яйца с овощами',
      budget: 'econom',
      items: [
        { name: 'Яйца', amount: 2, unit: 'шт' },
        { name: 'Огурцы', amount: 100, unit: 'г' },
        { name: 'Помидоры', amount: 100, unit: 'г' },
      ],
      kcal: 200, p: 15, f: 11, c: 8,
    },
    {
      id: 'sn_econom_curd_banana',
      name: 'Творог с бананом',
      budget: 'econom',
      items: [
        { name: 'Творог 5%', amount: 130, unit: 'г' },
        { name: 'Банан', amount: 1, unit: 'шт' },
      ],
      kcal: 250, p: 20, f: 7, c: 30,
    },
    {
      id: 'sn_econom_apple_cheese',
      name: 'Яблоко с сыром',
      budget: 'econom',
      items: [
        { name: 'Яблоки', amount: 150, unit: 'г' },
        { name: 'Сыр твёрдый', amount: 30, unit: 'г' },
      ],
      kcal: 200, p: 8, f: 11, c: 20,
    },
    {
      id: 'sn_econom_kefir_bread',
      name: 'Кефир с цельнозерновым хлебом',
      budget: 'econom',
      items: [
        { name: 'Кефир 1%', amount: 300, unit: 'мл' },
        { name: 'Хлеб цельнозерновой', amount: 30, unit: 'г' },
      ],
      kcal: 200, p: 12, f: 4, c: 30,
    },
    {
      id: 'sn_econom_eggs_tomatoes',
      name: 'Яйца с томатами и зеленью',
      budget: 'econom',
      items: [
        { name: 'Яйца', amount: 2, unit: 'шт' },
        { name: 'Помидоры', amount: 150, unit: 'г' },
        { name: 'Зелень', amount: 20, unit: 'г' },
      ],
      kcal: 200, p: 15, f: 11, c: 8,
    },

    // — Стандарт (7) —
    {
      id: 'sn_std_yogurt_walnuts',
      name: 'Йогурт с грецкими орехами',
      budget: 'standard',
      items: [
        { name: 'Йогурт натуральный 2%', amount: 200, unit: 'г' },
        { name: 'Грецкие орехи', amount: 15, unit: 'г' },
      ],
      kcal: 230, p: 14, f: 13, c: 14,
    },
    {
      id: 'sn_std_curd_honey_nuts',
      name: 'Творог с мёдом и орехами',
      budget: 'standard',
      items: [
        { name: 'Творог 5%', amount: 150, unit: 'г' },
        { name: 'Мёд', amount: 10, unit: 'г' },
        { name: 'Грецкие орехи', amount: 10, unit: 'г' },
      ],
      kcal: 240, p: 25, f: 12, c: 13,
    },
    {
      id: 'sn_std_cheese_apple',
      name: 'Сыр с яблоком',
      budget: 'standard',
      items: [
        { name: 'Сыр твёрдый', amount: 40, unit: 'г' },
        { name: 'Яблоки', amount: 150, unit: 'г' },
      ],
      kcal: 230, p: 12, f: 13, c: 18,
    },
    {
      id: 'sn_std_yogurt_granola',
      name: 'Йогурт с гранолой',
      budget: 'standard',
      items: [
        { name: 'Йогурт натуральный 2%', amount: 200, unit: 'г' },
        { name: 'Гранола', amount: 30, unit: 'г' },
      ],
      kcal: 250, p: 13, f: 9, c: 33,
    },
    {
      id: 'sn_std_chicken_sandwich_mini',
      name: 'Мини-сэндвич с курицей',
      budget: 'standard',
      items: [
        { name: 'Хлеб цельнозерновой', amount: 40, unit: 'г' },
        { name: 'Куриная грудка', amount: 60, unit: 'г' },
        { name: 'Огурцы', amount: 50, unit: 'г' },
      ],
      kcal: 230, p: 22, f: 5, c: 24,
    },
    {
      id: 'sn_std_carrots_curd_dip',
      name: 'Морковные палочки с творожным соусом',
      budget: 'standard',
      items: [
        { name: 'Морковь', amount: 200, unit: 'г' },
        { name: 'Творог 5%', amount: 100, unit: 'г' },
        { name: 'Зелень', amount: 20, unit: 'г' },
      ],
      kcal: 210, p: 18, f: 6, c: 22,
    },
    {
      id: 'sn_std_curd_berries_honey',
      name: 'Творог с ягодами и мёдом',
      budget: 'standard',
      items: [
        { name: 'Творог 5%', amount: 150, unit: 'г' },
        { name: 'Замороженные ягоды', amount: 80, unit: 'г' },
        { name: 'Мёд', amount: 10, unit: 'г' },
      ],
      kcal: 250, p: 26, f: 8, c: 25,
    },

    // — Комфорт (5) —
    {
      id: 'sn_cmf_greek_yogurt_berries_almonds',
      name: 'Греческий йогурт с ягодами и миндалём',
      budget: 'comfort',
      items: [
        { name: 'Греческий йогурт', amount: 200, unit: 'г' },
        { name: 'Свежие ягоды', amount: 80, unit: 'г' },
        { name: 'Миндаль', amount: 10, unit: 'г' },
      ],
      kcal: 250, p: 18, f: 12, c: 20,
    },
    {
      id: 'sn_cmf_hummus_veg',
      name: 'Хумус с овощами',
      budget: 'comfort',
      items: [
        { name: 'Хумус', amount: 80, unit: 'г' },
        { name: 'Морковь', amount: 100, unit: 'г' },
        { name: 'Огурцы', amount: 100, unit: 'г' },
      ],
      kcal: 240, p: 8, f: 14, c: 22,
    },
    {
      id: 'sn_cmf_curd_almonds_honey',
      name: 'Творог с миндалём и мёдом',
      budget: 'comfort',
      items: [
        { name: 'Творог 9%', amount: 150, unit: 'г' },
        { name: 'Миндаль', amount: 15, unit: 'г' },
        { name: 'Мёд', amount: 10, unit: 'г' },
      ],
      kcal: 270, p: 25, f: 16, c: 12,
    },
    {
      id: 'sn_cmf_avocado_egg_sandwich',
      name: 'Сэндвич с авокадо и яйцом',
      budget: 'comfort',
      items: [
        { name: 'Хлеб цельнозерновой', amount: 50, unit: 'г' },
        { name: 'Авокадо', amount: 60, unit: 'г' },
        { name: 'Яйца', amount: 1, unit: 'шт' },
        { name: 'Шпинат', amount: 30, unit: 'г' },
      ],
      kcal: 280, p: 13, f: 18, c: 22,
    },
    {
      id: 'sn_cmf_curd_dried_fruits',
      name: 'Творожная масса с сухофруктами',
      budget: 'comfort',
      items: [
        { name: 'Творог 9%', amount: 150, unit: 'г' },
        { name: 'Сухофрукты', amount: 30, unit: 'г' },
        { name: 'Миндаль', amount: 10, unit: 'г' },
      ],
      kcal: 290, p: 22, f: 14, c: 25,
    },
  ],

  // — — — — — — — — — ОБЕДЫ (20) — — — — — — — — —
  lunches: [
    // — Эконом (8) —
    {
      id: 'ln_econom_chicken_buckwheat_salad',
      name: 'Курица с гречкой и салатом',
      budget: 'econom',
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
      id: 'ln_econom_chicken_rice_cabbage',
      name: 'Курица с рисом и тушёной капустой',
      budget: 'econom',
      items: [
        { name: 'Куриная грудка', amount: 180, unit: 'г' },
        { name: 'Рис', amount: 60, unit: 'г', context: 'сухой' },
        { name: 'Капуста белокочанная', amount: 200, unit: 'г' },
        { name: 'Масло подсолнечное', amount: 15, unit: 'мл' },
      ],
      kcal: 560, p: 50, f: 21, c: 45,
    },
    {
      id: 'ln_econom_pollock_potato_carrot',
      name: 'Минтай с картофелем и морковью',
      budget: 'econom',
      items: [
        { name: 'Минтай', amount: 200, unit: 'г' },
        { name: 'Картофель', amount: 200, unit: 'г' },
        { name: 'Морковь', amount: 100, unit: 'г' },
        { name: 'Масло подсолнечное', amount: 15, unit: 'мл' },
      ],
      kcal: 510, p: 45, f: 18, c: 42,
    },
    {
      id: 'ln_econom_chicken_noodle_soup',
      name: 'Куриный суп с лапшой и овощами',
      budget: 'econom',
      items: [
        { name: 'Куриная грудка', amount: 150, unit: 'г' },
        { name: 'Лапша', amount: 50, unit: 'г', context: 'сухой' },
        { name: 'Морковь', amount: 80, unit: 'г' },
        { name: 'Лук репчатый', amount: 50, unit: 'г' },
        { name: 'Картофель', amount: 100, unit: 'г' },
      ],
      kcal: 500, p: 42, f: 8, c: 65,
    },
    {
      id: 'ln_econom_chicken_cutlets_potato',
      name: 'Куриные котлеты с картофельным пюре',
      budget: 'econom',
      items: [
        { name: 'Куриный фарш', amount: 180, unit: 'г' },
        { name: 'Картофель', amount: 200, unit: 'г' },
        { name: 'Молоко 2,5%', amount: 50, unit: 'мл' },
        { name: 'Лук репчатый', amount: 30, unit: 'г' },
      ],
      kcal: 550, p: 42, f: 22, c: 42,
    },
    {
      id: 'ln_econom_buckwheat_stewed_chicken',
      name: 'Гречка с тушёной курицей',
      budget: 'econom',
      items: [
        { name: 'Куриные бёдра', amount: 150, unit: 'г' },
        { name: 'Гречка', amount: 60, unit: 'г', context: 'сухой' },
        { name: 'Лук репчатый', amount: 50, unit: 'г' },
        { name: 'Морковь', amount: 80, unit: 'г' },
      ],
      kcal: 560, p: 38, f: 22, c: 50,
    },
    {
      id: 'ln_econom_potato_casserole_egg',
      name: 'Картофельная запеканка с яйцом',
      budget: 'econom',
      items: [
        { name: 'Картофель', amount: 250, unit: 'г' },
        { name: 'Яйца', amount: 2, unit: 'шт' },
        { name: 'Сыр твёрдый', amount: 30, unit: 'г' },
        { name: 'Молоко 2,5%', amount: 100, unit: 'мл' },
      ],
      kcal: 500, p: 24, f: 22, c: 50,
    },
    {
      id: 'ln_econom_chicken_pea_puree',
      name: 'Курица с гороховым пюре',
      budget: 'econom',
      items: [
        { name: 'Куриная грудка', amount: 180, unit: 'г' },
        { name: 'Горох', amount: 70, unit: 'г', context: 'сухого' },
        { name: 'Морковь', amount: 80, unit: 'г' },
        { name: 'Лук репчатый', amount: 40, unit: 'г' },
      ],
      kcal: 540, p: 56, f: 9, c: 55,
    },

    // — Стандарт (7) —
    {
      id: 'ln_std_turkey_buckwheat_salad',
      name: 'Индейка с гречкой и салатом',
      budget: 'standard',
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
      id: 'ln_std_chicken_rice_broccoli',
      name: 'Куриное филе с рисом и брокколи',
      budget: 'standard',
      items: [
        { name: 'Куриная грудка', amount: 180, unit: 'г' },
        { name: 'Рис басмати', amount: 70, unit: 'г', context: 'сухой' },
        { name: 'Брокколи', amount: 150, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 590, p: 52, f: 22, c: 50,
    },
    {
      id: 'ln_std_cod_potato_salad',
      name: 'Треска с картофелем и салатом',
      budget: 'standard',
      items: [
        { name: 'Треска', amount: 200, unit: 'г' },
        { name: 'Картофель', amount: 200, unit: 'г' },
        { name: 'Огурцы', amount: 100, unit: 'г' },
        { name: 'Помидоры', amount: 100, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 560, p: 48, f: 20, c: 48,
    },
    {
      id: 'ln_std_turkey_bulgur_veg',
      name: 'Индейка с булгуром и овощами на пару',
      budget: 'standard',
      items: [
        { name: 'Филе индейки', amount: 180, unit: 'г' },
        { name: 'Булгур', amount: 60, unit: 'г', context: 'сухого' },
        { name: 'Кабачки', amount: 150, unit: 'г' },
        { name: 'Морковь', amount: 80, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 570, p: 50, f: 22, c: 48,
    },
    {
      id: 'ln_std_chicken_quinoa_spinach',
      name: 'Куриная грудка с киноа и шпинатом',
      budget: 'standard',
      items: [
        { name: 'Куриная грудка', amount: 180, unit: 'г' },
        { name: 'Киноа', amount: 60, unit: 'г', context: 'сухой' },
        { name: 'Шпинат', amount: 150, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 600, p: 52, f: 23, c: 48,
    },
    {
      id: 'ln_std_fish_soup',
      name: 'Рыбный суп с овощами',
      budget: 'standard',
      items: [
        { name: 'Треска', amount: 200, unit: 'г' },
        { name: 'Картофель', amount: 150, unit: 'г' },
        { name: 'Морковь', amount: 80, unit: 'г' },
        { name: 'Лук репчатый', amount: 50, unit: 'г' },
        { name: 'Зелень', amount: 20, unit: 'г' },
      ],
      kcal: 480, p: 46, f: 8, c: 55,
    },
    {
      id: 'ln_std_roasted_chicken_potato',
      name: 'Запечённая курица с картофелем по-деревенски',
      budget: 'standard',
      items: [
        { name: 'Куриные бёдра', amount: 180, unit: 'г' },
        { name: 'Картофель', amount: 250, unit: 'г' },
        { name: 'Чеснок', amount: 10, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 620, p: 38, f: 30, c: 50,
    },

    // — Комфорт (5) —
    {
      id: 'ln_cmf_salmon_quinoa_salad',
      name: 'Лосось с киноа и зелёным салатом',
      budget: 'comfort',
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
      id: 'ln_cmf_beef_bulgur_broccoli',
      name: 'Говядина с булгуром и брокколи',
      budget: 'comfort',
      items: [
        { name: 'Говядина (вырезка)', amount: 180, unit: 'г' },
        { name: 'Булгур', amount: 60, unit: 'г', context: 'сухого' },
        { name: 'Брокколи', amount: 150, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 600, p: 50, f: 24, c: 48,
    },
    {
      id: 'ln_cmf_turkey_wildrice_asparagus',
      name: 'Индейка с диким рисом и спаржей',
      budget: 'comfort',
      items: [
        { name: 'Филе индейки', amount: 180, unit: 'г' },
        { name: 'Рис дикий', amount: 60, unit: 'г', context: 'сухой' },
        { name: 'Спаржа', amount: 150, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 590, p: 52, f: 22, c: 48,
    },
    {
      id: 'ln_cmf_beef_steak_grilled_veg',
      name: 'Стейк говяжий с овощами гриль',
      budget: 'comfort',
      items: [
        { name: 'Говядина (вырезка)', amount: 200, unit: 'г' },
        { name: 'Кабачки', amount: 150, unit: 'г' },
        { name: 'Болгарский перец', amount: 100, unit: 'г' },
        { name: 'Помидоры', amount: 100, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 580, p: 54, f: 28, c: 28,
    },
    {
      id: 'ln_cmf_shrimp_quinoa_avocado',
      name: 'Креветки с киноа и авокадо',
      budget: 'comfort',
      items: [
        { name: 'Креветки', amount: 200, unit: 'г' },
        { name: 'Киноа', amount: 60, unit: 'г', context: 'сухой' },
        { name: 'Авокадо', amount: 60, unit: 'г' },
        { name: 'Шпинат', amount: 100, unit: 'г' },
        { name: 'Масло оливковое', amount: 10, unit: 'мл' },
      ],
      kcal: 590, p: 50, f: 24, c: 48,
    },
  ],

  // — — — — — — — — — УЖИНЫ (20) — — — — — — — — —
  dinners: [
    // — Эконом (8) —
    {
      id: 'dn_econom_pollock_potato_veg',
      name: 'Минтай с картофелем и овощами',
      budget: 'econom',
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
      id: 'dn_econom_chicken_veg',
      name: 'Куриная грудка с овощами',
      budget: 'econom',
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
      id: 'dn_econom_curd_veg_salad',
      name: 'Творог с овощным салатом',
      budget: 'econom',
      items: [
        { name: 'Творог 5%', amount: 200, unit: 'г' },
        { name: 'Огурцы', amount: 100, unit: 'г' },
        { name: 'Помидоры', amount: 100, unit: 'г' },
        { name: 'Хлеб ржаной', amount: 40, unit: 'г' },
        { name: 'Масло подсолнечное', amount: 10, unit: 'мл' },
      ],
      kcal: 460, p: 38, f: 18, c: 35,
    },
    {
      id: 'dn_econom_chicken_meatballs_rice',
      name: 'Куриные тефтели с рисом',
      budget: 'econom',
      items: [
        { name: 'Куриный фарш', amount: 180, unit: 'г' },
        { name: 'Рис', amount: 50, unit: 'г', context: 'сухой' },
        { name: 'Капуста белокочанная', amount: 150, unit: 'г' },
        { name: 'Лук репчатый', amount: 30, unit: 'г' },
      ],
      kcal: 510, p: 42, f: 18, c: 45,
    },
    {
      id: 'dn_econom_pollock_carrot_onion',
      name: 'Запечённый минтай с морковью и луком',
      budget: 'econom',
      items: [
        { name: 'Минтай', amount: 220, unit: 'г' },
        { name: 'Морковь', amount: 150, unit: 'г' },
        { name: 'Лук репчатый', amount: 80, unit: 'г' },
        { name: 'Картофель', amount: 100, unit: 'г' },
        { name: 'Масло подсолнечное', amount: 15, unit: 'мл' },
      ],
      kcal: 480, p: 44, f: 18, c: 30,
    },
    {
      id: 'dn_econom_buckwheat_egg_veg',
      name: 'Гречка с яйцом и овощами',
      budget: 'econom',
      items: [
        { name: 'Гречка', amount: 70, unit: 'г', context: 'сухой' },
        { name: 'Яйца', amount: 2, unit: 'шт' },
        { name: 'Помидоры', amount: 100, unit: 'г' },
        { name: 'Огурцы', amount: 100, unit: 'г' },
        { name: 'Масло подсолнечное', amount: 10, unit: 'мл' },
      ],
      kcal: 450, p: 22, f: 18, c: 50,
    },
    {
      id: 'dn_econom_chicken_pumpkin',
      name: 'Курица с печёной тыквой',
      budget: 'econom',
      items: [
        { name: 'Куриная грудка', amount: 180, unit: 'г' },
        { name: 'Тыква', amount: 250, unit: 'г' },
        { name: 'Лук репчатый', amount: 40, unit: 'г' },
        { name: 'Масло подсолнечное', amount: 15, unit: 'мл' },
      ],
      kcal: 440, p: 42, f: 18, c: 28,
    },
    {
      id: 'dn_econom_pumpkin_soup_chicken',
      name: 'Суп-пюре из тыквы с курицей',
      budget: 'econom',
      items: [
        { name: 'Куриная грудка', amount: 150, unit: 'г' },
        { name: 'Тыква', amount: 250, unit: 'г' },
        { name: 'Картофель', amount: 100, unit: 'г' },
        { name: 'Лук репчатый', amount: 40, unit: 'г' },
        { name: 'Молоко 2,5%', amount: 100, unit: 'мл' },
      ],
      kcal: 430, p: 38, f: 8, c: 50,
    },

    // — Стандарт (7) —
    {
      id: 'dn_std_cod_steamed_veg',
      name: 'Треска с овощами на пару',
      budget: 'standard',
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
      id: 'dn_std_chicken_bulgur_zucchini',
      name: 'Курица с булгуром и кабачками',
      budget: 'standard',
      items: [
        { name: 'Куриная грудка', amount: 170, unit: 'г' },
        { name: 'Булгур', amount: 50, unit: 'г', context: 'сухого' },
        { name: 'Кабачки', amount: 200, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 490, p: 45, f: 19, c: 38,
    },
    {
      id: 'dn_std_turkey_veg_stew',
      name: 'Индейка с овощным рагу',
      budget: 'standard',
      items: [
        { name: 'Филе индейки', amount: 180, unit: 'г' },
        { name: 'Кабачки', amount: 150, unit: 'г' },
        { name: 'Помидоры', amount: 100, unit: 'г' },
        { name: 'Картофель', amount: 100, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 500, p: 46, f: 20, c: 32,
    },
    {
      id: 'dn_std_baked_turkey_veg',
      name: 'Запечённая индейка с овощами',
      budget: 'standard',
      items: [
        { name: 'Филе индейки', amount: 200, unit: 'г' },
        { name: 'Брокколи', amount: 150, unit: 'г' },
        { name: 'Болгарский перец', amount: 100, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 480, p: 50, f: 22, c: 22,
    },
    {
      id: 'dn_std_chicken_beans',
      name: 'Курица с тушёной фасолью',
      budget: 'standard',
      items: [
        { name: 'Куриная грудка', amount: 170, unit: 'г' },
        { name: 'Фасоль красная', amount: 100, unit: 'г', context: 'сухой' },
        { name: 'Помидоры', amount: 100, unit: 'г' },
        { name: 'Лук репчатый', amount: 40, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 560, p: 52, f: 18, c: 50,
    },
    {
      id: 'dn_std_pollock_quinoa_veg',
      name: 'Минтай с киноа и овощами',
      budget: 'standard',
      items: [
        { name: 'Минтай', amount: 200, unit: 'г' },
        { name: 'Киноа', amount: 50, unit: 'г', context: 'сухой' },
        { name: 'Шпинат', amount: 100, unit: 'г' },
        { name: 'Морковь', amount: 80, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 500, p: 50, f: 18, c: 38,
    },
    {
      id: 'dn_std_chicken_kebab_salad',
      name: 'Куриный кебаб с овощным салатом',
      budget: 'standard',
      items: [
        { name: 'Куриная грудка', amount: 200, unit: 'г' },
        { name: 'Огурцы', amount: 100, unit: 'г' },
        { name: 'Помидоры', amount: 100, unit: 'г' },
        { name: 'Болгарский перец', amount: 80, unit: 'г' },
        { name: 'Лук репчатый', amount: 40, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 490, p: 52, f: 20, c: 25,
    },

    // — Комфорт (5) —
    {
      id: 'dn_cmf_trout_veg',
      name: 'Запечённая форель с овощами',
      budget: 'comfort',
      items: [
        { name: 'Форель', amount: 200, unit: 'г' },
        { name: 'Спаржа', amount: 150, unit: 'г' },
        { name: 'Картофель', amount: 100, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 540, p: 48, f: 24, c: 32,
    },
    {
      id: 'dn_cmf_beef_veg_stew',
      name: 'Говядина с овощным рагу',
      budget: 'comfort',
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
      id: 'dn_cmf_chicken_quinoa_broccoli',
      name: 'Куриная грудка с киноа и брокколи',
      budget: 'comfort',
      items: [
        { name: 'Куриная грудка', amount: 180, unit: 'г' },
        { name: 'Киноа', amount: 50, unit: 'г', context: 'сухой' },
        { name: 'Брокколи', amount: 200, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 510, p: 50, f: 18, c: 38,
    },
    {
      id: 'dn_cmf_salmon_sweetpotato_asparagus',
      name: 'Лосось со спаржей и сладким картофелем',
      budget: 'comfort',
      items: [
        { name: 'Лосось', amount: 180, unit: 'г' },
        { name: 'Спаржа', amount: 150, unit: 'г' },
        { name: 'Сладкий картофель', amount: 150, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 580, p: 42, f: 28, c: 42,
    },
    {
      id: 'dn_cmf_beef_medallions_grilled_veg',
      name: 'Говяжьи медальоны с овощами гриль',
      budget: 'comfort',
      items: [
        { name: 'Говядина (вырезка)', amount: 200, unit: 'г' },
        { name: 'Болгарский перец', amount: 150, unit: 'г' },
        { name: 'Кабачки', amount: 150, unit: 'г' },
        { name: 'Масло оливковое', amount: 15, unit: 'мл' },
      ],
      kcal: 580, p: 54, f: 28, c: 28,
    },
  ],
};

// Хелпер: получить блюда для указанного бюджета
export function getMealsForBudget(slot, budget) {
  const all = meals[slot] || [];
  return all.filter((m) => m.budget === budget);
}

// Хелпер: все слоты приёмов пищи
export const MEAL_SLOTS = ['breakfasts', 'snacks', 'lunches', 'dinners'];
