import { DollarSign, MapPin, X } from 'lucide-react';
import React from 'react';

const Header = ({props}) => {
    const {listingDetails, onClose, step, totalSteps}=props;
    return (
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-lg p-6 z-10">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Apply to {listingDetails?.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {listingDetails?.address?.street}
                        </span>
                        <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            ${listingDetails?.pricing?.rent}/month
                        </span>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                    <X className="w-6 h-6 text-gray-600" />
                </button>
            </div>

            {/* Listing Preview */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-4xl">
                    <img className='w-full h-full object-cover' src={listingDetails?.images[0]} />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{listingDetails?.title}</h3>
                    <p className="text-sm text-gray-600">{listingDetails?.roomType}</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">${listingDetails?.pricing?.rent}</p>
                    <p className="text-xs text-gray-600">per month</p>
                </div>
            </div>

            {/* Progress Indicator */}
            <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                {s}
                            </div>
                            {s < totalSteps && (
                                <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                    <span>Your Info</span>
                    <span>Details</span>
                    <span>Review</span>
                </div>
            </div>
        </div>
    );
};

export default Header;