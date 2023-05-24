import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import React, { useLayoutEffect } from 'react';

import useHomePage from '@/lib/hooks/useHomePage';

import Content from '@/components/Content';
import Layout from '@/components/layout';

function HomePage() {
  const { pages, sharedPages, router } = useHomePage();

  useLayoutEffect(() => {
    if (router.query.pid !== undefined) {
      localStorage.setItem('pid', JSON.stringify(router.query.pid));
    }
    const pid = localStorage.getItem('pid') as string;

    if (!pages[0] && !sharedPages[0] && !pid) return;

    router.push(
      `/page/${(pages[0] || sharedPages[0])?._id || JSON.parse(pid)}`,
      undefined,
      {
        shallow: true,
      },
    );
  }, [pages]);

  return (
    <Layout>
      <Content />
    </Layout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  try {
    const { req, res, query } = context;
    const session = await getSession({ req });

    if (!session && res) {
      res.writeHead(302, {
        Location: '/auth/signin',
      });
      res.end();
      return { props: {} };
    }
    return {
      props: {
        session,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/signin',
        statusCode: 302,
      },
    };
  }
}

export default HomePage;
