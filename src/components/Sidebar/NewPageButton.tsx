import React from 'react';
import { BiPlus } from 'react-icons/bi';

import useSidebar from '@/lib/hooks/useSidebar';

function NewPageButton() {
  const { handleAddPage } = useSidebar();

  return (
    <div
      className="fixed bottom-0 flex w-full cursor-pointer border-t-[1px] py-4 hover:bg-gray-200"
      onClick={handleAddPage}
    >
      <span className="ml-4">
        <BiPlus className="mr-3 h-6 w-6 text-gray-500" />
      </span>
      <span className="text-gray-500">새 페이지</span>
    </div>
  );
}

export default NewPageButton;
