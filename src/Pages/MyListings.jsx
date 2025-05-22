import React from 'react';
import { useLoaderData } from 'react-router';
import MyListingRow from '../components/MyListingRow';

const MyListings = () => {
        const data = useLoaderData()
    console.log('from')
    return (
                <div className="overflow-x-auto">
                    MyListingRow
            <table className="table">
                {/* head */}
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
                    {/* row  */}
{
    data.map(rowData=><MyListingRow key={rowData._id} rowData={rowData}></MyListingRow>)
}




                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default MyListings;