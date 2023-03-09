import Head from 'next/head';
import React from 'react';

import Content from '@/components/layout/Content';
import Layout from '@/components/layout/Layout';
import Sidebar from '@/components/layout/Sidebar';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Meetion</title>
        <link rel="icon" />
      </Head>
      <Layout>
        <Sidebar />
        <Content />
      </Layout>
    </>
  );
}
