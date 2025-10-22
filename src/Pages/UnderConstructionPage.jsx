import React, { useState, useEffect } from 'react';
import { Home, Mail, Bell, Calendar, ArrowLeft, Construction } from 'lucide-react';
import { Link } from 'react-router';

export default function UnderConstructionPage() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center border border-gray-200">
          {/* Animated Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-green-100 rounded-full animate-pulse"></div>
            </div>
            <div className="relative flex items-center justify-center">
              <Construction size={80} className="text-green-600 animate-bounce" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Under Construction
          </h1>

          {/* Animated Subtitle */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <p className="text-xl text-gray-600">
              We're working on something awesome
            </p>
            <span className="text-green-600 font-bold text-xl w-8 text-left">{dots}</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            This page is currently being built. I'm working hard to bring you an amazing experience. Check back soon!
          </p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-1000 animate-pulse"
                style={{ width: '65%' }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">65% Complete</p>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-green-300 transition-colors">
              <Home className="mx-auto mb-2 text-green-600" size={28} />
              <p className="text-xs text-gray-600 font-medium">New Features</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-green-300 transition-colors">
              <Bell className="mx-auto mb-2 text-green-600" size={28} />
              <p className="text-xs text-gray-600 font-medium">Notifications</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-green-300 transition-colors">
              <Calendar className="mx-auto mb-2 text-green-600" size={28} />
              <p className="text-xs text-gray-600 font-medium">Scheduling</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-green-300 transition-colors">
              <Mail className="mx-auto mb-2 text-green-600" size={28} />
              <p className="text-xs text-gray-600 font-medium">Messaging</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <button className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30 flex items-center justify-center gap-2">
                <ArrowLeft size={20} />
                Back to Dashboard
              </button>
            </Link>
            <Link to="/">
              <button className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-green-600 hover:text-green-600 transition-colors flex items-center justify-center gap-2">
                <Home size={20} />
                Go to Home
              </button>
            </Link>
          </div>

          {/* Notification Signup */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Get notified when we launch
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Questions? Contact us at{' '}
            <a href="mailto:support@roomease.com" className="text-green-600 font-semibold hover:underline">
              support@roomease.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}