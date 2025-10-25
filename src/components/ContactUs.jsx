import React, { use } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { FaLocationDot, FaPhone } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const ContactUs = () => {
    const { darkMode } = use(AuthContext)
    return (
        <div className="mx-4 py-6 md:py-12 lg:py-18">
            <div className={`${darkMode ? `text-white bg-white/30` : `text-black bg-white`} max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md `}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div>
                        <h1 className="text-2xl font-bold mb-6">Contact us</h1>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium ">FIRST NAME</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="mt-1 block w-full border-b border-gray-300 focus:border-green-500 focus:outline-none py-2"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium ">LAST NAME</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="mt-1 block w-full border-b border-gray-300 focus:border-green-500 focus:outline-none py-2"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium ">EMAIL</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="mt-1 block w-full border-b border-gray-300 focus:border-green-500 focus:outline-none py-2"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium ">PHONE NUMBER</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="mt-1 block w-full border-b border-gray-300 focus:border-green-500 focus:outline-none py-2"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="query" className="block text-sm font-medium ">WHAT DO YOU HAVE IN MIND</label>
                                <p className="text-xs mb-1">Please enter query...</p>
                                <textarea
                                    id="query"
                                    rows="4"
                                    className="mt-1 block w-full border-b border-gray-300 focus:border-green-500 focus:outline-none py-2"
                                ></textarea>
                            </div>

                            <button                                
                                className="w-full bg-custom-300 text-white py-2 px-4 rounded transition duration-200"
                            >
                                Submit
                            </button>
                        </form>
                    </div>


                    <div className="flex flex-col justify-between">
                        <div>
                            <p className=" mb-6">
                                We’d love to hear from you! Whether you have questions, feedback, or need assistance, our team is here to help. Reach out via email, phone, or the contact form below, and we’ll get back to you as soon as possible. Your satisfaction is our priority—let’s connect!
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <FaPhone />
                                    <span className="">+1258 3258 5679</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <MdEmail />
                                    <span className="">room.ease@gmail.com</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaLocationDot />
                                    <span className="">102 street, y cross 485656</span>
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