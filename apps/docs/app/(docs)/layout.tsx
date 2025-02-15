import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '../../lib/source';

type LayoutProps = {
  readonly children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <DocsLayout
    tree={source.pageTree}
    disableThemeSwitch
    sidebar={{ collapsible: false, hideSearch: true }}
    nav={{
      transparentMode: 'always',
    }}
  >
    {children}
  </DocsLayout>
);

export default Layout;
