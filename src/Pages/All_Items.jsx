import React, { use } from 'react';
import { useLoaderData } from 'react-router';
import ListingTableRow from '../components/ListingTableRow';
import Loading from '../components/Loading';
import { AuthContext } from '../provider/AuthProvider';

const All_Items = () => {
    const data = useLoaderData()
    // _id, post_email, post_name, post_user_photo, contact_info, location, rent_amount, description, availability
    const { darkMode } = use(AuthContext)



    return (
        <div className={`${darkMode && `text-white`} overflow-x-auto max-w-7xl mx-auto w-11/12`}>
            <h2 className="text-4xl font-bold text-center mt-12 mb-8">All Available Roommate Listings</h2>
{
    data.map(cardData=><h2>{cardData?.location}</h2>)
}

        </div>
    );
};

export default All_Items;