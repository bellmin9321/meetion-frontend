import Head from 'next/head';
import * as React from 'react';

import Sidebar from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Meetion</title>
        <meta name="description" content="Meetion" />

        <link rel="icon" />
      </Head>
      <Sidebar />
      {children}
    </>
  );
}
