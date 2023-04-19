import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useRecoilState, useRecoilValue } from 'recoil';

import { selectPage, shareModalState, userState } from '@/lib/recoil';

function ContentHeader({ title }: { title: string }) {
  const [isModal, setModal] = useRecoilState(shareModalState);

  const { email } = useRecoilValue(userState);
  const selectedPage = useRecoilValue(selectPage);
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
    <header className="fixed top-0 left-0 right-0 flex flex-row flex-wrap items-center justify-between p-3">
      <div className="sm:ml-[250px]">{title}</div>
      <div className="flex flex-wrap items-center justify-center  text-base sm:right-0 md:ml-auto">
        <span
          className="mr-3 cursor-pointer rounded-md px-2 hover:bg-gray-200 "
          onClick={handleLogout}
        >
          로그아웃
        </span>
        {email === selectedPage?.creator && (
          <span
            className="mr-3 cursor-pointer rounded-md px-2 hover:bg-gray-200"
            onClick={handleModal}
          >
            공유
          </span>
        )}
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
