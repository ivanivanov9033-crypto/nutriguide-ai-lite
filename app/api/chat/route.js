// app/api/chat/route.js
// Серверная функция-прокси к Claude API.
// Принимает { messages, systemPrompt } от фронта, вызывает Claude, возвращает { reply }.
// API-ключ хранится в переменной окружения ANTHROPIC_API_KEY на Vercel.

export const runtime = 'edge';

export async function POST(request) {
  try {
    const body = await request.json();
    const { messages, systemPrompt } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Поле messages должно быть непустым массивом.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API-ключ не настроен на сервере.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: systemPrompt || '',
        messages: messages,
      }),
    });

    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text();
      return new Response(
        JSON.stringify({
          error: `Claude API вернул ошибку (${claudeResponse.status}): ${errorText}`,
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await claudeResponse.json();
    const reply = data?.content?.[0]?.text || 'Не удалось получить ответ от модели.';

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `Внутренняя ошибка: ${err.message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
