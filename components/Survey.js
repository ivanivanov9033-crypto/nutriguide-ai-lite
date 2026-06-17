'use client';

import { useState } from 'react';
import ProgressBar from './ProgressBar';
import { calculateNutrition } from '@/lib/calculations';
import { generateMenu } from '@/lib/menuGenerator';
import { calculateBudget } from '@/lib/prices';

const STEPS = [
  { id: 'gender', title: 'Ваш пол' },
  { id: 'metrics', title: 'Базовые данные' },
  { id: 'goal', title: 'Ваша цель' },
  { id: 'activity', title: 'Уровень активности' },
  { id: 'budget', title: 'Бюджет на питание' },
  { id: 'country', title: 'Страна и валюта' },
  { id: 'restrictions', title: 'Ограничения по питанию' },
];

export default function Survey({ onComplete }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    gender: '',
    age: '',
    height: '',
    weight: '',
    goal: '',
    activity: '',
    budget: '',
    country: '',
    restrictions: '',
  });

  const updateField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    const current = STEPS[step].id;
    if (current === 'gender') return !!data.gender;
    if (current === 'metrics') {
      const age = parseInt(data.age, 10);
      const height = parseInt(data.height, 10);
      const weight = parseInt(data.weight, 10);
      return (
        age >= 18 && age <= 100 &&
        height >= 120 && height <= 230 &&
        weight >= 35 && weight <= 250
      );
    }
    if (current === 'goal') return !!data.goal;
    if (current === 'activity') return !!data.activity;
    if (current === 'budget') return !!data.budget;
    if (current === 'country') return !!data.country;
    if (current === 'restrictions') return true; // необязательное
    return false;
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const nutrition = calculateNutrition(data);
      const menu = generateMenu(data, nutrition);
      const budget = calculateBudget(menu.shoppingList, data.country);
      onComplete({ data, nutrition, menu, budget });
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentStep = STEPS[step];
  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sage-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">N</span>
            </div>
            <span className="font-semibold text-gray-900">NutriGuide AI Lite</span>
          </div>
          <span className="text-sm text-gray-500">
            Шаг {step + 1} из {STEPS.length}
          </span>
        </div>
      </header>

      <ProgressBar current={step + 1} total={STEPS.length} />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 sm:py-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {currentStep.title}
          </h2>

          {step === 0 && <GenderStep value={data.gender} onChange={(v) => updateField('gender', v)} />}
          {step === 1 && <MetricsStep data={data} updateField={updateField} />}
          {step === 2 && <GoalStep value={data.goal} onChange={(v) => updateField('goal', v)} />}
          {step === 3 && <ActivityStep value={data.activity} onChange={(v) => updateField('activity', v)} />}
          {step === 4 && <BudgetStep value={data.budget} onChange={(v) => updateField('budget', v)} />}
          {step === 5 && <CountryStep value={data.country} onChange={(v) => updateField('country', v)} />}
          {step === 6 && <RestrictionsStep value={data.restrictions} onChange={(v) => updateField('restrictions', v)} />}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="px-5 py-3 rounded-xl text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition font-medium"
          >
            Назад
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-6 py-3 rounded-xl bg-sage-500 hover:bg-sage-600 text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
          >
            {isLastStep ? 'Получить рацион' : 'Далее'}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6 px-2 leading-relaxed">
          NutriGuide AI не является врачом и не заменяет консультацию специалиста.
          Рекомендации носят информационный характер.
        </p>
      </main>
    </div>
  );
}

// — — — Step components — — —

function GenderStep({ value, onChange }) {
  const opts = [
    { id: 'male', label: 'Мужской' },
    { id: 'female', label: 'Женский' },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {opts.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`py-4 px-6 rounded-xl border-2 font-medium transition ${
            value === o.id
              ? 'border-sage-500 bg-sage-50 text-sage-700'
              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function MetricsStep({ data, updateField }) {
  return (
    <div className="space-y-4">
      <NumberField
        label="Возраст (полных лет)"
        value={data.age}
        onChange={(v) => updateField('age', v)}
        placeholder="например, 35"
        min={18}
        max={100}
      />
      <NumberField
        label="Рост (см)"
        value={data.height}
        onChange={(v) => updateField('height', v)}
        placeholder="например, 175"
        min={120}
        max={230}
      />
      <NumberField
        label="Вес (кг)"
        value={data.weight}
        onChange={(v) => updateField('weight', v)}
        placeholder="например, 80"
        min={35}
        max={250}
      />
    </div>
  );
}

function NumberField({ label, value, onChange, placeholder, min, max }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-100 transition"
      />
    </div>
  );
}

function GoalStep({ value, onChange }) {
  const goals = [
    { id: 'lose', label: 'Похудеть', desc: 'Снижение веса с дефицитом калорий' },
    { id: 'maintain', label: 'Удержать вес', desc: 'Поддерживать текущий вес' },
    { id: 'gain', label: 'Набрать массу', desc: 'Набор мышечной массы с профицитом' },
  ];
  return (
    <div className="space-y-3">
      {goals.map((g) => (
        <OptionCard key={g.id} active={value === g.id} onClick={() => onChange(g.id)}>
          <div className="font-medium text-gray-900">{g.label}</div>
          <div className="text-sm text-gray-500 mt-1">{g.desc}</div>
        </OptionCard>
      ))}
    </div>
  );
}

function ActivityStep({ value, onChange }) {
  const levels = [
    { id: 'sedentary', label: 'Сидячая', desc: 'Офисная работа, без тренировок' },
    { id: 'light', label: 'Лёгкая', desc: '1–3 тренировки в неделю или регулярные прогулки' },
    { id: 'moderate', label: 'Умеренная', desc: '3–5 тренировок в неделю' },
    { id: 'high', label: 'Высокая', desc: '6–7 тренировок в неделю или физическая работа' },
  ];
  return (
    <div className="space-y-3">
      {levels.map((l) => (
        <OptionCard key={l.id} active={value === l.id} onClick={() => onChange(l.id)}>
          <div className="font-medium text-gray-900">{l.label}</div>
          <div className="text-sm text-gray-500 mt-1">{l.desc}</div>
        </OptionCard>
      ))}
    </div>
  );
}

function BudgetStep({ value, onChange }) {
  const budgets = [
    { id: 'econom', label: 'Эконом', desc: 'Простые доступные продукты' },
    { id: 'standard', label: 'Стандарт', desc: 'Обычный набор без излишеств' },
    { id: 'comfort', label: 'Комфорт', desc: 'Разнообразное меню без жёстких ограничений' },
  ];
  return (
    <div className="space-y-3">
      {budgets.map((b) => (
        <OptionCard key={b.id} active={value === b.id} onClick={() => onChange(b.id)}>
          <div className="font-medium text-gray-900">{b.label}</div>
          <div className="text-sm text-gray-500 mt-1">{b.desc}</div>
        </OptionCard>
      ))}
    </div>
  );
}

function CountryStep({ value, onChange }) {
  const countries = [
    { id: 'kz', label: 'Казахстан', currency: 'тенге' },
    { id: 'ru', label: 'Россия', currency: 'рубли' },
    { id: 'other', label: 'Другое', currency: 'оценка стоимости недоступна' },
  ];
  return (
    <div className="space-y-3">
      {countries.map((c) => (
        <OptionCard key={c.id} active={value === c.id} onClick={() => onChange(c.id)}>
          <div className="font-medium text-gray-900">{c.label}</div>
          <div className="text-sm text-gray-500 mt-1">Валюта: {c.currency}</div>
        </OptionCard>
      ))}
    </div>
  );
}

function RestrictionsStep({ value, onChange }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-3 leading-relaxed">
        Укажите аллергии или продукты, которые вы не едите. Этот пункт необязательный — можно пропустить.
      </p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Например: не ем рыбу, аллергия на орехи"
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-100 transition min-h-[120px] resize-y"
      />
    </div>
  );
}

function OptionCard({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition ${
        active
          ? 'border-sage-500 bg-sage-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      {children}
    </button>
  );
}
