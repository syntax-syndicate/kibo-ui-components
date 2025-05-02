import { promises as fs } from 'node:fs';
import { readdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { track } from '@vercel/analytics/server';
import { type NextRequest, NextResponse } from 'next/server';

type RegistryParams = {
  params: Promise<{ component: string }>;
};

export const GET = async (request: NextRequest, { params }: RegistryParams) => {
  const { component } = await params;

  if (!component.endsWith('.json')) {
    return NextResponse.json(
      { error: 'Component must end with .json' },
      { status: 400 }
    );
  }

  const packageName = component.replace('.json', '');
  const packageDir = join(process.cwd(), '..', '..', 'packages', packageName);
  const packagePath = join(packageDir, 'package.json');

  let packageJson: Record<string, unknown>;

  if (process.env.NODE_ENV === 'production') {
    try {
      await track('Registry download', {
        component: packageName,
      });
    } catch (error) {
      console.error(error);
    }
  }

  try {
    packageJson = JSON.parse(await readFile(packagePath, 'utf-8'));
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to parse package.json', details: error },
      { status: 500 }
    );
  }

  const kiboDependencies = Object.keys(packageJson.dependencies || {}).filter(
    (dep) => dep.startsWith('@repo') && dep !== '@repo/shadcn-ui'
  );

  const dependencies = Object.keys(packageJson.dependencies || {}).filter(
    (dep) =>
      !['react', 'react-dom', '@repo/shadcn-ui', ...kiboDependencies].includes(
        dep
      )
  );

  const devDependencies = Object.keys(packageJson.devDependencies || {}).filter(
    (dep) =>
      ![
        '@repo/typescript-config',
        '@types/react',
        '@types/react-dom',
        'typescript',
      ].includes(dep)
  );

  const packageFiles = readdirSync(packageDir, { withFileTypes: true });
  const tsxFiles = packageFiles.filter(
    (file) => file.isFile() && file.name.endsWith('.tsx')
  );

  const files: {
    type: string;
    path: string;
    content: string;
    target: string;
  }[] = [];

  for (const file of tsxFiles) {
    const filePath = join(packageDir, file.name);
    const content = await fs.readFile(filePath, 'utf-8');

    files.push({
      type: 'registry:ui',
      path: file.name,
      content,
      target: `components/ui/kibo-ui/${packageName}/${file.name}`,
    });
  }

  const registryDependencies =
    files
      .map((f) => f.content)
      .join('\n')
      .match(/@\/components\/ui\/([a-z-]+)/g)
      ?.map((path) => path.split('/').pop())
      .filter((name): name is string => !!name) || [];

  for (const dep of kiboDependencies) {
    const packageName = dep.replace('@repo/', '');

    registryDependencies.push(
      `https://www.kibo-ui.com/registry/${packageName}.json`
    );
  }

  const response = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    homepage: `https://www.kibo-ui.com/components/${packageName}`,
    name: packageName,
    type: 'registry:ui',
    author: 'Hayden Bleasel <hello@haydenbleasel.com>',
    dependencies,
    devDependencies,
    registryDependencies,
    files,
  };

  return NextResponse.json(response);
};
