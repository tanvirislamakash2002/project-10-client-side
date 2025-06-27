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
<div className="  custom-bg-500">
            <div className='flex max-w-7xl mx-auto'>
            {/* navigation bar  */}
            <aside className='w-4/12 md:w-2/12 custom-bg-500'>
                <Sidebar></Sidebar>
            </aside>

            <div className='w-8/12 md:w-10/12 bg-base-100'>
                {/* <header className={`${darkMode && `bg-[#1F1F1F]`}`}> */}
                <header>
                    {/* <Navbar></Navbar> */}
                    
                </header>
                {/* <main className={`${darkMode && `bg-[#1F1F1F]`}`}> */}
                <main className='min-h-[calc(100vh-260px)] '>
                    <Outlet></Outlet>
                    {/* <ToastContainer /> */}
                </main>
                <footer>
                    <Footer></Footer>
                </footer>
            </div>
        </div>
</div>
    );
};

export default DashboardLayout;