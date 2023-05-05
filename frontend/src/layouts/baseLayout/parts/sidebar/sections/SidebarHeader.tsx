import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styles from '@styles/pages/home/sidebar/sections/sidebarHeader.scss';
import Icon from '../../../../../components/Icon'
export default function SidebarHeader() {
  const toggleSideBar = (e: any) => {
    console.log('toggleSideBar')
  }
  const handleSearchInput = (e: any) => {
    console.log(e)
  }
  const handleSarchInputIconClick = (e: any) => {
    console.log(e)
  }
  return (
    <div className={'frec p13 pr21 w100 ' + styles.wrapper}>
      <Icon icon='bell' size={80}></Icon>
      <div className={'ml10 mr3 ' + styles.avatar}></div>
      <Icon icon='chevronDown' size={80}></Icon>
    </div>
  );
}
