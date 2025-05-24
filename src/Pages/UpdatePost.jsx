import React, { use } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';

const UpdatePost = () => {
    const { user } = use(AuthContext)
    const data = useLoaderData();
    const { _id, availability, contact_info, description, location, post_email, post_name, post_user_photo, preferences, rent_amount, roomType } = data
    //console.log('get data', _id)

    const handleEditPost = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        const updatedData = Object.fromEntries(formData.entries())
        //console.log('tis iis data', updatedData)

        // updated post 

        fetch(`https://ph-a10-server-two.vercel.app/add-roommate/${_id}`, {
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


        <div className="bg-[url(https://i.ibb.co/0R66sGNY/finding-roomate.jpg)] bg-cover ">
            <div className="bg-black/70 min-h-screen flex py-8 md:items-center md:justify-center">
                <form onSubmit={handleEditPost} className="mx-auto bg-base-200/60 border-base-300 rounded-box border p-4 max-w-7xl w-11/12">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                        <div className=" flex flex-col md:col-span-2 col-span-1  ">
                            <label className="label font-semibold text-xl  text-black mb-2">Location</label>
                            <input defaultValue={location} name='location' type="text" className="input w-full" placeholder="Location" />
                        </div>

                        <div className="flex flex-col">
                            <label className="label font-semibold text-xl text-black mb-2">Rent Amount</label>
                            <input defaultValue={rent_amount} name='rent_amount' type="text" className="input w-full" placeholder="Rent Amount" />
                        </div>

                        <div className="flex flex-col">
                            <label className="label font-semibold text-xl text-black mb-2">Room Type</label>

                            <div className="flex gap-5">
                                <div className="flex gap-3">
                                    <label className="label text-lg font-normal text-black mb-2">Single</label>
                                    <input value="single" type="radio" name='roomType' className='radio radio-neutral bg-white' />
                                </div>
                                <div className="flex gap-3">
                                    <label className="label text-lg font-normal text-black mb-2">Shared</label>
                                    <input value="shared" type="radio" name='roomType' className='radio radio-neutral bg-white' />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="label font-semibold text-xl text-black mb-4">Life-style Preferences</label>
                            <div className="flex gap-5">
                                <div className="flex gap-3">
                                    <label className="label font-normal text-lg text-black">Pets</label>
                                    <input name='preferences' value='pets' type="Checkbox" className='checkbox checkbox-neutral bg-white' />
                                </div>
                                <div className="flex gap-3">
                                    <label className="label font-normal text-lg text-black ">Smoking</label>
                                    <input name='preferences' value='smoking' type="Checkbox" className='checkbox checkbox-neutral bg-white' />
                                </div>
                                <div className="flex gap-3">
                                    <label className="label font-normal text-lg text-black ">Night Owl</label>
                                    <input name='preferences' value='night_owl' type="Checkbox" className='checkbox checkbox-neutral bg-white' />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="label font-semibold text-xl text-black mb-2">Description</label>
                            <textarea defaultValue={description} placeholder='Description' className='bg-white w-full rounded-sm p-2' name="description" id="" rows={2}></textarea>
                        </div>

                        <div className="flex flex-col">
                            <label className="label font-semibold text-xl text-black mb-2">Contact info</label>
                            <input defaultValue={contact_info} name='contact_info' type="text" className="input w-full" placeholder="Contact info" />
                        </div>

                        <div className="flex flex-col">
                            <label className="label font-semibold text-xl text-black mb-2">Availability</label>
                            <div className="flex gap-5">
                                <div className="flex gap-3">
                                    <label className="label font-semibold text-xl text-black mb-2">yes</label>
                                    <input value='yes' name="availability" type="radio" className='radio radio-neutral bg-white' />
                                </div>
                                <div className="flex gap-3">
                                    <label className="label font-semibold text-xl text-black mb-2">no</label>
                                    <input value='no' name="availability" type="radio" className='radio radio-neutral bg-white' />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="label font-semibold text-xl text-black mb-2">User Email</label>
                            <input name='post_email' type="text" className="input w-full" readOnly value={user && user.email} />
                        </div>
                        <div className="flex flex-col">
                            <label className="label font-semibold text-xl text-black mb-2">User Name</label>
                            <input name='post_name' type="text" className="input w-full" readOnly value={user && user.displayName} />
                        </div>
                    </div>
                    <input name='post_user_photo' type="text" className="input hidden" readOnly value={user && user.photoURL} />
                    <button type='submit' className="btn btn-neutral w-full mt-10 text-2xl py-6">Add Find Roommate</button>
                </form>
            </div>
        </div>





        //
        //
        //-------------------
        //-------------------------------
        //old code
        //-------------------------------
        //------------------

        // <form onSubmit={handleEditPost} className="mx-auto fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

        //     <label className="label">Location</label>
        //     <input defaultValue={location} name='location' type="text" className="input" placeholder="Location" />

        //     <label className="label">Rent Amount</label>
        //     <input defaultValue={rent_amount} name='rent_amount' type="text" className="input" placeholder="Rent Amount" />

        //     <label className="label">Room Type</label>

        //     <div className="flex gap-5">
        //         <div className="flex gap-3">
        //             <label className="label">Single</label>
        //             <input value="single" type="radio" name='roomType' />
        //         </div>
        //         <div className="flex gap-3">
        //             <label className="label">Shared</label>
        //             <input value="shared" type="radio" name='roomType' />
        //         </div>
        //     </div>

        //     <label className="label">Life-style Preferences</label>
        //     <div className="flex gap-5">
        //         <div className="flex gap-3">
        //             <label className="label">Pets</label>
        //             <input name='preferences' value='pets' type="Checkbox" />
        //         </div>
        //         <div className="flex gap-3">
        //             <label className="label">Smoking</label>
        //             <input name='preferences' value='smoking' type="Checkbox" />
        //         </div>
        //         <div className="flex gap-3">
        //             <label className="label">Night Owl</label>
        //             <input name='preferences' value='night_owl' type="Checkbox" />
        //         </div>
        //     </div>

        //     <label className="label">Description</label>
        //     <textarea defaultValue={description} placeholder='Description' className='input' name="description" id=""></textarea>

        //     <label className="label">Contact info</label>
        //     <input defaultValue={contact_info} name='contact_info' type="text" className="input" placeholder="Contact info" />

        //     <label className="label">Availability</label>
        //     <div className="flex gap-5">
        //         <div className="flex gap-3">
        //             <label className="label">yes</label>
        //             <input value='yes' name="availability" type="radio" />
        //         </div>
        //         <div className="flex gap-3">
        //             <label className="label">no</label>
        //             <input value='no' name="availability" type="radio" />
        //         </div>
        //     </div>
        //     <label className="label">User Email</label>
        //     <input name='post_email' type="text" className="input" readOnly value={user && user.email} />
        //     <label className="label">User Name</label>
        //     <input name='post_name' type="text" className="input" readOnly value={user && user.displayName} />
        //     <input name='post_user_photo' type="text" className="input" readOnly value={user && user.photoURL} />
        //     <button type='submit' className="btn btn-neutral mt-4">Login</button>
        // </form>
    );
};

export default UpdatePost;