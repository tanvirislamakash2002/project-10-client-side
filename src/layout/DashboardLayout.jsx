import React, { useState, use } from 'react';
import { Link, NavLink, Outlet, useNavigate, useNavigation } from 'react-router';
import {
  FaHome, FaPlusCircle, FaSignOutAlt, FaUser,
  FaTachometerAlt, FaClipboardList, FaChevronLeft, FaChevronRight,
  FaEnvelope, FaBell, FaHeart, FaCog, FaSearch
} from 'react-icons/fa';
import { MdDashboard, MdAssignmentInd, MdPostAdd } from 'react-icons/md';
import { AuthContext } from '../provider/AuthProvider';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { ToastContainer } from 'react-toastify';

const SidebarLink = ({ to, icon: Icon, label, badge = null, sidebarCollapsed, exact=false }) => (
  <li className="mb-1">
    <NavLink
      to={to}
      end={exact}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative ${
          isActive
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
            : 'hover:bg-green-50 hover:text-green-600 text-gray-600'
        }`
      }
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!sidebarCollapsed && (
        <span className="ml-3 font-medium transition-all duration-200">
          {label}
        </span>
      )}
      {!sidebarCollapsed && badge && (
        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </NavLink>
  </li>
);

const SectionHeader = ({ title, sidebarCollapsed }) => (
  !sidebarCollapsed && (
    <div className="px-4 py-3 mb-2">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </h3>
    </div>
  )
);

const DashboardLayout = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { darkMode, setDarkMode, user, signOutUser } = use(AuthContext);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => navigate('/login'))
      .catch(error => console.error('Logout error:', error));
  };

  if (navigation.state === 'loading') {
    return <Loading />;
  }

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gray-50">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Header */}
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

        {/* Desktop Header */}
        <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Provider Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Welcome back, {user?.displayName || 'Provider'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative btn btn-ghost btn-circle hover:bg-green-50">
                  <FaBell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Messages */}
                <button className="relative btn btn-ghost btn-circle hover:bg-green-50">
                  <FaEnvelope className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                </button>

                {/* Provider Badge */}
                <div className="badge badge-success badge-lg text-white">
                  Provider
                </div>

                {/* Profile */}
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 h-10 rounded-full border-2 border-green-200">
                      <img
                        src={user?.photoURL || 'https://i.ibb.co/2nF9mZh/default-avatar.png'}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </label>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-box w-52 border border-gray-200">
                    <li>
                      <Link to="/dashboard/profile" className="hover:bg-green-50">
                        <FaUser /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/settings" className="hover:bg-green-50">
                        <FaCog /> Settings
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleSignOut} className="hover:bg-red-50 text-red-600">
                        <FaSignOutAlt /> Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
          <Footer />
        </footer>

        <ToastContainer
          position="bottom-right"
          className="z-50"
        />
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <aside
          className={`bg-white shadow-xl min-h-full transition-all duration-300 flex flex-col border-r border-gray-200
            ${sidebarCollapsed ? 'w-20' : 'w-72'} 
            lg:${sidebarCollapsed ? 'w-20' : 'w-80'}
          `}
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <Link to="/" className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-gray-800">
                    Room<span className="text-green-500">Ease</span>
                  </span>
                </Link>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="btn btn-ghost btn-sm p-2 hover:bg-green-50 text-gray-600"
              >
                {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
              </button>
            </div>
          </div>

          {/* User Info Card */}
          {!sidebarCollapsed && (
            <div className="p-6 border-b border-gray-200">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full border-2 border-white shadow-lg">
                      <img
                        src={user?.photoURL || 'https://i.ibb.co/2nF9mZh/default-avatar.png'}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">
                      {user?.displayName || 'Provider'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {user?.email || 'provider@example.com'}
                    </p>
                    <div className="badge badge-success badge-sm mt-2 text-white">
                      Verified Provider
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {/* Main Navigation */}
              <SectionHeader sidebarCollapsed={sidebarCollapsed} title="Main Menu" />
              
              <SidebarLink
                sidebarCollapsed={sidebarCollapsed}
                to="/dashboard"
                icon={FaTachometerAlt}
                label="Dashboard"
                exact={true}
              />
              
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
                label="Create New Listing"
                exact={true}
              />

              {/* Activity Section */}
              <SectionHeader sidebarCollapsed={sidebarCollapsed} title="Activity" />
              
              <SidebarLink
                sidebarCollapsed={sidebarCollapsed}
                to="/dashboard/inquiries"
                icon={FaEnvelope}
                label="Inquiries"
                badge="5"
                exact={true}
              />
              
              <SidebarLink
                sidebarCollapsed={sidebarCollapsed}
                to="/dashboard/favorites"
                icon={FaHeart}
                label="Favorites"
              />
              
              <SidebarLink
                sidebarCollapsed={sidebarCollapsed}
                to="/dashboard/analytics"
                icon={FaClipboardList}
                label="Analytics"
              />

              {/* Account Section */}
              <SectionHeader sidebarCollapsed={sidebarCollapsed} title="Account" />
              
              <SidebarLink
                sidebarCollapsed={sidebarCollapsed}
                to="/dashboard/profile"
                icon={FaUser}
                label="My Profile"
              />
              
              <SidebarLink
                sidebarCollapsed={sidebarCollapsed}
                to="/dashboard/settings"
                icon={FaCog}
                label="Settings"
              />

              {/* Back to Home */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <SidebarLink
                  sidebarCollapsed={sidebarCollapsed}
                  to="/"
                  icon={FaHome}
                  label="Back to Home"
                />
              </div>
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className={`btn btn-ghost w-full justify-start text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 ${
                sidebarCollapsed ? 'px-2' : ''
              }`}
            >
              <FaSignOutAlt className="w-5 h-5" />
              {!sidebarCollapsed && <span className="ml-3">Sign Out</span>}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;