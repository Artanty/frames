import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styles from '@styles/pages/home/sidebar/sections/sidebarStatistics.scss';
import Icon from '../../../../components/Icon'
export default function SidebarStatistics() {

  const items = [
    { id: 1, name: 'Документы', quantity: '300', size: 10, icon: 'note' },
    { id: 2, name: 'Видео', quantity: '752', size: 30, icon: 'video' },
    { id: 3, name: 'Изображения', quantity: '805', size: 35, icon: 'image' },
    { id: 4, name: 'Аудио', quantity: '286', size: 75, icon: 'audio' },
    { id: 5, name: 'Музыка', quantity: '129', size: 14, icon: 'music' }
  ]
  return (
    <div className={'fсec p13 pr21 ' + styles.wrapper}>
      {items.map((el) => (
          <div key={el.id} className='frbc'>
            <div className='frbc'>
              <div className='mr10'>
                <Icon icon={el.icon} size={80} wrapper={styles.iconWrapper}></Icon>
              </div>
              <div className='fсbc'>
                <div className='colorlightgrey fw5 fz15 mb3'>{el.name}</div>
                <div className='colorsoftgrey fw5 fz12'>{el.quantity}</div>
              </div>
            </div>
            <div className={styles.sizeWrapper}>
              <div className='colorsoftgrey fw5 fz15 mr3'>{el.size}</div>
              <div className='colorgrey fw5 fz15'>гб</div>
            </div>
          </div>
        ))}
    </div>
  );
}
