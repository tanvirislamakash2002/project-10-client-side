import React, { use } from 'react';
import { useLoaderData } from 'react-router';
import MyListingRow from '../components/MyListingRow';
import { AuthContext } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const MyListings = () => {
    const {user, darkMode} = use(AuthContext)
    const {email, displayName, photoURL} = user
    //console.log(user)
        const { data: RoomData, isLoading, error } = useQuery({
        queryKey: ['listings'],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_API_URL}/add-roommate`)
                .then(res => res.json())
                
    });
    const data = RoomData?.filter(info=>info.poster.email==user.email)
    //console.log(data)
    return (
        <div className="max-w-7xl mx-auto w-11/12 min-h-[calc(100vh-142px)]">
                        <h2 className={`${darkMode && `text-white`} text-4xl font-bold text-center pt-12 mb-8`}>My All Posts</h2>
            <div className=" p-8 sm:flex sm:space-x-6 bg-gray-50/20 text-gray-800">
                
                <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                    <img src={photoURL}alt="" className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
                </div>
                <div className="flex flex-col space-y-4">
                    <div>
                        <h2 className={`${darkMode && `text-white`} text-2xl font-semibold`}>{displayName}</h2>

                    </div>
                    <div className="space-y-1">
                        <span className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className={`${darkMode && `text-white`} w-4 h-4`}>
                                <path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
                            </svg>
                            <span className={`${darkMode && `text-white`} text-gray-600`}>{email}</span>
                        </span>

                    </div>
                </div>
            </div>
<div className={`overflow-x-auto ${darkMode && `text-white`}`}>




            <table className="table">
                {/* head */}
                <thead>
                    <tr className={`${darkMode && `text-white`}`}>
  
                        <th>Location</th>
                        <th>Contact Info</th>
                        <th>Rent Amount</th>
                        <th>Description</th>
                        <th>Availability</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row  */}
{
    data?.map(rowData=><MyListingRow key={rowData._id} rowData={rowData}></MyListingRow>)
}




                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>












    {/* old */}
                {/* <table className="table">
                
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        data.map(rowData => <MyListingRow key={rowData._id} rowData={rowData}></MyListingRow>)
                    }




                </tbody>
                
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table> */}
</div>
        </div>
    );
};

export default MyListings;