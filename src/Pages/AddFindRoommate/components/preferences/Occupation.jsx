import React from 'react';
import { FaBriefcase } from 'react-icons/fa6';

const Occupation = ({props}) => {
    const {register, handleInputChange}=props
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaBriefcase className="inline mr-2 text-green-600" />
                Occupation Preference
            </label>
            <select
                name="preferences.occupation"
                {...register('preferences.occupation',{required:'add the rent'})}
                // onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
                <option value="">Any Occupation</option>
                <option value="Student">Student</option>
                <option value="Working Professional">Working Professional</option>
                <option value="Student or Professional">Student or Professional</option>
                <option value="Remote Worker">Remote Worker</option>
                <option value="Freelancer">Freelancer</option>
            </select>
        </div>
    );
};

export default Occupation;