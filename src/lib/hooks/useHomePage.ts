import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

import useUserMutation from './useUserMutation';
import { getPageList, getSharedPages } from '../api/page';
import { pageListState, sharedPagesState, userState } from '../recoil';

import { queryKeys } from '@/types/commonType';

function useHomePage() {
  const { data: session } = useSession();
  const setUser = useSetRecoilState(userState);
  const setPages = useSetRecoilState(pageListState);
  const setSharedPages = useSetRecoilState(sharedPagesState);
  const { addUser } = useUserMutation();

  const { mutate: addUserMutate } = addUser;
  useQuery(
    [...queryKeys.pages, ...queryKeys.sharedPages, session],
    async () => {
      if (session) {
        setUser(session.user);
        addUserMutate(session.user);
        const shared = await getSharedPages(session.user.email);
        setSharedPages(shared);

        const pages = await getPageList(session.user.email);
        setPages(pages);
      }
    },
  );
}

export default useHomePage;
