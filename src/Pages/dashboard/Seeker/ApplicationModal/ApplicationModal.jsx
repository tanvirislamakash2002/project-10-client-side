import React, { useState } from 'react';
import { X, MapPin, DollarSign, Calendar, Clock, MessageSquare, Phone, Mail, CheckCircle, AlertCircle, Eye, ChevronDown, Upload, Star, Award, FileText, User, Home, TrendingUp, Sparkles } from 'lucide-react';
import useUser from '../../../../../hooks/useUser';
import Step1 from './components/step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Footer from './components/Footer';
import Header from './components/Header';

export default function ApplicationModal({ onClose, onSuccess, listingDetails }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const userInfo = useUser()
  const handleClose = () => {
    if (onClose) onClose();
  };
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
      if (onSuccess) onSuccess()
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
            <button
              onClick={handleClose}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              View Your Applications
            </button>
            <button
              onClick={handleClose}
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
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full my-8">
        {/* Header */}
        <Header props={{ listingDetails, handleClose, step, totalSteps }} />

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {step === 1 && (
            <Step1 props={{ userInfo, userProfile }} />
          )}

          {step === 2 && (
            <Step2 props={{ formData, setFormData, listing, messageTemplates }} />
          )}

          {step === 3 && (
            <Step3 props={{ setShowPreview, showPreview, userProfile, formData }} />
          )}
        </div>

        {/* Footer */}
        <Footer props={{ step, setStep, totalSteps, handleClose, handleSubmit, isSubmitting }} />
      </div>
    </div>
  );
}