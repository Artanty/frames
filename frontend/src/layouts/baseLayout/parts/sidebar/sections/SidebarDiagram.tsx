import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styles from '@styles/pages/home/sidebar/sections/sidebarDiagram.scss';
import Icon from '../../../../../components/Icon'

export default function SidebarDiagram() {
  
  return (
      <div className='fcec p20 w100'>
        <div className='frbc w100'>
          <div className='frbc'>
            <div className="colorlightgrey fw6 fz15">Хранилище</div>
            <Icon icon='trendingDown' size={70} color='white' wrapper={styles.trendingIcon}></Icon>
            <div className="colorlightgrey fw6 fz11 ml2 mr2">-3</div>
            <div className="colorlightgrey fw2 fz11">гб</div>
          </div>
          <Icon icon='more' size={70} wrapper={styles.moreIcon}></Icon>
        </div>  
        <div className='frcc p20'>
          <div className={styles.diagramWrapper}>
            <div className={styles.spike}></div>
            <div className={styles.spike}></div>
            <div className={styles.spike}></div>
            <div className={styles.spike}></div>
            <div className={styles.spike}></div>
            <div className={styles.spike}></div>
            <div className={styles.spike}></div>
            <div className={styles.spike}></div>
            <div className={styles.topOverflow}>
              <div className={styles.diagramData}>
                <div className='frbb'>
                  <div className='colorlightgrey fw6 fz33 mr2'>93</div>
                  <div className="colorsoftgrey fw6 fz15">гб</div>
                </div>
                <div className="colorsoftgrey fw3 fz13">Использовано</div>
              </div>
            </div>
            <div className={styles.diagramBody}></div>
          </div>
      </div>
    </div>
  );
}
