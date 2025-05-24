import React, { use } from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import Banner from '../components/Banner';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/Footer';
import { AuthContext } from '../provider/AuthProvider';

const RootLayout = () => {
    const navigation = useNavigation()
    const { darkMode, setDarkMode  } = use(AuthContext)
    if (navigation.state === 'loading') {
        return (
            <Loading></Loading>
        )
    }
    return (
        <div>
            <header className={`${darkMode && `bg-[#1F1F1F]`}`}>
                <Navbar></Navbar>
            </header>
            <main className={`${darkMode && `bg-[#1F1F1F]`}`}>
                <Outlet></Outlet>
                <ToastContainer />
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayout;