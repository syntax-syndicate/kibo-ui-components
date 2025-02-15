'use client';

import { Button } from '@repo/shadcn-ui/components/ui/button';
import { useSearchContext } from 'fumadocs-ui/provider';
import { SearchIcon } from 'lucide-react';

export const Search = () => {
  const { setOpenSearch } = useSearchContext();

  return (
    <Button
      type="button"
      onClick={() => setOpenSearch(true)}
      variant="outline"
      className="w-full max-w-[464px] justify-between rounded-xl px-3 text-muted-foreground shadow-none"
    >
      <div className="flex min-w-[42px] items-center gap-3">
        <SearchIcon size={16} />
        <div className="truncate font-normal">Search or ask...</div>
      </div>
      <kbd className="flex-none font-medium font-sans text-xs">⌘K</kbd>
    </Button>
  );
};
