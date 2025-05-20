import React from 'react';

const FindRoommate = () => {
    return (
        <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

            <label className="label">Location</label>
            <input type="text" className="input" placeholder="Location" />

            <label className="label">Rent Amount</label>
            <input type="text" className="input" placeholder="Rent Amount" />

            <label className="label">Room Type</label>

            <div className="flex gap-5">
                <div className="flex gap-3">
                    <label className="label">Single</label>
                    <input type="radio" name='roomType' />
                </div>
                <div className="flex gap-3">
                    <label className="label">Shared</label>
                    <input type="radio" name='roomType' />
                </div>
                <div className="flex gap-3">
                    <label className="label">Single + Shared</label>
                    <input type="radio" name='roomType' />
                </div>
            </div>

            <label className="label">Life-style Preferences</label>
            <div className="flex gap-5">
                <div className="flex gap-3">
                    <label className="label">Pets</label>
                    <input type="Checkbox" />
                </div>
                <div className="flex gap-3">
                    <label className="label">Smoking</label>
                    <input type="Checkbox" />
                </div>
                <div className="flex gap-3">
                    <label className="label">Night Owl</label>
                    <input type="Checkbox" />
                </div>
            </div>

            <label className="label">Description</label>
            <textarea placeholder='Description' className='input' name="" id=""></textarea>

            <label className="label">Contact info</label>
            <input type="text" className="input" placeholder="Contact info" />

            <label className="label">Availability</label>
            <div className="flex gap-5">
                <div className="flex gap-3">
                    <label className="label">yes</label>
                    <input type="radio" name='available' />
                </div>
                <div className="flex gap-3">
                    <label className="label">no</label>
                    <input type="radio" name='available' />
                </div>
            </div>
            <label className="label">User Email</label>
            <input type="text" className="input" value="DemoEmail@gmail.com" />
            <label className="label">User Name</label>
            <input type="text" className="input" value="Demo Name" />
            <button type='submit' className="btn btn-neutral mt-4">Login</button>
        </form>
    );
};

export default FindRoommate;