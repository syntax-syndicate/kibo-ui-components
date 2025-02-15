import { ThemeToggle } from 'fumadocs-ui/components/layout/theme-toggle';
import Image from 'next/image';
import Link from 'next/link';
import { Repo } from './repo';
import { Search } from './search';
import { StickyProvider } from './sticky-provider';

export const Navbar = () => (
  <StickyProvider className="sticky top-0 z-50 transition-colors duration-1000">
    <div className="container mx-auto">
      <div className="flex items-center gap-4 px-2 py-3">
        <div className="flex-1 shrink-0">
          <Link href="/" className="flex">
            <Image
              src="/logo.svg"
              alt="Kibo UI"
              width={611}
              height={116}
              className="h-5 w-[105px] dark:invert"
            />
          </Link>
        </div>

        <Search />

        <div className="flex flex-1 items-center justify-end gap-2">
          <Repo />
          <ThemeToggle />
        </div>
      </div>
    </div>
  </StickyProvider>
);
