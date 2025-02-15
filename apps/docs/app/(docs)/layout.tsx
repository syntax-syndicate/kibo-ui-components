import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { Navbar } from '../../components/navbar';
import { source } from '../../lib/source';

type LayoutProps = {
  readonly children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <>
    <Navbar />
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
  </>
);

export default Layout;
