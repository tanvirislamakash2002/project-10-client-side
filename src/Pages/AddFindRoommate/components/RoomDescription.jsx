import React from 'react';

const RoomDescription = ({ props }) => {
    const { register, handleInputChange, errors } = props
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                Property Description *
            </label>
            <textarea
                name="description"
                {...register('description', {
                    required: 'give a description', minLength: {
                        value: 20,
                        message: 'Password must be at least 6 characters',
                    }
                })}
                // onChange={handleInputChange}
                rows="6"
                placeholder="Describe your space, the living situation, what you're looking for in a roommate, nearby amenities, house rules, etc. Be detailed to attract the right match!"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
            />
            <div className="flex justify-between items-center mt-2">
                {/* <div className={`text-sm ${formData.description.length < 50 ? 'text-red-500' : 'text-gray-500'}`}>
                    {formData.description.length}/500 characters (minimum 50)
                </div> */}
            </div>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>
    );
};

export default RoomDescription;