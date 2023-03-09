import Link from 'next/link';
import React, { ReactNode } from 'react';

interface SidebarLayoutProp {
  children: ReactNode;
}

function SidebarLayout({ children }: SidebarLayoutProp) {
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="fixed top-0 left-0 z-40 h-screen w-60 -translate-x-full transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-gray-100 py-4 dark:bg-gray-800">
        <Link href="/" className="mb-5 flex justify-center">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Meetion
          </span>
        </Link>
        <div>{children}</div>
      </div>
    </aside>
  );
}

export default SidebarLayout;
