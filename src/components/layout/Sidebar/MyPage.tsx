import Link from 'next/link';
import React, { useEffect } from 'react';
import { AiFillDelete, AiOutlineRight } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

import { getPageList } from '@/api/page';
import { pageList } from '@/recoil';

import { PageType } from '@/types';

function MyPage() {
  const { data } = useQuery('pages', getPageList);
  const setPageList = useSetRecoilState(pageList);

  useEffect(() => {
    setPageList(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="ml-4 mb-2 text-sm text-gray-500">개인 페이지</div>
      <ul className="ml-4">
        {data?.length > 0 &&
          data.map((page: PageType) => {
            return (
              <div key={page._id} className="flex justify-between">
                <Link href={`/page/${page._id}`}>
                  <div className="mb-1 flex items-center">
                    <span>
                      <AiOutlineRight className="text-sm  text-gray-600" />
                    </span>
                    <li className="ml-2 text-gray-600">{page?.title}</li>
                  </div>
                </Link>
                <AiFillDelete className="mr-4 cursor-pointer hover:text-red-500" />
              </div>
            );
          })}
      </ul>
    </>
  );
}

export default MyPage;
