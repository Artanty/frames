import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styles from '@styles/pages/home/sections/recent.scss';
import Icon from './../../../components/Icon'
export default function Recent() {

  const recents = [
    { id: 1, name: 'Файлы проекта', fileTypes: ['PDF', 'Video', 'Image'], size: '600', sizeUnit:'мб', date: 'Среда, 10 июля 2022' },
    { id: 1, name: 'Внутренние документы', fileTypes: ['Excel', 'Word', 'PDF'], size: '400', sizeUnit:'мб', date: 'Среда, 10 июля 2022' }
  ]
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h2 className='fz19 colorblack'>Недавно загруженные файлы</h2>
        </div>
        <div>
          <button className={styles.viewAllBtn}>Смотреть все</button>
        </div>
      </div>
      <ul>
      {recents.map((el, i) => (
          <li key={el.id} 
            className={styles.listItem}>
            <div className={styles.listItem__name_and_iconWrapper}>
              <div className={styles.listItem__iconWrapper}>
                <Icon wrapper={styles.noteIcon}
                icon='note' size={110} color='purple'></Icon>
              </div>
              <div className={styles.listItem__nameWrapper}>
                <span className='fw7 fz15'>{el.name}</span>
                <span className='fw3 fz13'>{el.fileTypes?.join(', ')}</span>
              </div>
            </div>
            <div>
              <span className='colorred fz14 fw7 mr2'>{el.size}</span>
              <span className='colorgrey fz11'>{el.sizeUnit}</span>
            </div>
            <div className='colorgrey fz12 fw6 mr2'>
              {el.date}
            </div>
            <div className='frbc'>
              <button className={'mr5 ' + styles.listItem__newBtn}>Новый</button>
              <Icon icon='arrowRight' size={80} color='softgrey'></Icon>
            </div>
          </li>
          ))}
      </ul>
    </div>
  );
}