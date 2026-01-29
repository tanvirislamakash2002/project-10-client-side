import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';

import { FiHome, FiSearch, FiInfo, FiPhone, FiUser, FiLogOut, FiSettings, FiHelpCircle, FiPlus, FiFileText } from 'react-icons/fi';
import { MdDashboard, MdLightMode, MdDarkMode, MdOutlineMessage } from 'react-icons/md';
import useAuth from '../../../hooks/useAuth';
import useUserRole from '../../../hooks/useUserRole';
import Logo from '../Logo';

const Navbar = () => {
  const { user, logOut, darkMode, setDarkMode } = useAuth(); 
  const navigate = useNavigate();

  const {role:userRole}= useUserRole()

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
    ? 'bg-primary text-primary-content shadow-lg' 
    : 'text-base-content hover:bg-base-200 dark:text-base-content dark:hover:bg-base-300'
}`;

  // Main navigation links
  const mainLinks = [
    { path: '/', label: 'Home', icon: <FiHome className="w-4 h-4" /> },
    { path: '/browse', label: 'Browse', icon: <FiSearch className="w-4 h-4" /> },
    { path: '/blog', label: 'Blog', icon: <FiFileText className="w-4 h-4" /> },
    { path: '/about-us', label: 'About Us', icon: <FiInfo className="w-4 h-4" /> },
    { path: '/contact-us', label: 'Contact', icon: <FiPhone className="w-4 h-4" /> },
  ];

  // User dropdown menu items
  const userMenuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <MdDashboard className="w-4 h-4" /> },
    { path: '/profile', label: 'My Profile', icon: <FiUser className="w-4 h-4" /> },
    { path: '/dashboard/inquiries', label: 'Messages', icon: <MdOutlineMessage  className="w-4 h-4" /> },
    { path: '/settings', label: 'Settings', icon: <FiSettings className="w-4 h-4" /> },
    { path: '/help', label: 'Help Center', icon: <FiHelpCircle className="w-4 h-4" /> },
  ];

  return (
<div className={`navbar sticky top-0 z-50 max-w-7xl mx-auto bg-base-100 border-section-border shadow-sm`}>
  <div className="navbar-start">
    {/* Mobile dropdown */}
    <div className="dropdown lg:hidden">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-base-content">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-section-border">
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
    <Logo></Logo>
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
      className="btn btn-ghost btn-circle text-base-content hover:bg-base-200"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <MdLightMode className="w-5 h-5 text-warning" />
      ) : (
        <MdDarkMode className="w-5 h-5 text-neutral" />
      )}
    </button>

    {/* Conditional Add Listing Button (Providers only) */}
    { userRole === 'provider' && (
      <Link
        to="/dashboard/listings/new"
        className="btn btn-primary gap-2 hidden sm:flex bg-primary text-primary-content border-primary hover:bg-primary/90"
      >
        <FiPlus className="w-4 h-4" />
        Add Listing
      </Link>
    )}

    {/* Authentication Section */}
    {user ? (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar bg-base-200 hover:bg-base-300">
          <div className="w-8 rounded-full bg-secondary text-secondary-content flex items-center justify-center font-semibold">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="rounded-full" />
            ) : (
              <span>{user.email?.[0]?.toUpperCase() || 'U'}</span>
            )}
          </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-section-border dark:bg-base-200">
          {/* User welcome */}
          <li className="px-4 py-2 border-b border-section-border">
            <span className="text-sm font-semibold text-base-content">
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
              <Link to="/dashboard/listings/new" className="flex items-center gap-2 px-4 py-2 text-secondary hover:bg-base-200">
                <FiPlus className="w-4 h-4" />
                Add Listing
              </Link>
            </li>
          )}

          {/* Logout */}
          <li className="border-t border-section-border mt-1">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-error hover:bg-base-200 w-full text-left"
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
        <Link to="/login" className="btn btn-ghost text-base-content hover:bg-base-200">
          Login
        </Link>
        <Link to="/register" className="btn btn-primary bg-primary text-primary-content border-primary hover:bg-primary/90">
          Register
        </Link>
      </div>
    )}
  </div>
</div>
  );
};

export default Navbar;