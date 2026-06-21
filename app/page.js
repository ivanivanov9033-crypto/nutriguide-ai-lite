'use client';
 
import { useState } from 'react';
import HomeScreen from '@/components/HomeScreen';
import Survey from '@/components/Survey';
import Results from '@/components/Results';
import AINutritionist from '@/components/AINutritionist';
import { generateMenu, generateWeeklyMenu } from '@/lib/menuGenerator';
import { calculateBudget } from '@/lib/prices';
 
export default function Home() {
  // Текущий режим: 'home' | 'quick' | 'weekly' | 'ai'
  const [mode, setMode] = useState('home');
  // Результаты расчёта (если есть)
  const [results, setResults] = useState(null);
 
  // Полный возврат на главный экран
  const goHome = () => {
    setResults(null);
    setMode('home');
  };
 
  // Пересобрать меню с теми же данными, но с другими блюдами.
  // Не возвращает в анкету — пользователь остаётся на экране результатов,
  // но видит новый набор блюд (за счёт случайного сдвига в генераторе).
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
 
  // Если есть результаты — показываем экран результатов
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
 
  // Режим AI
  if (mode === 'ai') {
    return <AINutritionist onBack={goHome} />;
  }
 
  // Режим анкеты (quick или weekly)
  if (mode === 'quick' || mode === 'weekly') {
    return <Survey mode={mode} onComplete={setResults} onBack={goHome} />;
  }
 
  // По умолчанию — главный экран
  return <HomeScreen onSelectMode={setMode} />;
}
