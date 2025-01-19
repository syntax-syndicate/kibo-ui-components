import type { Registry } from '@repo/shadcn-ui';

export const ui: Registry = [
  {
    name: 'kanban',
    type: 'registry:component',
    registryDependencies: ['card'],
    dependencies: ['@dnd-kit/core'],
    devDependencies: [],
    files: [
      {
        path: 'index.tsx',
        type: 'registry:component',
      },
    ],
  },
];
