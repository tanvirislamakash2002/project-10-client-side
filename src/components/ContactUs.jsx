import React from 'react';

const ContactUs = () => {
    return (
<div className="mx-4 py-6 md:py-12 lg:py-18">
            <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Contact Form */}
        <div>
          <h1 className="text-2xl font-bold mb-6">Contact us</h1>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">FIRST NAME</label>
                <input 
                  type="text" 
                  id="firstName" 
                  className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">LAST NAME</label>
                <input 
                  type="text" 
                  id="lastName" 
                  className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">EMAIL</label>
                <input 
                  type="email" 
                  id="email" 
                  className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">PHONE NUMBER</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="query" className="block text-sm font-medium text-gray-700">WHAT DO YOU HAVE IN MIND</label>
              <p className="text-xs text-gray-500 mb-1">Please enter query...</p>
              <textarea 
                id="query" 
                rows="4" 
                className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full custom-bg-300 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
        
        {/* Right Column - Contact Info */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-gray-600 mb-6">
              We’d love to hear from you! Whether you have questions, feedback, or need assistance, our team is here to help. Reach out via email, phone, or the contact form below, and we’ll get back to you as soon as possible. Your satisfaction is our priority—let’s connect!
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-gray-500 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-700">+1258 3258 5679</span>
              </div>
              
              <div className="flex items-start">
                <svg className="h-5 w-5 text-gray-500 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-700">hello@worldk.com</span>
              </div>
              
              <div className="flex items-start">
                <svg className="h-5 w-5 text-gray-500 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-700">102 street, y cross 485656</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
    );
};

export default ContactUs;