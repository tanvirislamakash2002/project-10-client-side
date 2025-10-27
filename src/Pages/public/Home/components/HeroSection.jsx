import React, { useState } from 'react';
import { Search, Shield, CheckCircle, Users, Home, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router';

export default function HeroSection() {
  const [location, setLocation] = useState('');
  const [moveInDate, setMoveInDate] = useState('');

  const handleSearch = () => {
    console.log('Searching:', { location, moveInDate });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-150"></div>
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Role Clarifier */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 font-medium">
            Looking for a room? Or have one to share?
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Find Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Roommate Match
            </span>
          </h1>

          {/* Supporting Sub-headline */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with verified roommates and quality listings. Every space is manually reviewed by our team to ensure your safety and satisfaction.
          </p>

          {/* Dual Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to={'/browse'}>
              <button className="btn btn-primary btn-lg text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto">
                <Search className="w-5 h-5 mr-2" />
                Browse Rooms
              </button>
            </Link>
            <Link to={'/dashboard/listings/new'}>
            <button className="btn btn-outline btn-lg text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:border-purple-600">
              <Home className="w-5 h-5 mr-2" />
              List Your Space
            </button>
            </Link>
          </div>

          {/* Search Preview */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Enter location (city, neighborhood)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="input input-bordered w-full pl-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      placeholder="Move-in date"
                      value={moveInDate}
                      onChange={(e) => setMoveInDate(e.target.value)}
                      className="input input-bordered w-full pl-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSearch}
                  className="btn btn-primary px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-200 md:w-auto w-full"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-3 mb-3">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Manually Verified</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Every listing reviewed by our team</p>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-full p-3 mb-3">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Safe & Secure</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Your privacy is our priority</p>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-3 mb-3">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Quality Matches</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Find compatible roommates</p>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-full p-3 mb-3">
                  <Home className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">10,000+ Matches</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Successful connections made</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.1" />
          <path d="M0 120L60 112.5C120 105 240 90 360 82.5C480 75 600 75 720 78.75C840 82.5 960 90 1080 93.75C1200 97.5 1320 97.5 1380 97.5L1440 97.5V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.2" />
        </svg>
      </div>
    </div>
  );
}