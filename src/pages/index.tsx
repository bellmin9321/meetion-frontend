/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextPageContext } from 'next';
import { getProviders, getSession, useSession } from 'next-auth/react';
import React from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

import { getPageList } from '@/lib/api/page';
import useUserMutation from '@/lib/hooks/useUserMutation';
import { pageList, userState } from '@/lib/recoil';

import Content from '@/components/layout/Content';
import Layout from '@/components/layout/Layout';

import { queryKeys } from '@/types/commonType';

function HomePage() {
  const { data: session } = useSession();
  const setUser = useSetRecoilState(userState);
  const setPages = useSetRecoilState(pageList);
  const { addUser } = useUserMutation();

  const { mutate: addUserMutate } = addUser;
  useQuery([...queryKeys.pages, session], async () => {
    if (session) {
      const data = await getPageList(session.user.email);
      setUser(session.user);
      addUserMutate(session.user);
      setPages(data);
    }
  });

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
