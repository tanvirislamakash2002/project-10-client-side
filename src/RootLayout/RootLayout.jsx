import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import Banner from '../components/Banner';

const RootLayout = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;