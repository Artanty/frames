import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from '@styles/layouts/baseLayout.scss';
import Navbar from "../parts/Navbar";
import Sidebar from "./parts/sidebar/Sidebar";
// import { AuthContext } from "../../routeProviders/auth";

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
