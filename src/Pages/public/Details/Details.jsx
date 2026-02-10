import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, Heart, Share2, CheckCircle, FileText } from 'lucide-react';
import { useParams } from 'react-router';
import useAxios from '../../../../hooks/useAxios';
import useAuth from '../../../../hooks/useAuth';
import { useFavorite } from '../../../../hooks/useFavorite';
import { useApplicationModal } from '../../../../hooks/useApplicationModal';
import ApplicationModal from '../../dashboard/Seeker/ApplicationModal/ApplicationModal';
import useUserRole from '../../../../hooks/useUserRole';
import Sidebar from './components/Sidebar';
import PhotoGallery from './components/PhotoGallery';
import TitleAndQuickFacts from './components/TitleAndQuickFacts';
import RoomDetails from './components/RoomDetails';
import Amenities from './components/Amenities';
import Location from './components/Location';
import PreferencesAndLifestyle from './components/PreferencesAndLifestyle';

const RoomListingDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-base-content hover:text-primary transition gap-2">
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
            <TitleAndQuickFacts props={{ singleRoom }}></TitleAndQuickFacts>

            {/* Description */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl">About This Space</h2>
                <p className="text-base-content/80 leading-relaxed">{singleRoom?.description}</p>
              </div>
            </div>

            {/* Room Details */}
            <RoomDetails props={{ singleRoom }}></RoomDetails>

            {/* Amenities */}
            <Amenities props={{ singleRoom }}></Amenities>

            {/* Location */}
            <Location props={{ singleRoom }}></Location>

            {/* Preferences & Lifestyle */}
            <PreferencesAndLifestyle props={{ singleRoom }}></PreferencesAndLifestyle>

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
          <Sidebar props={{ singleRoom, user, role, id, openModal }}></Sidebar>
        </div>
      </div>

      {/* Application Modal */}
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