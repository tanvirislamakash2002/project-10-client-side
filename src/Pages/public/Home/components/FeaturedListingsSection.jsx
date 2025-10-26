import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, DollarSign, Wifi, Car, Dog, Bed, Bath, Home, Shield, CheckCircle, ArrowRight } from 'lucide-react';

export default function FeaturedListingsSection() {
  // Sample listings data
  const listings = [
    {
      id: 1,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800',
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'
      ],
      location: 'Downtown, Seattle',
      price: 1200,
      utilities: 100,
      deposit: 500,
      amenities: [
        { icon: <Wifi className="w-4 h-4" />, label: 'WiFi Included' },
        { icon: <Car className="w-4 h-4" />, label: 'Parking' },
        { icon: <Bath className="w-4 h-4" />, label: 'Private Bath' },
        { icon: <Bed className="w-4 h-4" />, label: 'Furnished' }
      ],
      badge: 'Recently Approved',
      proximity: '0.3 miles from city center'
    },
    {
      id: 2,
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
      ],
      location: 'Capitol Hill, Seattle',
      price: 950,
      utilities: 80,
      deposit: 450,
      amenities: [
        { icon: <Dog className="w-4 h-4" />, label: 'Pets Allowed' },
        { icon: <Home className="w-4 h-4" />, label: 'Laundry' },
        { icon: <Wifi className="w-4 h-4" />, label: 'WiFi Included' },
        { icon: <Car className="w-4 h-4" />, label: 'Street Parking' }
      ],
      badge: 'Verified',
      proximity: '1.2 miles from city center'
    },
    {
      id: 3,
      images: [
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
        'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800',
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800'
      ],
      location: 'Fremont, Seattle',
      price: 1100,
      utilities: 0,
      deposit: 550,
      amenities: [
        { icon: <Bath className="w-4 h-4" />, label: 'Private Bath' },
        { icon: <Bed className="w-4 h-4" />, label: 'Furnished' },
        { icon: <Wifi className="w-4 h-4" />, label: 'Utilities Included' },
        { icon: <Home className="w-4 h-4" />, label: 'Natural Light' }
      ],
      badge: 'Recently Approved',
      proximity: '2.5 miles from city center'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              Verified & Approved
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Recently Approved Listings
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            All listings are manually verified by our team for your safety and peace of mind
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            12 new listings approved this week • Join 5,000+ seekers finding their perfect match
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {/* Section Footer */}
        <div className="text-center">
          <button className="btn btn-primary btn-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group">
            Browse All Listings
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            See 50+ more verified rooms
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Filter by location, price, or move-in date on our main search page
          </p>
        </div>
      </div>
    </div>
  );
}

function ListingCard({ listing }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === listing.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? listing.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
      {/* Image Carousel */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={listing.images[currentImageIndex]} 
          alt={`Room in ${listing.location}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
            <CheckCircle className="w-3 h-3" />
            {listing.badge}
          </span>
        </div>

        {/* Photo Counter */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white text-xs px-2.5 py-1 rounded-full">
          {currentImageIndex + 1}/{listing.images.length}
        </div>

        {/* Navigation Arrows */}
        {listing.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronRight className="w-5 h-5 text-gray-800 dark:text-white" />
            </button>
          </>
        )}

        {/* Navigation Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {listing.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white w-6' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Location */}
        <div className="flex items-start gap-2 mb-3">
          <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {listing.location}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {listing.proximity}
            </p>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${listing.price}
            </span>
            <span className="text-gray-600 dark:text-gray-300">/month</span>
          </div>
          {listing.utilities > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              + ${listing.utilities} utilities
            </p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ${listing.deposit} security deposit
          </p>
        </div>

        {/* Amenities */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {listing.amenities.map((amenity, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
            >
              <div className="text-blue-600 dark:text-blue-400">
                {amenity.icon}
              </div>
              <span>{amenity.label}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button className="w-full btn btn-outline border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 rounded-xl py-3 font-semibold transition-all duration-200">
          View Details
        </button>
      </div>
    </div>
  );
}