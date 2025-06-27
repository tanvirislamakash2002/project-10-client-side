import React from 'react';
import { FaUserEdit, FaSearch, FaHandshake } from "react-icons/fa";
import { Link } from 'react-router';
const ExtraSection3 = () => {
    const steps = [
        {
            icon: <FaUserEdit className="text-3xl text-blue-500" />,
            title: "Create Your Profile",
            description: "Sign up and share your preferences like budget, lifestyle, and move-in date.",
        },
        {
            icon: <FaSearch className="text-3xl text-green-500" />,
            title: "Browse or List",
            description: "Search for roommates or post your own listing with filters.",
        },
        {
            icon: <FaHandshake className="text-3xl text-purple-500" />,
            title: "Connect Safely",
            description: "Chat, verify profiles, and finalize your perfect match!",
        },
    ];
    return (
        <section className="pb-16 ">
            <div className="container mx-auto px-4">

                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Find Your Perfect Roommate in <span className="custom-color-200">3 Easy Steps</span>
                </h2>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
                        >
                            <div className="flex justify-center mb-4">{step.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>


                <div className="text-center mt-12">
                    <Link to='/all-items'>
                        <button className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
                            Get Started Now
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ExtraSection3;