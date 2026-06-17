'use client';

import { useState } from 'react';
import Survey from '@/components/Survey';
import Results from '@/components/Results';

export default function Home() {
  const [results, setResults] = useState(null);

  if (results) {
    return <Results data={results} onReset={() => setResults(null)} />;
  }

  return <Survey onComplete={setResults} />;
}
