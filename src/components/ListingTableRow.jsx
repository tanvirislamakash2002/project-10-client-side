import React from 'react';
import { Link } from 'react-router';

const ListingTableRow = ({rowData}) => {
    const {_id, contact_info, location} =rowData
    return (
        <tr>
            <th>
                <label>
                    <input type="checkbox" className="checkbox" />
                </label>
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                    </div>
                </div>
            </td>
            <td>
                {contact_info}
            </td>
            <td>{location}</td>
            <th>
                <Link to={`/details/${_id}`}><button className="btn btn-ghost btn-xs">details</button></Link>
            </th>
        </tr>
    );
};

export default ListingTableRow;