import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import Banner from '../components/Banner';
import { ToastContainer } from 'react-toastify';

const RootLayout = () => {
    const navigation = useNavigation()
    if(navigation.state === 'loading'){
        return(
            <Loading></Loading>
        )
    }
    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>
            <Outlet></Outlet>
            <ToastContainer />
        </div>
    );
};

export default RootLayout;