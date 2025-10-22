import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../provider/AuthProvider';

const Register = () => {

    const { createUser, updateUser, loginWithGoogle, setUser } = use(AuthContext)

    const [errorMessage, setErrorMessage] = useState('')

    const location = useLocation()
    const navigate = useNavigate()
    // console.log(createUser)

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())
        const { name, email, photo, password } = data

        if (password.length <= 5) {
            setErrorMessage('password is less then 6 character')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setErrorMessage('Must have an Uppercase letter in the password')
            return;
        }
        else if (!/[a-z]/.test(password)) {
            setErrorMessage('Must have a Lowercase letter in the password')
            return;
        }
        else {
            setErrorMessage('')
        }

        // console.log(data)
        createUser(data)
            .then(userCredential => {
                //console.log(userCredential)
                const user = userCredential.user;
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        toast.success('Successfully login')
                        setUser({ ...user, displayName: name, photoURL: photo })
                        navigate(`${location.state ? location.state : '/'}`)
                    })
            })
            .catch(error => {
                toast.error(`failed to login ${error.message}`)
            })
    }

    const handleLoginWithGmail = () => {
        loginWithGoogle()
            .then(res => {
                toast.success('Successfully login with google')
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch(error => {
                toast.error('failed to login with google', error.message)
            })
    }
    return (
        <div className=" bg-[url(https://i.ibb.co/jvSGRZWj/4.jpg)] bg-cover">
 <div className="bg-black/50 flex items-center justify-center min-h-screen ">
               <div className="mx-auto flex items-center justify-center w-full">

                {/* <div className="card bg-base-100/70 mx-4 w-4/4 sm:w-3/4 md:w-2/4 lg:w-1/4"> */}
                <div className="card bg-base-100/70 mx-14 w-md">
                    <div className="card-body">
                        <form onSubmit={handleRegister} className="flex flex-col">
                            <h2 className='text-3xl font-bold text-center mb-5'>Please Register!</h2>

                            <label className="label text-black mb-1 font-semibold">Name</label>
                            <input name='name' type="text" className="input w-full" placeholder="Name" />
                            <label className="label text-black mb-1 font-semibold">Email</label>
                            <input name='email' type="email" className="input w-full" placeholder="Email" />
                            <label className="label text-black mb-1 font-semibold">PhotoURL</label>
                            <input name='photo' type="text" className="input w-full" placeholder="Photo URL" />
                            <label className="label text-black mb-1 font-semibold">Password</label>
                            <input name='password' type="password" className="input w-full" placeholder="Password" />
                            <h2 className='text-right text-red-500'>{errorMessage}</h2>
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-2">Register</button>
                            </form>
                            </div>
                            <hr className='border-dashed border-gray-600'/>
                            <button onClick={handleLoginWithGmail} className="btn bg-white text-black border-[#e5e5e5] mt-3 w-10/12 mx-auto">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>
                            
                            <p className='text-center my-3'>Already have an account <Link to='/login' className='text-red-500 font-bold hover:underline'>Login</Link></p>
                        
                    
                </div>
            </div>
 </div>
        </div>
    );
};

export default Register;