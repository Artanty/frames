import * as React from "react";
import { Outlet } from "react-router-dom";
import styles from '@styles/layouts/baseLayout.scss';
import Navbar from "./parts/Navbar";


export default function AuthLayout(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <Navbar></Navbar>
      </div>
      <Outlet />
      
    </div>
  );
}