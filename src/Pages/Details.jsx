import React, { use, useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import DetailsCard from '../components/DetailsCard';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const Details = () => {
    const { user } = use(AuthContext)
    const data = useLoaderData()
    const { id } = useParams()


    const singleData = data.find(info => info._id == id)
    const { _id, availability, contact_info, description, location, post_email, post_name, post_user_photo, preferences, rent_amount, roomType, liked_by } = singleData


    // like management 
    const [liked, setLiked] = useState(false)
    const [currentLiked, setCurrentLiked] = useState(liked_by || [])
    const [likeCount, setLikeCount] = useState(liked_by?.length || 0)

    console.log(liked_by)

    useEffect(() => {
        setLiked(currentLiked.includes(user?.email))

    }, [currentLiked, user?.email])

    // console.log(likeCount)
    const handleLiked = () => {
        setLiked(!liked)

        setLikeCount(liked ? likeCount - 1 : likeCount + 1)
        console.log(likeCount)

        const filterAvailable = currentLiked.filter(filterEmail => filterEmail != user?.email)

        const updateLike = liked ? filterAvailable : [...currentLiked, user?.email]


        fetch(`http://localhost:3000/add-roommate/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ liked_by: updateLike })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    // Swal.fire({
                    //     position: "center",
                    //     icon: "success",
                    //     title: "Updated successfully",
                    //     showConfirmButton: true,
                    //     timer: 900
                    // });
                } else {
                    setCurrentLiked(currentLiked)
                }
            })
    }



    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>

            <div className="card w-96 bg-base-100 shadow-sm">
                <div className="card-body">
                    <span className="badge badge-xs badge-warning">Most Popular</span>
                    <div className="flex justify-between">
                        <h2 className="text-3xl font-bold">Premium</h2>
                        <img className='w-44' src={post_user_photo} alt="" />
                        <span className="text-xl">{likeCount}</span>
                    </div>
                    <ul className="mt-6 flex flex-col gap-2 text-xs">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>{location}</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>{contact_info}</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>{rent_amount}</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>{availability}</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>{description}</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>{post_email}</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>{post_name}</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>{preferences}</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>{roomType}</span>
                        </li>


                    </ul>
                    <div className="mt-6">
                        {/* <button onClick={handleLiked} className="btn btn-primary btn-block">{liked ? `disliked` : `liked`}</button> */}
                        <button onClick={handleLiked} className={`${liked?'btn-success':'btn-primary'} btn btn-block`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                            Like</button>
                        <p>{liked ? contact_info : ``}</p>
                    </div>
                </div>
            </div>

            {/* {
                data.map(detail=><DetailsCard key={detail._id} detail={detail}></DetailsCard>)
            } */}
        </div>
    );
};

export default Details;