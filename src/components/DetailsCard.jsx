import React from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const DetailsCard = ({detail}) => {
    // console.log(detail)

    const handleDelete =(id)=>{
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

    fetch(`${import.meta.env.VITE_API_URL}/add-roommate/${id}`,{
        method:'DELETE'
    })
    .then(res=>res.json())
    .then(data=>{
        //console.log('after delete', data)
        if(data.deletedCount>0){
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
        <div className="card bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
                <h2 className="card-title">Cookies!</h2>
                <p>We are using cookies for no reason.</p>
                <div className="card-actions justify-end">
                    <Link to={`/single-detail/${detail._id}`} className="btn btn-primary">view detail</Link>
                    <Link to={`/update-post/${detail._id}`} className="btn btn-primary">Edit</Link>
                    <button onClick={()=>handleDelete(detail._id)} className="btn btn-ghost">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DetailsCard;