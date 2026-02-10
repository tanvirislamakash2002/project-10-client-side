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
import useAxios from '../../../../hooks/useAxios';
import useAuth from '../../../../hooks/useAuth';
import { useFavorite } from '../../../../hooks/useFavorite';
import { useApplicationModal } from '../../../../hooks/useApplicationModal';
import ApplicationModal from '../../dashboard/Seeker/ApplicationModal/ApplicationModal';
import useUserRole from '../../../../hooks/useUserRole';
import Sidebar from './components/Sidebar';
import PhotoGallery from './components/PhotoGallery';

// const useFavorite = (id, email) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   return {
//     isFavorite,
//     toggleFavorite: () => setIsFavorite(!isFavorite)
//   };
// };



const RoomListingDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const [showApplicationModal, setShowApplicationModal] = useState(false);
  const { user } = useAuth();
  const { id } = useParams();
  const axiosInstance = useAxios()
  const { isModalOpen, openModal, closeModal } = useApplicationModal();
  const { isFavorite, toggleFavorite } = useFavorite(id, user?.email);
  const { role } = useUserRole()

  const { data: singleRoom = {}, isLoading, error } = useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/listings/${id}`)
      return response.data
    },
    
  });
  console.log(singleRoom);
  const { data: providerInfo = {}, isLoading: providerLoading } = useQuery({
    queryKey: ['user', singleRoom?.postedBy], // Use postedBy ID from room data
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/user?id=${singleRoom?.providerId}`)
      return response.data
    },
    enabled: !!singleRoom?.providerId,
  });
  const { data: checkPendingApplication = {}, isLoading: checkPendingApplicationLoading } = useQuery({
    queryKey: ['user', id], // Use postedBy ID from room data
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/application?listing_id=${id}`)
      return response.data
    },
    enabled: !!singleRoom?.providerId,
  });
  console.log('dis appli', checkPendingApplication);
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
            <PhotoGallery props={{ singleRoom, currentImageIndex, prevImage, nextImage, setCurrentImageIndex }}></PhotoGallery>

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
          <Sidebar props={{ providerInfo, user, role, openModal }}></Sidebar>
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