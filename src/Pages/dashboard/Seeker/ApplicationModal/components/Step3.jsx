import { AlertCircle, CheckCircle, Eye, TrendingUp } from 'lucide-react';
import React from 'react';

const Step3 = ({ props }) => {
    const { setShowPreview, showPreview, userProfile, userInfo, formData } = props;
    console.log(userInfo);
    return (
        <div className="space-y-6">
            {/* Application Preview */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Application Preview</h3>
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-2 text-blue-600 text-sm font-semibold hover:underline"
                    >
                        <Eye className="w-4 h-4" />
                        {showPreview ? 'Hide' : 'Show'} Provider View
                    </button>
                </div>

                {showPreview && (
                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
                        <p className="text-sm text-gray-600 mb-4">This is how your application appears to the provider:</p>
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 p-1 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-3xl">
                                    <img className='w-full h-full object-cover rounded-full' src={userInfo.photoURL} alt="" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-lg font-bold text-gray-900">{userInfo.name}</h4>
                                        {userProfile.verified && (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        )}
                                    </div>
                                    <p className="text-gray-600 text-sm">{userProfile.age} years old • {userProfile.occupation}</p>
                                    <div className="flex gap-2 mt-2">
                                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                                            {userProfile.compatibilityScore}% Match
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Move-in Date:</span>
                                    <span className="font-semibold">{formData.moveInDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Lease Duration:</span>
                                    <span className="font-semibold">{formData.leaseDuration}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Budget:</span>
                                    <span className="font-semibold">${formData.budget}/month</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-sm font-semibold text-gray-900 mb-2">Message:</p>
                                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                    {formData.message}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-600 font-medium mb-1">Your Details</p>
                        <p className="text-xs text-blue-800">Move-in: {formData.moveInDate}</p>
                        <p className="text-xs text-blue-800">Duration: {formData.leaseDuration}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm text-green-600 font-medium mb-1">Budget Match</p>
                        <p className="text-2xl font-bold text-green-700">${formData.budget}</p>
                    </div>
                </div>

                {/* Application Analytics */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-purple-600" />
                        <div>
                            <h4 className="font-semibold text-gray-900">Application Insights</h4>
                            <p className="text-sm text-gray-600">This listing has 8 applicants. Your compatibility score puts you in the top 20%!</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Terms & Privacy */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-700">
                        <p className="mb-2">
                            By applying, you agree to share your profile information with the provider.
                            Your contact details will only be shared if they express interest.
                        </p>
                        <a href="#" className="text-blue-600 hover:underline">Read Privacy Policy</a>
                        {' • '}
                        <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                    </div>
                </div>
            </div>

            {/* Auto-save indicator */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Draft auto-saved</span>
            </div>
        </div>
    );
};

export default Step3;