import { cn } from '@/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/shadcn-ui/components/ui/avatar';
import type { HTMLAttributes, ReactNode } from 'react';

export type AIMessageProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The sender of the message
   */
  from: 'user' | 'assistant';
  /**
   * The content of the message
   */
  children: ReactNode;
  /**
   * Optional avatar URL for the message sender
   */
  avatar?: string;
  /**
   * Optional avatar fallback for when the image fails to load
   */
  name?: string;
};

export function AIMessage({
  className,
  from,
  children,
  avatar,
  name,
  ...props
}: AIMessageProps) {
  const isUser = from === 'user';

  return (
    <div
      className={cn(
        'flex w-full items-end justify-end gap-2 py-4',
        !isUser && 'flex-row-reverse justify-end',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'flex max-w-[80%] flex-col gap-2 rounded-lg px-4 py-3 text-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground'
        )}
      >
        <div className={isUser ? 'dark' : ''}>{children}</div>
      </div>
      <Avatar className={cn('h-8 w-8', isUser && 'order-last')}>
        {avatar && (
          <AvatarImage src={avatar} alt={isUser ? 'User' : 'AI Assistant'} />
        )}
        <AvatarFallback>
          {name?.slice(0, 2) || (isUser ? 'ME' : 'AI')}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
