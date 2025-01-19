import type { Registry } from '@repo/shadcn-ui';

/*
 * As shadcn/ui custom registry components are undocumented, here are some notes:
 *
 * - `registryDependencies` is an array of shadcn/ui component names that this component depends on.
 * - `dependencies` is an array of npm package names that this component depends on.
 * - `devDependencies` is an array of npm package names that this component depends on.
 */

export const ui: Registry = [
  {
    name: 'table',
    type: 'registry:component',
    registryDependencies: ['button', 'dropdown-menu', 'table'],
    dependencies: ['@tanstack/react-table', 'lucide-react', 'zustand'],
    devDependencies: [],
    files: [
      {
        path: 'index.tsx',
        type: 'registry:component',
      },
    ],
  },
];
