import React from 'react';

import { CategoryType } from '../layout/Sidebar/Options';

interface ListProp {
  category: CategoryType;
}

function List({ category }: ListProp) {
  return (
    <li className="toolList">
      <span className="ml-4">{category.icon}</span>
      <span className="ml-2">{category.name}</span>
    </li>
  );
}

export default List;
