import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useRecoilState } from 'recoil';

import { shareModalState } from '@/lib/recoil';

function ContentHeader({ title }: { title: string }) {
  const [isModal, setModal] = useRecoilState(shareModalState);
  const [isFavorite, setFavorite] = useState<boolean>(false);

  const handleLogout = () => {
    signOut();
  };

  const handleModal = () => {
    setModal(!isModal);
  };

  const handleClick = () => {
    setFavorite(!isFavorite);
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
        <span
          className="mr-3 cursor-pointer rounded-md px-2 hover:bg-gray-200"
          onClick={handleModal}
        >
          공유
        </span>
        {/* <BiMessageDetail className="icon mr-5 cursor-pointer rounded-md hover:bg-gray-200" /> */}
        {/* <BiTime className="icon mr-5 cursor-pointer rounded-md hover:bg-gray-200" /> */}
        <button onClick={handleClick}>
          {isFavorite ? (
            <AiFillStar
              className="icon mr-5 cursor-pointer rounded-md 
          fill-yellow-400 hover:bg-gray-200"
            />
          ) : (
            <AiOutlineStar className="icon mr-5 cursor-pointer rounded-md hover:bg-gray-200" />
          )}
        </button>
        {/* <FiMoreHorizontal className="icon mr-5 cursor-pointer rounded-md hover:bg-gray-200" /> */}
      </div>
    </header>
  );
}

export default ContentHeader;
