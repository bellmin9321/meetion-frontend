import React from 'react';

import MyPage from './MyPage';
import NewPage from './NewPageButton';
import Options from './Options';
import SidebarLayout from './SidebarLayout';

function Sidebar() {
  return (
    <SidebarLayout>
      <Options />
      <MyPage />
      <NewPage />
    </SidebarLayout>
  );
}

export default Sidebar;
