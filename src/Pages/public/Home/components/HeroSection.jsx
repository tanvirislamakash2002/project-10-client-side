import React, { useState } from 'react';
import { Search, Shield, CheckCircle, Users, Home, MapPin, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const navigate = useNavigate()
  const [location, setLocation] = useState('');
  const [moveInTimeline, setMoveInTimeline] = useState('');

  const handleSearch = (e) => {
    e.preventDefault()

    const params = new URLSearchParams()

    if (location) params.append('location', location)
    if (moveInTimeline) params.append('moveInTimeline', moveInTimeline)

    navigate(`/browse?${params.toString()}`)
  };

  return (
    <div className="relative bg-gradient-to-br from-base-200 via-base-300 to-accent/20 dark:from-base-100 dark:via-base-200 dark:to-base-300 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-150"></div>
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Role Clarifier */}
          <p className="text-sm sm:text-base text-neutral dark:text-neutral-content mb-4 font-medium">
            Looking for a room? Or have one to share?
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-base-content dark:text-base-content mb-6 leading-tight">
            Find Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Roommate Match
            </span>
          </h1>

          {/* Supporting Sub-headline */}
          <p className="text-lg sm:text-xl md:text-2xl text-neutral dark:text-neutral-content mb-8 max-w-3xl mx-auto leading-relaxed">
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
              <button className="btn btn-outline btn-lg text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-content hover:border-secondary">
                <Home className="w-5 h-5 mr-2" />
                List Your Space
              </button>
            </Link>
          </div>

          {/* Search Preview */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-base-100 dark:bg-base-300 rounded-2xl shadow-xl p-4 sm:p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral dark:text-neutral-content w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Enter location (city, neighborhood)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="input input-bordered w-full pl-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral dark:text-neutral-content w-5 h-5" />
                    <select
                      value={moveInTimeline}
                      onChange={(e) => setMoveInTimeline(e.target.value)}
                      className="select select-bordered w-full pl-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    >
                      <option value="">When do you plan to move?</option>
                      <option value="immediate">Immediately / ASAP</option>
                      <option value="within_week">Within 1 week</option>
                      <option value="within_month">Within 1 month</option>
                      <option value="1_3_months">1-3 months</option>
                      <option value="3_6_months">3-6 months</option>
                      <option value="flexible">Flexible / Not sure yet</option>
                    </select>
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
            <div className="bg-base-100/70 dark:bg-base-300/70 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-primary to-info rounded-full p-3 mb-3">
                  <Shield className="w-7 h-7 text-primary-content" />
                </div>
                <h3 className="font-semibold text-base-content dark:text-base-content mb-1">Manually Verified</h3>
                <p className="text-sm text-neutral dark:text-neutral-content">Every listing reviewed by our team</p>
              </div>
            </div>

            <div className="bg-base-100/70 dark:bg-base-300/70 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-success to-secondary rounded-full p-3 mb-3">
                  <CheckCircle className="w-7 h-7 text-success-content" />
                </div>
                <h3 className="font-semibold text-base-content dark:text-base-content mb-1">Safe & Secure</h3>
                <p className="text-sm text-neutral dark:text-neutral-content">Your privacy is our priority</p>
              </div>
            </div>

            <div className="bg-base-100/70 dark:bg-base-300/70 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-secondary to-primary rounded-full p-3 mb-3">
                  <Users className="w-7 h-7 text-secondary-content" />
                </div>
                <h3 className="font-semibold text-base-content dark:text-base-content mb-1">Quality Matches</h3>
                <p className="text-sm text-neutral dark:text-neutral-content">Find compatible roommates</p>
              </div>
            </div>

            <div className="bg-base-100/70 dark:bg-base-300/70 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-warning to-error rounded-full p-3 mb-3">
                  <Home className="w-7 h-7 text-warning-content" />
                </div>
                <h3 className="font-semibold text-base-content dark:text-base-content mb-1">10,000+ Matches</h3>
                <p className="text-sm text-neutral dark:text-neutral-content">Successful connections made</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <motion.svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <motion.path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
            fillOpacity="0.1"
            animate={{
              d: [
                "M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z",
                "M0 120L60 115C120 110 240 100 360 95C480 90 600 90 720 92.5C840 95 960 100 1080 102.5C1200 105 1320 105 1380 105L1440 105V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z",
                "M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              ]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M0 120L60 112.5C120 105 240 90 360 82.5C480 75 600 75 720 78.75C840 82.5 960 90 1080 93.75C1200 97.5 1320 97.5 1380 97.5L1440 97.5V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
            fillOpacity="0.2"
            animate={{
              d: [
                "M0 120L60 112.5C120 105 240 90 360 82.5C480 75 600 75 720 78.75C840 82.5 960 90 1080 93.75C1200 97.5 1320 97.5 1380 97.5L1440 97.5V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z",
                "M0 120L60 117.5C120 115 240 110 360 107.5C480 105 600 105 720 106.25C840 107.5 960 110 1080 111.25C1200 112.5 1320 112.5 1380 112.5L1440 112.5V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z",
                "M0 120L60 112.5C120 105 240 90 360 82.5C480 75 600 75 720 78.75C840 82.5 960 90 1080 93.75C1200 97.5 1320 97.5 1380 97.5L1440 97.5V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </motion.svg>
      </div>
    </div>
  );
}