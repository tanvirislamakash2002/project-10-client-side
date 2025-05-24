import React from 'react';
import { Link } from 'react-router';

const FeaturedRoommates = ({post}) => {
    const {  _id, availability, contact_info, description, location, post_email, post_name, post_user_photo, preferences, rent_amount, roomType  } = post
    console.log(post_user_photo)
    return (

                <div className="p-8 bg-white border rounded shadow-sm">
     
                    <a
                        aria-label="Article"
                        title="Jingle Bells"
                        className="inline-block mb-3 text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
                    >
                        {location}
                    </a>
                    <p className="mb-5 text-gray-700">
                        {description}
                    </p>
                    <div className="flex items-center">
                        <a aria-label="Author" title="Author" className="mr-3">
                            <img
                                src={post_user_photo}
                                alt="avatar"
                                className="object-cover w-18 h-18 rounded-full shadow-sm"
                            />
                        </a>
                        <div>
                            <a
                                
                                aria-label="Author"
                                title="Author"
                                className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            >
                                {post_name}
                            </a>
                            <p className="text-sm font-medium leading-4 text-gray-600">
                                {post_email}
                            </p>
                            <Link to={`/details/${_id}`} className='btn bg-green-600 text-white mt-4'>See More</Link>
                        </div>
                    </div>
                </div>
    );
};

export default FeaturedRoommates;