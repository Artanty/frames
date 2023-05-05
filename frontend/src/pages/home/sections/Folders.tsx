import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styles from '@styles/pages/home/sections/folders.scss';
import Icon from './../../../components/Icon'
type TFolderData = {
  id: number 
  name: string
  size: string
  sizeUnit: string
  quantity: string
  users?: number[],
  color?: string
}
export default function Folders () {
  const toggleSideBar = (e: any) => {
    console.log('toggleSideBar')
  }
  const handleSearchInput = (e: any) => {
    console.log(e)
  }
  const handleSarchInputIconClick = (e: any) => {
    console.log(e)
  }
  const labels = [
    { id: 1, value: '300 k', type: 'Docs' },
    { id: 2, value: '246', type: 'Audio' },
    { id: 3, value: '129', type: 'Music' },
    { id: 4, value: '868', type: 'Video' }
  ]
  const folders: TFolderData[] = [
    { id: 1, name: 'Компания', size: '26', sizeUnit: 'мб', quantity: '65',
      users: [1,2,3,4], color: 'yellow' },
    { id: 2, name: 'Важные доки', size: '6', sizeUnit: 'мб', quantity: '27',
      users: [1,2,3,4], color: 'purple' },
    { id: 3, name: 'Командная работа', size: '17', sizeUnit: 'мб', quantity: '8' },
    { id: 4, name: 'Заявки', size: '34', sizeUnit: 'мб', quantity: '7' },
    { id: 5, name: 'Фото продуктов', size: '80', sizeUnit: 'гб', quantity: '16' },
    { id: 6, name: 'Графики', size: '20', sizeUnit: 'мб', quantity: '12' },
  ]

  const importantFolder = (folderData: TFolderData) => {
    return (
      <div className={styles.importantFolder__wrapper}>
        <div className={styles.importantFolder__body}>
          <div className={styles.importantFolder__actions}>
          <Icon icon='chevronDown' size={80} color='white'></Icon>
          </div>
          <div className={styles.importantFolder__users}>
            {folderData.users?.map((i: any) => (
              <div key={i} className={styles.importantFolder__user}></div>
            ))}
          </div>
          <button className={styles.importantFolder__users__addIcon}>
            <Icon icon='plus' size={100} color='white'></Icon>
          </button>
        </div>
        <div className={styles.importantFolder__footer}>
          <div className={styles.importantFolder__name}>
            <Icon icon='folder' wrapper={styles.importantFolder__folderIcon} size={80} color='black'></Icon>
            <span className='fz20 fw6 colorblack'>{folderData.name}</span>
          </div>
          <div className={styles.importantFolder__size}>
            <span className='colorred fz14 fw7'>{folderData.size}</span>
            <span className='colorgrey fz12'>{folderData.sizeUnit}</span>
          </div>    
        </div>
      </div>
    )
  }
  const regularFolder = (folderData: TFolderData) => {
    return (
      <div className={styles.regularFolder__wrapper}>
        <div className={styles.regularFolder__folderIconWrapper}>
          <Icon icon='folder' wrapper={styles.regularFolder__folderIcon} size={70} color='black'></Icon>
        </div>
        <div>
        <span className='fz14 fw6 colorblack'>{folderData.name}</span>
        </div>
        <div className={styles.regularFolder__footer}>
          <div className={styles.regularFolder__size}>
            <span className='colorred fz12 fw7'>{folderData.size}</span>
            <span className='colorgrey fz11'>{folderData.sizeUnit}</span>
          </div>
          <div className='colorblack fz11 fw7'>{folderData.quantity}</div>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <h2 className='fz19'>Хранилище</h2>
          <div className={styles.status}>
            <Icon icon='trending' wrapper={'bggreen ' + styles.status__icon} size={60} color='white'></Icon>
            <span className={'fw8 fz13 ' + styles.status__value}>+3</span>
            <span className={'fw8 fz13 ' + styles.status__measure}>гб</span>
          </div>
        </div>
        <div className={styles.header__right}>
          <button className={'fz15 fw6 ' + styles.filterBtn}>
            <Icon icon='filterOff' size={100} color='darktext'></Icon>
            Фильтр
          </button>
          <button className={styles.addBtn}>
            <Icon icon='plus' size={90} color='white' wrapper={'bgskyblue ' + styles.addBtn__icon}></Icon>
          </button>
        </div>
      </div>
      <div className={styles.labels}>
        {labels.map(el => (
          <button key={el.id} className={styles.labels__item}>
            <span className='fz13 fw7 colorblack'>{el.value} </span>
            <span className='fz13 fw5 colorgrey'>{el.type}</span>
          </button>
        ))}
      </div>
      <div className={styles.folders}>
        {folders.map((el, i) => (
          <div key={el.id} 
          className={
            i < 2 ? 
            (styles.folders__item + ' ' + styles.importantFolder) :
            (styles.folders__item + ' ' + styles.regularFolder)}>
            {i < 2 ? importantFolder(el) : regularFolder(el)}
          </div>
        ))}
      </div>
    </div>
  );
}
