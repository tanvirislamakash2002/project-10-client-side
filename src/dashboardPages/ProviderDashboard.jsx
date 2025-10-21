import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, MessageSquare, Eye, TrendingUp, AlertCircle, Bell, Lightbulb, Calendar, Clock, Heart, CheckCircle, Clock3, Home, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export default function ProviderDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');

  // Mock data - replace with actual API calls
  const dashboardData = {
    summaryMetrics: {
      totalListings: { total: 12, active: 8, pending: 3, rejected: 1 },
      newInquiries: 24,
      totalViews: { value: 1250, change: 18 },
      responseRate: { value: 94, target: 95 },
    },
    recentInquiries: [
      { id: 1, seekerName: 'John Doe', listing: 'Downtown Studio', message: 'Is the room still available?', time: '2 hours ago', unread: true },
      { id: 2, seekerName: 'Sarah Smith', listing: 'Cozy 2BR Apt', message: 'Can we schedule a viewing?', time: '4 hours ago', unread: true },
      { id: 3, seekerName: 'Mike Johnson', listing: 'Downtown Studio', message: 'Thank you for the reply', time: '1 day ago', unread: false },
      { id: 4, seekerName: 'Emily Chen', listing: 'Shared House', message: 'Interested in learning more', time: '2 days ago', unread: false },
      { id: 5, seekerName: 'Alex Brown', listing: 'Premium Suite', message: 'What utilities are included?', time: '2 days ago', unread: false },
    ],
    recentViews: [
      { listing: 'Downtown Studio', views: 45, date: 'Last 7 days' },
      { listing: 'Cozy 2BR Apt', views: 38, date: 'Last 7 days' },
      { listing: 'Premium Suite', views: 32, date: 'Last 7 days' },
    ],
    newFavorites: [
      { seekerName: 'Lisa Wang', listing: 'Downtown Studio', time: '3 hours ago' },
      { seekerName: 'David Park', listing: 'Premium Suite', time: '1 day ago' },
    ],
    topListings: [
      { name: 'Downtown Studio', views: 342, inquiries: 12, status: 'Active' },
      { name: 'Cozy 2BR Apt', views: 298, inquiries: 9, status: 'Active' },
      { name: 'Premium Suite', views: 245, inquiries: 7, status: 'Active' },
    ],
    listingStatusChart: [
      { name: 'Active', value: 8, fill: '#10b981' },
      { name: 'Pending', value: 3, fill: '#f59e0b' },
      { name: 'Rejected', value: 1, fill: '#A30000' },
    ],
    pendingActions: [
      { id: 1, type: 'approval', listing: 'New Luxury Apartment', action: 'Awaiting admin review' },
      { id: 2, type: 'update', listing: 'Downtown Studio', action: 'Update photos requested' },
    ],
    notifications: [
      { id: 1, type: 'success', message: 'Your profile has been verified', time: '1 day ago' },
      { id: 2, type: 'info', message: 'New message from admin about your listing', time: '2 days ago' },
    ],
    tips: [
      'Add more photos to increase listing views by up to 40%',
      'Respond to inquiries within 24 hours to improve response rate',
      'Complete your profile to unlock premium features',
    ],
    upcomingViewings: [
      { id: 1, listing: 'Downtown Studio', seeker: 'John Doe', date: 'Tomorrow', time: '3:00 PM' },
      { id: 2, listing: 'Premium Suite', seeker: 'Sarah Smith', date: 'Dec 28', time: '10:00 AM' },
    ],
    bookedDates: ['2024-12-20', '2024-12-22', '2024-12-28'],
  };

  const SummaryCard = ({ icon: Icon, title, value, subtitle, status, trend }) => (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="text-blue-600" size={24} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp size={16} />
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      {status && (
        <div className="mt-3 flex gap-3 text-xs">
          {status.map((s, i) => (
            <span key={i} className="text-gray-600">
              <span className="font-semibold">{s?.label}:</span> {s?.value}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  const NotificationBadge = ({ type, message, time }) => {
    const bgColor = type === 'success' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200';
    const iconColor = type === 'success' ? 'text-green-600' : 'text-blue-600';
    const Icon = type === 'success' ? CheckCircle : AlertCircle;

    return (
      <div className={`${bgColor} border rounded-lg p-3 flex gap-3 items-start`}>
        <Icon className={`${iconColor} flex-shrink-0`} size={20} />
        <div className="flex-grow min-w-0">
          <p className="text-sm font-medium text-gray-900">{message}</p>
          <p className="text-xs text-gray-500 mt-1">{time}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">



      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Actions Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to list your space?</h2>
              <p className="text-blue-100">Create a new listing and find your ideal roommate faster</p>
            </div>
            <Link to="/dashboard/listings/new">
              <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2">
                <Plus size={20} />
                Create New Listing
              </button>
            </Link>
          </div>
        </div>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SummaryCard
            icon={Home}
            title="Total Listings"
            value={dashboardData?.summaryMetrics?.totalListings?.total}
            status={[
              { label: 'Active', value: dashboardData?.summaryMetrics?.totalListings.active },
              { label: 'Pending', value: dashboardData?.summaryMetrics?.totalListings.pending },
              { label: 'Rejected', value: dashboardData?.summaryMetrics?.totalListings?.rejected },
            ]}
          />
          <SummaryCard
            icon={MessageSquare}
            title="New Inquiries"
            value={dashboardData?.newInquiries}
            subtitle="Unread messages"
            trend={12}
          />
          <SummaryCard
            icon={Eye}
            title="Total Views"
            value={dashboardData?.totalViews?.value}
            subtitle="This month"
            trend={dashboardData?.totalViews?.change}
          />
          <SummaryCard
            icon={TrendingUp}
            title="Response Rate"
            value={`${dashboardData?.responseRate?.value}%`}
            subtitle={`Target: ${dashboardData?.responseRate?.target}%`}
            trend={2}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Inquiries */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Recent Inquiries</h2>
              <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center gap-1">
                View all <ArrowRight size={16} />
              </button>
            </div>
            <div className="divide-y">
              {dashboardData?.recentInquiries?.map(inquiry => (
                <div key={inquiry?.id} className={`p-4 hover:bg-gray-50 transition-colors ${inquiry?.unread ? 'bg-blue-50' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0" />
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900">{inquiry?.seekerName}</p>
                        {inquiry?.unread && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{inquiry?.listing}</p>
                      <p className="text-sm text-gray-600">{inquiry?.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{inquiry?.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Favorites & Recent Views */}
          <div className="space-y-6">
            {/* New Favorites */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Heart size={20} className="text-red-500" />
                New Favorites
              </h3>
              <div className="space-y-3">
                {dashboardData?.newFavorites?.map((fav, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex-shrink-0" />
                    <div className="min-w-0 flex-grow">
                      <p className="text-sm font-semibold text-gray-900">{fav?.seekerName}</p>
                      <p className="text-xs text-gray-500">{fav?.listing}</p>
                      <p className="text-xs text-gray-500 mt-1">{fav?.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Views */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye size={20} />
                Recent Views
              </h3>
              <div className="space-y-3">
                {dashboardData?.recentViews?.map((view, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-grow">
                      <p className="text-sm font-semibold text-gray-900">{view?.listing}</p>
                      <p className="text-xs text-gray-500">{view?.date}</p>
                    </div>
                    <p className="text-sm font-bold text-blue-600">{view?.views}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Top Performing Listings */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Top Performing Listings</h2>
            <div className="space-y-4">
              {dashboardData?.topListings?.map((listing, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-900">{listing?.name}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Eye size={16} />
                        {listing?.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={16} />
                        {listing?.inquiries} inquiries
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Listing Status Chart */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Listing Status</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={dashboardData?.listingStatusChart}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {dashboardData?.listingStatusChart?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {dashboardData.listingStatusChart.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item?.fill }} />
                  <span className="text-gray-600">{item?.name}: {item?.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Pending Actions */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-amber-500" />
              Pending Actions
            </h2>
            {dashboardData?.pendingActions?.length > 0 ? (
              <div className="space-y-3">
                {dashboardData?.pendingActions?.map(action => (
                  <div key={action?.id} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 text-sm">{action?.listing}</p>
                    <p className="text-xs text-gray-600 mt-1">{action?.action}</p>
                    <button className="text-xs font-semibold text-amber-600 hover:text-amber-700 mt-2">
                      Take action →
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">All caught up!</p>
            )}
          </div>

          {/* Notifications & Alerts */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Bell size={20} />
              Notifications
            </h2>
            <div className="space-y-3">
              {dashboardData?.notifications?.map(notif => (
                <NotificationBadge
                  key={notif?.id}
                  type={notif?.type}
                  message={notif?.message}
                  time={notif?.time}
                />
              ))}
            </div>
          </div>

          {/* Tips & Suggestions */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb size={20} className="text-yellow-500" />
              Tips & Suggestions
            </h2>
            <div className="space-y-3">
              {dashboardData?.tips?.map((tip, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0 mt-1.5" />
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming & Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scheduled Viewings */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar size={20} />
              Scheduled Viewings
            </h2>
            {dashboardData?.upcomingViewings?.length > 0 ? (
              <div className="space-y-4">
                {dashboardData?.upcomingViewings?.map(viewing => (
                  <div key={viewing?.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Clock size={20} className="text-blue-600" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold text-gray-900">{viewing?.listing}</p>
                        <p className="text-sm text-gray-600 mt-1">with {viewing?.seeker}</p>
                        <p className="text-sm font-medium text-blue-600 mt-2">
                          {viewing?.date} at {viewing?.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No scheduled viewings</p>
            )}
          </div>

          {/* Quick Calendar */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Availability Calendar</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-center mb-4">
                <p className="font-semibold text-gray-900">December 2024</p>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map(day => (
                  <div key={day} className="font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 })?.map((_, i) => {
                  const date = `2024-12-${String(i + 1)?.padStart(2, '0')}`;
                  const isBooked = dashboardData?.bookedDates?.includes(date);
                  return (
                    <div
                      key={i}
                      className={`py-2 rounded font-medium text-sm ${isBooked
                          ? 'bg-blue-600 text-white'
                          : i % 7 === 0 || i % 7 === 6
                            ? 'bg-gray-100 text-gray-600'
                            : 'text-gray-900 hover:bg-gray-100'
                        }`}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                <span className="inline-block w-3 h-3 bg-blue-600 rounded mr-2" />
                Booked dates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}