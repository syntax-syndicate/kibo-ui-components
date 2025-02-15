import Image from 'next/image';

import Grid from './grid.svg';

export const Header = () => (
  <span
    className="pointer-events-none absolute inset-0 flex h-[64rem] select-none justify-center overflow-hidden"
    style={{
      background:
        'radial-gradient(49.63% 57.02% at 58.99% -7.2%, hsl(var(--primary) / 0.1) 39.4%, hsl(var(--primary) / 0) 100%)',
    }}
  >
    <Image
      src={Grid}
      alt="Header Background"
      className="text-fd-primary"
      width={790}
      height={640}
    />
  </span>
);
