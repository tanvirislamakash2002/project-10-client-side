import React from 'react';
import { useLoaderData } from 'react-router';
import ListingTableRow from '../components/ListingTableRow';

const BrowseListings = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div className="overflow-x-auto">
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
    data.map(rowData=><ListingTableRow key={rowData._id} rowData={rowData}></ListingTableRow>)
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

export default BrowseListings;