// Расчёты по формуле Миффлина — Сан Жеора

export function calculateNutrition(data) {
  const age = parseInt(data.age, 10);
  const height = parseInt(data.height, 10);
  const weight = parseInt(data.weight, 10);
  const isMale = data.gender === 'male';

  // BMR
  const bmr = isMale
    ? Math.round(10 * weight + 6.25 * height - 5 * age + 5)
    : Math.round(10 * weight + 6.25 * height - 5 * age - 161);

  // Коэффициент активности
  const activityCoeff =
    {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      high: 1.725,
    }[data.activity] || 1.2;

  const tdee = Math.round(bmr * activityCoeff);

  // Целевая калорийность
  let target;
  let deficit = null;
  let surplus = null;

  if (data.goal === 'lose') {
    deficit = 18;
    target = Math.round((tdee * (100 - deficit)) / 100);
  } else if (data.goal === 'gain') {
    surplus = 12;
    target = Math.round((tdee * (100 + surplus)) / 100);
  } else {
    target = tdee;
  }

  // БЖУ в г/кг
  let proteinPerKg;
  let fatPerKg;

  if (data.goal === 'lose') {
    // Для людей старше 50 лет без интенсивных тренировок — более умеренный белок
    proteinPerKg = age > 50 ? 1.6 : 1.8;
    fatPerKg = 0.9;
  } else if (data.goal === 'gain') {
    proteinPerKg = 1.8;
    fatPerKg = 1.0;
  } else {
    proteinPerKg = 1.4;
    fatPerKg = 1.0;
  }

  const protein = Math.round(weight * proteinPerKg);
  const fat = Math.round(weight * fatPerKg);
  const carbs = Math.max(0, Math.round((target - protein * 4 - fat * 9) / 4));

  return {
    bmr,
    tdee,
    target,
    protein,
    fat,
    carbs,
    deficit,
    surplus,
    activityCoeff,
  };
}
