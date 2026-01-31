import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import {
  ChevronLeft, ChevronRight, Heart, Share2, MapPin, DollarSign,
  Calendar, Clock, Wifi, Home, Bed, Users, MessageSquare,
  CheckCircle, X, Shield, AlertCircle, Send, Eye,
  TrendingUp, Star, Bath, Sofa, Car, Dumbbell, Waves,
  UserCheck, Briefcase, FileText
} from 'lucide-react';
import { useParams } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';
import { useFavorite } from '../../../hooks/useFavorite';
import { useApplicationModal } from '../../../hooks/useApplicationModal';
import ApplicationModal from '../dashboard/Seeker/ApplicationModal/ApplicationModal';

// const useFavorite = (id, email) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   return {
//     isFavorite,
//     toggleFavorite: () => setIsFavorite(!isFavorite)
//   };
// };



const RoomListingDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const { user } = useAuth();
  const { id } = useParams();
  const axiosInstance = useAxios()
  const { isModalOpen, openModal, closeModal } = useApplicationModal();
  const { isFavorite, toggleFavorite } = useFavorite(id, user?.email);


  const { data: singleRoom = {}, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/listings/${id}`)
      return response.data
    }
  });
  // const isLoading = false;

  const formattedDate = singleRoom?.availableFrom
    ? new Date(singleRoom.availableFrom).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    : 'Not available';

  const formattedAddress = singleRoom?.address
    ? `${singleRoom.address.street}, ${singleRoom.address?.city}, ${singleRoom.address.state} ${singleRoom.address.postalCode}`
    : '';

  const nextImage = () => {
    if (!singleRoom?.images?.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % singleRoom.images.length);
  };

  const prevImage = () => {
    if (!singleRoom?.images?.length) return;
    setCurrentImageIndex((prev) => (prev - 1 + singleRoom.images.length) % singleRoom.images.length);
  };

  const amenityIcons = {
    'WiFi': Wifi,
    'Laundry': Home,
    'Parking': Car,
    'Gym': Dumbbell,
    'Pool': Waves
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <span className="ml-4 text-base-content">Loading room details...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header with Back Button */}
      <div className="bg-base-100 border-b border-base-300 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center text-base-content hover:text-primary transition gap-2">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to Listings</span>
            </button>
            <div className="flex gap-2">
              <button className="btn btn-ghost btn-sm btn-circle">
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={toggleFavorite}
                className={`btn btn-sm btn-circle ${isFavorite ? 'btn-error' : 'btn-ghost'
                  }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Gallery */}
            <div className="card bg-base-100 shadow-lg overflow-hidden">
              <div className="relative h-[500px] bg-base-300">
                {singleRoom?.images?.[currentImageIndex] ? (
                  <img
                    src={singleRoom.images[currentImageIndex]}
                    alt={`Room image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Home className="w-24 h-24 text-base-content opacity-20" />
                  </div>
                )}

                {singleRoom?.images && singleRoom.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="btn btn-circle btn-sm absolute left-4 top-1/2 -translate-y-1/2 bg-base-100/90 hover:bg-base-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="btn btn-circle btn-sm absolute right-4 top-1/2 -translate-y-1/2 bg-base-100/90 hover:bg-base-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {singleRoom.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`h-2 rounded-full transition-all ${idx === currentImageIndex
                            ? 'bg-base-100 w-8'
                            : 'bg-base-100/50 w-2'
                            }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* View Count Badge */}
                <div className="absolute top-4 right-4 badge badge-lg bg-base-100/90 gap-2">
                  <Eye className="w-4 h-4" />
                  {singleRoom?.viewCount} views
                </div>

                {/* Featured Badge */}
                {singleRoom.isFeatured && (
                  <div className="absolute top-4 left-4 badge badge-warning badge-lg gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    Featured
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              {singleRoom?.images && singleRoom.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto bg-base-100">
                  {singleRoom.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${idx === currentImageIndex
                        ? 'border-primary'
                        : 'border-transparent hover:border-base-300'
                        }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title and Quick Facts */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h1 className="card-title text-3xl mb-4">{singleRoom.title}</h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-success" />
                      <p className="text-sm text-success font-medium">Monthly Rent</p>
                    </div>
                    <p className="text-2xl font-bold text-success">
                      {singleRoom?.pricing?.currency === 'USD' ? '$' : ''}{singleRoom?.pricing?.rent}
                    </p>
                  </div>

                  <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-info" />
                      <p className="text-sm text-info font-medium">Deposit</p>
                    </div>
                    <p className="text-2xl font-bold text-info">
                      {singleRoom?.pricing?.currency === 'USD' ? '$' : ''}{singleRoom?.pricing?.securityDeposit}
                    </p>
                  </div>

                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-warning" />
                      <p className="text-sm text-warning font-medium">Available</p>
                    </div>
                    <p className="text-sm font-bold text-warning">{formattedDate}</p>
                  </div>

                  <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-secondary" />
                      <p className="text-sm text-secondary font-medium">Lease</p>
                    </div>
                    <p className="text-sm font-bold text-secondary">{singleRoom?.leaseDuration}</p>
                  </div>
                </div>

                {/* Application Count */}
                {singleRoom?.applicationCount > 0 && (
                  <div className="alert alert-info mt-4">
                    <TrendingUp className="w-5 h-5" />
                    <span><strong>{singleRoom?.applicationCount}</strong> people have applied for this room</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl">About This Space</h2>
                <p className="text-base-content/80 leading-relaxed">{singleRoom?.description}</p>
              </div>
            </div>

            {/* Room Details */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Room Details</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="stat bg-base-200 rounded-lg p-4">
                    <div className="stat-figure text-primary">
                      <Home className="w-8 h-8" />
                    </div>
                    <div className="stat-title text-xs">Property Type</div>
                    <div className="stat-value text-lg">{singleRoom?.propertyType}</div>
                  </div>

                  <div className="stat bg-base-200 rounded-lg p-4">
                    <div className="stat-figure text-primary">
                      <Bed className="w-8 h-8" />
                    </div>
                    <div className="stat-title text-xs">Room Type</div>
                    <div className="stat-value text-lg">{singleRoom?.roomType}</div>
                  </div>

                  <div className="stat bg-base-200 rounded-lg p-4">
                    <div className="stat-figure text-primary">
                      <Home className="w-8 h-8" />
                    </div>
                    <div className="stat-title text-xs">Room Size</div>
                    <div className="stat-value text-lg">{singleRoom?.roomSize?.value} ft²</div>
                  </div>

                  <div className="stat bg-base-200 rounded-lg p-4">
                    <div className="stat-figure text-primary">
                      <Bath className="w-8 h-8" />
                    </div>
                    <div className="stat-title text-xs">Bathroom</div>
                    <div className="stat-value text-lg text-sm">{singleRoom.bathroomType}</div>
                  </div>

                  <div className="stat bg-base-200 rounded-lg p-4">
                    <div className="stat-figure text-primary">
                      <Sofa className="w-8 h-8" />
                    </div>
                    <div className="stat-title text-xs">Furnishing</div>
                    <div className="stat-value text-lg text-sm">{singleRoom.furnishing}</div>
                  </div>

                  <div className="stat bg-base-200 rounded-lg p-4">
                    <div className="stat-figure text-primary">
                      <Users className="w-8 h-8" />
                    </div>
                    <div className="stat-title text-xs">Roommates</div>
                    <div className="stat-value text-lg">{singleRoom.currentOccupants}/{singleRoom.totalRoommates}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Amenities & Features</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {singleRoom.amenities?.map((amenity, idx) => {
                    const IconComponent = amenityIcons[amenity] || CheckCircle;
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                        <IconComponent className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="font-medium">{amenity}</span>
                      </div>
                    );
                  })}
                </div>

                {singleRoom.utilitiesIncluded && (
                  <div className="alert alert-success mt-4">
                    <CheckCircle className="w-5 h-5" />
                    <span>All utilities included in rent</span>
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  Location
                </h2>

                <div className="mb-4">
                  <p className="font-semibold text-lg">{singleRoom.address?.city}, {singleRoom.address.state}</p>
                  <p className="text-base-content/70">{formattedAddress}</p>
                </div>

                {/* Map Placeholder */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg h-64 flex items-center justify-center border border-base-300">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-2" />
                    <p className="text-base-content/70 font-medium">Interactive Map</p>
                    <p className="text-sm text-base-content/50">Exact location shown after contact</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences & Lifestyle */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">
                  <Users className="w-6 h-6 text-primary" />
                  Ideal Roommate
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-base-200 rounded-lg p-4">
                      <p className="text-sm text-base-content/70 mb-1 flex items-center gap-2">
                        <UserCheck className="w-4 h-4" />
                        Gender Preference
                      </p>
                      <p className="font-semibold">{singleRoom.preferredGender}</p>
                    </div>

                    <div className="bg-base-200 rounded-lg p-4">
                      <p className="text-sm text-base-content/70 mb-1 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Age Range
                      </p>
                      <p className="font-semibold">
                        {singleRoom.preferredAgeRange.min} - {singleRoom.preferredAgeRange.max} years
                      </p>
                    </div>

                    <div className="bg-base-200 rounded-lg p-4">
                      <p className="text-sm text-base-content/70 mb-1 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Occupation
                      </p>
                      <p className="font-semibold">{singleRoom.occupationPreference}</p>
                    </div>

                    <div className="bg-base-200 rounded-lg p-4">
                      <p className="text-sm text-base-content/70 mb-1 flex items-center gap-2">
                        <Home className="w-4 h-4" />
                        Smoking Policy
                      </p>
                      <p className="font-semibold">{singleRoom.smokingPolicy}</p>
                    </div>

                    <div className="bg-base-200 rounded-lg p-4 md:col-span-2">
                      <p className="text-sm text-base-content/70 mb-1 flex items-center gap-2">
                        <Home className="w-4 h-4" />
                        Pet Policy
                      </p>
                      <p className="font-semibold">{singleRoom.petPolicy}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Lifestyle Preferences</h3>
                    <div className="flex flex-wrap gap-2">
                      {singleRoom.lifestyleTags?.map((tag, idx) => (
                        <span key={idx} className="badge badge-primary badge-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Requirements */}
            {singleRoom.applicationRequirements?.length > 0 && (
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h2 className="card-title text-xl mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                    Application Requirements
                  </h2>

                  <div className="space-y-3">
                    {singleRoom.applicationRequirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="font-medium">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Provider Info */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4">Posted By</h3>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="avatar">
                      <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user?.photoURL} alt={user?.displayName} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold">{user?.displayName}</h4>
                        <Shield className="w-4 h-4 text-success" />
                      </div>
                      <p className="text-sm text-base-content/70">Current Tenant</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-warning fill-current" />
                        <span className="text-sm font-semibold">4.8</span>
                        <span className="text-sm text-base-content/70">(12 reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <p className="flex items-center gap-2 text-base-content/70">
                      <Clock className="w-4 h-4" />
                      Usually responds within 24 hours
                    </p>
                    <p className="flex items-center gap-2 text-base-content/70">
                      <Calendar className="w-4 h-4" />
                      Member since 2023
                    </p>
                  </div>

                  <button className="btn btn-ghost btn-sm w-full">
                    View Provider Profile
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body space-y-3">
                  <button
                    // onClick={() => setShowApplicationModal(true)}
                    onClick={openModal}
                    className="btn btn-primary w-full gap-2"
                  >
                    <Send className="w-5 h-5" />
                    I'm Interested
                  </button>

                  <button className="btn btn-secondary w-full gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Contact Provider
                  </button>

                  <button className="btn btn-outline w-full gap-2">
                    <Calendar className="w-5 h-5" />
                    Schedule Viewing
                  </button>
                </div>
              </div>

              {/* Safety Tips */}
              <div className="alert alert-warning">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Safety Tips</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Meet in person before committing</li>
                    <li>• Never send money before viewing</li>
                    <li>• Use secure messaging</li>
                    <li>• Report suspicious listings</li>
                  </ul>
                </div>
              </div>

              {/* Similar Listings */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4">Similar Listings</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-3 p-3 bg-base-200 rounded-lg hover:bg-base-300 transition cursor-pointer">
                        <div className="avatar">
                          <div className="w-16 h-16 rounded-lg">
                            <img src={`https://images.unsplash.com/photo-${1522708323590 + i}?w=200`} alt="Room" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">Room Near Downtown</h4>
                          <p className="text-xs text-base-content/70">Downtown</p>
                          <p className="text-sm font-bold text-success mt-1">${900 + (i * 50)}/mo</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {/* {showApplicationModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Express Your Interest</h3>
            <p className="py-4">
              This would open the full application form where you can introduce yourself and submit your application.
            </p>
            <div className="modal-action">
              <button onClick={() => setShowApplicationModal(false)} className="btn">
                Close
              </button>
              <button className="btn btn-primary">
                Continue to Application
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowApplicationModal(false)}></div>
        </div>
      )} */}
      {isModalOpen && (
        <ApplicationModal
          listingDetails={singleRoom}
          onClose={closeModal}
          onSuccess={() => {
            // alert('Application submitted successfully');
            closeModal();
          }}
        />
      )}
    </div>
  );
};

export default RoomListingDetails;