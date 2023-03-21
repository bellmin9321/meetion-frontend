import React from 'react';

import NewPage from './NewPageButton';
import Options from './Options';
import PersonalPage from './PersonalPage';
import SidebarLayout from './SidebarLayout';

function Sidebar() {
  return (
    <SidebarLayout>
      <Options />
      <PersonalPage />
      <NewPage />
    </SidebarLayout>
  );
}

export default Sidebar;
