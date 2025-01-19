import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import logo from '../public/logo.svg';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <Image
        src={logo}
        alt="Kibo UI"
        width={93}
        height={16}
        className="h-4 w-auto dark:invert"
      />
    ),
  },
};
