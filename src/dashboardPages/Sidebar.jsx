import React from 'react';
import { Link } from 'react-router';

const Sidebar = () => {
    return (
        <div className="join join-vertical w-full custom-border-100">
            <Link to='/dashboard'>            
            <button className="btn join-item w-full custom-bg-100 custom-border-200 text-white">Overview</button>
            </Link>
            <Link to='/dashboard/browse-listings'>            
            <button className="btn join-item w-full custom-bg-100 custom-border-200 text-white">All Items</button>
            </Link>
            <Link to='/dashboard/add-find-roommate'>            
            <button className="btn join-item w-full custom-bg-100 custom-border-200 text-white">Add Item</button>
            </Link>
            <Link to='/dashboard/my-listings'>            
            <button className="btn join-item w-full custom-bg-100 custom-border-200 text-white">My Items</button>
            </Link>
        </div>
    );
};

export default Sidebar;