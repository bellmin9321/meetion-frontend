/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AiFillDelete, AiOutlineRight } from 'react-icons/ai';
import { useRecoilState, useRecoilValue } from 'recoil';

import { queryClient } from '@/lib/api/queryClient';
import usePageMutation from '@/lib/hooks/usePageMutation';
import { pageListState, selectedPageID, sharedPagesState } from '@/lib/recoil';
import { changeParam, textLengthOverCut } from '@/lib/util';

import { PageType } from '@/types';
import { queryKeys } from '@/types/commonType';

function PersonalPage() {
  const router = useRouter();
  const pages = useRecoilValue(pageListState);
  const sharedPages = useRecoilValue(sharedPagesState);
  const { removePage } = usePageMutation();
  const { mutate: deletePageMutate } = removePage;
  const [selectedId, setSelected] = useRecoilState(selectedPageID);

  useEffect(() => {
    if (router.query.pid?.includes('-')) {
      const pid = router.query.pid as string;

      setSelected(pid.split('-')[1]);
      return;
    }

    setSelected(router.query.pid as string);
  }, [router.query.pid]);

  const handleDelete = (id?: string) => {
    deletePageMutate(id ?? '', {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.pages);
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
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div className="mb-6">
      <div className="mb-2 ml-4 text-sm text-gray-500">개인 페이지</div>
      <ul>
        {pages?.length > 0 &&
          pages.map((page: PageType) => {
            return (
              <li
                key={page._id}
                className={`flex justify-between py-1 pl-4 hover:bg-gray-200 ${
                  page._id === selectedId ? 'selectedList' : ''
                }`}
              >
                <Link
                  href={`/page/${changeParam(page.title)}${page._id}`}
                  className="selected flex w-full justify-between"
                  onClick={() => setSelected(page?._id)}
                >
                  <div className="flex items-center">
                    <span>
                      <AiOutlineRight className="text-sm  text-gray-600" />
                    </span>
                    <span className="ml-2 text-gray-700">
                      {page?.title
                        ? textLengthOverCut(page?.title)
                        : '제목 없음'}
                    </span>
                  </div>
                  {!sharedPages.length &&
                  pages.length === 1 &&
                  !page.title &&
                  !page.desc ? null : (
                    <div className="flex items-center">
                      <AiFillDelete
                        id="deleteBtn"
                        className="mr-4 flex cursor-pointer items-center text-gray-600 hover:text-red-500"
                        onClick={() => handleDelete(page._id)}
                      />
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default PersonalPage;
