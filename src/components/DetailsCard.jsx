import React from 'react';

const DetailsCard = ({detail}) => {
    console.log(detail)
    return (
        <div className="card bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
                <h2 className="card-title">Cookies!</h2>
                <p>We are using cookies for no reason.</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-ghost">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DetailsCard;