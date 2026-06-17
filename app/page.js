'use client';
 
import { useState } from 'react';
import HomeScreen from '@/components/HomeScreen';
import Survey from '@/components/Survey';
import Results from '@/components/Results';
import AINutritionist from '@/components/AINutritionist';
 
export default function Home() {
  // Текущий режим: 'home' | 'quick' | 'weekly' | 'ai'
  const [mode, setMode] = useState('home');
  // Результаты расчёта (если есть)
  const [results, setResults] = useState(null);
 
  // Полный возврат на главный экран: сбрасываем и результаты, и режим.
  const goHome = () => {
    setResults(null);
    setMode('home');
  };
 
  // Перезапуск анкеты в текущем режиме: сбрасываем только результаты,
  // mode остаётся ('quick' или 'weekly'), поэтому ниже снова отрендерится Survey.
  const restartSurvey = () => {
    setResults(null);
  };
 
  // Если есть результаты — показываем экран результатов.
  // Передаём mode явно в props, чтобы Results однозначно знал, что рисовать.
  if (results) {
    return (
      <Results
        data={results}
        mode={mode}
        onReset={restartSurvey}
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


