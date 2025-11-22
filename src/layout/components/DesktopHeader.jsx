import React from 'react';
import { FaSignOutAlt, FaUser, FaEnvelope, FaBell, FaCog } from 'react-icons/fa';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import useUserRole from '../../../hooks/useUserRole';

const DesktopHeader = ({props}) => {
    const {user,handleSignOut}=props
    const {darkMode, setDarkMode}=useAuth()
    const {role}= useUserRole()
    return (
        <div className="hidden lg:block bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 z-50 sticky top-0">
            <div className="px-8 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{role||'user'} Dashboard</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Welcome back, {user?.displayName || 'unknown'}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
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
                        {/* Notifications */}
                        <button className="relative btn btn-ghost btn-circle hover:bg-green-50 dark:hover:bg-gray-700">
                            <FaBell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Messages */}
                        <button className="relative btn btn-ghost btn-circle hover:bg-green-50 dark:hover:bg-gray-700">
                            <FaEnvelope className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                        </button>

                        {/* Provider Badge */}
                        <div className="badge badge-success badge-lg text-white">
                            Provider
                        </div>

                        {/* Profile */}
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 h-10 rounded-full border-2 border-green-200 dark:border-green-800">
                                    <img
                                        src={user?.photoURL || 'https://i.ibb.co/2nF9mZh/default-avatar.png'}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white dark:bg-gray-800 rounded-box w-52 border border-gray-200 dark:border-gray-700">
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
            </div>
        </div>
    );
};

export default DesktopHeader;