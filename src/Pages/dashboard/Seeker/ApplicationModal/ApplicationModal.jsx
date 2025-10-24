import React, { useState } from 'react';
import { X, MapPin, DollarSign, Calendar, Clock, MessageSquare, Phone, Mail, CheckCircle, AlertCircle, Eye, ChevronDown, Upload, Star, Award, FileText, User, Home, TrendingUp, Sparkles } from 'lucide-react';

export default function ApplicationModal() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    moveInDate: '2025-11-01',
    leaseDuration: '6 months',
    budget: 800,
    message: "Hi! I'm very interested in your private room because it matches my budget and preferred location. I'm a working professional looking for a quiet, respectful living environment. I'd love to schedule a viewing at your earliest convenience.",
    contactMethod: 'in-app',
    availability: '',
    messageTemplate: 'professional'
  });

  // Mock listing data
  const listing = {
    title: "Spacious Room in Shared House",
    location: "Downtown, 2.3 miles away",
    price: 800,
    image: "🏠",
    roomType: "Private Room"
  };

  // Mock user profile
  const userProfile = {
    name: "Alex Johnson",
    age: 28,
    occupation: "Software Engineer",
    photo: "👤",
    verified: true,
    references: true,
    compatibilityScore: 92
  };

  const messageTemplates = {
    professional: "Hi! I'm very interested in your private room because it matches my budget and preferred location. I'm a working professional looking for a quiet, respectful living environment. I'd love to schedule a viewing at your earliest convenience.",
    friendly: "Hey there! Your room looks amazing and I think we'd be a great match as roommates! I'm clean, respectful, and love creating a friendly home atmosphere. Would love to chat more about the space!",
    student: "Hello! I'm a graduate student looking for a peaceful place to live while I complete my studies. Your listing caught my eye because of the location and amenities. I'm responsible, quiet, and always pay rent on time. Hope to hear from you soon!"
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 2000);
  };

  const totalSteps = 3;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
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
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              View Your Applications
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
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
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full my-8">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-lg p-6 z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Apply to {listing.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {listing.location}
                </span>
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  ${listing.price}/month
                </span>
              </div>
            </div>
            <button 
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Listing Preview */}
          <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-4xl">
              {listing.image}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{listing.title}</h3>
              <p className="text-sm text-gray-600">{listing.roomType}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">${listing.price}</p>
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

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {step === 1 && (
            <div className="space-y-6">
              {/* Pre-filled Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-3xl">
                      {userProfile.photo}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900">{userProfile.name}</h4>
                      <p className="text-gray-600">{userProfile.age} years old • {userProfile.occupation}</p>
                      <div className="flex gap-2 mt-2">
                        {userProfile.verified && (
                          <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                            <CheckCircle className="w-3 h-3" />
                            Identity Verified
                          </span>
                        )}
                        {userProfile.references && (
                          <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                            <FileText className="w-3 h-3" />
                            References Available
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-3xl font-bold text-blue-600">{userProfile.compatibilityScore}%</p>
                        <p className="text-xs text-gray-600 mt-1">Match Score</p>
                      </div>
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm font-semibold hover:underline">
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Premium Badge (Optional) */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-yellow-600" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      Priority Application
                      <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold">PRO</span>
                    </h4>
                    <p className="text-sm text-gray-600">Your application will be highlighted and shown first to the provider</p>
                  </div>
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
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
                      onChange={(e) => setFormData({...formData, moveInDate: e.target.value})}
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
                      onChange={(e) => setFormData({...formData, leaseDuration: e.target.value})}
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
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
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
                          onClick={() => setFormData({...formData, contactMethod: method.value})}
                          className={`p-4 border-2 rounded-lg transition ${
                            formData.contactMethod === method.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <method.icon className={`w-6 h-6 mx-auto mb-2 ${
                            formData.contactMethod === method.value ? 'text-blue-600' : 'text-gray-400'
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
                      onChange={(e) => setFormData({...formData, availability: e.target.value})}
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
          )}

          {step === 3 && (
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
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-3xl">
                          {userProfile.photo}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-lg font-bold text-gray-900">{userProfile.name}</h4>
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
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 rounded-b-lg p-6">
          <div className="flex items-center justify-between gap-4">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Back
              </button>
            )}
            
            <div className="flex-1"></div>

            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            {step < totalSteps ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}