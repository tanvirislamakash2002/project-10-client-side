import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Banner = () => {



    // const onChange = (index) => {
    //     console.log(`Slide changed to ${index}`);
    // };

    // const onClickItem = (index) => {
    //     console.log(`Clicked item ${index}`);
    // };

    // const onClickThumb = (index) => {
    //     console.log(`Clicked thumb ${index}`);
    // };
    return (
        <Carousel
            showArrows={true}
            // onChange={onChange}
            // onClickItem={onClickItem}
            // onClickThumb={onClickThumb}
            autoPlay={true}
            interval={2000}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}>



            <div className='bg-[url(https://i.ibb.co/6JbzQr3q/Awesome-Green-Nature-Wallpaper-HD.jpg)]  bg-cover'>

                <div className="card card-side shadow-sm pt-22">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                            alt="Movie" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Watch</button>
                        </div>
                    </div>
                </div>
                <h2 className='pt-12 text-4xl font-bold text-white'>tis is on e</h2>
                {/* <img src="https://i.ibb.co/Hpkr1dF4/ad01682307049.jpg" /> */}
                <p className="legend">Legend 4</p>
            </div>
            <div className='bg-[url(https://i.ibb.co/PsWq8tC6/ad06964907556.jpg)] w-full bg-cover'>
                            <div className="card card-side shadow-sm pt-22">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                            alt="Movie" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Watch</button>
                        </div>
                    </div>
                </div>
                <h2 className='pt-12 text-4xl font-bold text-white'>tis is on e</h2>
                {/* <img src="https://i.ibb.co/Hpkr1dF4/ad01682307049.jpg" /> */}
                <p className="legend">Legend 4</p>
            </div>
            <div className='bg-[url(https://i.ibb.co/Hpkr1dF4/ad01682307049.jpg)] w-full bg-cover'>
                            <div className="card card-side shadow-sm pt-22">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                            alt="Movie" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Watch</button>
                        </div>
                    </div>
                </div>
                <h2 className='pt-12 text-4xl font-bold text-white'>tis is on e</h2>
                {/* <img src="https://i.ibb.co/Hpkr1dF4/ad01682307049.jpg" /> */}
                <p className="legend">Legend 4</p>
            </div>

        </Carousel>
    );
};

export default Banner;