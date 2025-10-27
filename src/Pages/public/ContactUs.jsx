import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Shield, Users, ChevronDown, Facebook, Twitter, Instagram, Linkedin, CheckCircle } from 'lucide-react';

const ContactUsPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const subjectOptions = [
    { value: '', label: 'Select a subject...' },
    { value: 'general', label: 'General Question' },
    { value: 'technical', label: 'Report a Problem with the Website' },
    { value: 'report', label: 'Report a User or Listing' },
    { value: 'advertising', label: 'Advertising Inquiry' },
    { value: 'press', label: 'Press' },
    { value: 'other', label: 'Something Else' }
  ];

  const faqs = [
    {
      category: 'For Seekers',
      question: 'How do I save a listing?',
      answer: 'Click the heart icon on any listing card to save it to your favorites. You can access all saved listings from your profile dashboard.'
    },
    {
      category: 'For Seekers',
      question: 'Is my personal information safe?',
      answer: 'Absolutely! We use industry-standard encryption and never share your personal information without your consent. Your email is only visible to providers you contact directly.'
    },
    {
      category: 'For Providers',
      question: 'How long does listing approval take?',
      answer: 'Our admin team reviews all listings within 24-48 hours. You\'ll receive an email notification once your listing is approved or if any changes are needed.'
    },
    {
      category: 'For Providers',
      question: 'Why was my listing rejected?',
      answer: 'Listings may be rejected for incomplete information, inappropriate content, or violating our community guidelines. Check your email for specific feedback from our team.'
    },
    {
      category: 'For All',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email, and we\'ll send you a secure reset link within minutes.'
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ fullName: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className={isDark ? 'dark' : ''}>


      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary to-secondary dark:from-blue-900 dark:to-purple-900 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              We're here to help you find your perfect home and build great living situations.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12 -mt-8">
          
          {/* Before You Contact Us Banner */}
          <div className="alert bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 mb-8">
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Before You Contact Us</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Check our FAQ section below for quick answers to common questions!
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Main Contact Form */}
            <div className="lg:col-span-2">
              <div className="card bg-white dark:bg-gray-800 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-6 text-gray-900 dark:text-white">
                    Send Us a Message
                  </h2>

                  {submitSuccess && (
                    <div className="alert alert-success mb-4">
                      <CheckCircle className="w-5 h-5" />
                      <span>Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 dark:text-gray-300">
                        Full Name <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={`input input-bordered bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 ${errors.fullName ? 'input-error' : ''}`}
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                    {errors.fullName && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.fullName}</span>
                      </label>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 dark:text-gray-300">
                        Email Address <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className={`input input-bordered bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 ${errors.email ? 'input-error' : ''}`}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    {errors.email && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.email}</span>
                      </label>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 dark:text-gray-300">
                        What is this regarding? <span className="text-error">*</span>
                      </span>
                    </label>
                    <select
                      className={`select select-bordered bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 ${errors.subject ? 'select-error' : ''}`}
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                    >
                      {subjectOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.subject}</span>
                      </label>
                    )}
                  </div>

                  {/* Message */}
                  <div className="form-control mb-6">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 dark:text-gray-300">
                        How can we help you? <span className="text-error">*</span>
                      </span>
                    </label>
                    <textarea
                      placeholder="Tell us more about your inquiry..."
                      className={`textarea textarea-bordered h-32 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 ${errors.message ? 'textarea-error' : ''}`}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                    />
                    {errors.message && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.message}</span>
                      </label>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    className={`btn btn-primary w-full gap-2 ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting}
                  >
                    {!isSubmitting && <Send className="w-5 h-5" />}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar - Direct Contact & Info */}
            <div className="space-y-6">
              
              {/* Direct Contact Methods */}
              <div className="card bg-white dark:bg-gray-800 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4 text-gray-900 dark:text-white">
                    Other Ways to Reach Us
                  </h3>

                  <div className="space-y-4">
                    {/* General Email */}
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary dark:text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">General Inquiries</p>
                        <a href="mailto:hello@roommatefinder.com" className="text-primary dark:text-blue-400 hover:underline text-sm">
                          hello@roommatefinder.com
                        </a>
                      </div>
                    </div>

                    {/* Support Email */}
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary dark:text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">Technical Support</p>
                        <a href="mailto:support@roommatefinder.com" className="text-primary dark:text-blue-400 hover:underline text-sm">
                          support@roommatefinder.com
                        </a>
                      </div>
                    </div>

                    {/* Safety/Abuse Email */}
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-error dark:text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">Report Abuse</p>
                        <a href="mailto:safety@roommatefinder.com" className="text-error dark:text-red-400 hover:underline text-sm">
                          safety@roommatefinder.com
                        </a>
                      </div>
                    </div>

                    {/* Response Time */}
                    <div className="divider dark:before:bg-gray-700 dark:after:bg-gray-700"></div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-success dark:text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">Response Time</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          We respond within 24 hours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="card bg-white dark:bg-gray-800 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4 text-gray-900 dark:text-white">
                    Company Information
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary dark:text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          123 Home Street<br />
                          San Francisco, CA 94102<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="divider dark:before:bg-gray-700 dark:after:bg-gray-700"></div>

                  {/* Social Links */}
                  <div>
                    <p className="font-semibold text-sm mb-3 text-gray-700 dark:text-gray-300">Follow Us</p>
                    <div className="flex gap-3">
                      <a href="#" className="btn btn-circle btn-sm btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                        <Facebook className="w-4 h-4" />
                      </a>
                      <a href="#" className="btn btn-circle btn-sm btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a href="#" className="btn btn-circle btn-sm btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                        <Instagram className="w-4 h-4" />
                      </a>
                      <a href="#" className="btn btn-circle btn-sm btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <div className="card bg-white dark:bg-gray-800 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6 text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div key={index} className="collapse collapse-arrow bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <input
                        type="checkbox"
                        checked={openFaqIndex === index}
                        onChange={() => toggleFaq(index)}
                      />
                      <div className="collapse-title font-medium text-gray-900 dark:text-white">
                        <span className="text-xs text-primary dark:text-blue-400 font-semibold mr-2">
                          {faq.category}
                        </span>
                        {faq.question}
                      </div>
                      <div className="collapse-content text-gray-600 dark:text-gray-400">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;