import React from 'react';
import { FaHome } from 'react-icons/fa';
import { MdAssignmentInd, MdDashboard, MdInventory, MdPostAdd } from 'react-icons/md';
import { Link, useLocation } from 'react-router';

const Sidebar = () => {
    const location = useLocation()
    // console.log(location.pathname)
    return (
        <div className="join join-vertical w-full custom-border-100">
                    <a className={` text-3xl font-bold text-white ml-2 my-4`}>Room<span className='text-green-500'>Ease</span></a>
            <Link to='/dashboard'>            
            <button className={`${location.pathname=='/dashboard'?'custom-bg-300 custom-border-200':'custom-bg-100 custom-border-200'} btn join-item w-full text-white font-semibold`}>
                <MdDashboard size={18}/>Overview</button>
            </Link>
            <Link to='/dashboard/browse-listings'>            
            <button className={`${location.pathname=='/dashboard/browse-listings'?'custom-bg-300 custom-border-200':'custom-bg-100 custom-border-200'} btn join-item w-full text-white font-semibold`}>
                <MdInventory size={18}/>All Items</button>
            </Link>
            <Link to='/dashboard/add-find-roommate'>            
            <button className={`${location.pathname=='/dashboard/add-find-roommate'?'custom-bg-300 custom-border-200':'custom-bg-100 custom-border-200'} btn join-item w-full text-white font-semibold`}>
                <MdPostAdd size={18}/>Add Item</button>
            </Link>
            <Link to='/dashboard/my-listings'>            
            <button className={`${location.pathname=='/dashboard/my-listings'?'custom-bg-300 custom-border-200':'custom-bg-100 custom-border-200'} btn join-item w-full text-white font-semibold`}>
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