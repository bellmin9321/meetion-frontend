import Link from 'next/link';
import React, { ReactNode } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { BiPlus, BiSearch, BiTime } from 'react-icons/bi';
import { FaRegSun } from 'react-icons/fa';
import { useQuery } from 'react-query';

import { getPageList } from '@/api/page';

import List from '../List/List';

import { PageType } from '@/types';

export interface CategoryType {
  name: string;
  icon: ReactNode;
}

function Sidebar() {
  const { data } = useQuery('pages', getPageList);

  const categories = [
    { name: '검색', icon: <BiSearch className="icon" /> },
    { name: '업데이트', icon: <BiTime className="icon" /> },
    { name: '설정과 멤버', icon: <FaRegSun className="icon" /> },
  ];

  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="fixed top-0 left-0 z-40 h-screen w-60 -translate-x-full transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-gray-100 py-4 dark:bg-gray-800">
        <Link
          href="http://localhost:3000/"
          className="mb-5 flex justify-center"
        >
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Meetion
          </span>
        </Link>
        <div>
          <ul className="mb-8 space-y-1">
            {categories.map((category: CategoryType, index: number) => {
              return <List key={index} category={category} />;
            })}
          </ul>
          <div className="ml-4 mb-2 text-sm text-gray-500">개인 페이지</div>
          <ul className="ml-4">
            {data?.length > 0 &&
              data.map((page: PageType) => {
                return (
                  <div key={page._id} className="mb-1 flex items-center">
                    <span>
                      <AiOutlineRight className="text-sm  text-gray-600" />
                    </span>
                    <li className="ml-2 text-gray-600">{page?.title}</li>
                  </div>
                );
              })}
          </ul>
          <div className="fixed bottom-0 flex w-full cursor-pointer border-t-[1px] py-4 hover:bg-gray-200">
            <span className="ml-4">
              <BiPlus className="mr-3 h-6 w-6 text-gray-500" />
            </span>
            <span className="text-gray-500">새 페이지</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
