import { ThemeToggle } from 'fumadocs-ui/components/layout/theme-toggle';
import {} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Repo } from './repo';
import { Search } from './search';

export const Navbar = () => (
  <div className="flex gap-4 border-b px-4 py-3">
    <div className="flex-1">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Kibo UI"
          width={611}
          height={116}
          className="h-4 w-auto"
        />
      </Link>
    </div>

    <Search />

    <div className="flex flex-1 items-center justify-end gap-2">
      <Repo />
      <ThemeToggle />
    </div>
  </div>
);
