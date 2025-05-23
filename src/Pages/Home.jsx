import React, { use, useEffect, useState } from 'react';
import Banner from '../components/Banner';
import FeaturedRoommates from '../components/FeaturedRoommates';
import { AuthContext } from '../provider/AuthProvider';
import { Typewriter } from 'react-simple-typewriter';
import CountUp from 'react-countup';
import ExtraSection1 from '../components/ExptaSection/ExtraSection1';
import ExtraSection2 from '../components/ExptaSection/ExtraSection2';

const Home = () => {
    const { darkMode } = use(AuthContext)
    const [posts, setPosts] = useState([])
    // console.log(darkMode)

    useEffect(() => {
        fetch('http://localhost:3000/add-roommate')
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                //  console.log(data)
            })
    }, [])
    // console.log(posts)
    return (
        <div>
            <CountUp end={444} duration={3} ></CountUp>
            a
            <Typewriter
                words={['what a lovely day', 'are you ok']}
                loop={Infinity}
            ></Typewriter>
            <Banner></Banner>
            <div className={`${darkMode && `bg-amber-400`} px-14 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20`}>
                <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
                    {
                        posts.map(post => <FeaturedRoommates key={post._id} post={post}></FeaturedRoommates>)
                    }


                </div>
            </div>

            <div className="flex justify-center items-center">
                <ExtraSection1></ExtraSection1>
            </div>
            <div className=" max-w-7xl mx-auto">
                <div className="text-center font-bold">a<Typewriter
                    words={['what a lovely day', 'are you ok']}
                    loop={Infinity}
                ></Typewriter></div>
                <div className="grid grid-cols-3">
                    <ExtraSection2></ExtraSection2>
                </div>
            </div>

        </div>


    );
};

export default Home;