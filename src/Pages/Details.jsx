import React from 'react';
import { useLoaderData } from 'react-router';
import DetailsCard from '../components/DetailsCard';

const Details = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div className='grid grid-cols-3 gap-5'>
            
            {
                data.map(detail=><DetailsCard detail={detail}></DetailsCard>)
            }
        </div>
    );
};

export default Details;