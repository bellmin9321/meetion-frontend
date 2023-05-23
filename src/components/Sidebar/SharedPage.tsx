import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AiFillDelete, AiOutlineRight } from 'react-icons/ai';
import { useRecoilState, useRecoilValue } from 'recoil';

import { queryClient } from '@/lib/api/queryClient';
import usePageMutation from '@/lib/hooks/usePageMutation';
import {
  pageListState,
  selectedPageID,
  sharedPagesState,
  userState,
} from '@/lib/recoil';
import { changeParam, textLengthOverCut } from '@/lib/util';

import { PageType } from '@/types';
import { queryKeys } from '@/types/commonType';

function SharedPage() {
  const pages = useRecoilValue(pageListState);
  const sharedPages = useRecoilValue(sharedPagesState);
  const { email } = useRecoilValue(userState);
  const [selectedId, setSelectedId] = useRecoilState(selectedPageID);
  const { removePage } = usePageMutation();
  const { mutate: deletePageMutate } = removePage;
  const router = useRouter();

  const getSelectedClass = (id?: string) =>
    selectedId === id ? 'selectedList' : '';

  const handleDelete = (id?: string) => {
    deletePageMutate(id ?? '', {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.pages);
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
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return sharedPages?.length ? (
    <div className="mb-6">
      <div className="mb-2 ml-4 text-sm text-gray-500">공유된 페이지</div>
      <ul>
        {sharedPages?.length > 0 &&
          sharedPages.map((page: PageType) => {
            return (
              <li
                key={page._id}
                className={`flex justify-between py-1 pl-4 hover:bg-gray-200 ${getSelectedClass(
                  page?._id,
                )}`}
              >
                <Link
                  href={`/page/${changeParam(page.title)}${page._id}`}
                  className="selected flex w-full justify-between"
                  onClick={() => setSelectedId(page?._id)}
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

                  {email === page.creator && (
                    <div className="flex items-center">
                      <AiFillDelete
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
  ) : (
    <></>
  );
}

export default SharedPage;
