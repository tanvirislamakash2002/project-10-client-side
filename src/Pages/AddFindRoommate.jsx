import React, { use } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';

const AddFindRoommate = () => {

    const { user } = use(AuthContext)
    if (user) {
        //console.log(user)
        //console.log(user?.email)
    }

    const handleAddRoommate = (e) => {

        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)

        const preferences = formData.getAll('preferences')


        const data = { ...Object.fromEntries(formData.entries()), preferences }

        //console.log(data)

        // send data to db
        fetch('https://ph-a10-server-two.vercel.app/add-roommate', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Roommate information added successfully",
                        showConfirmButton: true,
                        timer: 900
                    });
                    form.reset();
                }
            })
    }
    return (
        <div className="bg-[url(https://i.ibb.co/0R66sGNY/finding-roomate.jpg)] bg-cover">
            <div className="bg-black/70  min-h-[calc(100vh-142px)] flex py-8 md:items-center md:justify-center">
                <form onSubmit={handleAddRoommate} className="mx-auto bg-base-200/60 border-base-300 rounded-box border p-4 max-w-7xl w-11/12">
<h2 className="text-4xl text-center font-bold py-14">Add Find Roommate To Find Your Desire Roommate</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                        <div className=" flex flex-col md:col-span-2 col-span-1  ">
                            <label className="label font-semibold text-xl  text-black mb-2">Location</label>
                            <input name='location' type="text" className="input w-full" placeholder="Location" />
                        </div>

                        <div className="flex flex-col">
                            <label className="label font-semibold text-xl text-black mb-2">Rent Amount</label>
                            <input name='rent_amount' type="text" className="input w-full" placeholder="Rent Amount" />
                        </div>

                        <div className="flex flex-col">
                            <label className="label font-semibold text-xl text-black mb-2">Room Type</label>

                            <div className="flex gap-5">
                                <div className="flex gap-3">
                                    <label className="label text-lg font-normal text-black mb-2">Single</label>
                                    <input value="single" type="radio" name='roomType' className='radio radio-neutral bg-white'/>
                                </div>
                                <div className="flex gap-3">
                                    <label className="label text-lg font-normal text-black mb-2">Shared</label>
                                    <input value="shared" type="radio" name='roomType' className='radio radio-neutral bg-white'/>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="label font-semibold text-xl text-black mb-4">Life-style Preferences</label>
                            <div className="flex gap-5">
                                <div className="flex gap-3">
                                    <label className="label font-normal text-lg text-black">Pets</label>
                                    <input name='preferences' value='pets' type="Checkbox" className='checkbox checkbox-neutral bg-white'/>
                                </div>
                                <div className="flex gap-3">
                                    <label className="label font-normal text-lg text-black ">Smoking</label>
                                    <input name='preferences' value='smoking' type="Checkbox" className='checkbox checkbox-neutral bg-white'/>
                                </div>
                                <div className="flex gap-3">
                                    <label className="label font-normal text-lg text-black ">Night Owl</label>
                                    <input name='preferences' value='night_owl' type="Checkbox" className='checkbox checkbox-neutral bg-white'/>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="label font-semibold text-xl text-black mb-2">Description</label>
                            <textarea placeholder='Description' className='bg-white w-full rounded-sm p-2' name="description" id="" rows={2}></textarea>
                        </div>

                        <div className="flex flex-col">
                            <label className="label font-semibold text-xl text-black mb-2">Contact info</label>
                            <input name='contact_info' type="text" className="input w-full" placeholder="Contact info" />
                        </div>

                        <div className="flex flex-col">
                            <label className="label font-semibold text-xl text-black mb-2">Availability</label>
                            <div className="flex gap-5">
                                <div className="flex gap-3">
                                    <label className="label font-semibold text-xl text-black mb-2">yes</label>
                                    <input value='yes' name="availability" type="radio" className='radio radio-neutral bg-white'/>
                                </div>
                                <div className="flex gap-3">
                                    <label className="label font-semibold text-xl text-black mb-2">no</label>
                                    <input value='no' name="availability" type="radio" className='radio radio-neutral bg-white'/>
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
    );
};

export default AddFindRoommate;