import React from 'react';
import SideBar from './SideBar';
import './layout.css'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <SideBar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
