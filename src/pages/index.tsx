import { NextPageContext } from 'next';
import { getProviders, getSession } from 'next-auth/react';
import React from 'react';

import useHomePage from '@/lib/hooks/useHomePage';

import Content from '@/components/layout/Content';
import Layout from '@/components/layout/Layout';

function HomePage() {
  useHomePage();

  return (
    <Layout>
      <Content page={undefined} />
    </Layout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { req, res } = context;
  const session = await getSession({ req });

  if (!session && res) {
    res.writeHead(302, {
      Location: '/login',
    });
    res.end();
    return;
  }

  return {
    props: {
      providers: await getProviders(),
    },
  };
}

export default HomePage;
