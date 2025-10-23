import React from 'react';
const UserInfoCard = ({user}) => {
    return (
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
    );
};

export default UserInfoCard;