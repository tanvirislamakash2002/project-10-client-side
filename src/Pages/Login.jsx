import React, { use } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Login = () => {

    const { signIn, loginWithGoogle } = use(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    //console.log(location.state)

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())
        //console.log('login', data)

        signIn(data)
            .then(res => {
                toast.success('Successfully login')
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch(error => {
                toast.error('failed to login')
            })
    }

    const handelLoginWithGoogle = () => {
        loginWithGoogle()
            .then(res => {
                toast.success('Successfully login with google')
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch(error => {
                toast.error('failed to login with google')
            })
    }
    return (
        <div className=" bg-[url(https://i.ibb.co/PsWq8tC6/ad06964907556.jpg)] bg-cover">
<div className="bg-black/50 flex items-center justify-center   min-h-[calc(100vh-142px)]">
                <div className="mx-auto flex items-center justify-center">

                <div className=" card bg-base-100/70 w-full shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <h2 className='text-3xl font-bold text-center mb-5'>Please Login!</h2>
                                <div className="">
                                    <label className="label text-black mb-1">Email</label>
                                <input name='email' type="email" className="input" placeholder="Your Email" />
                                </div>
                                <div className="">
                                    <label className="label text-black mb-1">Password</label>
                                <input name='password' type="password" className="input" placeholder="Your Password" />
                                </div>
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4 w-full">Login</button>
                        </form>
                    </div>
                    <hr className='border-dashed border-gray-500'/>
                    <button onClick={handelLoginWithGoogle} className="btn bg-white text-black border-[#e5e5e5] w-10/12 mx-auto mt-3">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                            <p className='text-center my-3'>Don't have an account <Link state={location.state} to='/register' className='text-red-500 font-bold hover:underline'>Register</Link></p>

                </div>
            </div>
</div>
        </div>
    );
};

export default Login;