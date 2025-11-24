import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const RoomAvailability = ({ props }) => {
    const { register, handleInputChange, errors } = props

    return (
<div>
    <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">
        <FaCalendarAlt className="inline mr-2 text-purple-600 dark:text-purple-400" />
        Available From *
    </label>
    <input
        type="date"
        name="availability"
        {...register('availableFrom',{required:'add the rent'})}
        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-400 ${
            errors.availability ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
        }`}
    />
    {errors.availability && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.availability}</p>}
</div>
    );
};

export default RoomAvailability;