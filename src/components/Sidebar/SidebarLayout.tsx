import Link from 'next/link';
import React, { ReactNode } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { shareModalState, userState } from '@/lib/recoil';

interface SidebarLayoutProp {
  children: ReactNode;
}

function SidebarLayout({ children }: SidebarLayoutProp) {
  const setModal = useSetRecoilState(shareModalState);
  const { name } = useRecoilValue(userState);

  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="fixed top-0 left-0 z-40 h-screen w-60 -translate-x-full transition-transform sm:translate-x-0"
      aria-label="Sidebar"
      onClick={() => setModal(false)}
    >
      <div className="h-full overflow-y-auto bg-gray-100 py-4 dark:bg-gray-800">
        <Link href="/" className="mb-5 flex justify-center">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            {`${name === undefined ? '' : name + '의'} Meetion`}
          </span>
        </Link>
        <div>{children}</div>
      </div>
    </aside>
  );
}

export default SidebarLayout;
