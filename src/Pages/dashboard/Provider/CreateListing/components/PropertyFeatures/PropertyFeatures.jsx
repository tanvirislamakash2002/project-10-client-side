import React from 'react';

const PropertyFeatures = ({ props }) => {
    const { register, errors, watch } = props;

    // Safe array accessors
    const amenities = watch('amenities') || [];
    const applicationRequirements = watch('applicationRequirements') || [];

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-base-content">Property Features</h3>
            <p className="text-text-muted">Add amenities, room details, and policies.</p>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Bathroom Type */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-base-content">Bathroom Type</span>
                        </label>
                        <select
                            className="select select-bordered w-full focus:select-primary"
                            {...register('bathroomType', { required: 'Bathroom type is required' })}
                        >
                            <option value="">Select bathroom type</option>
                            <option value="Private">Private Bathroom</option>
                            <option value="Shared">Shared Bathroom</option>
                            <option value="Ensuite">Ensuite</option>
                            <option value="Half Bath">Half Bath</option>
                        </select>
                        {errors.bathroomType && (
                            <label className="label">
                                <span className="label-text-alt text-error">{errors.bathroomType.message}</span>
                            </label>
                        )}
                    </div>

                    {/* Furnishing */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-base-content">Furnishing</span>
                        </label>
                        <select
                            className="select select-bordered w-full focus:select-primary"
                            {...register('furnishing', { required: 'Furnishing type is required' })}
                        >
                            <option value="">Select furnishing type</option>
                            <option value="Furnished">Fully Furnished</option>
                            <option value="Semi-Furnished">Semi-Furnished</option>
                            <option value="Unfurnished">Unfurnished</option>
                            <option value="Partially Furnished">Partially Furnished</option>
                        </select>
                        {errors.furnishing && (
                            <label className="label">
                                <span className="label-text-alt text-error">{errors.furnishing.message}</span>
                            </label>
                        )}
                    </div>
                </div>

                {/* Amenities - Categorized */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-base-content">Amenities</span>
                        <span className="label-text-alt text-text-muted">Select available amenities</span>
                    </label>

                    <div className="space-y-6">
                        {/* Essential Utilities */}
                        <div>
                            <h6 className="font-semibold text-base-content mb-3 text-sm">Essential Utilities</h6>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {[
                                    { value: 'WiFi', icon: '📶', category: 'utility' },
                                    { value: 'Air Conditioning', icon: '❄️', category: 'utility' },
                                    { value: 'Heating', icon: '🔥', category: 'utility' },
                                    { value: 'Utilities Included', icon: '💡', category: 'utility' },
                                    { value: 'Cable TV', icon: '📺', category: 'utility' },
                                ].map(({ value, icon }) => (
                                    <label key={value} className="cursor-pointer flex items-center gap-2 p-2 rounded border border-base-300 hover:bg-base-200 transition-colors text-sm">
                                        <input type="checkbox" value={value} className="checkbox checkbox-primary checkbox-sm" {...register('amenities')} />
                                        <span>{icon} {value}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Kitchen & Laundry */}
                        <div>
                            <h6 className="font-semibold text-base-content mb-3 text-sm">Kitchen & Laundry</h6>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {[
                                    { value: 'Dishwasher', icon: '🍽️', category: 'kitchen' },
                                    { value: 'Laundry In-Unit', icon: '🧺', category: 'laundry' },
                                    { value: 'Laundry On-Site', icon: '🏢', category: 'laundry' },
                                    { value: 'Furnished Common Areas', icon: '🛋️', category: 'common' },
                                ].map(({ value, icon }) => (
                                    <label key={value} className="cursor-pointer flex items-center gap-2 p-2 rounded border border-base-300 hover:bg-base-200 transition-colors text-sm">
                                        <input type="checkbox" value={value} className="checkbox checkbox-primary checkbox-sm" {...register('amenities')} />
                                        <span>{icon} {value}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Outdoor & Parking */}
                        <div>
                            <h6 className="font-semibold text-base-content mb-3 text-sm">Outdoor & Parking</h6>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {[
                                    { value: 'Parking', icon: '🅿️', category: 'parking' },
                                    { value: 'Balcony/Patio', icon: '🌆', category: 'outdoor' },
                                    { value: 'Yard/Garden', icon: '🌳', category: 'outdoor' },
                                    { value: 'Roof Access', icon: '🏙️', category: 'outdoor' },
                                    { value: 'Bike Storage', icon: '🚲', category: 'storage' },
                                    { value: 'Pet Area', icon: '🐕', category: 'pet' },
                                ].map(({ value, icon }) => (
                                    <label key={value} className="cursor-pointer flex items-center gap-2 p-2 rounded border border-base-300 hover:bg-base-200 transition-colors text-sm">
                                        <input type="checkbox" value={value} className="checkbox checkbox-primary checkbox-sm" {...register('amenities')} />
                                        <span>{icon} {value}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Building Features */}
                        <div>
                            <h6 className="font-semibold text-base-content mb-3 text-sm">Building Features</h6>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {[
                                    { value: 'Elevator', icon: '🛗', category: 'building' },
                                    { value: 'Gym/Fitness Center', icon: '💪', category: 'facility' },
                                    { value: 'Pool', icon: '🏊', category: 'facility' },
                                    { value: 'Security System', icon: '🔒', category: 'security' },
                                    { value: 'Concierge', icon: '💼', category: 'service' },
                                    { value: 'Wheelchair Accessible', icon: '♿', category: 'accessibility' },
                                    { value: 'Storage Space', icon: '📦', category: 'storage' },
                                ].map(({ value, icon }) => (
                                    <label key={value} className="cursor-pointer flex items-center gap-2 p-2 rounded border border-base-300 hover:bg-base-200 transition-colors text-sm">
                                        <input type="checkbox" value={value} className="checkbox checkbox-primary checkbox-sm" {...register('amenities')} />
                                        <span>{icon} {value}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-3">
                        <label className="label">
                            <span className="label-text-alt text-text-muted">
                                Selected: {amenities.length} amenities
                            </span>
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pet Policy */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-base-content">Pet Policy</span>
                        </label>
                        <select
                            className="select select-bordered w-full focus:select-primary"
                            {...register('petPolicy', { required: 'Pet policy is required' })}
                        >
                            <option value="">Select pet policy</option>
                            <option value="No Pets">No Pets Allowed</option>
                            <option value="Cats Only">Cats Only</option>
                            <option value="Small Dogs Only">Small Dogs Only</option>
                            <option value="Dogs Allowed">Dogs Allowed</option>
                            <option value="All Pets Allowed">All Pets Allowed</option>
                            <option value="Case by Case">Case by Case</option>
                        </select>
                        {errors.petPolicy && (
                            <label className="label">
                                <span className="label-text-alt text-error">{errors.petPolicy.message}</span>
                            </label>
                        )}
                    </div>

                    {/* Smoking Policy */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-base-content">Smoking Policy</span>
                        </label>
                        <select
                            className="select select-bordered w-full focus:select-primary"
                            {...register('smokingPolicy', { required: 'Smoking policy is required' })}
                        >
                            <option value="">Select smoking policy</option>
                            <option value="Non-Smoking">Non-Smoking Only</option>
                            <option value="Smoking Allowed">Smoking Allowed</option>
                            <option value="Outdoor Smoking Only">Outdoor Smoking Only</option>
                            <option value="Balcony Smoking Only">Balcony Smoking Only</option>
                        </select>
                        {errors.smokingPolicy && (
                            <label className="label">
                                <span className="label-text-alt text-error">{errors.smokingPolicy.message}</span>
                            </label>
                        )}
                    </div>
                </div>

{/* Application Requirements - Categorized */}
<div className="form-control">
  <label className="label">
    <span className="label-text font-semibold text-base-content">Application Requirements</span>
    <span className="label-text-alt text-text-muted">Select what applicants need to provide</span>
  </label>

  <div className="space-y-4">
    {/* Documentation */}
    <div>
      <h6 className="font-semibold text-base-content mb-3 text-sm">Documentation & Verification</h6>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {[
          { value: 'ID Verification', description: 'Government-issued photo ID' },
          { value: 'Income Proof', description: 'Pay stubs or employment letter' },
          { value: 'Employment Verification', description: 'Job confirmation' },
          { value: 'Credit Check', description: 'Credit history review' },
          { value: 'Rental History', description: 'Previous landlord references' },
          { value: 'References', description: 'Personal or professional references' },
          { value: 'Background Check', description: 'Criminal history check' },
        ].map(({ value, description }) => (
          <label key={value} className="cursor-pointer flex items-start gap-3 p-3 rounded-lg border border-base-300 hover:bg-base-200 transition-colors">
            <input
              type="checkbox"
              value={value}
              className="checkbox checkbox-primary checkbox-sm mt-1"
              {...register('applicationRequirements')}
            />
            <div className="flex-1">
              <div className="font-medium text-base-content text-sm">{value}</div>
              <div className="text-text-muted text-xs">{description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>

    {/* Payments & Process */}
    <div>
      <h6 className="font-semibold text-base-content mb-3 text-sm">Payments & Process</h6>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {[
          { value: 'Security Deposit', description: 'Refundable deposit required' },
          { value: 'First Month Rent', description: 'Rent payment upfront' },
          { value: 'Application Fee', description: 'Non-refundable fee' },
          { value: 'Interview Required', description: 'In-person or video meeting' },
          { value: 'Co-signer Required', description: 'Guarantor needed' },
        ].map(({ value, description }) => (
          <label key={value} className="cursor-pointer flex items-start gap-3 p-3 rounded-lg border border-base-300 hover:bg-base-200 transition-colors">
            <input
              type="checkbox"
              value={value}
              className="checkbox checkbox-primary checkbox-sm mt-1"
              {...register('applicationRequirements')}
            />
            <div className="flex-1">
              <div className="font-medium text-base-content text-sm">{value}</div>
              <div className="text-text-muted text-xs">{description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  </div>

  <div className="mt-3">
    <label className="label">
      <span className="label-text-alt text-text-muted">
        Selected: {applicationRequirements.length} requirements
      </span>
    </label>
  </div>
</div>

                {/* Features Summary */}
                <div className="bg-base-200 rounded-lg p-4">
                    <h4 className="font-semibold text-base-content mb-3">Property Features Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-text-muted">Bathroom:</span>
                            <span className="ml-2 text-base-content">{watch('bathroomType') || 'Not set'}</span>
                        </div>
                        <div>
                            <span className="text-text-muted">Furnishing:</span>
                            <span className="ml-2 text-base-content">{watch('furnishing') || 'Not set'}</span>
                        </div>
                        <div>
                            <span className="text-text-muted">Pet Policy:</span>
                            <span className="ml-2 text-base-content">{watch('petPolicy') || 'Not set'}</span>
                        </div>
                        <div>
                            <span className="text-text-muted">Smoking Policy:</span>
                            <span className="ml-2 text-base-content">{watch('smokingPolicy') || 'Not set'}</span>
                        </div>
                        <div className="md:col-span-2">
                            <span className="text-text-muted">Amenities:</span>
                            <span className="ml-2 text-base-content">
                                {amenities.slice(0, 3).join(', ') || 'None selected'}
                                {amenities.length > 3 && ` and ${amenities.length - 3} more...`}
                            </span>
                        </div>
                        <div className="md:col-span-2">
                            <span className="text-text-muted">Requirements:</span>
                            <span className="ml-2 text-base-content">
                                {applicationRequirements.slice(0, 3).join(', ') || 'None selected'}
                                {applicationRequirements.length > 3 && ` and ${applicationRequirements.length - 3} more...`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyFeatures;