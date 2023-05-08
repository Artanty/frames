import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import BaseLayout from "./layouts/baseLayout/BaseLayout";
import Home from "./pages/home/Home";
import '@styles/index.scss';
import Signup from "./pages/auth/Signup";
import Folders from "./pages/folders/Folders";
import Settings from "./pages/settings/Settings";
import Login from "@pages/auth/Login";
import {RequireAuth as A }  from "./routeGuards/auth";
import { RouteProviders } from "./routeProviders/_routeProviders";
import Loader from "@components/Loader";

export default function App() {
  return (
    <><RouteProviders>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<A><Home /></A>} />
          <Route path="folders" element={<A><Folders /></A>} />
          <Route path="settings" element={<A><Settings /></A>} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          
        </Route>
      </Routes>
      <Loader />
    </RouteProviders></>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <App />
);











