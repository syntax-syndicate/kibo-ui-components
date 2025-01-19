'use client';

import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  type SandpackThemeProp,
} from '@codesandbox/sandpack-react';
import { AppWindowIcon, CodeIcon, TerminalIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { tsconfig } from './tsconfig';
import { utils } from './utils';

import kiboCalendar from '../../public/registry/calendar.json' assert {
  type: 'json',
};
import kiboDialogStack from '../../public/registry/dialog-stack.json' assert {
  type: 'json',
};
import kiboGantt from '../../public/registry/gantt.json' assert {
  type: 'json',
};
import kiboKanban from '../../public/registry/kanban.json' assert {
  type: 'json',
};
import kiboList from '../../public/registry/list.json' assert { type: 'json' };
import kiboTable from '../../public/registry/table.json' assert {
  type: 'json',
};
import { content } from './content';
import { postcss } from './postcss';
import accordion from './shadcn/accordion.json' assert { type: 'json' };
import alertDialog from './shadcn/alert-dialog.json' assert { type: 'json' };
import alert from './shadcn/alert.json' assert { type: 'json' };
import aspectRatio from './shadcn/aspect-ratio.json' assert { type: 'json' };
import avatar from './shadcn/avatar.json' assert { type: 'json' };
import badge from './shadcn/badge.json' assert { type: 'json' };
import breadcrumb from './shadcn/breadcrumb.json' assert { type: 'json' };
import button from './shadcn/button.json' assert { type: 'json' };
import calendar from './shadcn/calendar.json' assert { type: 'json' };
import card from './shadcn/card.json' assert { type: 'json' };
import carousel from './shadcn/carousel.json' assert { type: 'json' };
import chart from './shadcn/chart.json' assert { type: 'json' };
import checkbox from './shadcn/checkbox.json' assert { type: 'json' };
import collapsible from './shadcn/collapsible.json' assert { type: 'json' };
import command from './shadcn/command.json' assert { type: 'json' };
import contextMenu from './shadcn/context-menu.json' assert { type: 'json' };
import dialog from './shadcn/dialog.json' assert { type: 'json' };
import drawer from './shadcn/drawer.json' assert { type: 'json' };
import dropdownMenu from './shadcn/dropdown-menu.json' assert { type: 'json' };
import form from './shadcn/form.json' assert { type: 'json' };
import hoverCard from './shadcn/hover-card.json' assert { type: 'json' };
import inputOtp from './shadcn/input-otp.json' assert { type: 'json' };
import input from './shadcn/input.json' assert { type: 'json' };
import label from './shadcn/label.json' assert { type: 'json' };
import menubar from './shadcn/menubar.json' assert { type: 'json' };
import navigationMenu from './shadcn/navigation-menu.json' assert {
  type: 'json',
};
import pagination from './shadcn/pagination.json' assert { type: 'json' };
import popover from './shadcn/popover.json' assert { type: 'json' };
import progress from './shadcn/progress.json' assert { type: 'json' };
import radioGroup from './shadcn/radio-group.json' assert { type: 'json' };
import resizable from './shadcn/resizable.json' assert { type: 'json' };
import scrollArea from './shadcn/scroll-area.json' assert { type: 'json' };
import select from './shadcn/select.json' assert { type: 'json' };
import separator from './shadcn/separator.json' assert { type: 'json' };
import sheet from './shadcn/sheet.json' assert { type: 'json' };
import skeleton from './shadcn/skeleton.json' assert { type: 'json' };
import slider from './shadcn/slider.json' assert { type: 'json' };
import sonner from './shadcn/sonner.json' assert { type: 'json' };
import switchComponent from './shadcn/switch.json' assert { type: 'json' };
import table from './shadcn/table.json' assert { type: 'json' };
import tabs from './shadcn/tabs.json' assert { type: 'json' };
import textarea from './shadcn/textarea.json' assert { type: 'json' };
import toast from './shadcn/toast.json' assert { type: 'json' };
import toggleGroup from './shadcn/toggle-group.json' assert { type: 'json' };
import toggle from './shadcn/toggle.json' assert { type: 'json' };
import tooltip from './shadcn/tooltip.json' assert { type: 'json' };

type PreviewProps = {
  name: string;
  code: string;
};

const shadcnComponents = [
  accordion,
  alertDialog,
  alert,
  aspectRatio,
  avatar,
  badge,
  breadcrumb,
  button,
  calendar,
  card,
  carousel,
  chart,
  checkbox,
  collapsible,
  command,
  contextMenu,
  dialog,
  drawer,
  dropdownMenu,
  form,
  hoverCard,
  inputOtp,
  input,
  label,
  menubar,
  navigationMenu,
  pagination,
  popover,
  progress,
  radioGroup,
  resizable,
  scrollArea,
  select,
  separator,
  sheet,
  skeleton,
  slider,
  sonner,
  switchComponent,
  table,
  tabs,
  textarea,
  toast,
  toggleGroup,
  toggle,
  tooltip,
];

const kiboComponents = [
  kiboCalendar,
  kiboDialogStack,
  kiboGantt,
  kiboKanban,
  kiboList,
  kiboTable,
];

const dependencies: Record<string, string> = {};
const devDependencies: Record<string, string> = {};

const shadcnDependencies = shadcnComponents.flatMap((mod) =>
  'dependencies' in mod ? mod.dependencies : []
) as string[];
const kiboDependencies = kiboComponents.flatMap((mod) =>
  'dependencies' in mod ? mod.dependencies : []
) as string[];

const shadcnDevDependencies = shadcnComponents.flatMap((mod) =>
  'devDependencies' in mod ? mod.devDependencies : []
) as string[];
const kiboDevDependencies = kiboComponents.flatMap((mod) =>
  'devDependencies' in mod ? mod.devDependencies : []
) as string[];

const uniqueDependencies = new Set([
  ...shadcnDependencies,
  ...kiboDependencies,
]);

const uniqueDevDependencies = new Set([
  ...shadcnDevDependencies,
  ...kiboDevDependencies,
]);

for (const dependency of uniqueDependencies) {
  const [name, version] =
    (dependency as string).match(/^(.+?)(?:@(.+))?$/)?.slice(1) ?? [];

  if (name) {
    dependencies[name] = version ?? 'latest';
  }
}

for (const devDependency of uniqueDevDependencies) {
  const [name, version] =
    (devDependency as string).match(/^(.+?)(?:@(.+))?$/)?.slice(1) ?? [];

  if (name) {
    devDependencies[name] = version ?? 'latest';
  }
}

const parseContent = (content: string) => {
  return content.replace(/@\/registry\/new-york\/ui\//g, '@/components/ui/');
};

export const Preview = ({ name, code }: PreviewProps) => {
  const { resolvedTheme } = useTheme();

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <SandpackProvider
      template="react-ts"
      theme={resolvedTheme as SandpackThemeProp}
      // options={{ bundlerURL: 'https://sandpack-bundler.codesandbox.io' }}
      options={{
        externalResources: [
          'https://cdn.tailwindcss.com',
          new URL('/preview/shadcn.css', window.location.origin).toString(),
          new URL(
            '/preview/tailwind-config.js',
            window.location.origin
          ).toString(),
        ],
        visibleFiles: ['/App.tsx', `/components/ui/kibo-ui/${name}.tsx`],
        activeFile: '/App.tsx',
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
      files={{
        '/App.tsx': code,
        '/tsconfig.json': tsconfig,
        '/lib/utils.ts': utils,
        '/lib/content.ts': content,
        '/postcss.config.mjs': postcss,

        // shadcn/ui
        '/components/ui/accordion.tsx': parseContent(
          accordion.files[0].content
        ),
        '/components/ui/alert-dialog.tsx': parseContent(
          alertDialog.files[0].content
        ),
        '/components/ui/alert.tsx': parseContent(alert.files[0].content),
        '/components/ui/aspect-ratio.tsx': parseContent(
          aspectRatio.files[0].content
        ),
        '/components/ui/avatar.tsx': parseContent(avatar.files[0].content),
        '/components/ui/badge.tsx': parseContent(badge.files[0].content),
        '/components/ui/breadcrumb.tsx': parseContent(
          breadcrumb.files[0].content
        ),
        '/components/ui/button.tsx': parseContent(button.files[0].content),
        '/components/ui/calendar.tsx': parseContent(calendar.files[0].content),
        '/components/ui/card.tsx': parseContent(card.files[0].content),
        '/components/ui/carousel.tsx': parseContent(carousel.files[0].content),
        '/components/ui/chart.tsx': parseContent(chart.files[0].content),
        '/components/ui/checkbox.tsx': parseContent(checkbox.files[0].content),
        '/components/ui/collapsible.tsx': parseContent(
          collapsible.files[0].content
        ),
        '/components/ui/command.tsx': parseContent(command.files[0].content),
        '/components/ui/context-menu.tsx': parseContent(
          contextMenu.files[0].content
        ),
        '/components/ui/dialog.tsx': parseContent(dialog.files[0].content),
        '/components/ui/drawer.tsx': parseContent(drawer.files[0].content),
        '/components/ui/dropdown-menu.tsx': parseContent(
          dropdownMenu.files[0].content
        ),
        '/components/ui/form.tsx': parseContent(form.files[0].content),
        '/components/ui/hover-card.tsx': parseContent(
          hoverCard.files[0].content
        ),
        '/components/ui/input-otp.tsx': parseContent(inputOtp.files[0].content),
        '/components/ui/input.tsx': parseContent(input.files[0].content),
        '/components/ui/label.tsx': parseContent(label.files[0].content),
        '/components/ui/menubar.tsx': parseContent(menubar.files[0].content),
        '/components/ui/navigation-menu.tsx': parseContent(
          navigationMenu.files[0].content
        ),
        '/components/ui/pagination.tsx': parseContent(
          pagination.files[0].content
        ),
        '/components/ui/popover.tsx': parseContent(popover.files[0].content),
        '/components/ui/progress.tsx': parseContent(progress.files[0].content),
        '/components/ui/radio-group.tsx': parseContent(
          radioGroup.files[0].content
        ),
        '/components/ui/resizable.tsx': parseContent(
          resizable.files[0].content
        ),
        '/components/ui/scroll-area.tsx': parseContent(
          scrollArea.files[0].content
        ),
        '/components/ui/select.tsx': parseContent(select.files[0].content),
        '/components/ui/separator.tsx': parseContent(
          separator.files[0].content
        ),
        '/components/ui/sheet.tsx': parseContent(sheet.files[0].content),
        '/components/ui/skeleton.tsx': parseContent(skeleton.files[0].content),
        '/components/ui/slider.tsx': parseContent(slider.files[0].content),
        '/components/ui/sonner.tsx': parseContent(sonner.files[0].content),
        '/components/ui/switch.tsx': parseContent(
          switchComponent.files[0].content
        ),
        '/components/ui/table.tsx': parseContent(table.files[0].content),
        '/components/ui/tabs.tsx': parseContent(tabs.files[0].content),
        '/components/ui/textarea.tsx': parseContent(textarea.files[0].content),
        '/components/ui/toast.tsx': parseContent(toast.files[0].content),
        '/components/ui/toggle-group.tsx': parseContent(
          toggleGroup.files[0].content
        ),
        '/components/ui/toggle.tsx': parseContent(toggle.files[0].content),
        '/components/ui/tooltip.tsx': parseContent(tooltip.files[0].content),

        // kibo-ui
        '/components/ui/kibo-ui/calendar.tsx': parseContent(
          kiboCalendar.files[0].content
        ),
        '/components/ui/kibo-ui/dialog-stack.tsx': parseContent(
          kiboDialogStack.files[0].content
        ),
        '/components/ui/kibo-ui/gantt.tsx': parseContent(
          kiboGantt.files[0].content
        ),
        '/components/ui/kibo-ui/kanban.tsx': parseContent(
          kiboKanban.files[0].content
        ),
        '/components/ui/kibo-ui/list.tsx': parseContent(
          kiboList.files[0].content
        ),
        '/components/ui/kibo-ui/table.tsx': parseContent(
          kiboTable.files[0].content
        ),
      }}
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
          <TabsContent value="code" className="m-0 max-h-96 overflow-y-auto">
            <SandpackCodeEditor className="min-h-96" />
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
    </SandpackProvider>
  );
};
