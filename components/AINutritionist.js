'use client';

import { useState, useRef, useEffect } from 'react';

export default function AINutritionist({ results, onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const hasContext = !!results?.data;
  const systemPrompt = buildSystemPrompt(results);

  // Приветственное сообщение от ассистента в начале диалога
  useEffect(() => {
    if (messages.length === 0) {
      const welcome = hasContext
        ? 'Здравствуйте! Я ваш AI-нутрициолог. У меня уже есть ваш план питания, расчёты BMR/TDEE и список блюд. Задайте любой вопрос: можно про конкретное блюдо, замену продуктов, БЖУ или общие принципы питания.'
        : 'Здравствуйте! Я AI-нутрициолог в NutriGuide. Вы пока не заполнили анкету, поэтому я не знаю ваших данных. Можете задать общий вопрос о питании, или вернуться на главную и составить персональный план — тогда я смогу давать конкретные советы под вас.';
      setMessages([{ role: 'assistant', content: welcome }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Автопрокрутка вниз при появлении новых сообщений
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage = { role: 'user', content: text };
    const apiMessages = [...messages, userMessage];

    setMessages(apiMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          systemPrompt,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Ошибка сервера: ${response.status}`);
      }

      const data = await response.json();
      setMessages([...apiMessages, { role: 'assistant', content: data.reply }]);
    } catch (e) {
      setError(e.message || 'Не удалось получить ответ. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Шапка */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-sage-700 transition"
          >
            <span className="text-lg leading-none">←</span>
            <div className="w-8 h-8 bg-sage-500 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-semibold text-sm">N</span>
            </div>
            <span className="font-semibold text-gray-900 hidden sm:inline">
              На главную
            </span>
          </button>
          <span className="text-xs text-sage-700 bg-sage-50 px-2.5 py-1 rounded-full font-medium">
            AI Нутрициолог
          </span>
        </div>
      </header>

      {/* Лента сообщений */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 pb-40 space-y-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {loading && <TypingIndicator />}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Поле ввода — фиксировано внизу */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Спросите что-нибудь о вашем питании..."
            rows={1}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-100 transition resize-none min-h-[48px] max-h-[140px] text-sm sm:text-base disabled:opacity-50"
            style={{ height: 'auto' }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-5 py-3 rounded-xl bg-sage-500 hover:bg-sage-600 text-white font-medium transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            {loading ? '...' : 'Отправить'}
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-2 max-w-3xl mx-auto">
          AI Нутрициолог не является врачом. Информация носит ознакомительный характер.
        </p>
      </div>
    </div>
  );
}

// — — — Сообщение с поддержкой простого markdown — — —

function MessageBubble({ role, content }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-sage-500 text-white rounded-br-md'
            : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md'
        }`}
      >
        <FormattedText text={content} isUser={isUser} />
      </div>
    </div>
  );
}

// Очень лёгкий markdown-рендерер для ответов AI:
// - **жирный** → <strong>
// - строки, начинающиеся с "- " или "* " → элементы списка
// - пустые строки → разрыв абзаца
// Намеренно не подключаем внешние библиотеки, чтобы не раздувать бандл.
function FormattedText({ text, isUser }) {
  // Разделяем текст на блоки: списки и обычные параграфы
  const lines = text.split('\n');
  const blocks = [];
  let currentList = null;
  let currentParagraph = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      blocks.push({ type: 'p', lines: currentParagraph });
      currentParagraph = [];
    }
  };
  const flushList = () => {
    if (currentList) {
      blocks.push({ type: 'ul', items: currentList });
      currentList = null;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    // Пустая строка — разрыв
    if (line.trim() === '') {
      flushParagraph();
      flushList();
      continue;
    }
    // Элемент списка
    const listMatch = line.match(/^\s*[-*]\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      if (!currentList) currentList = [];
      currentList.push(listMatch[1]);
      continue;
    }
    // Обычная строка
    flushList();
    currentParagraph.push(line);
  }
  flushParagraph();
  flushList();

  return (
    <div className="text-sm sm:text-base leading-relaxed space-y-2">
      {blocks.map((block, i) => {
        if (block.type === 'ul') {
          return (
            <ul key={i} className="space-y-1 pl-1">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-2">
                  <span className="shrink-0">—</span>
                  <span>{renderInline(item, isUser)}</span>
                </li>
              ))}
            </ul>
          );
        }
        // Параграф: склеиваем строки через перенос, чтобы сохранить структуру
        return (
          <p key={i} className="whitespace-pre-wrap">
            {block.lines.map((ln, j) => (
              <span key={j}>
                {renderInline(ln, isUser)}
                {j < block.lines.length - 1 && '\n'}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

// Превращает **жирный** в <strong>
function renderInline(text, isUser) {
  const parts = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong
        key={key++}
        className={isUser ? 'font-semibold' : 'font-semibold text-gray-900'}
      >
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

// — — — Системный промпт — — —

function buildSystemPrompt(results) {
  if (!results?.data) {
    return `Ты — AI-нутрициолог в приложении NutriGuide AI Lite. Помогаешь пользователям с вопросами о питании, расчёте калорий, БЖУ, выборе продуктов и составлении меню.

Пользователь ещё не заполнил анкету в приложении, поэтому ты не знаешь его параметров. Если для конкретного совета нужны данные (пол, возраст, рост, вес, цель, активность), либо попроси пользователя их сообщить, либо предложи вернуться на главную и пройти анкету для персонального плана.

Стиль ответов:
— Русский язык, обращение на «вы».
— Кратко и по делу, без воды. Обычно 2–5 предложений.
— Без эмодзи.
— Конкретные числа, когда уместно (граммы, ккал).
— Можешь использовать **двойные звёздочки** для выделения важных слов и тире "—" для списков.

Ограничения:
— Ты не врач, медицинские диагнозы не ставишь.
— При симптомах болезни направляй к специалисту.
— Не пропагандируешь экстремальные диеты, голодание дольше 16 часов, агрессивный дефицит больше 25%.`;
  }

  const { data, nutrition, weekDays, dailyMenu } = results;
  const lines = [];

  lines.push('Ты — AI-нутрициолог в приложении NutriGuide AI Lite. Пользователь уже прошёл анкету и получил план питания. Твоя задача — отвечать на его вопросы об этом плане, объяснять расчёты, предлагать замены блюд и адаптации.');
  lines.push('');
  lines.push('О пользователе:');
  lines.push(`— Пол: ${data.gender === 'male' ? 'мужской' : 'женский'}`);
  lines.push(`— Возраст: ${data.age} лет`);
  lines.push(`— Рост: ${data.height} см`);
  lines.push(`— Вес: ${data.weight} кг`);
  lines.push(`— Цель: ${goalLabel(data.goal)}`);
  lines.push(`— Уровень активности: ${activityLabel(data.activity)}`);
  lines.push(`— Бюджет: ${budgetLabel(data.budget)}`);
  if (data.restrictionFlags && data.restrictionFlags.length > 0) {
    lines.push(`— Ограничения: ${data.restrictionFlags.map(flagLabel).join(', ')}`);
  }
  if (data.restrictions && data.restrictions.trim()) {
    lines.push(`— Дополнительно (от пользователя): ${data.restrictions.trim()}`);
  }
  lines.push('');
  lines.push('Рассчитанные показатели:');
  lines.push(`— BMR: ${nutrition.bmr} ккал`);
  lines.push(`— TDEE: ${nutrition.tdee} ккал`);
  lines.push(`— Целевая калорийность: ${nutrition.target} ккал/день`);
  lines.push(`— Белки: ${nutrition.protein} г, жиры: ${nutrition.fat} г, углеводы: ${nutrition.carbs} г`);

  if (weekDays && weekDays.length > 0) {
    lines.push('');
    lines.push('Текущее меню на 7 дней:');
    weekDays.forEach((day) => {
      const dishes = day.meals.map((m) => `${m.slot} — ${m.name} (${m.kcal} ккал)`).join('; ');
      lines.push(`— ${day.dayName} (${day.totals.kcal} ккал): ${dishes}`);
    });
  } else if (dailyMenu && dailyMenu.length > 0) {
    lines.push('');
    lines.push('Пример меню на день:');
    dailyMenu.forEach((m) => {
      lines.push(`— ${m.slot}: ${m.name} (${m.kcal} ккал, Б:${m.p}/Ж:${m.f}/У:${m.c})`);
    });
  }

  lines.push('');
  lines.push('Что ты можешь:');
  lines.push('— Объяснять, почему составлен именно такой план (откуда взялись цифры BMR/TDEE, как рассчитаны БЖУ).');
  lines.push('— Предлагать замены конкретных блюд с сохранением калорийности и БЖУ.');
  lines.push('— Адаптировать рекомендации под образ жизни (тренировки, работа, поездки).');
  lines.push('— Отвечать на общие вопросы о питании и продуктах.');
  lines.push('');
  lines.push('Стиль ответов:');
  lines.push('— Русский язык, обращение на «вы».');
  lines.push('— Кратко и по делу, без воды. Обычно 2–5 предложений.');
  lines.push('— Конкретные числа (граммы, ккал), когда уместно.');
  lines.push('— Без эмодзи.');
  lines.push('— Можешь использовать **двойные звёздочки** для выделения важных слов и тире "—" для списков.');
  lines.push('');
  lines.push('Ограничения:');
  lines.push('— Ты не врач. Медицинские диагнозы не ставишь, лекарств не назначаешь.');
  lines.push('— При жалобах на симптомы (боли, головокружение, недомогание) — направляй к врачу.');
  lines.push('— Не пропагандируешь экстремальные диеты, голодание дольше 16 часов, дефицит больше 25%.');
  lines.push('— Если пользователь просит изменить план под заболевание (диабет, ЖКТ, аллергия серьёзная) — рекомендуй согласовать с лечащим врачом.');

  return lines.join('\n');
}

function goalLabel(goal) {
  return goal === 'lose' ? 'похудение' : goal === 'gain' ? 'набор массы' : 'удержание веса';
}

function activityLabel(act) {
  return (
    {
      sedentary: 'сидячая',
      light: 'лёгкая',
      moderate: 'умеренная',
      high: 'высокая',
    }[act] || act
  );
}

function budgetLabel(b) {
  return { econom: 'эконом', standard: 'стандарт', comfort: 'комфорт' }[b] || b;
}

function flagLabel(flag) {
  return (
    {
      'no-fish': 'не ест рыбу и морепродукты',
      'no-meat': 'вегетарианец (не ест мясо)',
      'no-nuts': 'аллергия на орехи',
      'no-dairy': 'непереносимость лактозы',
      'no-eggs': 'не ест яйца',
    }[flag] || flag
  );
}
