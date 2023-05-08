import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styles from '@styles/layouts/sidebar.scss';


import SidebarHeader from './sections/SidebarHeader';
import SidebarDiagram from './sections/SidebarDiagram';
import SidebarStatistics from './sections/SidebarStatictics';
import { AuthContext } from '../../../../routeProviders/auth';

export default function Sidebar() {
  const auth = React.useContext(AuthContext);

  return (
    <div className={'fcss ' + styles.wrapper}>
      <SidebarHeader></SidebarHeader>
      { auth?.user && (
        <>
          <SidebarDiagram></SidebarDiagram>
          <SidebarStatistics></SidebarStatistics>
        </>
      )
      }
    </div>
  );
}
