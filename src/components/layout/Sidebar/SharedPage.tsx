import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AiFillDelete, AiOutlineRight } from 'react-icons/ai';
import { useRecoilState, useRecoilValue } from 'recoil';

import { queryClient } from '@/lib/api/queryClient';
import usePageMutation from '@/lib/hooks/usePageMutation';
import { selectedPageID, sharedPagesState } from '@/lib/recoil';
import { changeParam, textLengthOverCut } from '@/lib/util';

import { PageType } from '@/types';
import { queryKeys } from '@/types/commonType';

function SharedPage() {
  const router = useRouter();
  const sharedPages = useRecoilValue(sharedPagesState);
  const [selectedId, setSelected] = useRecoilState(selectedPageID);
  const { removePage } = usePageMutation();
  const { mutate: deletePageMutate } = removePage;

  const handleDelete = (id?: string) => {
    deletePageMutate(id ?? '', {
      onSuccess: () => {
        const { _id, title } = sharedPages[0];

        queryClient.invalidateQueries(queryKeys.sharedPages);
        router.push(`/page/${changeParam(title)}${_id}`);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const getSelectedClass = (id?: string) =>
    selectedId === id ? 'selectedList' : '';

  return sharedPages?.length ? (
    <div className="mb-6">
      <div className="ml-4 mb-2 text-sm text-gray-500">공유된 페이지</div>
      <ul>
        {sharedPages?.length > 0 &&
          sharedPages.map((page: PageType) => {
            return (
              <div
                key={page._id}
                className={`flex justify-between py-1 pl-4 hover:bg-gray-200 ${getSelectedClass(
                  page?._id,
                )}`}
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
                    <li className="ml-2 text-gray-700">
                      {page?.title
                        ? textLengthOverCut(page?.title)
                        : '제목 없음'}
                    </li>
                  </div>
                  <div className="flex items-center">
                    <AiFillDelete
                      className="mr-4 flex cursor-pointer items-center text-gray-600 hover:text-red-500"
                      onClick={() => handleDelete(page._id)}
                    />
                  </div>
                </Link>
              </div>
            );
          })}
      </ul>
    </div>
  ) : (
    <></>
  );
}

export default SharedPage;
