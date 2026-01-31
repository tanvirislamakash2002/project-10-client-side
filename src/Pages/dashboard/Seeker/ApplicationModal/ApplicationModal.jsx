import React, { useState } from 'react';
import { X, MapPin, DollarSign, Calendar, Clock, MessageSquare, Phone, Mail, CheckCircle, AlertCircle, Eye, ChevronDown, Upload, Star, Award, FileText, User, Home, TrendingUp, Sparkles } from 'lucide-react';
import useUser from '../../../../../hooks/useUser';
import Step1 from './components/step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Footer from './components/Footer';
import Header from './components/Header';
import ApplicationSent from './components/ApplicationSent';

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
      <ApplicationSent props={{handleClose}}></ApplicationSent>
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