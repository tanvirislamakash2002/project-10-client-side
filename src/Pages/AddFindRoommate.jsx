import React, { use, useEffect, useState } from 'react';
import {
  FaHome,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaImages,
  FaUser,
  FaPhone,
  FaShieldAlt,
  FaTimes,
  FaUpload,
  FaCheck,
  FaMale,
  FaFemale,
  FaBriefcase,
  FaCoffee
} from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';
import { AuthContext } from '../provider/AuthProvider';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddFindRoommate = () => {
  const { user } = use(AuthContext)

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    rent: '',
    availability: '',
    description: '',
    preferences: {
      gender: '',
      ageRange: '',
      occupation: '',
      lifestyle: ''
    },
    poster: {
      phone: '',
      verified: false
    }
  });

  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});


  useEffect(() => {
      formData.poster.name = user?.displayName
      formData.poster.email = user?.email
      formData.poster.photo = user?.photoURL
  }, [user]);

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
      axios.post("https://ph-a10-server-two.vercel.app/add-roommate", roomData),
    onSuccess: (res) => {
      if (res.data.insertedId) {
        Swal.fire("Success", "Donation added!", "success");
        
      }
    },
    onError: (err) => {
      Swal.fire("Error", err.message, "error");
    }
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.rent) newErrors.rent = 'Rent amount is required';
    if (!formData.availability) newErrors.availability = 'Availability date is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.description.length < 50) newErrors.description = 'Description must be at least 50 characters';
    if (images.length === 0) newErrors.images = 'At least one image is required';
    if (!formData.preferences.gender) newErrors.gender = 'Gender preference is required';
    if (!formData.poster.phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
  if (!validateForm()) {
    alert("Please fill in all required fields correctly.");
    return;
  }

  setIsSubmitting(true);

  try {
    // 1. Upload all images to ImgBB
    const uploadedUrls = await uploadImagesToImgBB(images);

    // 2. Add the URLs to formData
    const submissionData = {
      ...formData,
      images: uploadedUrls,
    };

    // 3. Send to backend
    addRoomMutation.mutate(submissionData);

    // Reset after success
    setFormData({
      title: "",
      location: "",
      rent: "",
      availability: "",
      description: "",
      preferences: {
        gender: "",
        ageRange: "",
        occupation: "",
        lifestyle: "",
      },
      poster: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        phone: "",
        verified: false,
      },
    });
    setImages([]);
    setErrors({});
  } catch (err) {
    Swal.fire("Error", "Image upload failed", "error");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
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
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Post Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Spacious Room in Modern Downtown Apartment"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaMapMarkerAlt className="inline mr-2 text-blue-600" />
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Downtown Seattle, WA"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.location ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                {/* Rent */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaDollarSign className="inline mr-2 text-green-600" />
                    Monthly Rent *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      name="rent"
                      value={formData.rent}
                      onChange={handleInputChange}
                      placeholder="950"
                      className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.rent ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                  </div>
                  {errors.rent && <p className="text-red-500 text-sm mt-1">{errors.rent}</p>}
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaCalendarAlt className="inline mr-2 text-purple-600" />
                    Available From *
                  </label>
                  <input
                    type="date"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.availability ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
                </div>
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Describe your space, the living situation, what you're looking for in a roommate, nearby amenities, house rules, etc. Be detailed to attract the right match!"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                <div className="flex justify-between items-center mt-2">
                  <div className={`text-sm ${formData.description.length < 50 ? 'text-red-500' : 'text-gray-500'}`}>
                    {formData.description.length}/500 characters (minimum 50)
                  </div>
                </div>
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>

            {/* Images Section */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FaImages className="text-purple-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Property Images</h2>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Upload Images * (1-5 images, max 5MB each)
                </label>

                {/* Upload Area */}
                <div className={`border-2 border-dashed rounded-xl p-8 text-center mb-4 transition-all ${images.length >= 5
                    ? 'border-gray-200 bg-gray-50'
                    : errors.images
                      ? 'border-red-300 bg-red-50'
                      : 'border-blue-300 bg-blue-50 hover:border-blue-400'
                  }`}>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="imageUpload"
                    disabled={images.length >= 5}
                  />
                  <label
                    htmlFor="imageUpload"
                    className={`cursor-pointer ${images.length >= 5 ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2 font-medium">
                      {images.length >= 5
                        ? 'Maximum images uploaded'
                        : images.length > 0
                          ? 'Click to add more images'
                          : 'Click to upload images'
                      }
                    </p>
                    <p className="text-sm text-gray-500">PNG, JPG, WEBP up to 5MB each</p>
                  </label>
                </div>

                {errors.images && <p className="text-red-500 text-sm mb-4">{errors.images}</p>}

                {/* Image Preview */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border-2 border-gray-200 group-hover:border-blue-400 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaMale className="inline mr-2 text-blue-600" />
                    Gender Preference *
                  </label>
                  <select
                    name="preferences.gender"
                    value={formData.preferences.gender}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.gender ? 'border-red-500' : 'border-gray-300'
                      }`}
                  >
                    <option value="">Select gender preference</option>
                    <option value="Any">Any Gender</option>
                    <option value="Male">Male Only</option>
                    <option value="Female">Female Only</option>
                    <option value="Non-binary">Non-binary</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaCalendarAlt className="inline mr-2 text-purple-600" />
                    Age Range
                  </label>
                  <select
                    name="preferences.ageRange"
                    value={formData.preferences.ageRange}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Any Age</option>
                    <option value="18-25">18-25 years</option>
                    <option value="22-30">22-30 years</option>
                    <option value="25-35">25-35 years</option>
                    <option value="30-40">30-40 years</option>
                    <option value="35+">35+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaBriefcase className="inline mr-2 text-green-600" />
                    Occupation Preference
                  </label>
                  <select
                    name="preferences.occupation"
                    value={formData.preferences.occupation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Any Occupation</option>
                    <option value="Student">Student</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Student or Professional">Student or Professional</option>
                    <option value="Remote Worker">Remote Worker</option>
                    <option value="Freelancer">Freelancer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaCoffee className="inline mr-2 text-orange-600" />
                    Lifestyle Preference
                  </label>
                  <select
                    name="preferences.lifestyle"
                    value={formData.preferences.lifestyle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Any Lifestyle</option>
                    <option value="Quiet & Reserved">Quiet & Reserved</option>
                    <option value="Social & Outgoing">Social & Outgoing</option>
                    <option value="Clean & Organized">Clean & Organized</option>
                    <option value="Party-friendly">Party-friendly</option>
                    <option value="Fitness-oriented">Fitness-oriented</option>
                    <option value="Studious">Studious</option>
                  </select>
                </div>
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
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="poster.phone"
                    value={formData.poster.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* <div className="flex items-center">
                  <label className="flex items-center cursor-pointer bg-green-50 border border-green-200 rounded-xl p-4 hover:bg-green-100 transition-all">
                    <input
                      type="checkbox"
                      name="poster.verified"
                      checked={formData.poster.verified}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`relative w-6 h-6 rounded border-2 mr-3 transition-all ${
                      formData.poster.verified 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300'
                    }`}>
                      {formData.poster.verified && (
                        <FaCheck className="text-white text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <FaShieldAlt className="mr-2 text-green-600" />
                        <span className="font-medium text-gray-900">Verified User</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">I am a verified platform user</p>
                    </div>
                  </label>
                </div> */}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Creating Your Post...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <FaHome />
                    <span>Create Roommate Post</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Help Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
          <h4 className="font-bold text-blue-800 mb-3 flex items-center">
            <FaShieldAlt className="mr-2" />
            Tips for a Successful Post
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Use clear, well-lit photos showing the room and common areas</li>
              <li>• Write a detailed description (at least 50 characters)</li>
              <li>• Be honest about your lifestyle and house rules</li>
            </ul>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Mention nearby amenities and transportation</li>
              <li>• Set realistic expectations for cleanliness and guests</li>
              <li>• Respond promptly to interested applicants</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFindRoommate;