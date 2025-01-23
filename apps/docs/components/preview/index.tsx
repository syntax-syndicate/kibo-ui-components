import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  type SandpackProvider,
} from '@codesandbox/sandpack-react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@repo/shadcn-ui/components/ui/resizable';
import { AppWindowIcon, CodeIcon, TerminalIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { content } from './content';
import { PreviewProvider } from './provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { tsconfig } from './tsconfig';
import { utils } from './utils';

type PreviewProps = {
  name: string;
  code: string;
};

const parseDependencyVersion = (dependency: string) => {
  const [, version] =
    (dependency as string).match(/^(.+?)(?:@(.+))?$/)?.slice(1) ?? [];

  return version ?? 'latest';
};

const parseContent = (content: string) => {
  return content.replace(/@\/registry\/new-york\/ui\//g, '@/components/ui/');
};

export const Preview = async ({ name, code }: PreviewProps) => {
  const registry = (await import(`../../public/registry/${name}.json`)) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    registryDependencies?: Record<string, string>;
    files?: { content: string }[];
  };

  const dependencies: Record<string, string> = {};
  const devDependencies: Record<string, string> = {};

  const files: ComponentProps<typeof SandpackProvider>['files'] = {
    '/App.tsx': code,
    '/tsconfig.json': tsconfig,
    '/lib/utils.ts': utils,
    '/lib/content.ts': content,
  };

  // Load selected Kibo UI component
  files[`/components/ui/kibo-ui/${name}.tsx`] = parseContent(
    registry.files?.[0]?.content ?? ''
  );

  // Load required dependencies from selected Kibo UI component
  if (registry.dependencies) {
    for (const dep of Object.values(registry.dependencies)) {
      dependencies[dep] = parseDependencyVersion(dep);
    }
  }

  // Load required devDependencies from selected Kibo UI component
  if (registry.devDependencies) {
    for (const dep of Object.values(registry.devDependencies)) {
      devDependencies[dep] = parseDependencyVersion(dep);
    }
  }

  // Process registry dependencies
  if (registry.registryDependencies) {
    for (const dependency of Object.values(registry.registryDependencies)) {
      const mod = (await import(`./shadcn/${dependency}.json`)) as {
        name: string;
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
        files?: { content: string }[];
      };

      // Load required shadcn/ui component
      files[`/components/ui/${mod.name}.tsx`] = parseContent(
        mod.files?.[0]?.content ?? ''
      );

      // Load required dependencies from shadcn/ui component
      if (mod.dependencies) {
        for (const dep of Object.values(mod.dependencies)) {
          dependencies[dep] = parseDependencyVersion(dep);
        }
      }

      // Load required devDependencies from shadcn/ui component
      if (mod.devDependencies) {
        for (const dep of Object.values(mod.devDependencies)) {
          devDependencies[dep] = parseDependencyVersion(dep);
        }
      }
    }
  }

  // Scan the demo code for any imports of shadcn/ui components
  const matches = code.match(/@\/components\/ui\/([^'"\s]+)/g);
  if (matches) {
    const components = [
      ...new Set(matches.map((m) => m.replace('@/components/ui/', ''))),
    ];

    for (const component of components) {
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

        // Load required dependencies
        if (mod.dependencies) {
          for (const dep of Object.values(mod.dependencies)) {
            dependencies[dep] = parseDependencyVersion(dep);
          }
        }

        // Load required devDependencies
        if (mod.devDependencies) {
          for (const dep of Object.values(mod.devDependencies)) {
            devDependencies[dep] = parseDependencyVersion(dep);
          }
        }
      } catch (error) {
        console.warn(`Failed to load shadcn component: ${component}`);
      }
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
        },
        devDependencies: {
          autoprefixer: 'latest',
          postcss: 'latest',
          ...devDependencies,
        },
      }}
      files={files}
    >
      <SandpackLayout className="!rounded-none !border-none !bg-transparent">
        <Tabs
          defaultValue="preview"
          className="not-prose group relative w-full overflow-hidden rounded-lg border bg-fd-secondary/50 text-sm"
        >
          <div className="flex flex-row items-center justify-between border-b bg-fd-muted p-2">
            <TabsList className="h-auto w-full justify-start rounded-none bg-transparent">
              <TabsTrigger
                value="code"
                className="flex flex-row items-center gap-1.5"
              >
                <CodeIcon size={14} />
                Code
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="flex flex-row items-center gap-1.5"
              >
                <AppWindowIcon size={14} />
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="console"
                className="flex flex-row items-center gap-1.5"
              >
                <TerminalIcon size={14} />
                Console
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="code"
            className="m-0 h-full max-h-96 overflow-hidden"
          >
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel
                className="!overflow-y-auto h-full"
                defaultSize={25}
                minSize={20}
                maxSize={40}
              >
                <SandpackFileExplorer autoHiddenFiles />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel className="!overflow-y-auto h-full">
                <SandpackCodeEditor showTabs={false} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </TabsContent>
          <TabsContent value="preview" className="m-0 max-h-96 overflow-y-auto">
            <SandpackPreview
              showOpenInCodeSandbox={false}
              showRefreshButton={false}
              className="min-h-96"
            />
          </TabsContent>
          <TabsContent value="console" className="m-0 max-h-96 overflow-y-auto">
            <SandpackConsole className="min-h-96" />
          </TabsContent>
        </Tabs>
      </SandpackLayout>
    </PreviewProvider>
  );
};
