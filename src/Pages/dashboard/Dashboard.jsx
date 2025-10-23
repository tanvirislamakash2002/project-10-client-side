import React from 'react';
import ProviderDashboard from './Provider/ProviderDashboard';
import useUserRole from '../../../hooks/useUserRole';
import SeekerDashboard from './Seeker/SeekerDashboard/SeekerDashboard';

const Dashboard = () => {
    const { role, roleLoading } = useUserRole();

    // Handle loading state
    if (roleLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    // Handle conditional rendering
    if (role === 'provider') {
        return <ProviderDashboard />;
    }

    if (role === 'seeker') {
        return <SeekerDashboard />; 
    }

    // Default case - handle unknown/no role
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
                <p>You don't have permission to access the dashboard.</p>
            </div>
        </div>
    );
};

export default Dashboard;