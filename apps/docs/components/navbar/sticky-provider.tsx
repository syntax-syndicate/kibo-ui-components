'use client';

import { cn } from '@repo/shadcn-ui/lib/utils';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

type StickyProviderProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

function useScrolled() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isScrolled;
}

export const StickyProvider = ({
  children,
  className,
}: StickyProviderProps) => {
  const isScrolled = useScrolled();

  return (
    <div
      className={cn(
        isScrolled && 'border-b bg-background/95 backdrop-blur-sm',
        className
      )}
    >
      {children}
    </div>
  );
};
