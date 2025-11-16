import React, { use } from 'react';
import { Outlet, useNavigation } from 'react-router';
import Loading from '../components/Loading';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../provider/AuthProvider';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useQuery } from '@tanstack/react-query';
import RoleSwitcher from '../components/ForDeveloper/RoleSwitcher';

const Root = () => {
    const navigation = useNavigation()
    const { darkMode, setDarkMode  } = use(AuthContext)



    if (navigation.state === 'loading') {
        return (
            <Loading></Loading>
        )
    }
    return (
        <div className=''>
            <RoleSwitcher />
            <header className='bg-base-100 dark:bg-gray-900 transition-colors duration-300 shadow-lg fixed w-full z-50'>
                <Navbar></Navbar>
            </header>
            <main className='pt-16'
            // className={` dark:bg-[#1F1F1F] bg-base-200 pt-16`}
            >
                <Outlet></Outlet>
                <ToastContainer />
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default Root;