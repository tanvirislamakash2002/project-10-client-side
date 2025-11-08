import React from 'react';
import { Link } from 'react-router';

const AboutUs = () => {
    return (
        <section className="pt-16 bg-gray-50 dark:bg-gray-900">
            <div className="bg-gray-50 dark:bg-gray-900">
                <section className="pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
                                About RoomEase
                            </h2>
                            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto dark:text-gray-300">
                                Connecting people, creating homes
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">

                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">Our Story</h3>
                                <p className="text-gray-600 mb-6 dark:text-gray-300">
                                    Founded in 2022, RoomEase was born out of the frustration of finding compatible roommates in today's fast-paced world.
                                    We noticed that existing solutions were either too impersonal or didn't focus on what really matters in shared living.
                                </p>
                                <p className="text-gray-600 mb-6 dark:text-gray-300">
                                    Our platform was designed by people who've been through the roommate search process themselves, so we understand
                                    exactly what you need to find your perfect living situation.
                                </p>
                                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-custom-300 dark:bg-green-900 dark:bg-opacity-20">
                                    <p className="text-custom-500 font-medium dark:text-green-400">
                                        "We believe that the right roommate can transform a house into a home."
                                    </p>
                                </div>
                            </div>


                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full dark:bg-blue-900 dark:bg-opacity-30">
                                        <svg className="h-6 w-6 text-custom-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">Smart Matching</h4>
                                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                                            Our algorithm considers lifestyle preferences, habits, and personality traits to suggest the most compatible roommates.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-green-100 p-3 rounded-full dark:bg-green-900 dark:bg-opacity-30">
                                        <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">Verified Profiles</h4>
                                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                                            Every user goes through our verification process to ensure safety and authenticity in the community.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full dark:bg-purple-900 dark:bg-opacity-30">
                                        <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">Community Focused</h4>
                                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                                            We host local events and provide resources to help roommates build positive, lasting relationships.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800">
                                <p className="text-3xl font-bold text-custom-500 dark:text-green-400">50,000+</p>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">Successful matches</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800">
                                <p className="text-3xl font-bold text-custom-500 dark:text-green-400">200+</p>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">Cities nationwide</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800">
                                <p className="text-3xl font-bold text-custom-500 dark:text-green-400">4.8/5</p>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">User satisfaction</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800">
                                <p className="text-3xl font-bold text-custom-500 dark:text-green-400">24/7</p>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">Support available</p>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="py-16 bg-white dark:bg-gray-800">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
                                How RoomEase Works
                            </h2>
                            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto dark:text-gray-300">
                                Find your perfect roommate in just a few steps
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-custom-500 mb-4 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-400">
                                    <span className="text-xl font-bold">1</span>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-white">Create Your Profile</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Tell us about your lifestyle, habits, and preferences so we can find your best matches.
                                </p>
                            </div>

                            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-custom-500 mb-4 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-400">
                                    <span className="text-xl font-bold">2</span>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-white">Browse Matches</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    View compatible roommates in your area with our smart matching algorithm.
                                </p>
                            </div>

                            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-custom-500 mb-4 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-400">
                                    <span className="text-xl font-bold">3</span>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-white">Connect & Move In</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Message potential matches and use our tools to coordinate your move.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="py-16 bg-green-50 dark:bg-green-900 dark:bg-opacity-20">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
                                Success Stories
                            </h2>
                            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto dark:text-gray-300">
                                Hear from people who found their perfect roommate
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800">
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-gray-300 mr-4 overflow-hidden">
                                        <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="User" className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">Sarah K.</h4>
                                        <p className="text-gray-500 text-sm dark:text-gray-400">New York, NY</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    "I was skeptical at first, but RoomEase matched me with Jessica who is now my best friend and perfect roommate. We even adopted a cat together!"
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800">
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-gray-300 mr-4 overflow-hidden">
                                        <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="User" className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">Michael T.</h4>
                                        <p className="text-gray-500 text-sm dark:text-gray-400">Austin, TX</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    "As a recent grad moving to a new city, RoomEase helped me find an amazing place with roommates who share my interests. Couldn't be happier!"
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800">
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-gray-300 mr-4 overflow-hidden">
                                        <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">Priya M.</h4>
                                        <p className="text-gray-500 text-sm dark:text-gray-400">Seattle, WA</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    "The verification process gave me peace of mind, and the compatibility matching was spot on. My roommate and I have lived together for 2 years now."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="py-16 bg-custom-300 text-white dark:bg-green-800">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-extrabold sm:text-4xl">
                            Ready to find your perfect roommate?
                        </h2>
                        <p className="mt-4 text-xl">
                            Join thousands of happy roommates who found their ideal living situation.
                        </p>
                        <div className="mt-8">
                            <Link
                                to='/all-items'
                                className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-custom-500 bg-white hover:bg-green-50 md:py-4 md:text-lg md:px-10 dark:text-green-700 dark:bg-white dark:hover:bg-gray-100"
                            >
                                Get Started Now
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default AboutUs;