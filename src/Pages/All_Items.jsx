import React, { use } from 'react';
import { useLoaderData } from 'react-router';
import ListingTableRow from '../components/ListingTableRow';
import Loading from '../components/Loading';
import { AuthContext } from '../provider/AuthProvider';

const All_Items = () => {
    const data = useLoaderData()
    const { darkMode } = use(AuthContext)

    return (
        <div className={`${darkMode && `text-white`} overflow-x-auto max-w-7xl mx-auto w-11/12`}>
            <h2 className="text-4xl font-bold text-center mt-12 mb-8">All Available Roommate Listings</h2>
            
            <table className="table">
                {/* head */}
                <thead>
                    <tr className={`${darkMode && `text-white`}`}>
  
                        <th>Posted By (Name and Email)</th>
                        <th>Location</th>
                        <th>Rent Amount</th>
                        <th>Description</th>
                        <th>Availability</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row  */}
{
    data.map(rowData=><ListingTableRow key={rowData._id} rowData={rowData}></ListingTableRow>)
}




                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default All_Items;