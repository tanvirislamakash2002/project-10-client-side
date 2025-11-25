import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const LocationAndAddress = ({props}) => {
    const {register,errors,watch, handleGeocodeAddress}=props
    return (
        <div className="space-y-6">
  <h3 className="text-2xl font-bold text-base-content">Location & Address</h3>
  <p className="text-text-muted">Where is your property located? Provide complete address details.</p>
  
  <div className="space-y-6">
    {/* Street Address */}
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold text-base-content">Street Address</span>
      </label>
      <input
        type="text"
        placeholder="e.g., 123 Main Street"
        className="input input-bordered w-full focus:input-primary"
        {...register('address.street', { 
          required: 'Street address is required',
          minLength: { value: 5, message: 'Please enter a complete street address' }
        })}
      />
      {errors.address?.street && (
        <label className="label">
          <span className="label-text-alt text-error">{errors.address.street.message}</span>
        </label>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* City */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-base-content">City</span>
        </label>
        <input
          type="text"
          placeholder="e.g., New York"
          className="input input-bordered w-full focus:input-primary"
          {...register('address.city', { 
            required: 'City is required'
          })}
        />
        {errors.address?.city && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.address.city.message}</span>
          </label>
        )}
      </div>

      {/* State */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-base-content">State</span>
        </label>
        <input
          type="text"
          placeholder="e.g., NY"
          className="input input-bordered w-full focus:input-primary"
          {...register('address.state', { 
            required: 'State is required',
            minLength: { value: 2, message: 'Enter state abbreviation' }
          })}
        />
        {errors.address?.state && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.address.state.message}</span>
          </label>
        )}
      </div>

      {/* Postal Code */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-base-content">Postal Code</span>
        </label>
        <input
          type="text"
          placeholder="e.g., 10001"
          className="input input-bordered w-full focus:input-primary"
          {...register('address.postalCode', { 
            required: 'Postal code is required',
            pattern: {
              value: /^[0-9]{5}(-[0-9]{4})?$/,
              message: 'Please enter a valid postal code'
            }
          })}
        />
        {errors.address?.postalCode && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.address.postalCode.message}</span>
          </label>
        )}
      </div>
    </div>

    {/* Country */}
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold text-base-content">Country</span>
      </label>
      <select 
        className="select select-bordered w-full focus:select-primary"
        {...register('address.country', { required: 'Country is required' })}
      >
        <option value="USA">United States</option>
        <option value="CAN">Canada</option>
        <option value="UK">United Kingdom</option>
        <option value="AUS">Australia</option>
        <option value="GER">Germany</option>
        <option value="FRA">France</option>
        <option value="OTHER">Other</option>
      </select>
      {errors.address?.country && (
        <label className="label">
          <span className="label-text-alt text-error">{errors.address.country.message}</span>
        </label>
      )}
    </div>

    {/* Map Preview & Coordinates */}
    <div className="bg-base-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <FaMapMarkerAlt className="text-primary text-xl" />
        <h4 className="font-semibold text-base-content">Location Preview</h4>
      </div>
      
      <div className="space-y-4">
        <div className="bg-base-100 rounded-lg p-4 min-h-[120px] flex items-center justify-center">
          <div className="text-center">
            <FaMapMarkerAlt className="mx-auto text-3xl text-primary mb-2" />
            <p className="text-text-muted text-sm">
              Map will appear here once address is verified
            </p>
            <button
              type="button"
              onClick={handleGeocodeAddress}
              className="btn btn-sm btn-outline btn-primary mt-2"
            >
              Verify Address & Generate Coordinates
            </button>
          </div>
        </div>
        
        {/* Generated Coordinates Display */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-base-100 rounded p-3">
            <span className="text-text-muted block">Latitude:</span>
            <span className="font-mono text-base-content">
              {watch('location.coordinates.[1]') || 'Not set'}
            </span>
          </div>
          <div className="bg-base-100 rounded p-3">
            <span className="text-text-muted block">Longitude:</span>
            <span className="font-mono text-base-content">
              {watch('location.coordinates.[0]') || 'Not set'}
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Address Verification Status */}
    <div className="alert alert-info">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <span className="text-sm">
          We'll automatically generate coordinates from your address for better search results
        </span>
      </div>
    </div>
  </div>
</div>
    );
};

export default LocationAndAddress;