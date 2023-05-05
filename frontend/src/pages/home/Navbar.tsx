import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styles from '@styles/pages/home/navbar.scss';
import Icon from './../../components/Icon'


export default function Navbar() {
  
  return (
    <div className={'fcbs ' + styles.wrapper}>
      <div>
        <div className={'fcbs mb20 mt5 ' + styles.logo}></div>
        <div className={'fcbs ' + styles.links1}>
          <Icon icon='chart' size={80} color='grey'></Icon>
          <Icon icon='folder' size={80} color='grey'></Icon>
          <Icon icon='comment' size={80} color='grey'></Icon>
        </div>
      </div>
      <Icon icon='options' size={80} color='grey'></Icon>
    </div>
  );
}
