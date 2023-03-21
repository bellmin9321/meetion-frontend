import { signOut } from 'next-auth/react';
import * as React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { BiMessageDetail, BiTime } from 'react-icons/bi';
import { FiMoreHorizontal } from 'react-icons/fi';

function ContentHeader({ title }: { title: string }) {
  const handleLogout = () => {
    signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex flex-row flex-wrap items-center p-3 md:flex-row">
      <div className="ml-[250px]">{title}</div>
      <div className="flex flex-wrap items-center justify-center  text-base md:ml-auto">
        <span
          className="mr-3 cursor-pointer rounded-md px-2 hover:bg-gray-200 "
          onClick={handleLogout}
        >
          로그아웃
        </span>
        <span className="mr-3 cursor-pointer rounded-md px-2 hover:bg-gray-200 ">
          공유
        </span>
        <BiMessageDetail className="icon mr-5 cursor-pointer rounded-md hover:bg-gray-200" />
        <BiTime className="icon mr-5 cursor-pointer rounded-md hover:bg-gray-200" />
        <AiOutlineStar className="icon mr-5 cursor-pointer rounded-md hover:bg-gray-200" />
        <FiMoreHorizontal className="icon mr-5 cursor-pointer rounded-md hover:bg-gray-200" />
      </div>
    </header>
  );
}

export default ContentHeader;
