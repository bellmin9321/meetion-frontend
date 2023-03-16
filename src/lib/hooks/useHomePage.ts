import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

import useUserMutation from './useUserMutation';
import { getPageList } from '../api/page';
import { pageList, userState } from '../recoil';

import { queryKeys } from '@/types/commonType';

function useHomePage() {
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
}

export default useHomePage;
