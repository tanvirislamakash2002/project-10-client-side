import React, { useEffect, useState } from 'react';
import useUser from '../../../../../hooks/useUser';
import Step1 from './components/step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Footer from './components/Footer';
import Header from './components/Header';
import ApplicationSent from './components/ApplicationSent';
import { useForm } from 'react-hook-form';

const ApplicationModal = ({ onClose, onSuccess, listingDetails }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const userInfo = useUser()


  // const [formData, setFormData] = useState({
  //   moveInDate: '2025-11-01',
  //   leaseDuration: '6 months',
  //   budget: 800,
  //   message: "Hi! I'm very interested in your private room because it matches my budget and preferred location. I'm a working professional looking for a quiet, respectful living environment. I'd love to schedule a viewing at your earliest convenience.",
  //   contactMethod: 'in-app',
  //   availability: '',
  //   messageTemplate: 'professional'
  // });

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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      moveInDate: "2026-11-01",
      leaseDuration: '5 months',
      budget: listing?.price,
      message: 'Hi, there! Your room looks amazing',
      contactMethod: 'in-app',
      availability: '',
      messageTemplate: messageTemplates?.professional,
      pets: 'No',
      smoker: 'No',
      documents: []

    },
    mode: 'onChange'
  })

  const formData = watch()

  useEffect(() => {
    const template = getValues('messageTemplate');
    setValue('message', messageTemplates[template]);
  }, [watch('messageTemplate')])

  const onSubmit = (data) => {
    setIsSubmitting(true);
    console.log('330', data);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      if (onSuccess) onSuccess()
    }, 2000);
  };

  const totalSteps = 3;

  if (showSuccess) {
    return (
      <ApplicationSent props={{ onClose }}></ApplicationSent>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full my-8 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <Header props={{ listingDetails, onClose, step, totalSteps }} />

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {step === 1 && (
            <Step1 props={{ userInfo, userProfile }} />
          )}

          {step === 2 && (
            <Step2 props={{
              register,
              errors,
              watch,
              setValue,
              listing,
              messageTemplates
            }} />
          )}

          {step === 3 && (
            <Step3 props={{
              setShowPreview,
              showPreview,
              userProfile,
              formData: watch()
            }} />
          )}
        </div>

        {/* Footer */}
        <Footer props={{
          step,
          setStep,
          totalSteps,
          onClose,
          handleSubmit: handleSubmit(onSubmit),
          isSubmitting
        }} />
      </div>
    </div>
  );
}

export default ApplicationModal