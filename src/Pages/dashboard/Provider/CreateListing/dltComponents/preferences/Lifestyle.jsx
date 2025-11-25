import React from 'react';
import { FaCoffee } from 'react-icons/fa';

const Lifestyle = ({ props }) => {
    const { register, handleInputChange } = props
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaCoffee className="inline mr-2 text-orange-600" />
                Lifestyle Preference
            </label>
            <select
                name="preferences.lifestyle"
                {...register('preferences.lifestyle',{required:'add the rent'})}
                // onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
                <option value="">Any Lifestyle</option>
                <option value="Quiet & Reserved">Quiet & Reserved</option>
                <option value="Social & Outgoing">Social & Outgoing</option>
                <option value="Clean & Organized">Clean & Organized</option>
                <option value="Party-friendly">Party-friendly</option>
                <option value="Fitness-oriented">Fitness-oriented</option>
                <option value="Studious">Studious</option>
            </select>
        </div>
    );
};

export default Lifestyle;