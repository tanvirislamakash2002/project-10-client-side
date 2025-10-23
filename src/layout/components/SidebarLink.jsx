import React from 'react';
import { NavLink } from 'react-router';

const SidebarLink = ({ to, icon: Icon, label, badge = null, sidebarCollapsed, exact = false }) => (
  <li className="mb-1">
    <NavLink
      to={to}
      end={exact}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative ${isActive
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

export default SidebarLink;