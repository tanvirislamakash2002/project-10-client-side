import React, { use } from 'react';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const MyListingRow = ({ rowData }) => {
    const {  _id, availability, contact_info, description, location, post_email, post_name, post_user_photo, preferences, rent_amount, roomType  } = rowData

    const handleDelete = (id) => {
        Swal.fire({
            title: `Are you sure? you want to delete id: ${id}`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:3000/add-roommate/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('after delete', data)
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
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
                                src={post_user_photo}
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
                <Link to={`/update-post/${_id}`} className="btn btn-primary">Edit</Link>
                <button onClick={() => handleDelete(_id)} className="btn btn-ghost">Delete</button>
            </th>
        </tr>
    );
};

export default MyListingRow;