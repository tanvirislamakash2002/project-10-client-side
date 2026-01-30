import React, { useState } from 'react';
import { Home, ArrowLeft, Search, Mail, AlertCircle } from 'lucide-react';

const ErrorPage = ({ 
  errorCode = "404", 
  errorType = "notFound" 
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Error configurations
  const errorConfig = {
    notFound: {
      code: "404",
      title: "Room Not Found!",
      message: "The page you are looking for might have been moved, deleted, or never existed.",
      icon: <Home className="w-24 h-24 text-primary opacity-20" strokeWidth={1.5} />
    },
    serverError: {
      code: "500",
      title: "Something Went Wrong!",
      message: "We're experiencing some technical difficulties on our end. Please try again shortly.",
      icon: <AlertCircle className="w-24 h-24 text-error opacity-20" strokeWidth={1.5} />
    },
    generic: {
      code: "Oops!",
      title: "Unexpected Error",
      message: "Something unexpected happened. Don't worry, we're here to help you find your way back.",
      icon: <AlertCircle className="w-24 h-24 text-warning opacity-20" strokeWidth={1.5} />
    }
  };

  const currentError = errorConfig[errorType] || errorConfig.generic;

  const handleGoHome = () => {
    // Navigate to home page
    window.location.href = '/';
  };

  const handleGoBack = () => {
    // Go back in browser history
    window.history.back();
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to search results page with query
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleBrowseListings = () => {
    // Navigate to listings page
    window.location.href = '/listings';
  };

  const handleContactSupport = () => {
    // Navigate to contact page
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center p-8 md:p-12">
            
            {/* Logo/Platform Name */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-primary">RoommateFinder</h1>
            </div>

            {/* Error Icon */}
            <div className="mb-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                {currentError.icon}
              </div>
              {/* Large Error Code */}
              <div className="relative">
                <h2 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {currentError.code}
                </h2>
              </div>
            </div>

            {/* Friendly Headline */}
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              {currentError.title}
            </h3>

            {/* Explanation Text */}
            <p className="text-base-content opacity-70 text-lg mb-2 max-w-md">
              {currentError.message}
            </p>
            
            {/* Apology */}
            <p className="text-base-content opacity-60 mb-8">
              Sorry for the inconvenience!
            </p>

            {/* Search Bar for Seekers */}
            <div className="w-full max-w-md mb-8">
              <div className="form-control">
                <div className="input-group">
                  <input 
                    type="text" 
                    placeholder="Search for rooms..." 
                    className="input input-bordered w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button onClick={handleSearch} className="btn btn-primary">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Primary and Secondary Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full max-w-md">
              <button 
                onClick={handleGoHome}
                className="btn btn-primary flex-1 gap-2"
              >
                <Home className="w-5 h-5" />
                Go Back Home
              </button>
              <button 
                onClick={handleGoBack}
                className="btn btn-outline flex-1 gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
            </div>

            {/* Browse Listings Link */}
            <div className="mb-6">
              <button 
                onClick={handleBrowseListings}
                className="link link-primary text-base"
              >
                Or, browse all available rooms
              </button>
            </div>

            {/* Support Contact (for server errors) */}
            {errorType === "serverError" && (
              <div className="divider max-w-md mx-auto"></div>
            )}
            
            {errorType === "serverError" && (
              <div className="text-sm text-base-content opacity-60">
                <p className="mb-3">If the problem persists, please contact our support team.</p>
                <button 
                  onClick={handleContactSupport}
                  className="btn btn-sm btn-ghost gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Contact Support
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Footer with additional help */}
        <div className="text-center mt-6 text-sm text-base-content opacity-50">
          <p>Need help? Check our <a href="/faq" className="link">FAQ</a> or <a href="/help" className="link">Help Center</a></p>
        </div>
      </div>
    </div>
  );
};

// Demo component showing different error states
const ErrorPageDemo = () => {
  const [selectedError, setSelectedError] = useState("notFound");

  return (
    <div>
      {/* Demo Controls */}
      {/* <div className="fixed top-4 right-4 z-50">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-sm btn-primary">
            Switch Error Type
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
            <li><a onClick={() => setSelectedError("notFound")}>404 - Not Found</a></li>
            <li><a onClick={() => setSelectedError("serverError")}>500 - Server Error</a></li>
            <li><a onClick={() => setSelectedError("generic")}>Generic Error</a></li>
          </ul>
        </div>
      </div> */}

      {/* Error Page */}
      <ErrorPage errorType={selectedError} />
    </div>
  );
};

export default ErrorPageDemo;