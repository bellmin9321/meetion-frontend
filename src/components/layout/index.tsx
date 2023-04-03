import * as React from 'react';

import IndexPage from './IndexPage';
import Sidebar from '../Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IndexPage />
      <Sidebar />
      {children}
    </>
  );
}
