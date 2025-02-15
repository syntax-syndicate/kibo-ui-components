import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { Navbar } from '../../components/navbar';
import { source } from '../../lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <DocsLayout tree={source.pageTree} sidebar={{ hideSearch: true }}>
        {children}
      </DocsLayout>
    </>
  );
}
