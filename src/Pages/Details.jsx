import React, { use, useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import DetailsCard from '../components/DetailsCard';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const Details = () => {
    const { user, darkMode } = use(AuthContext)
    const data = useLoaderData()
    const { id } = useParams()


    const singleData = data.find(info => info._id == id)
    const { _id, availability, contact_info, description, location, post_email, post_name, post_user_photo, preferences, rent_amount, roomType, liked_by } = singleData

    // like management 

    const [currentLiked, setCurrentLiked] = useState(liked_by || [])
    const [likeCount, setLikeCount] = useState(liked_by?.length || 0)
    const [showContact, setShowContact] = useState(false)


    const handleLiked = () => {


        if (user.email !== post_email) {
            setLikeCount(likeCount + 1)

            setShowContact(true)

            const updateLike = [...currentLiked, user?.email]



            fetch(`https://ph-a10-server-two.vercel.app/add-roommate/${_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ liked_by: updateLike })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount) {
                        setCurrentLiked(updateLike)

                    } else {
                        setCurrentLiked(currentLiked)
                    }
                })
        }
        else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "You Cannot like your own post",
                showConfirmButton: true,
                timer: 1300
            });
        }
    }



    return (
        <div className={`${darkMode && 'text-white'} mt-12`}>
            <h2 className={` text-4xl text-center mx-auto font-semibold`}><span className='text-green-600 font-bold'>{likeCount}</span> People Interested In</h2>
            <div className="card w-10/12 sm:w-8/12 md:w-8/12 lg:w-6/12  bg-base-100/30 shadow-sm mx-auto mt-8">
                <div className="card-body">
                    <h2 className={`${darkMode && 'text-white'} text-4xl text-center mx-auto font-semibold pb-6`}>Details Of</h2>
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                        <div className="avatar">
                            <div className="w-32 rounded">
                                <img src={post_user_photo} />
                            </div>
                        </div>
                        <div className="">
                            <h2 className="text-2xl font-bold">{post_name}</h2>
                        <h2 className="text-xl font-semibold">{post_email}</h2>
                        </div>

                    </div>
                    <ul className="mt-6 flex flex-col gap-2 text-lg">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span><span className='font-semibold'>Location : </span> {location}</span>
                        </li>

                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span><span className='font-semibold'>Rent Amount : </span> {rent_amount}</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span><span className='font-semibold'>Availability : </span> {availability}</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span><span className='font-semibold'>Description : </span> {description}</span>
                        </li>

                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span><span className='font-semibold'>Preferences : </span> {
                                preferences.map(p=><span className='mr-2'>{p},</span>)
                            }</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span><span className='font-semibold'>Location : </span> {roomType}</span>
                        </li>


                    </ul>
                    <div className="mt-6">

                        <button onClick={handleLiked} className=' custom-bg-500 text-white btn btn-block'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                            Like</button>
                        <p className={`${!showContact && 'hidden'} mt-2 text-xl`}><span>Contact Info:</span> {contact_info}</p>

                    </div>
                </div>
            </div>

<div className='py-5'></div>
        </div>
    );
};

export default Details;