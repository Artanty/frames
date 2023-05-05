import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styles from '@styles/pages/home/sections/search.scss';
import Icon from './../../../components/Icon'
export default function Search() {
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
    <div className={styles.wrapper}>
      <div className={styles.wrapper__left}>
        <Icon icon='closeLeft'></Icon>
      </div>
      <div className={styles.wrapper__right}>
        <div className={styles.searchBlock}>
          <Icon icon='search' wrapper={styles.searchBlock__iconWrapper}></Icon>
          <input type="text" 
          className={styles.searchBlock__searchInput} 
          onInput={handleSearchInput}
          placeholder='Файл, папка' />
        </div>
      </div>
    </div>
  );
}
