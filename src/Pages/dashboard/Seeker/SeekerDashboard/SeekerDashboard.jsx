import React, { useState } from 'react';
import { Search, Home, Heart, Calendar, MessageSquare, Bell, User, MapPin, DollarSign, Filter, Clock, CheckCircle, XCircle, Eye, ChevronRight, Star, TrendingUp } from 'lucide-react';

export default function SeekerDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data
  const stats = {
    saved: 12,
    applied: 5,
    viewings: 2,
    messages: 3
  };

  const applications = [
    { id: 1, property: "Cozy Studio in Downtown", status: "Under Review", date: "Oct 20, 2025" },
    { id: 2, property: "Shared Apartment - 2BR", status: "Viewing Scheduled", date: "Oct 25, 2025" },
    { id: 3, property: "Modern Loft Space", status: "Applied", date: "Oct 18, 2025" }
  ];

  const recommendedListings = [
    { id: 1, title: "Spacious Room in Shared House", location: "Downtown", price: "$800/mo", image: "🏠", type: "Recently Viewed" },
    { id: 2, title: "Private Studio Apartment", location: "Midtown", price: "$950/mo", image: "🏢", type: "Popular" },
    { id: 3, title: "Room with Private Bath", location: "Suburbs", price: "$650/mo", image: "🏡", type: "Recommended" }
  ];

  const upcomingActivities = [
    { id: 1, type: "Viewing", title: "Shared Apartment - 2BR", time: "Oct 25, 3:00 PM" },
    { id: 2, type: "Deadline", title: "Application Response Due", time: "Oct 26, 11:59 PM" }
  ];

  const notifications = [
    { id: 1, message: "3 new listings match your preferences", time: "2h ago", type: "new" },
    { id: 2, message: "Price drop on saved listing: Downtown Studio", time: "5h ago", type: "price" },
    { id: 3, message: "Provider responded to your inquiry", time: "1d ago", type: "message" }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "Applied": return "bg-blue-100 text-blue-700";
      case "Under Review": return "bg-yellow-100 text-yellow-700";
      case "Viewing Scheduled": return "bg-green-100 text-green-700";
      case "Approved": return "bg-green-100 text-green-700";
      case "Rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Roommate</h1>
              <p className="text-gray-600 mt-1">Welcome back, Alex! Ready to find your new home?</p>
            </div>
            {/* <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button> */}
          </div>
          
          {/* Quick Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by location, price, or room type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Saved Listings</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.saved}</p>
              </div>
              <Heart className="w-10 h-10 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Applied</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.applied}</p>
              </div>
              <Home className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Upcoming Viewings</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.viewings}</p>
              </div>
              <Calendar className="w-10 h-10 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Unread Messages</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.messages}</p>
              </div>
              <MessageSquare className="w-10 h-10 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Completeness */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-sm text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Complete Your Profile</h3>
                  <p className="text-blue-100 text-sm mt-1">Increase your chances of finding the perfect room</p>
                </div>
                <User className="w-10 h-10 text-blue-200" />
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Profile Completeness</span>
                  <span className="font-semibold">70%</span>
                </div>
                <div className="w-full bg-blue-400 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition">
                Complete Profile
              </button>
            </div>

            {/* Search & Filter Quick Access */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <input type="text" placeholder="Enter location" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Budget Range
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>$0 - $500</option>
                    <option>$500 - $1000</option>
                    <option>$1000 - $1500</option>
                    <option>$1500+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Move-in Date
                  </label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </button>
            </div>

            {/* Recommended Listings */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recommended For You</h3>
                <button className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {recommendedListings.map((listing) => (
                  <div key={listing.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition cursor-pointer">
                    <div className="text-5xl">{listing.image}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{listing.title}</h4>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{listing.type}</span>
                      </div>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {listing.location}
                      </p>
                      <p className="text-sm font-semibold text-green-600 mt-1">{listing.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Tracking */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Tracking</h3>
              <div className="space-y-3">
                {applications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{app.property}</h4>
                      <p className="text-sm text-gray-600 mt-1">Applied on {app.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center">
                  <Search className="w-4 h-4 mr-2" />
                  Browse Listings
                </button>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Viewing
                </button>
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message Providers
                </button>
              </div>
            </div>

            {/* Upcoming Activities */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Upcoming Activities
              </h3>
              <div className="space-y-3">
                {upcomingActivities.map((activity) => (
                  <div key={activity.id} className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-semibold text-blue-600 uppercase">{activity.type}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">{activity.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications & Alerts */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-purple-600" />
                Recent Notifications
              </h3>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                    <p className="text-sm text-gray-900">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full text-blue-600 text-sm font-semibold hover:underline">
                View All Notifications
              </button>
            </div>

            {/* Saved Listings Preview */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Saved Listings
                </h3>
                <button className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
              </div>
              <p className="text-sm text-gray-600 mb-3">You have {stats.saved} saved listings</p>
              <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
                <p className="text-sm text-yellow-800">2 price drops on your saved listings!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}