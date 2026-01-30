import React from 'react';

const BasicDetails = ({ props }) => {
  const { register, errors } = props
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-base-content">Basic Details</h3>
      <p className="text-text-muted">Tell us about your space - title, description, and property type.</p>

      <div className="space-y-6">
        {/* Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base-content">Listing Title</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Spacious Room in Quiet 3BR House near University"
            className="input input-bordered w-full focus:input-primary"
            {...register('title', {
              required: 'Title is required',
              minLength: { value: 10, message: 'Title must be at least 10 characters' }
            })}
          />
          {errors.title && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.title.message}</span>
            </label>
          )}
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base-content">Description</span>
          </label>
          <textarea
            placeholder="Describe your space, neighborhood, and what makes it special..."
            className="textarea textarea-bordered w-full h-32 focus:textarea-primary"
            {...register('description', {
              required: 'Description is required',
              minLength: { value: 5, message: 'Description must be at least 50 characters' }
            })}
          />
          {errors.description && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.description.message}</span>
            </label>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Property Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Property Type</span>
            </label>
            <select
              className="select select-bordered w-full focus:select-primary"
              {...register('propertyType', { required: 'Property type is required' })}
            >
              <option value="">Select property type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Duplex">Duplex</option>
              <option value="Studio">Studio</option>
            </select>
            {errors.propertyType && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.propertyType.message}</span>
              </label>
            )}
          </div>

          {/* Room Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Room Type</span>
            </label>
            <select
              className="select select-bordered w-full focus:select-primary"
              {...register('roomType', { required: 'Room type is required' })}
            >
              <option value="">Select room type</option>
              <option value="Private Room">Private Room</option>
              <option value="Shared Room">Shared Room</option>
              <option value="Studio">Studio</option>
              <option value="Master Bedroom">Master Bedroom</option>
            </select>
            {errors.roomType && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.roomType.message}</span>
              </label>
            )}
          </div>

          {/* Available From */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Available From</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full focus:input-primary"
              {...register('availableFrom', { required: 'Available date is required' })}
            />
            {errors.availableFrom && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.availableFrom.message}</span>
              </label>
            )}
          </div>

          {/* Room Size */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Room Size (sq ft)</span>
            </label>
            <div className="join">
              <input
                type="number"
                placeholder="e.g., 120"
                className="input input-bordered join-item w-full focus:input-primary"
                {...register('roomSize.value', {
                  required: 'Room size is required',
                  min: { value: 50, message: 'Room size must be at least 50 sq ft' }
                })}
              />
              <span className="join-item bg-base-300 px-4 flex items-center text-text-muted">sq ft</span>
            </div>
            {errors.roomSize && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.roomSize.value.message}</span>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;