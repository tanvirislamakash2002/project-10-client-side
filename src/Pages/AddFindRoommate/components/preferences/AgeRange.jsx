import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const AgeRange = ({props}) => {
    const {register, handleInputChange}=props
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaCalendarAlt className="inline mr-2 text-purple-600" />
                Age Range
            </label>
            <select
                name="preferences.ageRange"
                {...register('preferences.ageRange',{required:'add the rent'})}
                // onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
                <option value="">Any Age</option>
                <option value="18-25">18-25 years</option>
                <option value="22-30">22-30 years</option>
                <option value="25-35">25-35 years</option>
                <option value="30-40">30-40 years</option>
                <option value="35+">35+ years</option>
            </select>
        </div>
    );
};

export default AgeRange;