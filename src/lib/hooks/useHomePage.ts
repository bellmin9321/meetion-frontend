import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';

import useUserMutation from './useUserMutation';
import { getPageList, getSharedPages } from '../api/page';
import { pageListState, sharedPagesState, userState } from '../recoil';

import { PageType } from '@/types';
import { queryKeys } from '@/types/commonType';

function useHomePage() {
  const { data: session } = useSession();
  const setUser = useSetRecoilState(userState);
  const [pages, setPages] = useRecoilState(pageListState);
  const setSharedPages = useSetRecoilState(sharedPagesState);
  const { addUser } = useUserMutation();
  const router = useRouter();

  const { mutate: addUserMutate } = addUser;
  useQuery(
    [...queryKeys.pages, ...queryKeys.sharedPages, session],
    async () => {
      if (session) {
        setUser(session.user);
        addUserMutate(session.user);
        const sharedPages = await getSharedPages(session.user.email);
        const myPages = await getPageList(session.user.email);

        const notSharedPages = myPages.filter(
          (page: PageType) => page.sharedUsers && !page.sharedUsers.length,
        );
        const sharedMyPages = myPages.filter(
          (page: PageType) => page.sharedUsers && page.sharedUsers.length,
        );

        setSharedPages(sharedPages.concat(sharedMyPages));
        setPages(notSharedPages);
      }
    },
  );

  useEffect(() => {
    if (pages.length && !router.query) {
      router.push(`/page/${pages[0]?._id}`, undefined, { shallow: true });
    }
  }, []);
}

export default useHomePage;
