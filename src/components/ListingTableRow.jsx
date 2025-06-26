import React from 'react';
import { Link } from 'react-router';

const ListingTableRow = ({rowData}) => {
    const {_id, post_email, post_name, post_user_photo, contact_info, location, rent_amount, description, availability} =rowData
    return (
        <tr>

            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={post_user_photo}
                                alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{post_name}</div>
                        <div className="text-sm opacity-50">{post_email}</div>
                    </div>
                </div>
            </td>
            <td>
                {location}
            </td>
            <td>
                {rent_amount} <span className="font-semibold">TK</span>
            </td>
            <td>
                {description}
            </td>
            <td>{availability}</td>
            <th>
                <Link to={`/details/${_id}`}><button className="btn custom-bg-500 text-white">details</button></Link>
            </th>
        </tr>
    );
};

export default ListingTableRow;