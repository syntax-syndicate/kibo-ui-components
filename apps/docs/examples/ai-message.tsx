'use client';

import { AIMessage, AIMessageAvatar, AIMessageContent } from '@repo/ai/message';

const messages: {
  from: 'user' | 'assistant';
  content: string;
  avatar: string;
  name: string;
}[] = [
  {
    from: 'user',
    content: 'Hello, how are you?',
    avatar: 'https://github.com/haydenbleasel.png',
    name: 'Hayden Bleasel',
  },
  {
    from: 'assistant',
    content: 'I am fine, thank you!',
    avatar: 'https://github.com/openai.png',
    name: 'OpenAI',
  },
  {
    from: 'user',
    content: 'What is the weather in Tokyo?',
    avatar: 'https://github.com/haydenbleasel.png',
    name: 'Hayden Bleasel',
  },
  {
    from: 'assistant',
    content: 'The weather in Tokyo is sunny.',
    avatar: 'https://github.com/openai.png',
    name: 'OpenAI',
  },
];

const Example = () => (
  <>
    {messages.map(({ content, ...message }, index) => (
      <AIMessage key={index} from={message.from}>
        <AIMessageContent>{content}</AIMessageContent>
        <AIMessageAvatar src={message.avatar} name={message.name} />
      </AIMessage>
    ))}
  </>
);

export default Example;
