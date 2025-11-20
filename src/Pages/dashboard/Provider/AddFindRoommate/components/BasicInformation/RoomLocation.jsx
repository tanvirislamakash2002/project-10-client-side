import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const RoomLocation = ({props}) => {
    const {register, handleInputChange, errors}=props
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">
                <FaMapMarkerAlt className="inline mr-2 text-blue-600 dark:text-blue-400" />
                Location *
            </label>
            <input
                type="text"
                name="location"
                {...register('location',{required:'Insert The Location'})}
                // onChange={handleInputChange}
                placeholder="e.g., Downtown Seattle, WA"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.location ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                    } dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-400`}
            />
            {errors.location && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.location.message}</p>}
        </div>
    );
};

export default RoomLocation;