import React, { use } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';

const UpdatePost = () => {
    const {user} = use(AuthContext)
    const data = useLoaderData();
    const { _id, availability, contact_info, description, location, post_email, post_name, post_user_photo, preferences, rent_amount, roomType } = data
    console.log('get data', _id)

    const handleEditPost = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        const updatedData = Object.fromEntries(formData.entries())
        console.log('tis iis data', updatedData)

        // updated post 

        fetch(`http://localhost:3000/add-roommate/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Updated successfully",
                        showConfirmButton: true,
                        timer: 900
                    });
                }
            })

    }
    return (
        <form onSubmit={handleEditPost} className="mx-auto fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

            <label className="label">Location</label>
            <input defaultValue={location} name='location' type="text" className="input" placeholder="Location" />

            <label className="label">Rent Amount</label>
            <input defaultValue={rent_amount} name='rent_amount' type="text" className="input" placeholder="Rent Amount" />

            <label className="label">Room Type</label>

            <div className="flex gap-5">
                <div className="flex gap-3">
                    <label className="label">Single</label>
                    <input value="single" type="radio" name='roomType' />
                </div>
                <div className="flex gap-3">
                    <label className="label">Shared</label>
                    <input value="shared" type="radio" name='roomType' />
                </div>
            </div>

            <label className="label">Life-style Preferences</label>
            <div className="flex gap-5">
                <div className="flex gap-3">
                    <label className="label">Pets</label>
                    <input name='preferences' value='pets' type="Checkbox" />
                </div>
                <div className="flex gap-3">
                    <label className="label">Smoking</label>
                    <input name='preferences' value='smoking' type="Checkbox" />
                </div>
                <div className="flex gap-3">
                    <label className="label">Night Owl</label>
                    <input name='preferences' value='night_owl' type="Checkbox" />
                </div>
            </div>

            <label className="label">Description</label>
            <textarea defaultValue={description} placeholder='Description' className='input' name="description" id=""></textarea>

            <label className="label">Contact info</label>
            <input defaultValue={contact_info} name='contact_info' type="text" className="input" placeholder="Contact info" />

            <label className="label">Availability</label>
            <div className="flex gap-5">
                <div className="flex gap-3">
                    <label className="label">yes</label>
                    <input value='yes' name="availability" type="radio" />
                </div>
                <div className="flex gap-3">
                    <label className="label">no</label>
                    <input value='no' name="availability" type="radio" />
                </div>
            </div>
            <label className="label">User Email</label>
            <input name='post_email' type="text" className="input" readOnly value={user && user.email} />
            <label className="label">User Name</label>
            <input name='post_name' type="text" className="input" readOnly value={user && user.displayName} />
            <input name='post_user_photo' type="text" className="input" readOnly value={user && user.photoURL} />
            <button type='submit' className="btn btn-neutral mt-4">Login</button>
        </form>
    );
};

export default UpdatePost;