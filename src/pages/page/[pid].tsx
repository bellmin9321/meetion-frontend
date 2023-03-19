import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';

import useHomePage from '@/lib/hooks/useHomePage';
import { pageListState } from '@/lib/recoil';

import Content from '@/components/layout/Content';
import Layout from '@/components/layout/Layout';

const Page = () => {
  useHomePage();
  const router = useRouter();

  const { pid } = router.query;
  const pages = useRecoilValue(pageListState);

  let originalId: string;

  if (pid) {
    const arr = (pid as string)?.split('-');
    originalId = arr[arr.length - 1];
  }

  const page = pages.find((page) => page._id === originalId);

  return (
    <Layout>
      <Content page={page} />
    </Layout>
  );
};

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

export default Page;
