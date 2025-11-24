import React, { useState } from 'react';
import { FaHome, FaMapMarkerAlt, FaUsers, FaBed, FaDollarSign, FaCheckCircle } from 'react-icons/fa';
import { ChevronRight, ChevronLeft, Home, FileText, Building, DoorOpen, Calendar, Ruler } from 'lucide-react';
import { useForm } from 'react-hook-form';

const MultiStepListingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      propertyType: '',
      roomType: '',
      availableFrom: '',
      roomSize: ''
    }
  });

  const steps = [
    { number: 1, title: 'Basic Details', icon: FaHome },
    { number: 2, title: 'Location & Address', icon: FaMapMarkerAlt },
    { number: 3, title: 'Roommate Preferences', icon: FaUsers },
    { number: 4, title: 'Property Features', icon: FaBed },
    { number: 5, title: 'Financial & Final', icon: FaDollarSign }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-base-content mb-2">Basic Details</h3>
              <p className="text-text-muted">Tell us about your space - the essentials that seekers will see first.</p>
            </div>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-base-content mb-2">
                  <Home className="w-4 h-4 text-primary" />
                  Listing Title
                  <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Spacious Room in Quiet 3BR House near University"
                  {...register('title', {
                    required: 'Title is required',
                    minLength: { value: 10, message: 'Title must be at least 10 characters' },
                    maxLength: { value: 100, message: 'Title must not exceed 100 characters' }
                  })}
                  className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                />
                {errors.title && (
                  <p className="text-error text-sm mt-1">{errors.title.message}</p>
                )}
                <p className="text-xs text-text-muted mt-1">
                  Create an attractive title that highlights key features
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-base-content mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Description
                  <span className="text-error">*</span>
                </label>
                <textarea
                  placeholder="Describe your space, the neighborhood, nearby amenities, transportation options, and what makes it special..."
                  rows="6"
                  {...register('description', {
                    required: 'Description is required',
                    minLength: { value: 50, message: 'Description must be at least 50 characters' },
                    maxLength: { value: 2000, message: 'Description must not exceed 2000 characters' }
                  })}
                  className={`textarea textarea-bordered w-full ${errors.description ? 'textarea-error' : ''}`}
                />
                {errors.description && (
                  <p className="text-error text-sm mt-1">{errors.description.message}</p>
                )}
                <p className="text-xs text-text-muted mt-1">
                  {watch('description')?.length || 0} / 2000 characters
                </p>
              </div>

              {/* Property Type & Room Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Property Type */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-base-content mb-2">
                    <Building className="w-4 h-4 text-primary" />
                    Property Type
                    <span className="text-error">*</span>
                  </label>
                  <select
                    {...register('propertyType', { required: 'Property type is required' })}
                    className={`select select-bordered w-full ${errors.propertyType ? 'select-error' : ''}`}
                  >
                    <option value="">Select property type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Studio">Studio</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.propertyType && (
                    <p className="text-error text-sm mt-1">{errors.propertyType.message}</p>
                  )}
                </div>

                {/* Room Type */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-base-content mb-2">
                    <DoorOpen className="w-4 h-4 text-primary" />
                    Room Type
                    <span className="text-error">*</span>
                  </label>
                  <select
                    {...register('roomType', { required: 'Room type is required' })}
                    className={`select select-bordered w-full ${errors.roomType ? 'select-error' : ''}`}
                  >
                    <option value="">Select room type</option>
                    <option value="Private Room">Private Room</option>
                    <option value="Shared Room">Shared Room</option>
                    <option value="Entire Place">Entire Place</option>
                  </select>
                  {errors.roomType && (
                    <p className="text-error text-sm mt-1">{errors.roomType.message}</p>
                  )}
                </div>
              </div>

              {/* Available From & Room Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Available From */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-base-content mb-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Available From
                    <span className="text-error">*</span>
                  </label>
                  <input
                    type="date"
                    {...register('availableFrom', { required: 'Available date is required' })}
                    className={`input input-bordered w-full ${errors.availableFrom ? 'input-error' : ''}`}
                  />
                  {errors.availableFrom && (
                    <p className="text-error text-sm mt-1">{errors.availableFrom.message}</p>
                  )}
                </div>

                {/* Room Size */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-base-content mb-2">
                    <Ruler className="w-4 h-4 text-primary" />
                    Room Size (sq ft)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 120"
                    {...register('roomSize', {
                      min: { value: 1, message: 'Room size must be positive' },
                      max: { value: 10000, message: 'Room size seems too large' }
                    })}
                    className={`input input-bordered w-full ${errors.roomSize ? 'input-error' : ''}`}
                  />
                  {errors.roomSize && (
                    <p className="text-error text-sm mt-1">{errors.roomSize.message}</p>
                  )}
                  <p className="text-xs text-text-muted mt-1">Optional - helps seekers understand the space</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-base-content">Location & Address</h3>
            <p className="text-text-muted">Where is your property located? Provide complete address details.</p>
            <div className="bg-base-200 rounded-lg p-8 text-center">
              <FaMapMarkerAlt className="mx-auto text-6xl text-primary mb-4" />
              <p className="text-text-muted">Step 2 content will go here</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-base-content">Roommate Preferences</h3>
            <p className="text-text-muted">What kind of roommate are you looking for?</p>
            <div className="bg-base-200 rounded-lg p-8 text-center">
              <FaUsers className="mx-auto text-6xl text-primary mb-4" />
              <p className="text-text-muted">Step 3 content will go here</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-base-content">Property Features</h3>
            <p className="text-text-muted">Add amenities, room details, and policies.</p>
            <div className="bg-base-200 rounded-lg p-8 text-center">
              <FaBed className="mx-auto text-6xl text-primary mb-4" />
              <p className="text-text-muted">Step 4 content will go here</p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-base-content">Financial & Final Details</h3>
            <p className="text-text-muted">Set rent, deposit, and review your listing before submission.</p>
            <div className="bg-base-200 rounded-lg p-8 text-center">
              <FaDollarSign className="mx-auto text-6xl text-primary mb-4" />
              <p className="text-text-muted">Step 5 content will go here</p>
            </div>
          </div>
        );
      default:
        return null;
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
            {renderStepContent()}
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
              <button className="btn btn-success gap-2 text-white">
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