import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export type CursorProps = HTMLAttributes<HTMLSpanElement> & {
  name?: string;
  message?: string;
};

const getTextColor = (bgColor: string) => {
  const hex = bgColor.replace('#', '');

  // Handle both 3 and 6 digit hex
  const r =
    hex.length === 3
      ? Number.parseInt(hex[0] + hex[0], 16)
      : Number.parseInt(hex.substring(0, 2), 16);
  const g =
    hex.length === 3
      ? Number.parseInt(hex[1] + hex[1], 16)
      : Number.parseInt(hex.substring(2, 4), 16);
  const b =
    hex.length === 3
      ? Number.parseInt(hex[2] + hex[2], 16)
      : Number.parseInt(hex.substring(4, 6), 16);

  const luminance = r * 0.299 + g * 0.587 + b * 0.114;

  return luminance > 186 ? '#000000' : '#ffffff';
};

export const Cursor = ({
  name,
  message,
  color = '#FFFFFF',
  className,
  ...props
}: CursorProps) => {
  const textColor = getTextColor(color);

  return (
    <span
      className={cn('relative', className)}
      style={{
        opacity: 1,
        filter: 'blur(0px)',
        willChange: 'auto',
        transform: 'none',
      }}
      {...props}
    >
      <span className="pointer-events-none relative select-none">
        <svg
          aria-hidden="true"
          focusable="false"
          className="size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            fill={color}
            d="M19.438 6.716 1.115.05A.832.832 0 0 0 .05 1.116L6.712 19.45a.834.834 0 0 0 1.557.025l3.198-8 7.995-3.2a.833.833 0 0 0 0-1.559h-.024Z"
          />
        </svg>
        {(name || message) && (
          <span
            className={cn(
              'relative ml-3.5 flex items-center whitespace-nowrap rounded-xl py-1 pr-3 pl-2.5 text-xs',
              message && 'rounded-tl'
            )}
            style={{ backgroundColor: color, color: textColor }}
          >
            <span className="flex flex-col">
              {name && (
                <span className={cn(message && 'opacity-70')}>{name}</span>
              )}
              {message && <span>{message}</span>}
            </span>
          </span>
        )}
      </span>
    </span>
  );
};
