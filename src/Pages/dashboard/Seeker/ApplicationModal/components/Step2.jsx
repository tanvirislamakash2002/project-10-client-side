import { Calendar, Clock, DollarSign, Mail, MessageSquare, Phone, Upload } from 'lucide-react';
import React from 'react';

const Step2 = ({ props }) => {
    const {formData, setFormData, listing, messageTemplates } = props
    return (
        <div className="space-y-6">
            {/* Application Details */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Preferred Move-in Date
                        </label>
                        <input
                            type="date"
                            value={formData.moveInDate}
                            onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Clock className="w-4 h-4 inline mr-1" />
                            Lease Duration
                        </label>
                        <select
                            value={formData.leaseDuration}
                            onChange={(e) => setFormData({ ...formData, leaseDuration: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option>1 month</option>
                            <option>3 months</option>
                            <option>6 months</option>
                            <option>1 year</option>
                            <option>Flexible</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <DollarSign className="w-4 h-4 inline mr-1" />
                            Budget Confirmation
                        </label>
                        <input
                            type="number"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-sm text-gray-600 mt-1">Listing price: ${listing.price}/month</p>
                    </div>
                </div>
            </div>

            {/* Personal Message */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                        <MessageSquare className="w-4 h-4 inline mr-1" />
                        Personal Message to Provider
                    </label>
                    <select
                        value={formData.messageTemplate}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                messageTemplate: e.target.value,
                                message: messageTemplates[e.target.value]
                            });
                        }}
                        className="text-sm px-3 py-1 border border-gray-300 rounded-lg"
                    >
                        <option value="professional">Professional</option>
                        <option value="friendly">Friendly</option>
                        <option value="student">Student</option>
                    </select>
                </div>
                <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Introduce yourself and explain why you're interested..."
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>Make it personal and genuine</span>
                    <span>{formData.message.length}/500</span>
                </div>
            </div>

            {/* Contact Preferences */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Preferences</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Contact Method
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: 'in-app', icon: MessageSquare, label: 'In-app Message' },
                                { value: 'email', icon: Mail, label: 'Email' },
                                { value: 'phone', icon: Phone, label: 'Phone' }
                            ].map((method) => (
                                <button
                                    key={method.value}
                                    onClick={() => setFormData({ ...formData, contactMethod: method.value })}
                                    className={`p-4 border-2 rounded-lg transition ${formData.contactMethod === method.value
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <method.icon className={`w-6 h-6 mx-auto mb-2 ${formData.contactMethod === method.value ? 'text-blue-600' : 'text-gray-400'
                                        }`} />
                                    <p className="text-sm font-medium text-gray-900">{method.label}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Availability for Viewings
                        </label>
                        <input
                            type="text"
                            value={formData.availability}
                            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                            placeholder="e.g., Weekday evenings, Weekends anytime"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Optional Questions from Provider */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Provider's Questions</h4>
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Do you have any pets?
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                            <option>No</option>
                            <option>Yes - Cat</option>
                            <option>Yes - Dog</option>
                            <option>Yes - Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Are you a smoker?
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                            <option>No</option>
                            <option>Yes</option>
                            <option>Occasionally</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Document Upload (Optional) */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Upload className="w-4 h-4 inline mr-1" />
                    Supporting Documents (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">ID, proof of income, references (PDF, JPG, PNG)</p>
                </div>
            </div>
        </div>
    );
};

export default Step2;