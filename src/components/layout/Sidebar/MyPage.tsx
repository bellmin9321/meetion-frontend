import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AiFillDelete, AiOutlineRight } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';

import { queryClient } from '@/lib/api/queryClient';
import usePageMutation from '@/lib/hooks/usePageMutation';
import { pageList } from '@/lib/recoil';
import { changeParam } from '@/lib/service';

import { PageType } from '@/types';
import { queryKeys } from '@/types/commonType';

function MyPage() {
  const router = useRouter();
  const pages = useRecoilValue(pageList);
  const { removePage } = usePageMutation();
  const { mutate: deletePageMutate } = removePage;

  const handleDelete = (id?: string) => {
    deletePageMutate(id ?? '', {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.pages);
        router.push('/');
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <div className="ml-4 mb-2 text-sm text-gray-500">개인 페이지</div>
      <ul>
        {pages?.length > 0 &&
          pages.map((page: PageType) => {
            return (
              <div
                key={page._id}
                className="flex justify-between py-1 pl-4 hover:bg-gray-200"
              >
                <Link href={`/page/${changeParam(page.title)}${page._id}`}>
                  <div className="flex items-center">
                    <span>
                      <AiOutlineRight className="text-sm  text-gray-600" />
                    </span>
                    <li className="ml-2 text-gray-600">{page?.title}</li>
                  </div>
                </Link>
                <div className="flex items-center">
                  <AiFillDelete
                    className="mr-4 flex cursor-pointer items-center text-gray-600 hover:text-red-500"
                    onClick={() => handleDelete(page._id)}
                  />
                </div>
              </div>
            );
          })}
      </ul>
    </>
  );
}

export default MyPage;
