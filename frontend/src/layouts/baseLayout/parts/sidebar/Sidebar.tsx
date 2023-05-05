import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styles from '@styles/layouts/sidebar.scss';


import SidebarHeader from './sections/SidebarHeader';
import SidebarDiagram from './sections/SidebarDiagram';
import SidebarStatistics from './sections/SidebarStatictics';

export default function Sidebar() {
  
  return (
    <div className={'fcss ' + styles.wrapper}>
      <SidebarHeader></SidebarHeader>
      <SidebarDiagram></SidebarDiagram>
      <SidebarStatistics></SidebarStatistics>
    </div>
  );
}
