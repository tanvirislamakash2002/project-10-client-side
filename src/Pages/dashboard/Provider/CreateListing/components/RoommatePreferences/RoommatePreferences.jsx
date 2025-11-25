import React from 'react';

const RoommatePreferences = ({props}) => {
    const {register,errors,watch}=props
    return (
        <div className="space-y-6">
  <h3 className="text-2xl font-bold text-base-content">Roommate Preferences</h3>
  <p className="text-text-muted">What kind of roommate are you looking for?</p>
  
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Current Occupants */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-base-content">Current Occupants</span>
        </label>
        <select 
          className="select select-bordered w-full focus:select-primary"
          {...register('currentOccupants', { 
            required: 'Current occupants is required',
            validate: value => value <= watch('totalRoommates') || 'Cannot exceed total roommates'
          })}
        >
          <option value="">Select number</option>
          <option value="1">1 person</option>
          <option value="2">2 people</option>
          <option value="3">3 people</option>
          <option value="4">4 people</option>
          <option value="5">5+ people</option>
        </select>
        {errors.currentOccupants && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.currentOccupants.message}</span>
          </label>
        )}
      </div>

      {/* Total Roommates */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-base-content">Total Roommates</span>
        </label>
        <select 
          className="select select-bordered w-full focus:select-primary"
          {...register('totalRoommates', { 
            required: 'Total roommates is required',
            validate: value => value >= watch('currentOccupants') || 'Must be at least current occupants'
          })}
        >
          <option value="">Select number</option>
          <option value="2">2 people</option>
          <option value="3">3 people</option>
          <option value="4">4 people</option>
          <option value="5">5 people</option>
          <option value="6">6+ people</option>
        </select>
        {errors.totalRoommates && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.totalRoommates.message}</span>
          </label>
        )}
      </div>
    </div>

    {/* Preferred Gender */}
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold text-base-content">Preferred Gender</span>
      </label>
      <div className="flex flex-wrap gap-4">
        {['No Preference', 'Male', 'Female', 'Non-Binary', 'Any'].map((gender) => (
          <label key={gender} className="cursor-pointer label justify-start gap-3">
            <input
              type="radio"
              value={gender}
              className="radio radio-primary"
              {...register('preferredGender', { required: 'Please select a gender preference' })}
            />
            <span className="label-text text-base-content">{gender}</span>
          </label>
        ))}
      </div>
      {errors.preferredGender && (
        <label className="label">
          <span className="label-text-alt text-error">{errors.preferredGender.message}</span>
        </label>
      )}
    </div>

    {/* Preferred Age Range */}
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold text-base-content">Preferred Age Range</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="label-text text-base-content">Minimum Age</span>
          </label>
          <div className="join">
            <input
              type="number"
              min="18"
              max="80"
              placeholder="18"
              className="input input-bordered join-item w-full focus:input-primary"
              {...register('preferredAgeRange.min', { 
                required: 'Minimum age is required',
                min: { value: 18, message: 'Minimum age is 18' },
                validate: value => value <= watch('preferredAgeRange.max') || 'Must be less than maximum age'
              })}
            />
            <span className="join-item bg-base-300 px-4 flex items-center text-text-muted">years</span>
          </div>
        </div>
        
        <div>
          <label className="label">
            <span className="label-text text-base-content">Maximum Age</span>
          </label>
          <div className="join">
            <input
              type="number"
              min="18"
              max="80"
              placeholder="35"
              className="input input-bordered join-item w-full focus:input-primary"
              {...register('preferredAgeRange.max', { 
                required: 'Maximum age is required',
                max: { value: 80, message: 'Maximum age is 80' },
                validate: value => value >= watch('preferredAgeRange.min') || 'Must be greater than minimum age'
              })}
            />
            <span className="join-item bg-base-300 px-4 flex items-center text-text-muted">years</span>
          </div>
        </div>
      </div>
      {(errors.preferredAgeRange?.min || errors.preferredAgeRange?.max) && (
        <label className="label">
          <span className="label-text-alt text-error">
            {errors.preferredAgeRange?.min?.message || errors.preferredAgeRange?.max?.message}
          </span>
        </label>
      )}
    </div>

    {/* Occupation Preference */}
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold text-base-content">Occupation Preference</span>
      </label>
      <select 
        className="select select-bordered w-full focus:select-primary"
        {...register('occupationPreference', { required: 'Occupation preference is required' })}
      >
        <option value="">Select preferred occupation</option>
        <option value="No Preference">No Preference</option>
        <option value="Student">Student</option>
        <option value="Working Professional">Working Professional</option>
        <option value="Remote Worker">Remote Worker</option>
        <option value="Graduate Student">Graduate Student</option>
        <option value="Intern">Intern</option>
        <option value="Artist/Creative">Artist/Creative</option>
        <option value="Healthcare Worker">Healthcare Worker</option>
        <option value="Teacher/Educator">Teacher/Educator</option>
      </select>
      {errors.occupationPreference && (
        <label className="label">
          <span className="label-text-alt text-error">{errors.occupationPreference.message}</span>
        </label>
      )}
    </div>

    {/* Lifestyle Tags */}
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold text-base-content">Lifestyle Preferences</span>
        <span className="label-text-alt text-text-muted">Select all that apply</span>
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          'Non-Smoking', 'Pet-Friendly', 'Quiet', 'Social/Outgoing', 
          'Clean/Tidy', 'Night Owl', 'Early Riser', 'Vegetarian/Vegan',
          'LGBTQ+ Friendly', '420 Friendly', 'Music Lover', 'Gamer',
          'Fitness Oriented', 'Foodie', 'Traveler', 'Book Lover',
          'Minimalist', 'Plant Lover', 'Movie Buff', 'Sports Fan'
        ].map((tag) => (
          <label key={tag} className="cursor-pointer flex items-center gap-3 p-3 rounded-lg border border-base-300 hover:bg-base-200 transition-colors">
            <input
              type="checkbox"
              value={tag}
              className="checkbox checkbox-primary checkbox-sm"
              {...register('lifestyleTags')}
            />
            <span className="text-sm text-base-content">{tag}</span>
          </label>
        ))}
      </div>
      
      <div className="mt-3">
        <label className="label">
          <span className="label-text-alt text-text-muted">
            Selected: {watch('lifestyleTags')?.length || 0} tags
          </span>
        </label>
      </div>
    </div>

    {/* Preferences Summary */}
    <div className="bg-base-200 rounded-lg p-4">
      <h4 className="font-semibold text-base-content mb-3">Preferences Summary</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-text-muted">Household:</span>
          <span className="ml-2 text-base-content">
            {watch('currentOccupants') || '?'} of {watch('totalRoommates') || '?'} spots filled
          </span>
        </div>
        <div>
          <span className="text-text-muted">Gender:</span>
          <span className="ml-2 text-base-content">{watch('preferredGender') || 'Not set'}</span>
        </div>
        <div>
          <span className="text-text-muted">Age Range:</span>
          <span className="ml-2 text-base-content">
            {watch('preferredAgeRange.min') || '?'} - {watch('preferredAgeRange.max') || '?'} years
          </span>
        </div>
        <div>
          <span className="text-text-muted">Occupation:</span>
          <span className="ml-2 text-base-content">{watch('occupationPreference') || 'Not set'}</span>
        </div>
      </div>
    </div>
  </div>
</div>
    );
};

export default RoommatePreferences;