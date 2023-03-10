import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AiFillDelete, AiOutlineRight } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

import { changeParam } from '@/lib/service';
import usePageMutation from '@/hooks/usePageMutation';

import { getPageList } from '@/api/page';
import { queryClient } from '@/api/queryClient';
import { pageList } from '@/recoil';

import { PageType } from '@/types';

function MyPage() {
  const { data } = useQuery('pages', getPageList);
  const setPageList = useSetRecoilState(pageList);
  const { removePage } = usePageMutation();
  const { mutate: deletePageMutate } = removePage;
  const router = useRouter();

  useEffect(() => {
    setPageList(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id: string) => {
    console.log('delete', id);
    deletePageMutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries('pages');
        router.push('/');
      },
      onError: (error, variable, context) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <div className="ml-4 mb-2 text-sm text-gray-500">개인 페이지</div>
      <ul className="ml-4">
        {data?.length > 0 &&
          data.map((page: PageType) => {
            return (
              <div key={page._id} className="mb-1 flex justify-between">
                <Link href={`/page/${changeParam(page.title)}${page._id}}`}>
                  <div className="flex items-center">
                    <span>
                      <AiOutlineRight className="text-sm  text-gray-600" />
                    </span>
                    <li className="ml-2 text-gray-600">{page?.title}</li>
                  </div>
                </Link>
                <div className="flex items-center">
                  <AiFillDelete
                    className="mr-4 flex cursor-pointer items-center hover:text-red-500"
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
