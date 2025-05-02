'use client';

import { AIMessage } from '@repo/ai/message';
import { AIResponse } from '@repo/ai/response';

const messages: {
  from: 'user' | 'assistant';
  content: string;
  avatar: string;
  name: string;
}[] = [
  {
    from: 'assistant',
    content: `To get the **weather in Tokyo** using an API call, you can use the [OpenWeatherMap](https://openweathermap.org/api) API.

After signing up, you can make a request to their API:

\`\`\`bash
curl -X GET "https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=YOUR_API_KEY" \\
  --header "Content-Type: application/json" \\
  --header "Accept: application/json"
\`\`\`

This will return a JSON object with the weather data for Tokyo.`,
    avatar: 'https://github.com/openai.png',
    name: 'OpenAI',
  },
];

const Example = () => (
  <>
    {messages.map(({ content, ...message }, index) => (
      <AIMessage key={index} {...message}>
        <AIResponse>{content}</AIResponse>
      </AIMessage>
    ))}
  </>
);

export default Example;
