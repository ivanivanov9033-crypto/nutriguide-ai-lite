'use client';

import { useState, useEffect } from 'react';
import HomeScreen from '@/components/HomeScreen';
import Survey from '@/components/Survey';
import Results from '@/components/Results';
import AINutritionist from '@/components/AINutritionist';
import { generateMenu, generateWeeklyMenu } from '@/lib/menuGenerator';
import { calculateBudget } from '@/lib/prices';

const STORAGE_KEY = 'nutriguide-state-v1';

export default function Home() {
  // Текущий режим: 'home' | 'quick' | 'weekly' | 'ai'
  const [mode, setMode] = useState('home');
  // Результаты расчёта (если есть)
  const [results, setResults] = useState(null);
  // Флаг: загрузка из localStorage завершена.
  // Нужен, чтобы не сохранять пустое состояние до восстановления.
  const [hydrated, setHydrated] = useState(false);

  // Загрузка сохранённого состояния при первом монтировании.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.results && parsed.mode) {
          setMode(parsed.mode);
          setResults(parsed.results);
        }
      }
    } catch (e) {
      // localStorage недоступен (incognito) или данные испорчены — игнорируем.
    }
    setHydrated(true);
  }, []);

  // Сохранение состояния при каждом изменении.
  // Если результат есть — пишем; если нет — удаляем запись.
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (results) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, results }));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      // localStorage переполнен или недоступен — молча игнорируем.
    }
  }, [mode, results, hydrated]);

  const goHome = () => {
    setResults(null);
    setMode('home');
  };

  const regenerateMenu = () => {
    if (!results) return;
    const userData = results.data;
    const nutrition = results.nutrition;
    const menuResult = mode === 'weekly'
      ? generateWeeklyMenu(userData, nutrition)
      : generateMenu(userData, nutrition);
    const budget = calculateBudget(menuResult.shoppingList, userData.country);
    setResults({
      data: userData,
      nutrition,
      ...menuResult,
      budget,
    });
  };

  // Пока не загрузили данные из localStorage — рендерим пустой экран,
  // чтобы избежать вспышки «главная → восстановленный результат».
  if (!hydrated) {
    return <div className="min-h-screen bg-cream" />;
  }

  if (results) {
    return (
      <Results
        data={results}
        mode={mode}
        onReset={regenerateMenu}
        onGoHome={goHome}
      />
    );
  }

  if (mode === 'ai') {
    return <AINutritionist onBack={goHome} />;
  }

  if (mode === 'quick' || mode === 'weekly') {
    return <Survey mode={mode} onComplete={setResults} onBack={goHome} />;
  }

  return <HomeScreen onSelectMode={setMode} />;
}
