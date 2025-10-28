import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Share2, MapPin, DollarSign, Calendar, Clock, Wifi, Droplet, Zap, Wind, Car, Dumbbell, Home, Bed, Monitor, Sofa, Bath, Users, MessageSquare, CheckCircle, X, Phone, Mail, Star, TrendingUp, Shield, AlertCircle, Send, Eye } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';

export default function ListingDetailsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const { user } = useAuth();

  const { id } = useParams()

  const { data: singleRoom = {}, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/add-roommate/${id}`)
        .then(res => res.json()),
  });


  const formattedDate =    singleRoom?.availableFrom? new Date(singleRoom.availableFrom).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'Not available';
  console.log(formattedDate);


  // Mock listing data
  const listing = {
    id: 1,
    title: "Sunny Private Room in Downtown Apartment",
    rent: 950,
    deposit: 500,
    availableFrom: "November 1, 2025",
    leaseTerm: "12 months",
    roomType: "Private Room",
    roomSize: "120 sq ft",
    furnishing: "Furnished",
    furniture: ["Queen Bed", "Desk & Chair", "Wardrobe", "Nightstand", "Reading Lamp"],
    neighborhood: "Downtown",
    address: "Near 5th Avenue & Main Street",
    images: ["🏠", "🛏️", "🪟", "🚿", "🏢"],
    description: "Beautiful, sunlit private room in a modern 3-bedroom apartment. Perfect for young professionals. The room faces east with large windows providing excellent natural light throughout the morning. Hardwood floors and freshly painted walls.",

    amenities: {
      inRoom: [
        { name: "Private Bathroom", icon: Bath, available: false },
        { name: "Air Conditioning", icon: Wind, available: true },
        { name: "Heating", icon: Wind, available: true },
        { name: "Desk & Chair", icon: Monitor, available: true },
        { name: "Closet Space", icon: Home, available: true }
      ],
      building: [
        { name: "Laundry In-Unit", icon: Home, available: true },
        { name: "Gym", icon: Dumbbell, available: true },
        { name: "Rooftop Access", icon: Home, available: true },
        { name: "Parking (Extra $50)", icon: Car, available: true },
        { name: "Bike Storage", icon: Home, available: true },
        { name: "Elevator", icon: Home, available: true }
      ]
    },

    utilities: ["WiFi", "Water", "Gas", "Electricity"],

    transportation: [
      "5-min walk to Metro Blue Line",
      "Bus stop 50m away (Routes 12, 45)",
      "15-min bike ride to Central Station",
      "Easy highway access (I-95)"
    ],

    housemates: {
      count: 2,
      description: "2 working professionals in their late 20s - one software engineer and one graphic designer",
      lifestyle: "We enjoy a clean, respectful living environment. Occasionally host small gatherings on weekends but generally quiet during weekdays."
    },

    preferences: {
      ideal: "Professional or graduate student, non-smoker, clean, respectful of quiet hours after 11 PM",
      pets: "Small pets negotiable (extra deposit required)",
      smoking: "No smoking inside (designated outdoor area available)",
      cleanliness: "We maintain a clean common space and have a weekly cleaning schedule",
      social: "Social but respectful - we enjoy occasional movie nights but value personal space"
    },

    provider: {
      name: "Sarah Chen",
      type: "Current Tenant",
      photo: "👩",
      responseTime: "Usually responds within 24 hours",
      rating: 4.8,
      reviews: 12,
      verified: true,
      joinedDate: "Member since 2023"
    }
  };

  const nextImage = () => {
    if (!singleRoom?.images?.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % singleRoom.images.length);
  };

  const prevImage = () => {
    if (!singleRoom?.images?.length) return;
    setCurrentImageIndex((prev) => (prev - 1 + singleRoom.images.length) % singleRoom.images.length);
  };
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
        <span className="ml-2">Loading room details...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to={'/browse'}>
              <button className="flex items-center text-gray-600 hover:text-gray-900 transition">
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to Listings
              </button>
            </Link>
            <div className="flex gap-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 border rounded-lg transition ${isSaved
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo Gallery */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-96 bg-gray-100 flex items-center justify-center">
                {/* Main Image Display with safe fallback */}
                <img
                  src={singleRoom?.images?.[currentImageIndex] || "/placeholder-image.jpg"}
                  alt={`Room image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Only show navigation if images exist and there are multiple */}
                {singleRoom?.images && singleRoom.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-3 rounded-full hover:bg-opacity-100 transition shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-3 rounded-full hover:bg-opacity-100 transition shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {singleRoom.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition ${idx === currentImageIndex ? 'bg-white w-8' : 'bg-white bg-opacity-50'
                            }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail strip - only if images exist */}
              {singleRoom?.images && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {singleRoom.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition ${idx === currentImageIndex ? 'border-blue-500' : 'border-transparent hover:border-gray-300'
                        }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title and Quick Facts */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{singleRoom.title}</h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-600 font-medium mb-1">Monthly Rent</p>
                  <p className="text-2xl font-bold text-green-700">${singleRoom.rent}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-600 font-medium mb-1">Security Deposit</p>
                  <p className="text-2xl font-bold text-blue-700">${listing.deposit}</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-sm text-purple-600 font-medium mb-1">Available From</p>
                  <p className="text-sm font-bold text-purple-700">{formattedDate}</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-sm text-orange-600 font-medium mb-1">Lease Term</p>
                  <p className="text-sm font-bold text-orange-700">{listing.leaseTerm}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About This Space</h2>
              <p className="text-gray-700 leading-relaxed">{singleRoom.description}</p>
            </div>

            {/* The Space & Offer */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Room Details</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Room Type</p>
                  <p className="font-semibold text-gray-900">{listing.roomType}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Room Size</p>
                  <p className="font-semibold text-gray-900">{listing.roomSize}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Furnishing</p>
                  <p className="font-semibold text-gray-900">{listing.furnishing}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Included Furniture</h3>
                <div className="flex flex-wrap gap-2">
                  {listing.furniture.map((item, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Home className="w-5 h-5 mr-2 text-blue-600" />
                    In-Room Amenities
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {listing.amenities.inRoom.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        {amenity.available ? (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                        )}
                        <span className={amenity.available ? 'text-gray-900' : 'text-gray-400'}>
                          {amenity.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Dumbbell className="w-5 h-5 mr-2 text-blue-600" />
                    Building Amenities
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {listing.amenities.building.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-900">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Wifi className="w-5 h-5 mr-2 text-blue-600" />
                    Utilities Included in Rent
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.utilities.map((utility, idx) => (
                      <span key={idx} className="bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {utility}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                Location
              </h2>

              <div className="mb-4">
                <p className="text-gray-900 font-semibold mb-1">{listing.neighborhood}</p>
                <p className="text-gray-600 text-sm">{listing.address}</p>
              </div>

              {/* Mock Map */}
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg h-64 mb-4 flex items-center justify-center border border-gray-200">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive Map</p>
                  <p className="text-sm text-gray-500">Exact location shown after contact</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Transportation</h3>
                <ul className="space-y-2">
                  {listing.transportation.map((option, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{option}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Housemates & Lifestyle */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-blue-600" />
                Housemates & Lifestyle
              </h2>

              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Current Housemates</h3>
                  <p className="text-blue-800 text-sm mb-2">
                    <span className="font-semibold">{listing.housemates.count} roommates</span>
                  </p>
                  <p className="text-blue-800 text-sm">{listing.housemates.description}</p>
                  <p className="text-blue-700 text-sm mt-2 italic">"{listing.housemates.lifestyle}"</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Looking For</h3>
                  <p className="text-gray-700 mb-4">{listing.preferences.ideal}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">🐾 Pets Policy</p>
                      <p className="text-gray-900 font-medium">{listing.preferences.pets}</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">🚭 Smoking Policy</p>
                      <p className="text-gray-900 font-medium">{listing.preferences.smoking}</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">🧹 Cleanliness</p>
                      <p className="text-gray-900 font-medium">{listing.preferences.cleanliness}</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">👥 Social Environment</p>
                      <p className="text-gray-900 font-medium">{listing.preferences.social}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Provider Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Posted By</h3>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full btn-circle flex items-center justify-center text-3xl flex-shrink-0 avatar p-[2px]">
                    <img src={user?.photoURL} alt="" className=' rounded-full' />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900">{user?.displayName}</h4>
                      {listing.provider.verified && (
                        <Shield className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{listing.provider.type}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">{listing.provider.rating}</span>
                      <span className="text-sm text-gray-600">({listing.provider.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <p className="text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {listing.provider.responseTime}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {listing.provider.joinedDate}
                  </p>
                </div>

                <button className="w-full text-blue-600 text-sm font-semibold hover:underline">
                  View Provider Profile
                </button>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-3">
                <button
                  onClick={() => setShowApplicationModal(true)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-5 h-5" />
                  I'm Interested
                </button>

                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Contact Provider
                </button>

                <button className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule Viewing
                </button>
              </div>

              {/* Safety Tips */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Safety Tips</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Always meet in person before committing</li>
                      <li>• Never send money before viewing</li>
                      <li>• Use our secure messaging system</li>
                      <li>• Report suspicious listings</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Similar Listings */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Similar Listings</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-3 hover:border-blue-500 transition cursor-pointer">
                      <div className="flex gap-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                          🏘️
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm truncate">Room Near Downtown</h4>
                          <p className="text-xs text-gray-600">Downtown</p>
                          <p className="text-sm font-bold text-green-600 mt-1">${900 + (i * 50)}/mo</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal Placeholder */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Modal</h2>
            <p className="text-gray-600 mb-6">
              This would open the full application modal component
            </p>
            <button
              onClick={() => setShowApplicationModal(false)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}