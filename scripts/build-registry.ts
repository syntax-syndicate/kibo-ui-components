import { promises as fs } from 'node:fs';
import path, { join } from 'node:path';
import type { z } from 'zod';
import type { Registry, registryItemFileSchema } from '../packages/shadcn-ui';
import { packages } from './utils';

const PUBLIC_FOLDER_BASE_PATH = 'apps/docs/public/registry';
const COMPONENT_FOLDER_PATH = 'ui';

type File = z.infer<typeof registryItemFileSchema>;

const writeFileRecursive = async (filePath: string, data: string) => {
  const dir = path.dirname(filePath);

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath, data, 'utf-8');
};

const getComponentFiles = async (pkg: string, files: File[]) => {
  const cwd = process.cwd();
  const packagesPath = join(cwd, 'packages');
  const filesArray: File[] = [];

  for (const file of files) {
    const filePath = path.join(packagesPath, pkg, file.path);
    const fileContent = await fs.readFile(filePath, 'utf-8');

    filesArray.push({
      type: file.type,
      path: file.path,
      content: fileContent,
      target: `${COMPONENT_FOLDER_PATH}/${file.path}`,
    });
  }

  return filesArray;
};

const buildRegistry = async (pkg: string) => {
  const cwd = process.cwd();
  const registryPath = join(cwd, 'packages', pkg, 'registry.ts');
  const registry: Registry = await import(registryPath).then((r) => r.ui);

  // make a json file and put it in public folder
  for (const component of registry) {
    const { files } = component;

    if (!files) {
      throw new Error('No files found for component');
    }

    const filesArray = await getComponentFiles(pkg, files);

    const json = JSON.stringify(
      {
        ...component,
        files: filesArray,
      },
      null,
      2
    );
    const jsonPath = `${PUBLIC_FOLDER_BASE_PATH}/${pkg}.json`;
    await writeFileRecursive(jsonPath, json);
  }
};

const main = async () => {
  for (const pkg of packages) {
    await buildRegistry(pkg);
  }
};

main()
  .then(() => {
    console.log('done');
  })
  .catch((err) => {
    console.error(err);
  });
