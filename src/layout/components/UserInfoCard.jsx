import React from 'react';
const UserInfoCard = ({user}) => {
    return (
<div className="p-6 border-b border-gray-200 dark:border-gray-700">
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-xl p-4 border border-green-100 dark:border-green-800">
        <div className="flex items-center gap-3">
            <div className="avatar">
                <div className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 shadow-lg">
                    <img
                        src={user?.photoURL || 'https://i.ibb.co/2nF9mZh/default-avatar.png'}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 dark:text-white truncate">
                    {user?.displayName || 'Provider'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {user?.email || 'provider@example.com'}
                </p>
                <div className="badge badge-success badge-sm mt-2 text-white">
                    Verified Provider
                </div>
            </div>
        </div>
    </div>
</div>
    );
};

export default UserInfoCard;