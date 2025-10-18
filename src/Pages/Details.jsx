import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaUser,
  FaWifi,
  FaCar,
  FaPaw,
  FaSmoking,
  FaUsers,
  FaPhone,
  FaEnvelope,
  FaHeart,
  FaShare
} from 'react-icons/fa';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

const App = () => {
  const [isApplying, setIsApplying] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const { id } = useParams()


  const { data: roomData, isLoading: isRoomLoading } = useQuery({
    queryKey: ['roomData', id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/add-roommate/${id}`);
      return res.data;
    },
    onError: () => toast.error('Failed to load room details'),
  });
  console.log(roomData);
  // Sample data - in real app this would come from props/API
  const postData = {
    id: 1,
    title: "Spacious Room in Modern Downtown Apartment",
    location: "Downtown Seattle, WA 98101",
    rent: 950,
    availability: "Available from March 1st, 2025",
    description: "Beautiful furnished room in a modern 3-bedroom apartment located in the heart of downtown Seattle. The apartment features floor-to-ceiling windows with stunning city views, modern appliances, in-unit laundry, and a spacious living area perfect for socializing. You'll be sharing with two friendly professionals who value cleanliness and respect.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    preferences: {
      gender: "Any",
      ageRange: "22-35",
      occupation: "Working Professional/Student",
      lifestyle: "Clean, Quiet, Social"
    },
    amenities: [
      { icon: FaWifi, label: "High-speed Internet" },
      { icon: FaCar, label: "Parking Available" },
      { icon: FaPaw, label: "Pet Friendly" },
      { icon: FaSmoking, label: "No Smoking" }
    ],
    poster: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com",
      verified: true
    },
    postedDate: "2 days ago"
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleApply = () => {
    setIsApplying(true);
    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      // In real app, show success message with SweetAlert2
      alert("Application submitted successfully! The poster will contact you soon.");
    }, 2000);
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
    navigator.share?.({
      title: roomData.title,
      text: `Check out this roommate opportunity: ${postData.title}`,
      url: window.location.href
    }) || navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="relative h-96">
                <img
                  src={roomData?.images[currentImageIndex]}
                  alt={postData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={toggleFavorite}
                    className={`p-3 rounded-full shadow-lg transition-all ${isFavorited
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    <FaHeart />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 bg-white text-gray-600 rounded-full shadow-lg hover:bg-gray-100 transition-all"
                  >
                    <FaShare />
                  </button>
                </div>
                {roomData?.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {roomData?.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              {roomData?.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {roomData?.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                        }`}
                    >
                      <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Post Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{postData.title}</h1>
                <span className="text-sm text-gray-500">{postData.postedDate}</span>
              </div>

              {/* Key Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FaMapMarkerAlt className="text-blue-600 text-xl" />
                    <h3 className="font-semibold text-gray-900">Location</h3>
                  </div>
                  <p className="text-gray-700">{roomData?.location}</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FaDollarSign className="text-green-600 text-xl" />
                    <h3 className="font-semibold text-gray-900">Rent</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-600">${roomData?.rent_amount || roomData?.rent}/month</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FaCalendarAlt className="text-purple-600 text-xl" />
                    <h3 className="font-semibold text-gray-900">Availability</h3>
                  </div>
                  <p className="text-gray-700">{postData.availability}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed">{roomData?.description}</p>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {postData.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <amenity.icon className="text-blue-600" />
                      <span className="text-sm text-gray-700">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Roommate Preferences</h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Gender Preference</h4>
                      <p className="text-gray-700">{postData.preferences.gender}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Age Range</h4>
                      <p className="text-gray-700">{postData.preferences.ageRange}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Occupation</h4>
                      <p className="text-gray-700">{postData.preferences.occupation}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Lifestyle</h4>
                      <p className="text-gray-700">{postData.preferences.lifestyle}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 sticky top-8">
              <div className="text-center mb-6">
                {roomData?.poster?.photo ? <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                    <img src={roomData?.poster?.photo} />
                  </div>
                </div> : <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-white text-2xl" />
                </div>}
                <h3 className="text-xl font-bold text-gray-900">{roomData?.post_name || roomData?.poster?.name}</h3>
                {postData.poster.verified && (
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2">
                    ✓ Verified
                  </span>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-700">
                  <FaPhone className="text-blue-600" />
                  <span>{roomData?.contact_info || roomData?.poster?.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FaEnvelope className="text-blue-600" />
                  <span className="text-sm">{roomData?.post_email || roomData?.poster?.email}</span>
                </div>
              </div>

              <button
                onClick={handleApply}
                disabled={isApplying}
                className="w-full bg-gradient-to-r from-green-600 to-yellow-600 hover:green-blue-700 hover:to-yellow-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isApplying ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FaUsers />
                    Apply to Become Roommate
                  </div>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Your application will be sent directly to the poster. They will contact you if interested.
              </p>
            </div>

            {/* Safety Tips */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
              <h4 className="font-bold text-amber-800 mb-3">Safety Tips</h4>
              <ul className="text-sm text-amber-700 space-y-2">
                <li>• Meet in a public place first</li>
                <li>• Verify identity before sharing personal info</li>
                <li>• Trust your instincts</li>
                <li>• Never send money upfront</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;