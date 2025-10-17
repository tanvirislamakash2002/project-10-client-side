import React from 'react';

const RoomTitle = ({ props }) => {

  const { register, handleInputChange, errors } = props
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Post Title *
      </label>
      <input
        type="text"
        name="title"
        {...register('title',{required:'Insert the title'})}
        // onChange={handleInputChange}
        placeholder="e.g., Spacious Room in Modern Downtown Apartment"
        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
      />
      {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
    </div>
  );
};

export default RoomTitle;