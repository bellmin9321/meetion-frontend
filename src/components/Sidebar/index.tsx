import React from 'react';

import NewPage from './NewPageButton';
import PersonalPage from './PersonalPage';
import SharedPage from './SharedPage';
import SidebarLayout from './SidebarLayout';

function Sidebar() {
  return (
    <SidebarLayout>
      {/* <Options /> */}
      <SharedPage />
      <PersonalPage />
      <NewPage />
    </SidebarLayout>
  );
}

export default Sidebar;
