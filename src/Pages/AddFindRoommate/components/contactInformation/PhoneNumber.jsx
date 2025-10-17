import React from 'react';

const PhoneNumber = ({props}) => {
    const { register, handleInputChange, errors } = props;
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
            </label>
            <input
                type="tel"
                name="poster.phone"
                {...register('poster.phone',{required:'add the rent'})}
                // onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
    );
};

export default PhoneNumber;