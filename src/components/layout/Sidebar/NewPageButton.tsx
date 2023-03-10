import Link from 'next/link';
import React from 'react';
import { BiPlus } from 'react-icons/bi';

function NewPage() {
  return (
    <Link
      href="/"
      className="fixed bottom-0 flex w-full cursor-pointer border-t-[1px] py-4 hover:bg-gray-200"
    >
      <span className="ml-4">
        <BiPlus className="mr-3 h-6 w-6 text-gray-500" />
      </span>
      <span className="text-gray-500">새 페이지</span>
    </Link>
  );
}

export default NewPage;
