import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';

import { changeParam } from '@/lib/util';

import usePageMutation from './usePageMutation';
import { queryClient } from '../api/queryClient';
import {
  pageListState,
  selectedPageID,
  sharedPagesState,
  userState,
} from '../recoil';

import { queryKeys } from '@/types/commonType';

function useSidebar() {
  const router = useRouter();
  const { email } = useRecoilValue(userState);
  const pages = useRecoilValue(pageListState);
  const sharedPages = useRecoilValue(sharedPagesState);
  const [selectedId, setSelectedId] = useRecoilState(selectedPageID);

  const { addPage, removePage } = usePageMutation();
  const { mutate: deletePageMutate } = removePage;
  const { mutate: addPageMutate } = addPage;

  const handleAddPage = () => {
    const defaultPage = {
      _id: '',
      creator: email,
      title: '',
      desc: '',
      sharedUsers: [],
    };

    addPageMutate(defaultPage, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(queryKeys.pages);
        if (data) {
          router.push(`/page/${data._id}`, undefined, { shallow: true });
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleDelete = (id?: string, type?: string) => {
    deletePageMutate(id ?? '', {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.pages);

        if (type === 'PERSONAL') {
          if (pages.length > 1) {
            const { _id, title } = pages[0];

            router.push(`/page/${changeParam(title)}${_id}`, undefined, {
              shallow: true,
            });
          } else if (sharedPages.length) {
            const { _id, title } = sharedPages[0];

            router.push(`/page/${changeParam(title)}${_id}`, undefined, {
              shallow: true,
            });
          }
        } else {
          if (sharedPages.length > 1) {
            const { _id, title } = sharedPages[0];
            router.push(`/page/${changeParam(title)}${_id}`, undefined, {
              shallow: true,
            });
          } else if (pages.length) {
            const { _id, title } = pages[0];

            router.push(`/page/${changeParam(title)}${_id}`, undefined, {
              shallow: true,
            });
          }
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const getSelectedClass = (id?: string) =>
    selectedId === id ? 'selectedList' : '';

  return {
    email,
    pages,
    sharedPages,
    selectedId,
    handleAddPage,
    handleDelete,
    getSelectedClass,
    setSelectedId,
  };
}

export default useSidebar;
