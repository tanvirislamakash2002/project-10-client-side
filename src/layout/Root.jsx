import React, { use } from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import Banner from '../components/Banner';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/Footer';
import { AuthContext } from '../provider/AuthProvider';

const Root = () => {
    const navigation = useNavigation()
    const { darkMode, setDarkMode  } = use(AuthContext)
    if (navigation.state === 'loading') {
        return (
            <Loading></Loading>
        )
    }
    return (
        <div className='custom-color-500'>
            <header className={`${darkMode && `bg-[#1F1F1F]`}  fixed z-50 custom-bg-500 w-full`}>
                <Navbar></Navbar>
            </header>
            <main className={`${darkMode ? `bg-[#1F1F1F]`:`bg-base-200`} min-h-[calc(100vh-260px)] pt-16`}>
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