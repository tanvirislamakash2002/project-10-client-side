import React from 'react';

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
                        <button className="btn btn-primary">Browse Roommates Now</button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default BannerSlide;