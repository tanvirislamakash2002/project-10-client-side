import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';

import { FiHome, FiSearch, FiInfo, FiPhone, FiUser, FiLogOut, FiSettings, FiHelpCircle, FiPlus } from 'react-icons/fi';
import { MdDashboard, MdLightMode, MdDarkMode } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logOut, darkMode, setDarkMode, userRole } = useAuth(); // Assuming you have userRole in context
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Common nav link styles
  const navLinkClass = ({ isActive }) => 
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-green-600 text-white shadow-lg' 
        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
    }`;

  // Main navigation links
  const mainLinks = [
    { path: '/', label: 'Home', icon: <FiHome className="w-4 h-4" /> },
    { path: '/browse', label: 'Browse', icon: <FiSearch className="w-4 h-4" /> },
    { path: '/how-it-works', label: 'How It Works', icon: <FiInfo className="w-4 h-4" /> },
    { path: '/about-us', label: 'About Us', icon: <FiInfo className="w-4 h-4" /> },
    { path: '/contact-us', label: 'Contact', icon: <FiPhone className="w-4 h-4" /> },
  ];

  // User dropdown menu items
  const userMenuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <MdDashboard className="w-4 h-4" /> },
    { path: '/profile', label: 'My Profile', icon: <FiUser className="w-4 h-4" /> },
    { path: '/settings', label: 'Settings', icon: <FiSettings className="w-4 h-4" /> },
    { path: '/help', label: 'Help Center', icon: <FiHelpCircle className="w-4 h-4" /> },
  ];

  return (
    <div className={`navbar bg-base-100 shadow-lg sticky top-0 z-50 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {mainLinks.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path} className={navLinkClass}>
                  {link.icon}
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl normal-case">
          <span className="font-bold text-gray-800 dark:text-white">Room</span>
          <span className="text-green-600 font-bold">Ease</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {mainLinks.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} className={navLinkClass}>
                {link.icon}
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <MdLightMode className="w-5 h-5 text-yellow-400" />
          ) : (
            <MdDarkMode className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Conditional Add Listing Button (Providers only) */}
        { userRole === 'provider' && (
          <Link
            to="/add-listing"
            className="btn btn-primary gap-2 hidden sm:flex"
          >
            <FiPlus className="w-4 h-4" />
            Add Listing
          </Link>
        )}

        {/* Authentication Section */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-8 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="rounded-full" />
                ) : (
                  <span>{user.email?.[0]?.toUpperCase() || 'U'}</span>
                )}
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {/* User welcome */}
              <li className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Hello, {user.displayName || user.email?.split('@')[0] || 'User'}!
                </span>
              </li>
              
              {/* User menu items */}
              {userMenuItems.map((item) => (
                <li key={item.path}>
                  <NavLink to={item.path} className={navLinkClass}>
                    {item.icon}
                    {item.label}
                  </NavLink>
                </li>
              ))}

              {/* Add Listing for mobile (if provider) */}
              {userRole === 'provider' && (
                <li className="lg:hidden">
                  <Link to="/add-listing" className="flex items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-50">
                    <FiPlus className="w-4 h-4" />
                    Add Listing
                  </Link>
                </li>
              )}

              {/* Logout */}
              <li className="border-t border-gray-200 dark:border-gray-600 mt-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                >
                  <FiLogOut className="w-4 h-4" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          /* Login/Register Buttons */
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;