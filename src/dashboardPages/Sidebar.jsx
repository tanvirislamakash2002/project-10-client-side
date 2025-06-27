import React from 'react';
import { FaHome } from 'react-icons/fa';
import { MdAssignmentInd, MdDashboard, MdInventory, MdPostAdd } from 'react-icons/md';
import { Link } from 'react-router';

const Sidebar = () => {
    return (
        <div className="join join-vertical w-full custom-border-100">
            <Link to='/dashboard'>            
            <button className="btn join-item w-full custom-bg-100 custom-border-200 text-white font-semibold">
                <MdDashboard size={18}/>Overview</button>
            </Link>
            <Link to='/dashboard/browse-listings'>            
            <button className="btn join-item w-full custom-bg-100 custom-border-200 text-white font-semibold">
                <MdInventory size={18}/>All Items</button>
            </Link>
            <Link to='/dashboard/add-find-roommate'>            
            <button className="btn join-item w-full custom-bg-100 custom-border-200 text-white font-semibold">
                <MdPostAdd size={18}/>Add Item</button>
            </Link>
            <Link to='/dashboard/my-listings'>            
            <button className="btn join-item w-full custom-bg-100 custom-border-200 text-white font-semibold">
                <MdAssignmentInd size={18}/>My Items</button>
            </Link>
            <Link to='/'>
            <button className="btn join-item w-full bg-yellow-200 custom-border-200 font-semibold">
                <FaHome size={18}/>
                Back to Home</button>
            </Link>
        </div>
    );
};

export default Sidebar;