import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styles from '@styles/pages/home/home.scss';
import Search from './sections/Search';
import Folders from './sections/Folders';
import Recent from './sections/Recent';



export default function Home () {

  return (
    <div className={styles.main}>
      <Search></Search>
      <Folders></Folders>
      <Recent></Recent>
    </div>
  );
}
