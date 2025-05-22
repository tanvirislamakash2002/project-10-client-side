import React, { use } from 'react';
import { useLoaderData } from 'react-router';
import DetailsCard from '../components/DetailsCard';
import { AuthContext } from '../provider/AuthProvider';

const Details = () => {
    const {user} = use(AuthContext)
    const data = useLoaderData()
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            
            {
                data.map(detail=><DetailsCard key={detail._id} detail={detail}></DetailsCard>)
            }
        </div>
    );
};

export default Details;