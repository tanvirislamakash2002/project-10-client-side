import React, { use } from 'react';
import { Outlet, useNavigation } from 'react-router';
import Loading from '../components/Loading';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../provider/AuthProvider';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Root = () => {
    const navigation = useNavigation()
    const { darkMode, setDarkMode  } = use(AuthContext)
    if (navigation.state === 'loading') {
        return (
            <Loading></Loading>
        )
    }
    return (
        <div className='text-custom-500'>
            <header className={`${darkMode && `bg-[#1F1F1F]`}  fixed z-50 bg-custom-500 w-full`}>
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