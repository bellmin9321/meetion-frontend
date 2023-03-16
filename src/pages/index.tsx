import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
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
  try {
    const { req, res } = context;
    const session = await getSession({ req });

    if (!session && res) {
      res.writeHead(302, {
        Location: '/login',
      });
      res.end();
      return { props: {} };
    }

    return { props: session };
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        statusCode: 302,
      },
    };
  }
}

export default HomePage;
