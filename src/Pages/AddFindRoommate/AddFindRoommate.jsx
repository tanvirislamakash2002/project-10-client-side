import React, { use, useEffect, useState } from 'react';
import { FaHome, FaImages, FaUser, FaPhone } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';
import { AuthContext } from '../../provider/AuthProvider';
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

const AddFindRoommate = () => {
  const { user } = use(AuthContext);

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
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [errors, setErrors] = useState({});

  // Watch form values to access current state
  const formData = watch();

  useEffect(() => {
    if (user) {
      setValue('poster.name', user.displayName || '');
      setValue('poster.email', user.email || '');
      setValue('poster.photo', user.photoURL || '');
    }
  }, [user, setValue]);

  const uploadImagesToImgBB = async (images) => {
    try {
      // images = array of { file, ... } objects
      const uploadPromises = images.map(async (image) => {
        const formData = new FormData();
        formData.append("image", image.file);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=8071722e3d8140465d956914d39d6ec3`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        return res.data.data.url; // return image URL
      });

      // Wait for all uploads to finish
      const imageUrls = await Promise.all(uploadPromises);
      return imageUrls; // array of hosted URLs
    } catch (err) {
      console.error("Image upload failed:", err);
      throw err;
    }
  };

  const addRoomMutation = useMutation({
    mutationFn: (roomData) =>
      axios.post(`${import.meta.env.VITE_API_URL}/add-roommate`, roomData),
    
    onSuccess: (res) => {
      if (res.data.insertedId) {
        Swal.fire("Success", "Donation added!", "success");
      }
    },
    onError: (err) => {
      Swal.fire("Error", err.message, "error");
    }
  });

  // const handleInputChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   if (name.includes('.')) {
  //     const [parent, child] = name.split('.');
  //     setFormData(prev => ({
  //       ...prev,
  //       [parent]: {
  //         ...prev[parent],
  //         [child]: type === 'checkbox' ? checked : value
  //       }
  //     }));
  //   } else {
  //     setFormData(prev => ({
  //       ...prev,
  //       [name]: type === 'checkbox' ? checked : value
  //     }));
  //   }

  //   // Clear error when user starts typing
  //   if (errors[name]) {
  //     setErrors(prev => ({ ...prev, [name]: '' }));
  //   }
  // };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum size is 5MB.`);
        return;
      }

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

  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!formData.title.trim()) newErrors.title = 'Title is required';
  //   if (!formData.location.trim()) newErrors.location = 'Location is required';
  //   if (!formData.rent) newErrors.rent = 'Rent amount is required';
  //   if (!formData.availability) newErrors.availability = 'Availability date is required';
  //   if (!formData.description.trim()) newErrors.description = 'Description is required';
  //   if (formData.description.length < 50) newErrors.description = 'Description must be at least 50 characters';
  //   if (images.length === 0) newErrors.images = 'At least one image is required';
  //   if (!formData.preferences.gender) newErrors.gender = 'Gender preference is required';
  //   if (!formData.poster.phone.trim()) newErrors.phone = 'Phone number is required';

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const onSubmit = async (data) => {
    // React Hook Form already validates, but we still need to check images
    // if (images.length === 0) {
    //   Swal.fire("Error", "At least one image is required", "error");
    //   return;
    // }
    console.log(data);
    try {
      // 1. Upload all images to ImgBB
      const uploadedUrls = await uploadImagesToImgBB(images);

      // 2. Add the URLs to formData
      const submissionData = {
        ...data,
        images: uploadedUrls,
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

  // const handleSubmit = async () => {
  //   if (!validateForm()) {
  //     alert("Please fill in all required fields correctly.");
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     // 1. Upload all images to ImgBB
  //     const uploadedUrls = await uploadImagesToImgBB(images);

  //     // 2. Add the URLs to formData
  //     const submissionData = {
  //       ...formData,
  //       images: uploadedUrls,
  //     };

  //     // 3. Send to backend
  //     addRoomMutation.mutate(submissionData);

  //     // Reset after success
  //     setFormData({
  //       title: "",
  //       location: "",
  //       rent: "",
  //       availability: "",
  //       description: "",
  //       preferences: {
  //         gender: "",
  //         ageRange: "",
  //         occupation: "",
  //         lifestyle: "",
  //       },
  //       poster: {
  //         name: user?.displayName,
  //         email: user?.email,
  //         photo: user?.photoURL,
  //         phone: "",
  //         verified: false,
  //       },
  //     });
  //     setImages([]);
  //     setErrors({});
  //   } catch (err) {
  //     Swal.fire("Error", "Image upload failed", "error");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-yellow-600 rounded-full mb-4">
            <FaHome className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Roommate</h1>
          <p className="text-gray-600 text-lg">Create a detailed post to attract the right roommate for your space</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 space-y-8">

            {/* Basic Information Section */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaHome className="text-blue-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
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
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FiFileText className="text-green-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Description & Details</h2>
              </div>

              <RoomDescription props={{ register, errors }}></RoomDescription>
            </div>

            {/* Images Section */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FaImages className="text-purple-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Property Images</h2>
              </div>

              <RoomImage props={{ removeImage, images, handleImageUpload, errors }}></RoomImage>
            </div>

            {/* Preferences Section */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FaUser className="text-indigo-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Roommate Preferences</h2>
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
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FaPhone className="text-orange-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* phone number */}
                <PhoneNumber props={{ register, errors }}></PhoneNumber>
                <ContactEmail props={{ register, errors }}></ContactEmail>

              </div>
            </div>

            {/* Submit Button */}
            <SubmitButton props={{ handleSubmit, onSubmit, isSubmitting }}></SubmitButton>
          </div>
        </div>

        {/* Help Tips */}
        <HelpTips></HelpTips>
      </div>
    </div>
  );
};

export default AddFindRoommate;