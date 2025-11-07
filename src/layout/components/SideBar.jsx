import React from 'react';
import {
    FaHome, FaSignOutAlt, FaUser, FaCog, FaSearch, FaHeart,
    FaChevronLeft,
    FaChevronRight,
    FaCalendar
} from 'react-icons/fa';
import { MdDashboard, MdAssignmentInd, MdPostAdd } from 'react-icons/md';
import { FaMessage, FaChartLine, FaClipboardList } from 'react-icons/fa6';
import { Link } from 'react-router';
import UserInfoCard from './UserInfoCard';
import { SectionHeader } from './SectionHeader';
import SidebarLink from './SidebarLink';
import useUserRole from '../../../hooks/useUserRole';

const SideBar = ({ props }) => {
    const { sidebarCollapsed, setSidebarCollapsed, user, handleSignOut } = props
    const { role, roleLoading } = useUserRole();

    // Show loading state or default to seeker
    if (roleLoading) {
        return <div>Loading...</div>;
    }

    const isAdmin = role === 'admin';
    const isProvider = role === 'provider';
    const isSeeker = role === 'seeker';

    return (
        <div className="drawer-side z-40">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
    <aside
        className={`bg-white dark:bg-gray-800 shadow-xl min-h-full transition-all duration-300 flex flex-col border-r border-gray-200 dark:border-gray-700
            ${sidebarCollapsed ? 'w-20' : 'w-72'} 
            lg:${sidebarCollapsed ? 'w-20' : 'w-80'}
        `}
    >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
                {!sidebarCollapsed && (
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-gray-800 dark:text-white">
                            Room<span className="text-green-500">Ease</span>
                        </span>
                    </Link>
                )}
                <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="btn btn-ghost btn-sm p-2 hover:bg-green-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                >
                    {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
                </button>
            </div>
        </div>

        {/* User Info Card */}
        {!sidebarCollapsed && (
            <UserInfoCard user={user} role={role} />
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
                {/* Main Navigation */}
                <SectionHeader sidebarCollapsed={sidebarCollapsed} title="Main Menu" />

                <SidebarLink
                    sidebarCollapsed={sidebarCollapsed}
                    to="/dashboard"
                    icon={MdDashboard}
                    label="Dashboard"
                    exact={true}
                />

                {/* admin Routes */}
                {isAdmin && (
                    <>
                        <SidebarLink
                            sidebarCollapsed={sidebarCollapsed}
                            to="/dashboard/create-blog"
                            icon={MdAssignmentInd}
                            label="My Listings"
                            exact={false}
                        />

                    </>
                )}
                {/* Provider Routes */}
                {isProvider && (
                    <>
                        <SidebarLink
                            sidebarCollapsed={sidebarCollapsed}
                            to="/dashboard/my-listings"
                            icon={MdAssignmentInd}
                            label="My Listings"
                            exact={false}
                        />

                        <SidebarLink
                            sidebarCollapsed={sidebarCollapsed}
                            to="/dashboard/listings/new"
                            icon={MdPostAdd}
                            label="Create Listing"
                            exact={true}
                        />
                    </>
                )}

                {/* Seeker Routes */}
                {isSeeker && (
                    <>
                        <SidebarLink
                            sidebarCollapsed={sidebarCollapsed}
                            to="/browse"
                            icon={FaSearch}
                            label="Browse Listings"
                            exact={true}
                        />

                        <SidebarLink
                            sidebarCollapsed={sidebarCollapsed}
                            to="/dashboard/saved"
                            icon={FaHeart}
                            label="Saved Listings"
                            exact={true}
                        />

                        <SidebarLink
                            sidebarCollapsed={sidebarCollapsed}
                            to="/dashboard/applications"
                            icon={FaClipboardList}
                            label="My Applications"
                            exact={true}
                        />
                    </>
                )}

                {/* Activity Section */}
                <SectionHeader sidebarCollapsed={sidebarCollapsed} title="Activity" />

                <SidebarLink
                    sidebarCollapsed={sidebarCollapsed}
                    to="/dashboard/inquiries"
                    icon={FaMessage}
                    label="Messages"
                    badge="5"
                    exact={true}
                />

                {/* Provider-only Activity */}
                {isProvider && (
                    <SidebarLink
                        sidebarCollapsed={sidebarCollapsed}
                        to="/dashboard/analytics"
                        icon={FaChartLine}
                        label="Analytics"
                        exact={true}
                    />
                )}

                {/* Seeker-only Activity */}
                {isSeeker && (
                    <SidebarLink
                        sidebarCollapsed={sidebarCollapsed}
                        to="/dashboard/schedule"
                        icon={FaCalendar}
                        label="Schedule"
                        exact={true}
                    />
                )}

                {/* Account Section */}
                <SectionHeader sidebarCollapsed={sidebarCollapsed} title="Account" />

                <SidebarLink
                    sidebarCollapsed={sidebarCollapsed}
                    to="/dashboard/profile"
                    icon={FaUser}
                    label="My Profile"
                    exact={true}
                />

                {/* Seeker-only Account */}
                {isSeeker && (
                    <SidebarLink
                        sidebarCollapsed={sidebarCollapsed}
                        to="/dashboard/preferences"
                        icon={FaHeart}
                        label="Preferences"
                        exact={true}
                    />
                )}

                <SidebarLink
                    sidebarCollapsed={sidebarCollapsed}
                    to="/dashboard/settings"
                    icon={FaCog}
                    label="Settings"
                    exact={true}
                />

                {/* Back to Home */}
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                    <SidebarLink
                        sidebarCollapsed={sidebarCollapsed}
                        to="/"
                        icon={FaHome}
                        label="Back to Home"
                        exact={true}
                    />
                </div>
            </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
                onClick={handleSignOut}
                className={`btn btn-ghost w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-xl transition-all duration-200 ${sidebarCollapsed ? 'px-2' : ''
                    }`}
            >
                <FaSignOutAlt className="w-5 h-5" />
                {!sidebarCollapsed && <span className="ml-3">Sign Out</span>}
            </button>
        </div>
    </aside>
</div>
    );
};

export default SideBar;