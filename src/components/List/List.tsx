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
        className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      >
        <span>{category.icon}</span>
        <span className="ml-3">{category.name}</span>
      </a>
    </li>
  );
}

export default List;
