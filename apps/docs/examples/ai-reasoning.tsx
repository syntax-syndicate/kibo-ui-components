'use client';

import {
  AIReasoning,
  AIReasoningContent,
  AIReasoningTrigger,
} from '@repo/ai/reasoning';
import { useEffect, useState } from 'react';

const reasoningSteps = [
  'Let me think about this problem step by step.',
  '\n\nFirst, I need to understand what the user is asking for.',
  '\n\nThey want a reasoning component that opens automatically when streaming begins and closes when streaming finishes. The component should be composable and follow existing patterns in the codebase.',
  '\n\nThis seems like a collapsible component with state management would be the right approach.',
  '\n\nI should create a component that uses a controlled/uncontrolled pattern for flexibility. It needs to be aware of streaming state and handle auto-opening and closing based on that state. Most importantly, it should provide a smooth and intuitive user experience.',
  "\n\nThe component should be similar to how ChatGPT shows reasoning, with a clean and professional appearance that helps users understand the AI's thought process.",
];

const Example = () => {
  const [content, setContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setContent('');
    setCurrentStep(0);
    setIsStreaming(true);
  }, []);

  useEffect(() => {
    if (!isStreaming || currentStep >= reasoningSteps.length) {
      if (isStreaming) {
        setIsStreaming(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      setContent((prev) => prev + reasoningSteps[currentStep]);
      setCurrentStep((prev) => prev + 1);
    }, 300);

    return () => clearTimeout(timer);
  }, [isStreaming, currentStep]);

  return (
    <div className="p-4">
      <AIReasoning isStreaming={isStreaming}>
        <AIReasoningTrigger title="AI Reasoning" />
        <AIReasoningContent>{content}</AIReasoningContent>
      </AIReasoning>
    </div>
  );
};

export default Example;
