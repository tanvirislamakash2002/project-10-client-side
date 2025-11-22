import React from 'react';

import logo1 from '../assets/text-logo.png';
import logo2 from '../assets/symbol-logo-with-text.png';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/" className="btn btn-ghost text-xl normal-case hover:bg-transparent">
  <img 
    src={logo2} 
    alt="RoomEase Logo" 
    className="h-6 w-auto transition-all duration-300 hover:filter hover:drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_2px_4px_rgba(255,255,255,0.1)] block sm:hidden" 
  />
  <img 
    src={logo1} 
    alt="RoomEase Logo" 
    className="h-6 w-auto transition-all duration-300 hover:filter hover:drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_2px_4px_rgba(255,255,255,0.1)] hidden sm:block" 
  />
</Link>
    );
};

export default Logo;