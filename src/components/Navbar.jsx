import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
  const { user, logOut, darkMode, setDarkMode } = use(AuthContext)
  // console.log(user?.email)
  const links =
    <>
      <li className={`${darkMode && `text-white`} text-lg`}><NavLink className={({ isActive }) => isActive ? `bg-base-300 custom-bg-200 custom-border-300 border-b-2 text-white rounded-none hover:border-green-600` : `border-transparent border-b-2 text-white rounded-none hover:border-green-600`} to='/'>Home</NavLink></li>
      <li className={`${darkMode && `text-white`} text-lg`}><NavLink className={({ isActive }) => isActive ? `bg-base-300 custom-bg-200 custom-border-300 border-b-2 text-white rounded-none hover:border-green-600` : `border-transparent border-b-2 text-white rounded-none hover:border-green-600`} to='/all-items'>All Items</NavLink></li>
      <li className={`${darkMode && `text-white`} text-lg`}><NavLink className={({ isActive }) => isActive ? `bg-base-300 custom-bg-200 custom-border-300 border-b-2 text-white rounded-none hover:border-green-600` : `border-transparent border-b-2 text-white rounded-none hover:border-green-600`} to='/about-us'>About Us</NavLink></li>
      <li className={`${darkMode && `text-white`} text-lg`}><NavLink className={({ isActive }) => isActive ? `bg-base-300 custom-bg-200 custom-border-300 border-b-2 text-white rounded-none hover:border-green-600` : `border-transparent border-b-2 text-white rounded-none hover:border-green-600`} to='/contact-us'>Contact Us</NavLink></li>


    </>

  return (
    <div className={` navbar max-w-7xl mx-auto w-11/12`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow bg-base-300">
            <li className={`${darkMode && `text-black`} text-lg`}><NavLink className={({ isActive }) => isActive ? `bg-base-300 custom-bg-200 custom-border-300 border-b-2 text-white rounded-none hover:border-green-600` : `border-transparent border-b-2 text-black rounded-none hover:border-green-600`} to='/'>Home</NavLink></li>
            <li className={`${darkMode && `text-black`} text-lg`}><NavLink className={({ isActive }) => isActive ? `bg-base-300 custom-bg-200 custom-border-300 border-b-2 text-white rounded-none hover:border-green-600` : `border-transparent border-b-2 text-black rounded-none hover:border-green-600`} to='/all-items'>All Items</NavLink></li>
            <li className={`${darkMode && `text-black`} text-lg`}><NavLink className={({ isActive }) => isActive ? `bg-base-300 custom-bg-200 custom-border-300 border-b-2 text-white rounded-none hover:border-green-600` : `border-transparent border-b-2 text-black rounded-none hover:border-green-600`} to='/about-us'>About Us</NavLink></li>
            <li className={`${darkMode && `text-black`} text-lg`}><NavLink className={({ isActive }) => isActive ? `bg-base-300 custom-bg-200 custom-border-300 border-b-2 text-white rounded-none hover:border-green-600` : `border-transparent border-b-2 text-black rounded-none hover:border-green-600`} to='/contact-us'>Contact Us</NavLink></li>
          </ul>
        </div>
        <a className={` text-3xl font-bold text-white ml-2`}>Room<span className='text-green-500'>Ease</span></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

      <div className="navbar-end">
        <label className="swap swap-rotate mr-5">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" onClick={() => setDarkMode(!darkMode)} />

          {/* sun icon */}
          <svg
            className={`${!darkMode && `hidden`} h-10 w-10 fill-current text-white`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className={`${darkMode && `hidden`} h-10 w-10 fill-current text-white`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        {user ? <div className='flex gap-1'>
          <NavLink to='/dashboard' className='btn bg-green-700 text-white hover:text-green-900 hover:bg-white border-green-700 hover:border-green-700'>Dashboard</NavLink>
          <button onClick={logOut} className='btn hover:bg-green-700 hover:text-white border-green-700 text-green-900'>LogOut</button>
        </div>
          :
          <div className='flex gap-1'>
            <Link to='/login' className="btn bg-green-700 text-white hover:text-green-900 hover:bg-white border-green-700 hover:border-green-700">Login</Link>
            <Link to='/register' className="btn hover:bg-green-700 hover:text-white border-green-700 text-green-900">Register</Link>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;