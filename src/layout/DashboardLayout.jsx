import React, { useState, use } from 'react';
import { Outlet, useNavigate, useNavigation } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../components/Loading';
import { ToastContainer } from 'react-toastify';
import SideBar from './components/SideBar';
import DesktopHeader from './components/DesktopHeader';
import MobileHeader from './components/MobileHeader';
import { useApplicationModal } from '../../hooks/useApplicationModal';
import ApplicationModal from '../Pages/dashboard/Seeker/ApplicationModal/ApplicationModal';
import Footer from '../components/Footer/Footer';
import RoleSwitcher from '../components/ForDeveloper/RoleSwitcher';




const DashboardLayout = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { darkMode, setDarkMode, user, logOut } = use(AuthContext);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isModalOpen, closeModal } = useApplicationModal();
  const handleApplicationSuccess = () => {
    // Handle successful application
    closeModal();
  };
  const handleSignOut = () => {
    logOut()
      .then(() => navigate('/login'))
      .catch(error => console.error('Logout error:', error));
  };

  if (navigation.state === 'loading') {
    return <Loading />;
  }

  return (
<div className="drawer lg:drawer-open min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

  {/* Main Content */}
  <div className="drawer-content flex flex-col">
            <RoleSwitcher right0={'right-0'} justifyEnd={'justify-end'} />
    {/* Mobile Header */}
    <MobileHeader props={{user,handleSignOut}}></MobileHeader>

    {/* Desktop Header */}
    <DesktopHeader props={{ user, handleSignOut }}></DesktopHeader>

    {/* Main Content Area */}
    <main className="flex-1 p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </main>

    {/* Footer */}
    <footer className="bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <Footer />
    </footer>

    <ToastContainer
      position="bottom-right"
      className="z-50"
    />
  </div>

  {/* Sidebar */}
  <SideBar props={{ sidebarCollapsed, setSidebarCollapsed, user, handleSignOut }}></SideBar>

  {/* application modal */}
  {isModalOpen && (
    <ApplicationModal
      onClose={closeModal}
      onSuccess={handleApplicationSuccess}
    />
  )}
</div>

  );
};

export default DashboardLayout;