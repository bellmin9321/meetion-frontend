import { signOut } from 'next-auth/react';
import * as React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { BiMessageDetail, BiTime } from 'react-icons/bi';
import { FiMoreHorizontal } from 'react-icons/fi';

export default function Header() {
  const handleLogout = () => {
    signOut();
  };

  return (
    <header>
      <div className="flex flex-col flex-wrap items-center p-5 md:flex-row">
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
          <span
            className="mr-3 cursor-pointer rounded-md py-1 px-2 hover:bg-gray-200 "
            onClick={handleLogout}
          >
            로그아웃
          </span>
          <span className="mr-3 cursor-pointer rounded-md py-1 px-2 hover:bg-gray-200 ">
            공유
          </span>
          <BiMessageDetail className="icon mr-5 cursor-pointer rounded-md hover:bg-gray-200" />
          <BiTime className="icon mr-5 cursor-pointer rounded-md hover:bg-gray-200" />
          <AiOutlineStar className="icon mr-5 cursor-pointer rounded-md hover:bg-gray-200" />
          <FiMoreHorizontal className="icon mr-5 cursor-pointer rounded-md hover:bg-gray-200" />
        </nav>
      </div>
    </header>
  );
}
