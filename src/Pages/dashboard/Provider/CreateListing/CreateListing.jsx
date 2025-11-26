import React, { useContext, useState } from 'react';
import { FaHome, FaMapMarkerAlt, FaUsers, FaBed, FaDollarSign, FaCheckCircle } from 'react-icons/fa';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { AuthContext } from '../../../../provider/AuthProvider';
import { useForm } from 'react-hook-form';
import RenderStepContent from './components/RenderStepContent';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import { useImageUpload } from '../../../../../hooks/useImageUpload';

const MultiStepListingForm = () => {
  const { user } = useContext(AuthContext);
  const { uploadImagesToImgBB, isUploading: isImageUploading, error: imageError } = useImageUpload()
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState([]);

  const totalSteps = 5;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    trigger,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      // Step 1: Basic Details
      title: '',
      description: '',
      propertyType: '',
      roomType: '',
      availableFrom: '',
      roomSize: '',

      // Step 2: Location & Address
      address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'USA'
      },
      location: {
        type: 'Point',
        coordinates: [0, 0] // Default coordinates
      },

      // Step 3: Roommate Preferences
      currentOccupants: 1,
      totalRoommates: 2,
      preferredGender: '',
      preferredAgeRange: { min: 18, max: 35 },
      occupationPreference: '',
      lifestyleTags: [],

      // Step 4: Property Features
      bathroomType: '',
      furnishing: '',
      amenities: [],
      petPolicy: '',
      smokingPolicy: '',
      applicationRequirements: [],

      // Step 5: Financial & Final
      rent: '',
      currency: 'USD',
      securityDeposit: '',
      utilitiesIncluded: true,
      leaseDuration: '',

      // System fields
      status: 'accepted',
      poster: {
        name: user?.displayName || '',
        email: user?.email || '',
        photo: user?.photoURL || '',
        phone: '',
        verified: false
      }
    },
    mode: 'onChange'
  });
  // sent to database 
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

  const steps = [
    { number: 1, title: 'Basic Details', icon: FaHome },
    { number: 2, title: 'Location & Address', icon: FaMapMarkerAlt },
    { number: 3, title: 'Roommate Preferences', icon: FaUsers },
    { number: 4, title: 'Property Features', icon: FaBed },
    { number: 5, title: 'Financial & Final', icon: FaDollarSign }
  ];

  const handleNext = async () => {
    // Validate current step before proceeding
    const fields = getStepFields(currentStep);
    const isStepValid = await trigger(fields);

    if (isStepValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = async (stepNumber) => {
    if (stepNumber < currentStep) {
      // Allow going back to previous steps
      setCurrentStep(stepNumber);
    } else if (stepNumber === currentStep + 1) {
      // Only allow going forward with validation
      await handleNext();
    }
  };
  // Helper function to get fields for each step
  const getStepFields = (step) => {
    switch (step) {
      case 1:
        return ['title', 'description', 'propertyType', 'roomType', 'availableFrom', 'roomSize'];
      case 2:
        return ['address.street', 'address.city', 'address.state', 'address.postalCode'];
      case 3:
        return ['currentOccupants', 'totalRoommates', 'preferredGender', 'preferredAgeRange.min', 'preferredAgeRange.max', 'occupationPreference'];
      case 4:
        return ['bathroomType', 'furnishing', 'petPolicy', 'smokingPolicy'];
      case 5:
        return ['rent', 'securityDeposit', 'leaseDuration'];
      default:
        return [];
    }
  };

  // Add this to your component functions
  const handleGeocodeAddress = async () => {
    const addressData = watch('address');
    const fullAddress = `${addressData.street}, ${addressData.city}, ${addressData.state} ${addressData.postalCode}, ${addressData.country}`;

    if (!addressData.street || !addressData.city || !addressData.state) {
      alert('Please complete the address fields first');
      return;
    }

    try {
      // Using Nominatim (OpenStreetMap) free geocoding service
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setValue('location', {
          type: 'Point',
          coordinates: [parseFloat(lon), parseFloat(lat)]
        });

        // Show success message
        alert('Address verified and coordinates generated successfully!');
      } else {
        alert('Address not found. Please check the address and try again.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Error verifying address. Please try again.');
    }
  };

  // image uploading functionality
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


  // submit functionality 
  const onSubmit = async (data) => {
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
      // Add timestamps and process data
      const submissionData = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        providerId: user?.uid,
        images: uploadedUrls
      };

      console.log('Form Data:', submissionData);

      // Here you'll integrate with your existing mutation
      await addRoomMutation.mutateAsync(submissionData);

    // Reset form after successful submission
    reset({
      // Step 1: Basic Details
      title: '',
      description: '',
      propertyType: '',
      roomType: '',
      availableFrom: '',
      roomSize: '',

      // Step 2: Location & Address
      address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'USA'
      },
      location: {
        type: 'Point',
        coordinates: [0, 0]
      },

      // Step 3: Roommate Preferences
      currentOccupants: 1,
      totalRoommates: 2,
      preferredGender: '',
      preferredAgeRange: { min: 18, max: 35 },
      occupationPreference: '',
      lifestyleTags: [],

      // Step 4: Property Features
      bathroomType: '',
      furnishing: '',
      amenities: [],
      petPolicy: '',
      smokingPolicy: '',
      applicationRequirements: [],

      // Step 5: Financial & Final
      rent: '',
      currency: 'USD',
      securityDeposit: '',
      utilitiesIncluded: true,
      leaseDuration: '',

      // System fields
      status: 'accepted',
      poster: {
        name: user?.displayName || '',
        email: user?.email || '',
        photo: user?.photoURL || '',
        phone: '',
        verified: false
      }
    });
    
    // Also reset any local state
    setImages([]);
    setCurrentStep(1); // Reset to first step if using multi-step


    } catch (error) {
      console.error('Submission error:', error);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-4">
            <FaHome className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl font-bold text-base-content mb-2">Create Your Listing</h1>
          <p className="text-text-muted text-lg">Follow these steps to create an attractive listing</p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center flex-1">
                    <button
                      onClick={() => handleStepClick(step.number)}
                      className={`
                        relative w-12 h-12 rounded-full flex items-center justify-center
                        transition-all duration-300 mb-2
                        ${isActive ? 'bg-primary text-primary-content scale-110 shadow-lg' : ''}
                        ${isCompleted ? 'bg-success text-success-content' : ''}
                        ${!isActive && !isCompleted ? 'bg-base-300 text-text-muted' : ''}
                        hover:scale-105 cursor-pointer
                      `}
                    >
                      {isCompleted ? (
                        <FaCheckCircle className="text-xl" />
                      ) : (
                        <StepIcon className="text-lg" />
                      )}
                    </button>
                    <span className={`
                      text-xs font-medium text-center hidden md:block
                      ${isActive ? 'text-primary' : ''}
                      ${isCompleted ? 'text-success' : ''}
                      ${!isActive && !isCompleted ? 'text-text-muted' : ''}
                    `}>
                      {step.title}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div className={`
                      h-1 flex-1 mx-2 rounded transition-all duration-300
                      ${currentStep > step.number ? 'bg-success' : 'bg-base-300'}
                    `} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Mobile Step Indicator */}
          <div className="md:hidden text-center mt-4">
            <span className="text-sm font-medium text-text-muted">
              Step {currentStep} of {totalSteps}: {steps[currentStep - 1].title}
            </span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-section-border">
          <div className="p-8 min-h-[400px]">
            <RenderStepContent props={{ currentStep, register, errors, watch, handleGeocodeAddress, images, handleImageUpload, removeImage }}></RenderStepContent>
          </div>

          {/* Navigation Buttons */}
          <div className="bg-base-200 px-8 py-6 flex items-center justify-between border-t border-section-border">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`
      btn btn-outline gap-2
      ${currentStep === 1 ? 'btn-disabled opacity-50' : 'hover:bg-primary hover:text-primary-content'}
    `}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="text-sm font-medium text-text-muted">
              {currentStep} / {totalSteps}
            </div>

            {currentStep === totalSteps ? (
              <button
                onClick={handleSubmit(onSubmit)}
                className="btn btn-success gap-2 text-white"
              >
                <FaCheckCircle className="w-5 h-5" />
                Submit for Review
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn btn-primary gap-2"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Summary */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-base-200 rounded-full">
            <div className="w-32 h-2 bg-base-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-text-muted">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 bg-info/10 border border-info/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-info text-xl">💡</div>
            <div>
              <h4 className="font-semibold text-base-content mb-1">Quick Tip</h4>
              <p className="text-sm text-text-muted">
                You can click on any completed step to go back and edit your information. Your progress is automatically saved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepListingForm;