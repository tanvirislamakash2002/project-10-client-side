import { Outlet, useNavigation } from 'react-router';
import Loading from '../components/Loading';
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import RoleSwitcher from '../components/ForDeveloper/RoleSwitcher';

const Root = () => {
    const navigation = useNavigation()

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
            <main className='pt-16'>
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