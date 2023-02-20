import React from 'react';

import { CategoryType } from '../layout/Sidebar';

interface ListProp {
  category: CategoryType;
}

function List({ category }: ListProp) {
  return (
    <li>
      <a
        href="#"
        className="rounded-m flex items-center py-1 text-base font-normal text-gray-500 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
      >
        <span className="ml-4">{category.icon}</span>
        <span className="ml-2">{category.name}</span>
      </a>
    </li>
  );
}

export default List;
