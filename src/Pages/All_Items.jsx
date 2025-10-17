import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { useContext } from 'react';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
const All_Items = () => {
    // const loadedData = useLoaderData();
    const { darkMode } = useContext(AuthContext);
    const [sortOrder, setSortOrder] = useState('oldest');
    const [showAvailableOnly, setShowAvailableOnly] = useState('no');
    // console.log(loadedData)

    // Usage in component
  const { data:RoomData, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => 
      fetch('https://ph-a10-server-two.vercel.app/add-roommate')
        .then(res => res.json())
  });
  console.log('data',RoomData);
  if(!isLoading){
    console.log('dda',RoomData);
  }

    // filter process
    // const displayData = () => {
    //     let result = [...RoomData];

    //     if (showAvailableOnly) {
    //         result = result.filter(item => {
    //             const availability = item.availability;
    //             return availability === 'yes';
    //         });
    //     }

    //     return sortOrder === 'newest' ? [...result].reverse() : result;
    // };

    // const handleSortChange = (e) => {
    //     setSortOrder(e.target.value === 'New Post' ? 'newest' : 'oldest');
    // };

    // const handleAvailabilityChange = (e) => {
    //     setShowAvailableOnly(e.target.checked);
    // };

    return (
        <div className={`${darkMode && ``} overflow-x-auto max-w-7xl mx-auto w-12/12 py-12 px-4`}>
            <h2 className={`${darkMode && `text-white`} text-4xl font-bold text-center mb-8`}>All Available Roommate Listings</h2>
            <div className="flex gap-5">
                <div className={`${darkMode && `text-white`} w-4/12 md:w-2/12`}>
                    <h2 className='font-bold text-xl mb-2'>Filter by</h2>
                    <h4 className="font-bold mb-1">
                        post order
                    </h4>
                    <select
                        defaultValue="Oldest Post"
                        className="select text-black"
                        // onChange={handleSortChange}
                    >
                        <option disabled>Select post order</option>
                        <option>Oldest Post</option>
                        <option>New Post</option>
                    </select>
                    <div className="mt-3">
                        <h4 className="font-bold">availability</h4>
                        <div className='mt-1'>
                            <span className='font-semibold'>available</span>
                            <input
                                type="checkbox"
                                className="checkbox checkbox-success"
                                // onChange={handleAvailabilityChange}
                                checked={showAvailableOnly}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-8/12 md:w-10/12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {RoomData?.map(cardData => (
                            <div key={cardData._id} className={`${darkMode ? `text-white bg-white/30` : `text-black bg-white`} card shadow-sm`}>
                                <figure className="px-3 pt-3">
                                    <img
                                        src={cardData.post_user_photo}
                                        className="rounded-xl h-36 w-full object-cover"
                                        alt="User"
                                    />
                                </figure>
                                <div className="card-body items-center text-center pt-2">
                                    <h2 className="card-title">{cardData?.location}</h2>
                                    <p>{cardData?.description}</p>
                                    <div className="card-actions">
                                        <Link to={`/details/${cardData._id}`}>
                                            <button className="btn custom-bg-500 text-white custom-border-300 shadow-none">See More</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default All_Items;