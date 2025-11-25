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

                {/* Amenities */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-base-content">Amenities</span>
                        <span className="label-text-alt text-text-muted">Select all available amenities</span>
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                            'WiFi', 'Laundry In-Unit', 'Laundry On-Site', 'Parking', 'Gym/Fitness Center',
                            'Pool', 'Air Conditioning', 'Heating', 'Dishwasher', 'Balcony/Patio',
                            'Yard/Garden', 'Storage Space', 'Elevator', 'Wheelchair Accessible',
                            'Security System', 'Concierge', 'Roof Access', 'Bike Storage',
                            'Pet Area', 'Furnished Common Areas', 'Utilities Included', 'Cable TV'
                        ].map((amenity) => (
                            <label key={amenity} className="cursor-pointer flex items-center gap-3 p-3 rounded-lg border border-base-300 hover:bg-base-200 transition-colors">
                                <input
                                    type="checkbox"
                                    value={amenity}
                                    className="checkbox checkbox-primary checkbox-sm"
                                    {...register('amenities')}
                                />
                                <span className="text-sm text-base-content">{amenity}</span>
                            </label>
                        ))}
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

                {/* Application Requirements */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-base-content">Application Requirements</span>
                        <span className="label-text-alt text-text-muted">What documents do applicants need?</span>
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                            'ID Verification', 'Income Proof', 'Credit Check', 'Rental History',
                            'Employment Verification', 'References', 'Background Check',
                            'Security Deposit', 'First Month Rent', 'Application Fee',
                            'Interview Required', 'Co-signer Required'
                        ].map((requirement) => (
                            <label key={requirement} className="cursor-pointer flex items-center gap-3 p-3 rounded-lg border border-base-300 hover:bg-base-200 transition-colors">
                                <input
                                    type="checkbox"
                                    value={requirement}
                                    className="checkbox checkbox-primary checkbox-sm"
                                    {...register('applicationRequirements')}
                                />
                                <span className="text-sm text-base-content">{requirement}</span>
                            </label>
                        ))}
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