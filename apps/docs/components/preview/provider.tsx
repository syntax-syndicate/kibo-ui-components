'use client';

import {
  SandpackProvider,
  type SandpackProviderProps,
  type SandpackThemeProp,
} from '@codesandbox/sandpack-react';
import { useTheme } from 'next-themes';

export const PreviewProvider = ({
  options,
  ...props
}: Omit<SandpackProviderProps, 'theme'>) => {
  const { resolvedTheme } = useTheme();

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <SandpackProvider
      theme={resolvedTheme as SandpackThemeProp}
      {...props}
      options={{
        ...options,
        externalResources: [
          ...(options?.externalResources || []),
          new URL('/preview/shadcn.css', window.location.origin).toString(),
          new URL(
            '/preview/tailwind-config.js',
            window.location.origin
          ).toString(),
        ],
      }}
    />
  );
};
