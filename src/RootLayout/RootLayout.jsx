import React from 'react';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            Thie is the root
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;