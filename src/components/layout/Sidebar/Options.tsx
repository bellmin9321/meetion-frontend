import React, { ReactNode } from 'react';
import { BiSearch, BiTime } from 'react-icons/bi';
import { FaRegSun } from 'react-icons/fa';

import List from '@/components/List/List';

export interface CategoryType {
  name: string;
  icon: ReactNode;
}

function Options() {
  const categories = [
    { name: '검색', icon: <BiSearch className="icon" /> },
    { name: '업데이트', icon: <BiTime className="icon" /> },
    { name: '설정과 멤버', icon: <FaRegSun className="icon" /> },
  ];

  return (
    <ul className="mb-8 space-y-1">
      {categories.map((category: CategoryType, index: number) => {
        return <List key={index} category={category} />;
      })}
    </ul>
  );
}

export default Options;
