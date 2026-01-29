import React, { useState } from 'react';
import { 
  FiClock, 
  FiHome, 
  FiUsers, 
  FiTrendingUp, 
  FiUserPlus, 
  FiCheckCircle, 
  FiXCircle,
  FiAlertCircle
} from 'react-icons/fi';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useAuth from '../../../../hooks/useAuth';

const AdminDashboard = () => {
  const [timeframe, setTimeframe] = useState('30');
  const {darkMode:isDark, setDarkMode:setIsDark}= useAuth()

  // Mock data - replace with actual API data using TanStack Query
  const metrics = {
    pendingListings: 23,
    totalListings: 456,
    totalUsers: 1660,
    seekers: 1204,
    providers: 456,
    newUsersThisMonth: 87
  };

  // Registration trend data
  const registrationData = {
    '7': [
      { date: 'Mon', users: 12 },
      { date: 'Tue', users: 15 },
      { date: 'Wed', users: 8 },
      { date: 'Thu', users: 18 },
      { date: 'Fri', users: 22 },
      { date: 'Sat', users: 14 },
      { date: 'Sun', users: 10 }
    ],
    '30': [
      { date: 'Week 1', users: 45 },
      { date: 'Week 2', users: 62 },
      { date: 'Week 3', users: 78 },
      { date: 'Week 4', users: 87 }
    ],
    '90': [
      { date: 'Month 1', users: 156 },
      { date: 'Month 2', users: 198 },
      { date: 'Month 3', users: 234 }
    ]
  };

  // Listing status distribution
  const statusData = [
    { name: 'Approved', value: 398, color: '#10B981' },
    { name: 'Pending', value: 23, color: '#F59E0B' },
    { name: 'Rejected', value: 35, color: '#EF4444' }
  ];

  // Recent activity feed
  const recentActivities = [
    {
      id: 1,
      type: 'user',
      icon: FiUserPlus,
      description: 'New Provider Registered: "john_doe" just signed up.',
      time: '2 hours ago',
      color: 'text-blue-500'
    },
    {
      id: 2,
      type: 'listing',
      icon: FiHome,
      description: 'New Listing Submitted: "Sunny Room in Downtown" by "jane_smith" is pending review.',
      time: '1 hour ago',
      color: 'text-orange-500'
    },
    {
      id: 3,
      type: 'approved',
      icon: FiCheckCircle,
      description: 'Listing Approved: Admin "you" approved "Cozy Apartment near Campus".',
      time: '45 min ago',
      color: 'text-green-500'
    },
    {
      id: 4,
      type: 'rejected',
      icon: FiXCircle,
      description: 'Listing Rejected: Admin "you" rejected "Spacious Luxury Villa" (Reason: Blurry photos).',
      time: '30 min ago',
      color: 'text-red-500'
    },
    {
      id: 5,
      type: 'user',
      icon: FiUserPlus,
      description: 'New Seeker Registered: "new_user_123" just signed up.',
      time: '15 min ago',
      color: 'text-blue-500'
    },
    {
      id: 6,
      type: 'listing',
      icon: FiHome,
      description: 'New Listing Submitted: "Modern Studio Apartment" by "alex_carter" is pending review.',
      time: '10 min ago',
      color: 'text-orange-500'
    },
    {
      id: 7,
      type: 'approved',
      icon: FiCheckCircle,
      description: 'Listing Approved: Admin "you" approved "Shared House in Suburbs".',
      time: '5 min ago',
      color: 'text-green-500'
    }
  ];

  const MetricCard = ({ icon: Icon, title, value, subtext, onClick, highlight }) => (
    <div 
      onClick={onClick}
      className={`cursor-pointer bg-white dark:bg-base-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 ${
        highlight ? 'border-warning' : 'border-primary'
      } hover:scale-105`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-3 rounded-lg ${highlight ? 'bg-warning/10' : 'bg-primary/10'}`}>
              <Icon className={`text-2xl ${highlight ? 'text-warning' : 'text-primary dark:text-primary'}`} />
            </div>
            {highlight && (
              <FiAlertCircle className="text-warning text-xl" />
            )}
          </div>
          <h3 className="text-sm font-medium text-neutral dark:text-base-content/70 mb-1">
            {title}
          </h3>
          <p className="text-3xl font-bold text-base-content dark:text-base-content mb-1">
            {value.toLocaleString()}
          </p>
          <p className="text-xs text-neutral dark:text-base-content/60">
            {subtext}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-base-200 dark:bg-base-100">
        {/* Header */}
        {/* <div className="bg-white dark:bg-base-200 shadow-sm border-b border-base-300 dark:border-base-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-base-content dark:text-base-content">
                  Dashboard Overview
                </h1>
                <p className="text-sm text-neutral dark:text-base-content/70 mt-1">
                  Welcome back! Here's what's happening with your platform today.
                </p>
              </div>
              <button
                onClick={() => setIsDark(!isDark)}
                className="btn btn-circle btn-ghost"
              >
                {isDark ? '🌞' : '🌙'}
              </button>
            </div>
          </div>
        </div> */}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              icon={FiClock}
              title="Pending Listings"
              value={metrics.pendingListings}
              subtext="Awaiting Review"
              highlight={true}
              onClick={() => alert('Navigate to Listing Management - Pending')}
            />
            <MetricCard
              icon={FiHome}
              title="Total Listings"
              value={metrics.totalListings}
              subtext="All Time"
              onClick={() => alert('Navigate to Listing Management')}
            />
            <MetricCard
              icon={FiUsers}
              title="Total Users"
              value={metrics.totalUsers}
              subtext={`${metrics.seekers.toLocaleString()} Seekers | ${metrics.providers.toLocaleString()} Providers`}
              onClick={() => alert('Navigate to User Management')}
            />
            <MetricCard
              icon={FiTrendingUp}
              title="New Users"
              value={metrics.newUsersThisMonth}
              subtext="Growth this month"
              onClick={() => alert('Navigate to User Management - Sorted by date')}
            />
          </div>

          {/* Charts & Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Charts Section - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Registration Trend Chart */}
              <div className="bg-white dark:bg-base-200 rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-base-content dark:text-base-content">
                    Registration Trend
                  </h2>
                  <div className="flex gap-2">
                    {['7', '30', '90'].map((days) => (
                      <button
                        key={days}
                        onClick={() => setTimeframe(days)}
                        className={`btn btn-sm ${
                          timeframe === days 
                            ? 'btn-primary' 
                            : 'btn-ghost dark:btn-ghost'
                        }`}
                      >
                        {days === '7' ? 'Last 7 Days' : days === '30' ? 'Last 30 Days' : 'Last 90 Days'}
                      </button>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={registrationData[timeframe]}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e5e7eb'} />
                    <XAxis 
                      dataKey="date" 
                      stroke={isDark ? '#94a3b8' : '#6b7280'}
                    />
                    <YAxis stroke={isDark ? '#94a3b8' : '#6b7280'} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDark ? '#1E293B' : '#ffffff',
                        border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        color: isDark ? '#e2e8f0' : '#1f2937'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#0E7490" 
                      strokeWidth={3}
                      dot={{ fill: '#0E7490', r: 5 }}
                      activeDot={{ r: 7 }}
                      name="New Users"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Listing Status Distribution Chart */}
              <div className="bg-white dark:bg-base-200 rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-base-content dark:text-base-content mb-6">
                  Listing Status Distribution
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => alert(`Navigate to ${entry.name} listings`)}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDark ? '#1E293B' : '#ffffff',
                        border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        color: isDark ? '#e2e8f0' : '#1f2937'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  {statusData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-base-content dark:text-base-content">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity Feed - 1 column */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-base-200 rounded-lg shadow-md p-6 sticky top-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-base-content dark:text-base-content">
                    Recent Activity
                  </h2>
                  <button className="text-sm text-primary dark:text-primary hover:underline">
                    View Full Log
                  </button>
                </div>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {recentActivities.map((activity) => (
                    <div 
                      key={activity.id}
                      className="flex gap-3 pb-4 border-b border-base-300 dark:border-base-300 last:border-0"
                    >
                      <div className={`flex-shrink-0 ${activity.color} dark:${activity.color}`}>
                        <activity.icon className="text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-base-content dark:text-base-content leading-relaxed">
                          {activity.description}
                        </p>
                        <p className="text-xs text-neutral dark:text-base-content/60 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;