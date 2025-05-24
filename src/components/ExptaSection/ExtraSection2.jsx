import React, { useEffect, useState } from 'react';
import ExtraCard from './ExtraCard';

const ExtraSection2 = () => {
    const [reviewData, setReviewData] = useState([]) 
    
    useEffect(()=>{
        fetch('reviewData.json')
        .then(res=>res.json())
        .then(data=>{
            setReviewData(data)
        })
        
    },[])
    console.log(reviewData)
    return (
        <>
        {
            reviewData.map((data, index)=><ExtraCard key={index} data={data}></ExtraCard>)
        }

        </>
    );
};

export default ExtraSection2;