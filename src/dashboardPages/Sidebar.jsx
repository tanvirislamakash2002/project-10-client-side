import React from 'react';
import { Link } from 'react-router';

const Sidebar = () => {
    return (
        <div className="join join-vertical w-full">
            <Link to='/dashboard'>            
            <button className="btn join-item w-full">Overview</button>
            </Link>
            <Link to='/dashboard/browse-listings'>            
            <button className="btn join-item w-full">All Items</button>
            </Link>
            <Link to='/dashboard/add-find-roommate'>            
            <button className="btn join-item w-full">Add Item</button>
            </Link>
            <Link to='/dashboard/my-listings'>            
            <button className="btn join-item w-full">My Items</button>
            </Link>
        </div>
    );
};

export default Sidebar;