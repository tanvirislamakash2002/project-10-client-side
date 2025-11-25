import React from 'react';
import { FaMale } from 'react-icons/fa';

const GenderPreference = ({ props }) => {
    const { register, handleInputChange, errors } = props
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaMale className="inline mr-2 text-blue-600" />
                Gender Preference *
            </label>
            <select
                name="preferences.gender"
                {...register('preferences.gender',{required:'add the rent'})}
                // onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.gender ? 'border-red-500' : 'border-gray-300'
                    }`}
            >
                <option value="">Select gender preference</option>
                <option value="Any">Any Gender</option>
                <option value="Male">Male Only</option>
                <option value="Female">Female Only</option>
                <option value="Non-binary">Non-binary</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
        </div>
    );
};

export default GenderPreference;