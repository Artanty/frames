import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styles from '@styles/layouts/navbar.scss';
import Icon from '../../../components/Icon'
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  
  return (
    <div className={'fcbs ' + styles.wrapper}>
      <div>
        <div className={'fcbs mb20 mt5 ' + styles.logo}></div>
        <div className={'fcbs ' + styles.links1}>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <Icon icon='chart' size={80} color='grey'></Icon>
          </NavLink>
          <NavLink
            to="/folders"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <Icon icon='folder' size={80} color='grey'></Icon>
          </NavLink>
          
          <Icon icon='comment' size={80} color='grey'></Icon>
        </div>
      </div>
      <NavLink
        to="/settings"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        <Icon icon='options' size={80} color='grey'></Icon>
      </NavLink>
      
    </div>
  );
}

