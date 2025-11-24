import React, { useContext, useEffect, useState } from 'react';
import { FaHome, FaImages, FaUser, FaPhone } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import PhoneNumber from './components/contactInformation/phoneNumber';
import ContactEmail from './components/contactInformation/ContactEmail';
import GenderPreference from './components/preferences/GenderPreference';
import AgeRange from './components/preferences/AgeRange';
import Occupation from './components/preferences/Occupation';
import Lifestyle from './components/preferences/Lifestyle';
import RoomImage from './components/RoomImage';
import RoomDescription from './components/RoomDescription';
import HelpTips from './components/HelpTips';
import RoomTitle from './components/BasicInformation/RoomTitle';
import RoomLocation from './components/BasicInformation/RoomLocation';
import RoomRent from './components/BasicInformation/RoomRent';
import RoomAvailability from './components/BasicInformation/RoomAvailability';
import SubmitButton from './components/SubmitButton';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../../provider/AuthProvider';
import { useImageUpload } from '../../../../../hooks/useImageUpload';

const CreateListing = () => {
  const { user } = useContext(AuthContext);
  const { uploadImagesToImgBB, isUploading: isImageUploading, error: imageError } = useImageUpload()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      title: '',
      location: '',
      rent: '',
      availableFrom: '',
      description: '',
      status: 'accepted',
      preferences: {
        gender: '',
        ageRange: '',
        occupation: '',
        lifestyle: ''
      },
      poster: {
        phone: '',
        verified: false,
        name: user?.displayName || '',
        email: user?.email || '',
        photo: user?.photoURL || ''
      }
    }
  });

  const [images, setImages] = useState([]);

  // Watch form values to access current state
  const formData = watch();

  useEffect(() => {
    if (user) {
      setValue('poster.name', user.displayName || '');
      setValue('poster.email', user.email || '');
      setValue('poster.photo', user.photoURL || '');
    }
  }, [user, setValue]);


  const addRoomMutation = useMutation({
    mutationFn: (roomData) =>
      axios.post(`${import.meta.env.VITE_API_URL}/add-roommate`, roomData),

    onSuccess: (res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Your listing has been submitted for admin approval!", // Updated message
          icon: "success",
          confirmButtonColor: "var(--color-primary)"
        });
      }
    },
    onError: (err) => {
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        confirmButtonColor: "var(--color-error)"
      });
    }
  });


  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      Swal.fire({
        title: "Too many images!",
        text: "Maximum 5 images allowed",
        icon: "warning",
        confirmButtonColor: "var(--color-warning)"
      });
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: "File too large!",
          text: `${file.name} is too large. Maximum size is 5MB.`,
          icon: "warning",
          confirmButtonColor: "var(--color-warning)"
        });
        return false;
      }
      return true;
    });

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          file,
          url: event.target.result,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };



  const onSubmit = async (data) => {

    console.log(data);
    try {
      // Check if we have images to upload
      if (images.length === 0) {
        Swal.fire({
          title: "Images Required!",
          text: "Please add at least one image of your space",
          icon: "warning",
          confirmButtonColor: "var(--color-warning)"
        });
        return;
      }
      // 1. Upload all images to ImgBB
      const uploadedUrls = await uploadImagesToImgBB(images);

      // 2. Add the URLs to formData
      const submissionData = {
        ...data,
        images: uploadedUrls,
        createdAt: new Date().toISOString(), // Add timestamp
        status: 'accepted' // Ensure status is pending for admin approval
      };

      // 3. Send to backend
      await addRoomMutation.mutateAsync(submissionData);

      // Reset after success
      reset({
        title: "",
        location: "",
        rent: "",
        availableFrom: "",
        description: "",
        status: 'pending',
        preferences: {
          gender: "",
          ageRange: "",
          occupation: "",
          lifestyle: "",
        },
        poster: {
          name: user?.displayName || '',
          email: user?.email || '',
          photo: user?.photoURL || '',
          phone: "",
          verified: false,
        },
      });
      setImages([]);
    } catch (err) {
      // Error handling is done in mutation onError
      console.error("Submission failed:", err);
    }
  };

  // Combined loading state
  const isLoading = isSubmitting || isImageUploading || addRoomMutation.isLoading;


  return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
  <div className="container mx-auto px-4 py-8 max-w-4xl">
    {/* Header */}
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-yellow-600 rounded-full mb-4">
        <FaHome className="text-white text-2xl" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Find Your Perfect Roommate</h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg">Create a detailed post to attract the right roommate for your space</p>
    </div>

    {/* Form */}
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8 space-y-8">
        {imageError && (
          <div className="alert alert-error dark:bg-red-900 dark:text-red-100">
            <span>Image Upload Error: {imageError}</span>
          </div>
        )}
        {/* Basic Information Section */}
        <div>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FaHome className="text-blue-600 dark:text-blue-300 text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Basic Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <RoomTitle props={{ register, errors }}></RoomTitle>

            {/* Location */}
            <RoomLocation props={{ register, errors }}></RoomLocation>

            {/* Rent */}
            <RoomRent props={{ register, errors }}></RoomRent>

            {/* Availability */}
            <RoomAvailability props={{ register, errors }}></RoomAvailability>
          </div>
        </div>

        {/* Description Section */}
        <div>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <FiFileText className="text-green-600 dark:text-green-300 text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Description & Details</h2>
          </div>

          <RoomDescription props={{ register, errors }}></RoomDescription>
        </div>

        {/* Images Section */}
        <div>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <FaImages className="text-purple-600 dark:text-purple-300 text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Property Images</h2>
          </div>

          <RoomImage props={{
            removeImage,
            images,
            handleImageUpload,
            errors,
            isUploading: isImageUploading
          }}></RoomImage>
        </div>

        {/* Preferences Section */}
        <div>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
              <FaUser className="text-indigo-600 dark:text-indigo-300 text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Roommate Preferences</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* gender preference */}
            <GenderPreference props={{ register, errors }}></GenderPreference>

            <Occupation props={{ register }}></Occupation>
            {/* age range */}
            <AgeRange props={{ register, setValue, watch, errors }}></AgeRange>

            <Lifestyle props={{ register }}></Lifestyle>
          </div>
        </div>

        {/* Contact Information Section */}
        <div>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <FaPhone className="text-orange-600 dark:text-orange-300 text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* phone number */}
            <PhoneNumber props={{ register, errors }}></PhoneNumber>
            <ContactEmail props={{ register, errors }}></ContactEmail>
          </div>
        </div>

        {/* Submit Button */}
        <SubmitButton props={{ handleSubmit, onSubmit, isSubmitting: isLoading }}></SubmitButton>
      </div>
    </div>

    {/* Help Tips */}
    <HelpTips></HelpTips>
  </div>
</div>
  );
};

export default CreateListing;