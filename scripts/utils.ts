import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const cwd = process.cwd();
const packagesPath = join(cwd, 'packages');
const packagesDir = readdirSync(packagesPath, { withFileTypes: true });
const internalPackages = ['tailwind-config', 'shadcn-ui', 'typescript-config'];

export const packages = packagesDir
  .filter((dir) => dir.isDirectory() && !internalPackages.includes(dir.name))
  .map((dir) => dir.name);
