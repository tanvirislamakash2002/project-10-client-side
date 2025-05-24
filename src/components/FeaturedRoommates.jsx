import React from 'react';
import { Link } from 'react-router';

const FeaturedRoommates = ({post}) => {
    const {  _id, availability, contact_info, description, location, post_email, post_name, post_user_photo, preferences, rent_amount, roomType  } = post
    return (

                <div className="p-8 bg-white border rounded shadow-sm">
                    <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                        <a
                            href="/"
                            className="transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                            aria-label="Category"
                        >
                            weekend
                        </a>{' '}
                        <span className="text-gray-600">— 1 Feb 2020</span>
                    </p>
                    <a
                        href="/"
                        aria-label="Article"
                        title="Jingle Bells"
                        className="inline-block mb-3 text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
                    >
                        Jingle Bells
                    </a>
                    <p className="mb-5 text-gray-700">
                        {description}
                    </p>
                    <div className="flex items-center">
                        <a href="/" aria-label="Author" title="Author" className="mr-3">
                            <img
                                src={post_user_photo}
                                alt="avatar"
                                className="object-cover w-10 h-10 rounded-full shadow-sm"
                            />
                        </a>
                        <div>
                            <a
                                href="/"
                                aria-label="Author"
                                title="Author"
                                className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            >
                                Vasile Melinte
                            </a>
                            <p className="text-sm font-medium leading-4 text-gray-600">
                                lAuthor
                            </p>
                            <Link to={`/details/${_id}`} className='btn'>See More</Link>
                        </div>
                    </div>
                </div>
    );
};

export default FeaturedRoommates;