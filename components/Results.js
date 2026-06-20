use client';
 
import { useState } from 'react';
import HomeScreen from '@/components/HomeScreen';
import Survey from '@/components/Survey';
import Results from '@/components/Results';
import AINutritionist from '@/components/AINutritionist';
 
export default function Home() {
  const [mode, setMode] = useState('home');
  const [results, setResults] = useState(null);
 
  // === DEBUG: каждый рендер пишем текущее состояние ===
  console.log(
    '%c[Home] render',
    'color:#4A7C59;font-weight:bold',
    { mode, hasResults: !!results }
  );
 
  const goHome = () => {
    console.log('%c[Home] goHome() called', 'color:red;font-weight:bold');
    console.trace('goHome trace');
    setResults(null);
    setMode('home');
  };
 
  const restartSurvey = () => {
    console.log('%c[Home] restartSurvey() called', 'color:red;font-weight:bold');
    console.trace('restartSurvey trace');
    setResults(null);
  };
 
  // Оборачиваем setResults в логгер, чтобы видеть когда и с чем вызывается
  const handleSetResults = (r) => {
    console.log(
      '%c[Home] setResults() called with:',
      'color:blue;font-weight:bold',
      r
    );
    setResults(r);
  };
 
  const handleSetMode = (m) => {
    console.log(
      '%c[Home] setMode() called with:',
      'color:blue;font-weight:bold',
      m
    );
    setMode(m);
  };
 
  if (results) {
    console.log('[Home] → рендерю Results');
    return (
      <Results
        data={results}
        mode={mode}
        onReset={restartSurvey}
        onGoHome={goHome}
      />
    );
  }
 
  if (mode === 'ai') {
    console.log('[Home] → рендерю AINutritionist');
    return <AINutritionist onBack={goHome} />;
  }
 
  if (mode === 'quick' || mode === 'weekly') {
    console.log('[Home] → рендерю Survey, mode=', mode);
    return (
      <Survey mode={mode} onComplete={handleSetResults} onBack={goHome} />
    );
  }
 
  console.log('[Home] → рендерю HomeScreen');
  return <HomeScreen onSelectMode={handleSetMode} />;
}
