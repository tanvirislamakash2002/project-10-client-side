import React from 'react';
import { Search, MessageCircle, Home, Edit, Shield, UserCheck, ArrowRight } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Whether you're looking for a room or listing your space, our simple process makes it easy and secure
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Seekers Section */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <div className="mb-8">
              <div className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                FOR ROOM SEEKERS
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Finding Your Perfect Room
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Discover verified spaces that match your lifestyle
              </p>
            </div>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-0.5 h-16 bg-blue-200 dark:bg-blue-800 mx-auto mt-4"></div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">01</span>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Browse & Filter</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Browse through our curated collection of verified listings. Use smart filters to find rooms that match your budget, location preferences, and lifestyle needs.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">Location</span>
                    <span className="text-xs bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">Price Range</span>
                    <span className="text-xs bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">Amenities</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-0.5 h-16 bg-blue-200 dark:bg-blue-800 mx-auto mt-4"></div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">02</span>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Connect Safely</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    When you find a potential match, use our built-in messaging to ask questions and schedule viewings. Your personal contact information stays private until you're ready to share.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">Secure Messaging</span>
                    <span className="text-xs bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">Schedule Viewings</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">03</span>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Make It Official</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Once you've found the right match, complete the agreement and look forward to moving into your new home with confidence.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">Finalize Agreement</span>
                    <span className="text-xs bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">Move In</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full mt-8 btn btn-primary btn-lg rounded-xl group">
              Browse Rooms
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Providers Section */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <div className="mb-8">
              <div className="inline-block bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                FOR ROOM PROVIDERS
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Listing Your Space
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with quality seekers through our verified platform
              </p>
            </div>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Edit className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-0.5 h-16 bg-green-200 dark:bg-green-800 mx-auto mt-4"></div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">01</span>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Create Your Listing</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Fill out our simple form to showcase your available space. Add photos, describe the amenities, and set your preferences for the ideal roommate.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">Photo Upload</span>
                    <span className="text-xs bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">Room Details</span>
                    <span className="text-xs bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">Pricing</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-0.5 h-16 bg-green-200 dark:bg-green-800 mx-auto mt-4"></div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">02</span>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Quality Assurance</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Our admin team personally reviews each listing to ensure quality, accuracy, and safety standards. This process typically takes 24-48 hours and helps maintain a trusted community.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">Manual Review</span>
                    <span className="text-xs bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">Quality Control</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <UserCheck className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">03</span>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Connect with Seekers</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Once approved, your listing becomes visible to qualified seekers. Receive messages, schedule viewings, and find the perfect roommate for your space.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">Visibility to Seekers</span>
                    <span className="text-xs bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">Messaging System</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full mt-8 btn btn-success btn-lg rounded-xl group">
              List Your Space
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* Bottom Message */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-full shadow-lg">
            <p className="font-semibold">
              <Shield className="w-5 h-5 inline-block mr-2" />
              All listings are verified for your safety and peace of mind
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}