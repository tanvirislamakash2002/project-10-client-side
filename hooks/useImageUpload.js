import { useState } from 'react';
import axios from 'axios';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [error, setError] = useState(null);

  const uploadImagesToImgBB = async (images) => {
    setIsUploading(true);
    setError(null);
    
    try {
      const uploadPromises = images.map(async (image, index) => {
        const formData = new FormData();
        formData.append("image", image.file);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(prev => ({
                ...prev,
                [index]: progress
              }));
            }
          }
        );

        return res.data.data.url;
      });

      const imageUrls = await Promise.all(uploadPromises);
      return imageUrls;
    } catch (err) {
      console.error("Image upload failed:", err);
      setError(err.message || 'Image upload failed');
      throw err;
    } finally {
      setIsUploading(false);
      setUploadProgress({});
    }
  };

  const reset = () => {
    setError(null);
    setUploadProgress({});
  };

  return {
    uploadImagesToImgBB,
    isUploading,
    uploadProgress,
    error,
    reset
  };
};