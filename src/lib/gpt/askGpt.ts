const Authorization = `Bearer ${process.env.NEXT_PUBLIC_GPT_API_KEY}`;

export const askGpt = async (content: string) => {
  const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content
          }
        ]
      })
    }
  );
  const data = await response.json();
  return data.choices[0].text.trim();
};
