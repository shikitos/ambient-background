import config from 'config/config.json';

const gptConfig = config.api.gpt;
const Authorization = `Bearer ${process.env.NEXT_PUBLIC_GPT_API_KEY}`;

export const askGpt = async (content: string) => {
  const response = await fetch(gptConfig.base, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization
    },
    body: JSON.stringify({
      model: gptConfig.model,
      messages: [
        {
          role: 'user',
          content
        }
      ]
    })
  });
  const data = await response.json();
  return data.choices[0].text.trim();
};
