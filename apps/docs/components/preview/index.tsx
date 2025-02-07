import {
  SandboxCodeEditor,
  SandboxConsole,
  SandboxFileExplorer,
  SandboxLayout,
  SandboxPreview,
  SandboxTabs,
  SandboxTabsContent,
  SandboxTabsList,
  SandboxTabsTrigger,
} from '@repo/sandbox';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@repo/shadcn-ui/components/ui/resizable';
import { AppWindowIcon, CodeIcon, TerminalIcon } from 'lucide-react';
import { content } from './content';
import { PreviewProvider } from './provider';
import { tsconfig } from './tsconfig';
import { utils } from './utils';

type PreviewProps = {
  name: string;
  code: string;
  dependencies?: Record<string, string>;
};

const parseDependencyVersion = (dependency: string) => {
  const [name, version] =
    (dependency as string).match(/^(.+?)(?:@(.+))?$/)?.slice(1) ?? [];

  return { name, version: version ?? 'latest' };
};

const parseContent = (content: string) => {
  return content.replace(/@\/registry\/new-york\/ui\//g, '@/components/ui/');
};

const parseShadcnComponents = async (str: string) => {
  const parsedString = parseContent(str);
  const matches = parsedString.match(
    /@\/components\/ui\/(?!kibo-ui\/)([^'"\s]+)/g
  );

  const files: Record<string, string> = {};
  const dependencies: Record<string, string> = {};
  const devDependencies: Record<string, string> = {};

  if (matches) {
    const components = [
      ...new Set(matches.map((m) => m.replace('@/components/ui/', ''))),
    ];

    // Process all components in parallel instead of sequentially
    await Promise.all(
      components.map(async (component) => {
        try {
          const mod = (await import(`./shadcn/${component}.json`)) as {
            name: string;
            dependencies?: Record<string, string>;
            devDependencies?: Record<string, string>;
            files?: { content: string }[];
          };

          // Load required shadcn/ui component
          files[`/components/ui/${mod.name}.tsx`] = parseContent(
            mod.files?.[0]?.content ?? ''
          );

          // Process dependencies and devDependencies in parallel
          await Promise.all([
            // Load required dependencies
            mod.dependencies
              ? Promise.all(
                  Object.values(mod.dependencies).map(async (dep) => {
                    const { name, version } = parseDependencyVersion(dep);
                    dependencies[name] = version;
                  })
                )
              : Promise.resolve(),

            // Load required devDependencies
            mod.devDependencies
              ? Promise.all(
                  Object.values(mod.devDependencies).map(async (dep) => {
                    const { name, version } = parseDependencyVersion(dep);
                    devDependencies[name] = version;
                  })
                )
              : Promise.resolve(),

            // Parse nested components
            parseShadcnComponents(mod.files?.[0]?.content ?? ''),
          ]);
        } catch (error) {
          console.warn(`Failed to load shadcn component: ${component}`);
        }
      })
    );
  }

  return { files, dependencies, devDependencies };
};

export const Preview = async ({
  name,
  code,
  dependencies: demoDependencies,
}: PreviewProps) => {
  // Load and parse everything in parallel for better performance
  const [registry, initialParsedComponents] = await Promise.all([
    import(`../../public/registry/${name}.json`) as Promise<{
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
      registryDependencies?: Record<string, string>;
      files?: { content: string }[];
    }>,
    parseShadcnComponents(code),
  ]);

  const { files, dependencies, devDependencies } = initialParsedComponents;

  // Set up initial files
  files['/App.tsx'] = code;
  files['/tsconfig.json'] = tsconfig;
  files['/lib/utils.ts'] = utils;
  files['/lib/content.ts'] = content;

  // Process Kibo UI component
  const selectedComponent = registry.files?.[0]?.content;
  const selectedComponentContent = parseContent(selectedComponent ?? '');

  // Run these operations in parallel
  await Promise.all([
    parseShadcnComponents(selectedComponentContent),

    // Process registry dependencies if they exist
    registry.registryDependencies
      ? Promise.all(
          Object.values(registry.registryDependencies).map(
            async (dependency) => {
              const mod = (await import(`./shadcn/${dependency}.json`)) as {
                name: string;
                dependencies?: Record<string, string>;
                devDependencies?: Record<string, string>;
                files?: { content: string }[];
              };

              const componentContent = mod.files?.[0]?.content ?? '';
              files[`/components/ui/${mod.name}.tsx`] =
                parseContent(componentContent);

              // Process dependencies
              if (mod.dependencies) {
                for (const dep of Object.values(mod.dependencies)) {
                  const { name, version } = parseDependencyVersion(dep);
                  dependencies[name] = version;
                }
              }

              if (mod.devDependencies) {
                for (const dep of Object.values(mod.devDependencies)) {
                  const { name, version } = parseDependencyVersion(dep);
                  devDependencies[name] = version;
                }
              }

              return parseShadcnComponents(componentContent);
            }
          )
        )
      : Promise.resolve(),
  ]);

  files[`/components/ui/kibo-ui/${name}.tsx`] = parseContent(
    selectedComponentContent
  );

  // Process main component dependencies
  if (registry.dependencies) {
    for (const dep of Object.values(registry.dependencies)) {
      const { name, version } = parseDependencyVersion(dep);
      dependencies[name] = version;
    }
  }

  if (registry.devDependencies) {
    for (const dep of Object.values(registry.devDependencies)) {
      const { name, version } = parseDependencyVersion(dep);
      devDependencies[name] = version;
    }
  }

  // Add demo dependencies
  if (demoDependencies) {
    for (const [name, version] of Object.entries(demoDependencies)) {
      dependencies[name] = version;
    }
  }

  return (
    <PreviewProvider
      template="react-ts"
      // options={{ bundlerURL: 'https://sandpack-bundler.codesandbox.io' }}
      options={{
        externalResources: [
          'https://cdn.tailwindcss.com',
          'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
        ],
      }}
      customSetup={{
        dependencies: {
          // shadcn/ui global dependencies
          '@radix-ui/react-icons': 'latest',
          clsx: 'latest',
          'tailwind-merge': 'latest',
          'class-variance-authority': 'latest',

          // Tailwind dependencies
          tailwindcss: 'latest',
          'tailwindcss-animate': 'latest',
          ...dependencies,

          // Common utilities
          'date-fns': 'latest',
        },
        devDependencies: {
          autoprefixer: 'latest',
          postcss: 'latest',
          ...devDependencies,
        },
      }}
      files={files}
      className="not-prose max-h-[30rem]"
    >
      <SandboxLayout>
        <SandboxTabs defaultValue="preview">
          <SandboxTabsList>
            <SandboxTabsTrigger value="code">
              <CodeIcon size={14} />
              Code
            </SandboxTabsTrigger>
            <SandboxTabsTrigger value="preview">
              <AppWindowIcon size={14} />
              Preview
            </SandboxTabsTrigger>
            <SandboxTabsTrigger value="console">
              <TerminalIcon size={14} />
              Console
            </SandboxTabsTrigger>
          </SandboxTabsList>
          <SandboxTabsContent value="code" className="overflow-hidden">
            <ResizablePanelGroup
              direction="horizontal"
              className="overflow-hidden"
            >
              <ResizablePanel
                className="!overflow-y-auto"
                defaultSize={25}
                minSize={20}
                maxSize={40}
              >
                <SandboxFileExplorer />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel className="!overflow-y-auto">
                <SandboxCodeEditor />
              </ResizablePanel>
            </ResizablePanelGroup>
          </SandboxTabsContent>
          <SandboxTabsContent value="preview">
            <SandboxPreview />
          </SandboxTabsContent>
          <SandboxTabsContent value="console">
            <SandboxConsole />
          </SandboxTabsContent>
        </SandboxTabs>
      </SandboxLayout>
    </PreviewProvider>
  );
};
