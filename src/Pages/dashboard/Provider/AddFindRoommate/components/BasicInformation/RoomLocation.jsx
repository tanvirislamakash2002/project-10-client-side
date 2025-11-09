import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const RoomLocation = ({props}) => {
    const {register, handleInputChange, errors}=props
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaMapMarkerAlt className="inline mr-2 text-blue-600" />
                Location *
            </label>
            <input
                type="text"
                name="location"
                {...register('location',{required:'Insert The Location'})}
                // onChange={handleInputChange}
                placeholder="e.g., Downtown Seattle, WA"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
        </div>
    );
};

export default RoomLocation;