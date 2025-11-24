import React from 'react';
import { Search, Home, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

export default function FinalCTASection() {

  return (
    <div className="relative bg-gradient-to-br from-primary via-primary to-secondary dark:from-primary dark:via-primary dark:to-secondary py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-base-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-base-100 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="base-100" strokeWidth="0.5" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-5xl mx-auto text-center">
        {/* Icon Group */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="bg-base-100/20 backdrop-blur-sm rounded-full p-4 animate-pulse">
            <Search className="w-8 h-8 text-base-100" />
          </div>
          <div className="bg-base-100/20 backdrop-blur-sm rounded-full p-4 animate-pulse delay-75">
            <Home className="w-8 h-8 text-base-100" />
          </div>
          <div className="bg-base-100/20 backdrop-blur-sm rounded-full p-4 animate-pulse delay-150">
            <Shield className="w-8 h-8 text-base-100" />
          </div>
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-base-100 mb-6 leading-tight">
          Ready to Get Started?
        </h2>

        {/* Supporting Sub-headline */}
        <p className="text-xl sm:text-2xl text-base-100/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Join thousands who found their perfect living situation. Safe, verified, and ready when you are.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link to={'/browse'}>
            <button
              className="group bg-base-100 dark:bg-base-300 text-primary dark:text-primary-content hover:bg-base-200 dark:hover:bg-base-200 px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3 w-full sm:w-auto"
            >
              <Search className="w-6 h-6" />
              <span>Find a Room</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <Link to={'/dashboard/listings/new'}>
            <button
              className="group bg-transparent border-3 border-base-100 text-base-100 hover:bg-base-100 hover:text-primary dark:hover:text-primary-content px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3 w-full sm:w-auto"
            >
              <Home className="w-6 h-6" />
              <span>List Your Space</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-base-100/90">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">All listings manually verified</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-base-100/50 rounded-full "></div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">100% safe and secure</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-base-100/50 rounded-full "></div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Free to browse</span>
          </div>
        </div>

        {/* Additional Trust Message */}
        <div className="mt-12 pt-8 border-t border-base-100/20 ">
          <p className="text-base-100/75 text-sm">
            Whether you're seeking or providing, we've got you covered
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-base-100/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="text-3xl font-bold text-base-100 mb-1">10,000+</div>
            <div className="text-base-100/75 text-sm">Verified Listings</div>
          </div>
          <div className="bg-base-100/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="text-3xl font-bold text-base-100 mb-1">25,000+</div>
            <div className="text-base-100/75 text-sm">Happy Users</div>
          </div>
          <div className="bg-base-100/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="text-3xl font-bold text-base-100 mb-1">95%</div>
            <div className="text-base-100/75 text-sm">Satisfaction Rate</div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="base-100" className="dark:fill-base-300" fillOpacity="0.1" />
        </svg>
      </div>
    </div>
  );
}