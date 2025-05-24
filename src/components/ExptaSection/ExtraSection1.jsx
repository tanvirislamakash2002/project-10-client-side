import React from 'react';
import CountUp from 'react-countup';

const ExtraSection1 = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 shadow w-full rounded-l-2xl rounded-r-2xl">


            <div className=" flex justify-between items-center  bg-green-100 py-12 px-6 rounded-l-2xl rounded-r-2xl md:rounded-r-none md:border-r-2 md:border-dashed md:border-green-300">

                <div className="flex items-center justify-center ">
                    <div className="">
                        <div className=" text-xl font-semibold">Successful Matches</div>
                        <div className="text-4xl font-bold"><CountUp end={2641} duration={11} ></CountUp>+</div>
                    </div>
                    
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4CAF50" width="98px" height="98px">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
            </div>
            <div className=" flex justify-between items-center  px-6 bg-green-100 py-12  lg:border-r-2 lg:border-dashed lg:border-green-300 lg:rounded-none rounded-r-2xl lg:gap-8 md:gap-4 ">

                <div className="flex items-center justify-center">
                    <div className="">
                        <div className=" text-xl font-semibold">Active Roommates</div>
                        <div className="text-4xl font-bold"><CountUp end={921} duration={11} ></CountUp>+</div>
                    </div>
                    
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2196F3" width="98px" height="98px">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
            </div>
            <div className=" flex justify-between items-center  px-6 bg-green-100 py-12 rounded-r-2xl rounded-l-2xl lg:rounded-l-none lg:gap-8 md:gap-4 ">

                <div className="flex items-center justify-center">
                    <div className="">
                        <div className=" text-xl font-semibold">Happy Users</div>
                        <div className="text-4xl font-bold"><CountUp end={2141} duration={11} ></CountUp>+</div>
                    </div>
                    
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFC107" width="98px" height="98px">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                    <circle cx="9" cy="10" r="1.5" />
                    <circle cx="15" cy="10" r="1.5" />
                </svg>
            </div>






        </div>
    );
};

export default ExtraSection1;