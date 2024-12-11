import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';
import Navbar from './components/Navbar';

const Layout = () => {
    return (
        <div className="layout-container plus-jakarta">
            <Navbar />
            <div className="main-content">
                <div className="content-area">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
