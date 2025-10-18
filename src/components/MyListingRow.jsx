import React, { use } from 'react';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';

const MyListingRow = ({ rowData }) => {
    const { _id, availability, contact_info, description, location, post_email, post_name, post_user_photo, preferences, rent_amount, roomType } = rowData

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

                fetch(`${import.meta.env.VITE_API_URL}/add-roommate/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        //console.log('after delete', data)
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


            <td>
                {location}
            </td>
            <td>
                {contact_info}
            </td>
            <td>
                {rent_amount} <span className="font-semibold">TK</span>
            </td>
            <td>
                {description}
            </td>
            <td>{availability}</td>
            <th className='w-44 flex'>
                <Link to={`/update-post/${_id}`} className=" custom-color-200 flex items-center"><FaEdit size={42} className=' p-2 hover:bg-green-50' /></Link>
                <button onClick={() => handleDelete(_id)} className="cursor-pointer flex items-center text-red-700 "><RiDeleteBin5Line size={42} className=' p-2 hover:bg-red-50' /></button>
            </th>
        </tr>




    );
};

export default MyListingRow;