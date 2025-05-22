import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import FeaturedRoommates from '../components/FeaturedRoommates';

const Home = () => {
    const [posts, setPosts] = useState([])  
    
useEffect(()=>{
        fetch('http://localhost:3000/add-roommate')
    .then(res=>res.json())
    .then(data=>{
     setPosts(data)
    //  console.log(data)
    })
},[])
console.log(posts)
    return (
        <div>
            <Banner></Banner>
                    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
            {
                posts.map(post=><FeaturedRoommates key={post._id} post={post}></FeaturedRoommates>)
            }


            </div>
        </div>
            
        </div>

  
    );
};

export default Home;