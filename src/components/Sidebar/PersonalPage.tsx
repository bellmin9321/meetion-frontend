/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { AiFillDelete, AiOutlineRight } from 'react-icons/ai';

import useSidebar from '@/lib/hooks/useSidebar';
import { changeParam, textLengthOverCut } from '@/lib/util';

import { PageType } from '@/types';

function PersonalPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    pages,
    sharedPages,
    selectedId,
    handleAddPage,
    handleDelete,
    setSelectedId,
  } = useSidebar();

  useEffect(() => {
    if (session && !pages.length && !sharedPages.length) {
      handleAddPage();
    }
  }, [pages, sharedPages]);

  useEffect(() => {
    if (router.query.pid?.includes('-')) {
      const pid = router.query.pid as string;

      setSelectedId(pid.split('-')[1]);
      return;
    }

    setSelectedId(router.query.pid as string);
  }, [router.query.pid]);

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
                  {!sharedPages.length &&
                  pages.length === 1 &&
                  !page.title &&
                  !page.desc ? null : (
                    <div className="flex items-center">
                      <AiFillDelete
                        id="deleteBtn"
                        className="mr-4 flex cursor-pointer items-center text-gray-600 hover:text-red-500"
                        onClick={() => handleDelete(page._id, 'PERSONAL')}
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
