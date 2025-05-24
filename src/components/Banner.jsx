import React, { Component, use, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import BannerSlide from './BannerSlide';


const Banner = () => {

    const [bannerData, setBannerData] = useState([])

    
    useEffect(()=>{
        fetch('bannerData.json')
        .then(res=>res.json())
        .then(data=>{
            setBannerData(data)
        })
        
    },[])


console.log(bannerData)



    return (
        <Carousel
            showArrows={true}
            autoPlay={true}
            interval={3000}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}            
            >


{
    bannerData.map((data,index)=><BannerSlide key={index} data={data}></BannerSlide>)
}


        </Carousel>
    );
};

export default Banner;