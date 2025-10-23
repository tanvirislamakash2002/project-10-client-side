import React from 'react';
import { FaSignOutAlt, FaUser, FaEnvelope, FaBell, FaCog } from 'react-icons/fa';
import { Link } from 'react-router';

const DesktopHeader = ({props}) => {
    const {user,handleSignOut}=props
    return (
        <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
            <div className="px-8 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Provider Dashboard</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Welcome back, {user?.displayName || 'Provider'}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <button className="relative btn btn-ghost btn-circle hover:bg-green-50">
                            <FaBell className="w-5 h-5 text-gray-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Messages */}
                        <button className="relative btn btn-ghost btn-circle hover:bg-green-50">
                            <FaEnvelope className="w-5 h-5 text-gray-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                        </button>

                        {/* Provider Badge */}
                        <div className="badge badge-success badge-lg text-white">
                            Provider
                        </div>

                        {/* Profile */}
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 h-10 rounded-full border-2 border-green-200">
                                    <img
                                        src={user?.photoURL || 'https://i.ibb.co/2nF9mZh/default-avatar.png'}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-box w-52 border border-gray-200">
                                <li>
                                    <Link to="/dashboard/profile" className="hover:bg-green-50">
                                        <FaUser /> Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/settings" className="hover:bg-green-50">
                                        <FaCog /> Settings
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleSignOut} className="hover:bg-red-50 text-red-600">
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