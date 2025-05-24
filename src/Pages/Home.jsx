import React, { use, useEffect, useState } from 'react';
import Banner from '../components/Banner';
import FeaturedRoommates from '../components/FeaturedRoommates';
import { AuthContext } from '../provider/AuthProvider';
import { Typewriter } from 'react-simple-typewriter';
import CountUp from 'react-countup';
import ExtraSection1 from '../components/ExptaSection/ExtraSection1';
import ExtraSection2 from '../components/ExptaSection/ExtraSection2';
import { Link } from 'react-router';

const Home = () => {
    const { darkMode } = use(AuthContext)
    const [posts, setPosts] = useState([])


    useEffect(() => {
        fetch('https://ph-a10-server-two.vercel.app/home')
            .then(res => res.json())
            .then(data => {

                setPosts(data)
                //  console.log(data)
            })
    }, [])
    // console.log(posts)
    return (
        <div className='max-w-7xl mx-auto'>


            <Banner></Banner>
            <div className={`${darkMode && `bg-amber-400`} px-14 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20`}>
                <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
                    {
                        posts.map(post => <FeaturedRoommates key={post._id} post={post}></FeaturedRoommates>)
                    }

                </div>
            </div>

            <div className=" w-11/12 mx-auto ">
            <h2 className='text-center text-5xl font-bold mb-4'>Roommate Connection Stats</h2>
                <div className="text-center font-bold text-xl mb-8"><span className='invisible'>.</span><Typewriter
                    words={['Helping people find their perfect roommate since, 1971', 'Browse thousands of profiles to find your ideal match.', 'Join our community of verified roommates today!']}
                    loop={Infinity}
                    typeSpeed={30}
                    deleteSpeed={30}
                ></Typewriter></div>
                <ExtraSection1></ExtraSection1>
            </div>
            <div className=" max-w-7xl mx-auto my-28">
                <h2 className='text-5xl font-bold text-center'>What People Think About Us</h2>
                <div className="grid grid-cols-3">
                    <ExtraSection2></ExtraSection2>
                </div>
            </div>

        </div>


    );
};

export default Home;