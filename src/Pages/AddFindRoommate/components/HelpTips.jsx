import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';

const HelpTips = () => {
    return (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
            <h4 className="font-bold text-blue-800 mb-3 flex items-center">
                <FaShieldAlt className="mr-2" />
                Tips for a Successful Post
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="text-sm text-blue-700 space-y-2">
                    <li>• Use clear, well-lit photos showing the room and common areas</li>
                    <li>• Write a detailed description (at least 50 characters)</li>
                    <li>• Be honest about your lifestyle and house rules</li>
                </ul>
                <ul className="text-sm text-blue-700 space-y-2">
                    <li>• Mention nearby amenities and transportation</li>
                    <li>• Set realistic expectations for cleanliness and guests</li>
                    <li>• Respond promptly to interested applicants</li>
                </ul>
            </div>
        </div>
    );
};

export default HelpTips;