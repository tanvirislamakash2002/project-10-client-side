import React from 'react';
import { Link } from 'react-router';

const BannerSlide = ({ data }) => {
    
    return (
        <div style={{ backgroundImage: `url(${data.image_url})` }} className={`  bg-cover h-[500px]`}>

            <div className='bg-black/50 h-[500px] flex flex-col justify-center items-center'>
                <div className=" text-white">

                    <h2 className="text-5xl text-center font-bold ">
                        <span className='invisible'>.</span>
                        {data.title}
                    </h2>
                    <p className='pt-2 pb-5 text-xl'>{data.sub_title}</p>
                    <div className="card-actions justify-center">
                        <Link to='/browse' className="btn custom-bg-500 text-white font-bold custom-border-400 shadow-none">Browse Roommates Now</Link>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default BannerSlide;