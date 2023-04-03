import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';

import useHomePage from '@/lib/hooks/useHomePage';

import Layout from '../components/Layout';
import Content from '../components/Layout/Content';

function HomePage() {
  useHomePage();

  return (
    <Layout>
      <Content />
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
