'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SiReact } from '@icons-pack/react-simple-icons';
import {
  type BundledLanguage,
  CodeBlockContent,
  CodeBlockItem,
} from '@repo/code-block';
import { CodeBlockBody } from '@repo/code-block';
import { CodeBlock } from '@repo/code-block';

type PreviewSourceProps = {
  source: { name: string; source: string }[];
};

export const PreviewSource = ({ source }: PreviewSourceProps) => (
  <Accordion type="single" collapsible>
    {source.map(({ name, source }) => (
      <AccordionItem value={name} key={name}>
        <AccordionTrigger className="rounded-none bg-secondary px-4">
          <div className="flex items-center gap-2 text-sm">
            <SiReact className="size-4 text-muted-foreground" />
            <span>{name}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <CodeBlock
            data={[
              {
                language: 'tsx',
                filename: name,
                code: source,
              },
            ]}
            defaultValue="tsx"
            className="overflow-auto rounded-none border-none"
          >
            <CodeBlockBody>
              {(item) => (
                <CodeBlockItem key={item.language} value={item.language}>
                  <CodeBlockContent language={item.language as BundledLanguage}>
                    {item.code}
                  </CodeBlockContent>
                </CodeBlockItem>
              )}
            </CodeBlockBody>
          </CodeBlock>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);
