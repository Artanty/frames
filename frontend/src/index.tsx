import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/baseLayout/BaseLayout";
import Home from "./pages/home/Home";
import '@styles/index.scss';
import Signup from "./pages/auth/Signup";
import Folders from "./pages/folders/Folders";
import Settings from "./pages/settings/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="folders" element={<Folders />} />
          <Route path="signup" element={<Signup />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
