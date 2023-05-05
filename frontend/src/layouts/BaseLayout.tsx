import * as React from "react";
import { Outlet } from "react-router-dom";
import styles from '@styles/layouts/baseLayout.scss';
import Navbar from "../pages/home/Navbar";
import Sidebar from "../pages/home/sideBar/Sidebar";

export default function BaseLayout(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <Navbar></Navbar>
      </div>
      <Outlet />
      <div className={styles.sidebar}>
        <Sidebar></Sidebar>
      </div>
    </div>
  );
}