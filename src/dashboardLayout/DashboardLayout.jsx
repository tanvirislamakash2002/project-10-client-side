import React, { use } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link, Outlet, useNavigation } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../dashboardPages/sidebar';
import Loading from '../components/Loading';

const DashboardLayout = () => {
    const navigation = useNavigation()
    const { darkMode, setDarkMode  } = use(AuthContext)
    if (navigation.state === 'loading') {
        return (
            <Loading></Loading>
        )
    }
    return (
        <div className='flex'>
            {/* navigation bar  */}
            <aside className='w-1/6'>
                <Sidebar></Sidebar>
            </aside>
            
            <div className='w-5/6'>
                {/* <header className={`${darkMode && `bg-[#1F1F1F]`}`}> */}
                <header>
                    {/* <Navbar></Navbar> */}
                    <Link to='/'>Move back to home page</Link>
                </header>
                {/* <main className={`${darkMode && `bg-[#1F1F1F]`}`}> */}
                <main>
                    <Outlet></Outlet>
                    {/* <ToastContainer /> */}
                </main>
                <footer>
                    <Footer></Footer>
                </footer>
            </div>
        </div>
    );
};

export default DashboardLayout;