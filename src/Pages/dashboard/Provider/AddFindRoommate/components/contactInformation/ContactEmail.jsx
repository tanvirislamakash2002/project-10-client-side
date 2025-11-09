import React from 'react';

const ContactEmail = ({ props }) => {
    const { register, handleInputChange, errors } = props;

    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
            </label>
            <input
                type="tel"
                name="poster.phone"
                {...register('poster.phone',{required:'add the rent'})}
                // onChange={handleInputChange}
                placeholder="Enter your Email"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
    );
};

export default ContactEmail;