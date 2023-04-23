/* eslint-disable react-hooks/exhaustive-deps */
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { queryClient } from '@/lib/api/queryClient';
import useHomePage from '@/lib/hooks/useHomePage';
import { pageListState, selectPage, sharedPagesState } from '@/lib/recoil';

import Content from '@/components/Content';
import Layout from '@/components/layout';

import { queryKeys } from '@/types/commonType';

function Page() {
  useHomePage();
  const router = useRouter();
  const { pid } = router.query;
  const pages = useRecoilValue(pageListState);
  const sharedPages = useRecoilValue(sharedPagesState);
  const setSelectedPage = useSetRecoilState(selectPage);

  let originalId: string;

  if (pid) {
    const arr = (pid as string)?.split('-');
    originalId = arr[arr.length - 1];
  }
  const page = pages.find((page) => page._id === originalId);
  const sharedPage = sharedPages.find((page) => page._id === originalId);
  console.log(sharedPage);

  useEffect(() => {
    queryClient.invalidateQueries(queryKeys.pages);

    if (page) {
      setSelectedPage(page);
    } else if (sharedPage) {
      setSelectedPage(sharedPage);
    }
  }, [page, sharedPage]);

  return (
    <Layout>
      <Content page={page} sharedPage={sharedPage} />
    </Layout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  try {
    const { req, res } = context;
    const session = await getSession({ req });

    if (!session && res) {
      res.writeHead(302, {
        Location: '/auth/signin',
      });
      res.end();
      return { props: {} };
    }

    return { props: session };
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/signin',
        statusCode: 302,
      },
    };
  }
}

export default Page;
