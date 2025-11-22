import React from 'react';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import Logo from '../../components/Logo';
import { FaCog, FaSignOutAlt, FaUser } from 'react-icons/fa';

const MobileHeader = ({props}) => {
    const {user,handleSignOut}=props
    const {darkMode, setDarkMode}=useAuth()
    return (
<div className="navbar bg-white dark:bg-gray-800 shadow-sm lg:hidden px-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
    <div className="flex-none">
        <label htmlFor="my-drawer-2" className="btn btn-ghost hover:bg-green-50 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </label>
    </div>

    <div className="flex-1 flex justify-center">
        <Logo></Logo>
    </div>
    
    {/* Dark Mode Toggle */}
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="btn btn-ghost btn-circle dark:hover:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <MdLightMode className="w-5 h-5 text-yellow-400" />
      ) : (
        <MdDarkMode className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      )}
    </button>
    
    <div className="flex-none z-50">
                        <div className="dropdown dropdown-end z-50">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 h-10 rounded-full border-2 border-green-200 dark:border-green-800">
                                    <img
                                        src={user?.photoURL || 'https://i.ibb.co/2nF9mZh/default-avatar.png'}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-lg bg-white dark:bg-gray-800 rounded-box w-52 border border-gray-200 dark:border-gray-700">
                                <li>
                                    <Link to="/dashboard/profile" className="hover:bg-green-50 dark:hover:bg-gray-700 dark:text-white">
                                        <FaUser /> Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/settings" className="hover:bg-green-50 dark:hover:bg-gray-700 dark:text-white">
                                        <FaCog /> Settings
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleSignOut} className="hover:bg-red-50 dark:hover:bg-red-900 text-red-600 dark:text-red-400">
                                        <FaSignOutAlt /> Sign Out
                                    </button>
                                </li>
                            </ul>
                        </div>
    </div>
</div>
    );
};

export default MobileHeader;