import React from 'react';
import { useParams } from 'react-router';

const SingleDetails = () => {
    const {id} = useParams()
    //console.log(id)
    return (
        <div>
            what a single
        </div>
    );
};

export default SingleDetails;