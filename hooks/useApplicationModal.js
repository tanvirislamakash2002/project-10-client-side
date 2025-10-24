import { useState } from 'react';

export const useApplicationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {


    console.log('🎯 openModal called - setting modal to true');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('❌ closeModal called - setting modal to false');
    setIsModalOpen(false);
  };
console.log('🔄 useApplicationModal state:', isModalOpen);
  return {
    isModalOpen,
    openModal,
    closeModal
  };
};