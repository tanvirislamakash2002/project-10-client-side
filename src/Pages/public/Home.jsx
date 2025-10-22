import React, { use, useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import CountUp from 'react-countup';
import { Link } from 'react-router';
import Banner from '../../components/Banner';
import FeaturedRoommates from '../../components/FeaturedRoommates';
import { AuthContext } from '../../provider/AuthProvider';
import ExtraSection1 from '../../components/ExptaSection/ExtraSection1';
import ExtraSection2 from '../../components/ExptaSection/ExtraSection2';
import ExtraSection3 from '../../components/ExptaSection/ExtraSection3';
import ExtraSection4 from '../../components/ExptaSection/ExtraSection4';

const Home = () => {
    const { darkMode } = use(AuthContext)
    const [posts, setPosts] = useState([])


    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/home`)
            .then(res => res.json())
            .then(data => {

                setPosts(data)
                //  console.log(data)
            })
    }, [])
    // console.log(posts)
    return (
        <div className=''>


            <Banner></Banner>
            <div className={` px-14 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20`}>
                <h2 className={`${darkMode && `text-white`} text-center text-4xl font-bold mb-16`}>Available Feature Roommate Posts</h2>
                <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2  sm:mx-auto lg:max-w-full">
                    {
                        posts.map(post => <FeaturedRoommates key={post._id} post={post}></FeaturedRoommates>)
                    }

                </div>
            </div>

            <div className=" w-11/12 mx-auto ">
            <h2 className={`${darkMode && `text-white`} text-center text-4xl font-bold mb-4`}>Roommate Connection Stats</h2>
                <div className={`${darkMode && `text-white`} text-center font-bold text-xl mb-8`}><span className='invisible'>.</span><Typewriter
                    words={['Helping people find their perfect roommate since, 1971', 'Browse thousands of profiles to find your ideal match.', 'Join our community of verified roommates today!']}
                    loop={Infinity}
                    typeSpeed={30}
                    deleteSpeed={30}
                ></Typewriter></div>
                <ExtraSection1></ExtraSection1>
            </div>
            <div className=" max-w-7xl mx-auto py-28 w-11/12">
                <h2 className={`${darkMode && `text-white`} text-4xl font-bold text-center`}>What People Think About Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    <ExtraSection2></ExtraSection2>
                </div>
            </div>

            <div className={`${darkMode && `text-white`}`}>
                <ExtraSection3></ExtraSection3>
            </div>
            <div className={`${darkMode && `text-white`}`}>
                <ExtraSection4></ExtraSection4>
            </div>

        </div>


    );
};

export default Home;