import React from 'react';
import { FaDollarSign } from 'react-icons/fa';

const RoomRent = ({props}) => {
    const {register, handleInputChange, errors}=props
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaDollarSign className="inline mr-2 text-green-600" />
                Monthly Rent *
            </label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                    type="number"
                    name="rent"
                    {...register('rent',{required:'add the rent'})}
                    // onChange={handleInputChange}
                    placeholder="950"
                    className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.rent ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
            </div>
            {errors.rent && <p className="text-red-500 text-sm mt-1">{errors.rent.message}</p>}
        </div>
    );
};

export default RoomRent;