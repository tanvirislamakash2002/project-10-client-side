import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa6';

const RoomImage = ({props}) => {
    const { removeImage, images, handleImageUpload, errors } = props
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
                Upload Images * (1-5 images, max 5MB each)
            </label>

            {/* Upload Area */}
            <div className={`border-2 border-dashed rounded-xl p-8 text-center mb-4 transition-all ${images.length >= 5
                ? 'border-gray-200 bg-gray-50'
                : errors.images
                    ? 'border-red-300 bg-red-50'
                    : 'border-blue-300 bg-blue-50 hover:border-blue-400'
                }`}>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="imageUpload"
                    disabled={images.length >= 5}
                />
                <label
                    htmlFor="imageUpload"
                    className={`cursor-pointer ${images.length >= 5 ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2 font-medium">
                        {images.length >= 5
                            ? 'Maximum images uploaded'
                            : images.length > 0
                                ? 'Click to add more images'
                                : 'Click to upload images'
                        }
                    </p>
                    <p className="text-sm text-gray-500">PNG, JPG, WEBP up to 5MB each</p>
                </label>
            </div>

            {errors.images && <p className="text-red-500 text-sm mb-4">{errors.images}</p>}

            {/* Image Preview */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                        <div key={image.id} className="relative group">
                            <img
                                src={image.url}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border-2 border-gray-200 group-hover:border-blue-400 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(image.id)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                                <FaTimes className="text-xs" />
                            </button>
                            {index === 0 && (
                                <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                    Main
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RoomImage;