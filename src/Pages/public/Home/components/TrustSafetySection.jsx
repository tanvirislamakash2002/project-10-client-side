import React from 'react';
import { Shield, MessageSquare, User, Users, Eye, CheckCircle, Lock, FileText, Heart } from 'lucide-react';

export default function TrustSafetySection() {
  const trustPoints = [
    {
      icon: <Shield className="w-12 h-12" />,
      number: "01",
      title: "Manually Verified Listings",
      description: "Every listing undergoes thorough review by our team before going live. We verify photos, check details, and ensure listings meet our quality standards to protect our community.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: <MessageSquare className="w-12 h-12" />,
      number: "02",
      title: "Secure Messaging",
      description: "Chat safely within our platform using anonymous messaging. Exchange contact information only when you feel completely comfortable and ready to connect offline.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400"
    },
    {
      icon: <User className="w-12 h-12" />,
      number: "03",
      title: "Comprehensive Profiles",
      description: "Get to know potential roommates beyond just the space. View verified profiles, lifestyle preferences, and compatibility factors before making connections.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400"
    }
  ];

  const additionalFeatures = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Standards",
      description: "All members agree to our guidelines"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Active Monitoring",
      description: "Dedicated support team available"
    }
  ];

  return (
<div className="bg-gradient-to-br from-base-200 via-base-300 to-secondary/20 dark:from-base-100 dark:via-base-200 dark:to-secondary/20 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-base-100 dark:bg-base-300 px-4 py-2 rounded-full shadow-md mb-6">
            <Shield className="w-5 h-5 text-primary dark:text-primary" />
            <span className="text-sm font-semibold text-base-content dark:text-base-content uppercase tracking-wide">
              Safety First
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-base-content dark:text-base-content mb-6">
            A Safer Way to Find a Home
          </h2>
          
          <p className="text-lg sm:text-xl text-neutral dark:text-neutral-content max-w-3xl mx-auto leading-relaxed">
            We go beyond simple listings. Every connection on our platform is built on a foundation of verification, security, and trust.
          </p>
        </div>

        {/* Main Trust Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {trustPoints.map((point, index) => (
            <div 
              key={index}
              className="bg-base-100 dark:bg-base-300 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Number Badge */}
              <div className="flex items-start justify-between mb-6">
                <span className="text-6xl font-bold text-base-content dark:text-base-content">
                  {point.number}
                </span>
                <div className={`${point.bgColor} rounded-2xl p-4 shadow-md`}>
                  <div className={point.textColor}>
                    {point.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-base-content dark:text-base-content mb-4">
                {point.title}
              </h3>
              <p className="text-neutral dark:text-neutral-content leading-relaxed">
                {point.description}
              </p>

              {/* Verified Badge */}
              <div className="mt-6 flex items-center gap-2">
                <CheckCircle className={`w-5 h-5 ${point.textColor}`} />
                <span className={`text-sm font-semibold ${point.textColor}`}>
                  Verified by our team
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-base-100 dark:bg-base-300 rounded-3xl p-8 shadow-xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="border-b md:border-b-0 md:border-r border-base-300 dark:border-base-content/20 pb-6 md:pb-0">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                10,000+
              </div>
              <p className="text-neutral dark:text-neutral-content font-medium">
                Listings Verified
              </p>
            </div>
            <div className="border-b md:border-b-0 md:border-r border-base-300 dark:border-base-content/20 pb-6 md:pb-0">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-success to-secondary bg-clip-text text-transparent mb-2">
                95%
              </div>
              <p className="text-neutral dark:text-neutral-content font-medium">
                Users Feel Safer
              </p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
                25,000+
              </div>
              <p className="text-neutral dark:text-neutral-content font-medium">
                Successful Matches
              </p>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {additionalFeatures.map((feature, index) => (
            <div 
              key={index}
              className="bg-base-100 dark:bg-base-300 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start gap-4"
            >
              <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-3 flex-shrink-0">
                <div className="text-primary-content">
                  {feature.icon}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-base-content dark:text-base-content mb-1">
                  {feature.title}
                </h4>
                <p className="text-neutral dark:text-neutral-content text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 shadow-2xl text-center text-primary-content">
          <div className="flex justify-center mb-6">
            <div className="bg-base-100 bg-opacity-20 rounded-full p-4">
              <Heart className="w-8 h-8 text-error" />
            </div>
          </div>
          <blockquote className="text-xl sm:text-2xl font-medium mb-6 italic">
            "I felt so much safer knowing every listing was actually verified! The peace of mind was worth everything."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-base-100/30 rounded-full flex items-center justify-center text-lg font-bold">
              S
            </div>
            <div className="text-left">
              <p className="font-semibold">Sarah M.</p>
              <p className="text-sm text-primary-content/80">Seattle, WA</p>
            </div>
          </div>
        </div>

        {/* Bottom Trust Message */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-base-100 dark:bg-base-300 px-6 py-4 rounded-full shadow-lg">
            <Lock className="w-5 h-5 text-success dark:text-success" />
            <p className="text-base-content dark:text-base-content font-medium">
              Your safety is our top priority. Every step of the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}