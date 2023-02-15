import Link from 'next/link';
import React, { ReactNode } from 'react';
import { BiSearch, BiTime } from 'react-icons/bi';
import { FaRegSun } from 'react-icons/fa';

import List from '../List/List';

export interface CategoryType {
  name: string;
  icon: ReactNode;
}

function Sidebar() {
  const categories = [
    { name: '검색', icon: <BiSearch className="icon" /> },
    { name: '업데이트', icon: <BiTime className="icon" /> },
    { name: '설정과 멤버', icon: <FaRegSun className="icon" /> },
  ];

  return (
    <nav>
      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <Link
          href="http://localhost:3000/"
          className="mb-5 flex justify-center"
        >
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            bellmin님의 meetion
          </span>
        </Link>
        <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
          <ul className="space-y-2">
            {categories.map((category: CategoryType, index: number) => {
              return <List key={index} category={category} />;
            })}
          </ul>
          <div>공유된 페이지</div>
          <ul className="space-y-2">
            {categories.map((category: CategoryType, index: number) => {
              return <List key={index} category={category} />;
            })}
          </ul>
          <div>개인 페이지</div>
          <div>새 페이지</div>
        </div>
      </aside>
    </nav>
  );
}

export default Sidebar;
