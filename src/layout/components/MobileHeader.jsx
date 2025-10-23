import React from 'react';
import { Link } from 'react-router';

const MobileHeader = ({user}) => {
    return (
        <div className="navbar bg-white shadow-sm lg:hidden px-6 border-b border-gray-200 sticky top-0 z-10">
            <div className="flex-none">
                <label htmlFor="my-drawer-2" className="btn btn-ghost hover:bg-green-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </label>
            </div>

            <div className="flex-1 flex justify-center">
                <Link to="/" className="flex items-center">
                    <span className="text-2xl font-bold text-gray-800">
                        Room<span className="text-green-500">Ease</span>
                    </span>
                </Link>
            </div>

            <div className="flex-none">
                <div className="avatar">
                    <div className="w-8 h-8 rounded-full border border-green-200">
                        <img
                            src={user?.photoURL || 'https://i.ibb.co/2nF9mZh/default-avatar.png'}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileHeader;