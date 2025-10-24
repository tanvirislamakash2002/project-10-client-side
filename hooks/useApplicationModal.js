import { useState } from 'react';

export const useApplicationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const openModal = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedListing(null);
  };

  return {
    isModalOpen,
    selectedListing,
    openModal,
    closeModal
  };
};