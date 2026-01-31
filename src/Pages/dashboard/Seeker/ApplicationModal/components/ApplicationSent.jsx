import { CheckCircle } from 'lucide-react';
import React from 'react';

const ApplicationSent = ({props}) => {
    const {onClose}=props;
    return (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-lg w-full p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Sent!</h2>
                <p className="text-gray-600 mb-6">
                    Your application has been successfully submitted to the provider.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Provider typically responds within 24 hours</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>You'll receive a notification when they reply</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Check your application status anytime in your dashboard</span>
                        </li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={onClose}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                        View Your Applications
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                        Continue Browsing Listings
                    </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">While you wait, check out similar listings:</p>
                    <div className="grid grid-cols-2 gap-3">
                        {[1, 2].map((i) => (
                            <div key={i} className="border border-gray-200 rounded-lg p-3 hover:border-blue-500 transition cursor-pointer text-left">
                                <div className="text-3xl mb-1">🏘️</div>
                                <p className="text-sm font-semibold text-gray-900">Similar Room {i}</p>
                                <p className="text-xs text-gray-600">Downtown</p>
                                <p className="text-sm font-bold text-green-600 mt-1">$750/mo</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationSent;